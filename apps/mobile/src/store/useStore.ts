// ─────────────────────────────────────────────────────────────────────────────
// Store principal · Zona: Store
//
// Qué hace: guarda todo lo que el usuario tiene en el celular (listas de ejercicios y entradas
// de la bitácora) y expone las acciones para cambiarlo. Cada cambio se guarda solo en el
// teléfono con AsyncStorage (persistencia local): al cerrar y abrir la app, todo sigue ahí.
// Tócalo cuando: agregues una acción nueva (crear, editar, borrar) o cambies qué se guarda.
// No lo toques para: agregar un campo a un dato guardado (eso va primero en ./tipos.ts).
// Depende de: ./tipos, @/lib/ids (newId), @/lib/formato (ahoraIso).
// ─────────────────────────────────────────────────────────────────────────────
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ahoraIso } from '@/lib/formato';
import { newId } from '@/lib/ids';
import type { EjercicioLista, EjercicioRegistro, EntradaBitacora, ListaEjercicios } from './tipos';

// ── Tipos ────────────────────────────────────────────────────────────────────
/** Los campos de un ejercicio que se pueden editar (todo menos el id). */
export type CambiosEjercicio = Partial<Omit<EjercicioLista, 'id'>>;

/**
 * Todo lo que vive en el store. Las pantallas leen con `useStore((s) => s.algo)` y cambian datos
 * solo con las acciones; nunca se muta un objeto a mano.
 */
export interface Estado {
  listas: ListaEjercicios[];
  bitacora: EntradaBitacora[];
  /** true después de cargar la lista de ejemplo la primera vez. Se guarda. */
  sembrado: boolean;
  /** true cuando terminó de leer AsyncStorage. El layout raíz no muestra la app hasta entonces. */
  hidratado: boolean;

  // Editor de listas de ejercicios
  crearLista: (nombre: string) => ListaEjercicios;
  renombrarLista: (id: string, nombre: string) => void;
  eliminarLista: (id: string) => void;
  agregarEjercicio: (listaId: string, nombre: string) => void;
  editarEjercicio: (listaId: string, ejId: string, cambios: CambiosEjercicio) => void;
  quitarEjercicio: (listaId: string, ejId: string) => void;
  /** Sube (-1) o baja (+1) un ejercicio dentro de la lista. */
  moverEjercicio: (listaId: string, ejId: string, direccion: -1 | 1) => void;

  // Bitácora
  /** Crea una entrada de hoy. Con `listaId` copia sus ejercicios; sin él, parte vacía. */
  crearEntrada: (listaId?: string) => EntradaBitacora;
  editarEntrada: (id: string, cambios: Partial<Pick<EntradaBitacora, 'titulo' | 'nota'>>) => void;
  eliminarEntrada: (id: string) => void;
  agregarEjercicioEntrada: (id: string, nombre: string) => void;
  editarEjercicioEntrada: (id: string, ejId: string, cambios: CambiosEjercicio & { hecho?: boolean }) => void;
  quitarEjercicioEntrada: (id: string, ejId: string) => void;
}

// ── Datos de ejemplo ─────────────────────────────────────────────────────────
/** La lista con la que parte la app recién instalada, para que no se vea vacía. */
function listaEjemplo(): ListaEjercicios {
  const ej = (nombre: string, series: number, reps: number, pesoKg: number): EjercicioLista => ({
    id: newId(),
    nombre,
    series,
    reps,
    pesoKg,
  });
  return {
    id: newId(),
    nombre: 'Pierna',
    ejercicios: [ej('Sentadilla', 4, 8, 60), ej('Peso muerto rumano', 3, 10, 50), ej('Zancadas', 3, 12, 0)],
    actualizadaAt: ahoraIso(),
  };
}

/** Un ejercicio nuevo con valores de partida razonables. */
function ejercicioNuevo(nombre: string): EjercicioLista {
  return { id: newId(), nombre: nombre.trim() || 'Ejercicio', series: 3, reps: 10, pesoKg: 0 };
}

// ── El store ─────────────────────────────────────────────────────────────────
export const useStore = create<Estado>()(
  persist(
    (set, get) => {
      // Reemplaza una lista o una entrada por su copia modificada. Zustand compara por
      // referencia, así que siempre se crea un objeto nuevo en vez de mutar el viejo.
      const cambiarLista = (id: string, fn: (l: ListaEjercicios) => ListaEjercicios) =>
        set({ listas: get().listas.map((l) => (l.id === id ? { ...fn(l), actualizadaAt: ahoraIso() } : l)) });
      const cambiarEntrada = (id: string, fn: (e: EntradaBitacora) => EntradaBitacora) =>
        set({ bitacora: get().bitacora.map((e) => (e.id === id ? fn(e) : e)) });

      return {
        listas: [],
        bitacora: [],
        sembrado: false,
        hidratado: false,

        // ── Listas de ejercicios ─────────────────────────────────────────────────────
        crearLista(nombre) {
          const lista: ListaEjercicios = {
            id: newId(),
            nombre: nombre.trim() || 'Nueva lista',
            ejercicios: [],
            actualizadaAt: ahoraIso(),
          };
          set({ listas: [lista, ...get().listas] });
          return lista;
        },
        renombrarLista(id, nombre) {
          cambiarLista(id, (l) => ({ ...l, nombre: nombre.trim() || l.nombre }));
        },
        eliminarLista(id) {
          // Las entradas de la bitácora no se tocan: tienen su propia copia de los ejercicios.
          set({ listas: get().listas.filter((l) => l.id !== id) });
        },
        agregarEjercicio(listaId, nombre) {
          cambiarLista(listaId, (l) => ({ ...l, ejercicios: [...l.ejercicios, ejercicioNuevo(nombre)] }));
        },
        editarEjercicio(listaId, ejId, cambios) {
          cambiarLista(listaId, (l) => ({
            ...l,
            ejercicios: l.ejercicios.map((e) => (e.id === ejId ? { ...e, ...cambios } : e)),
          }));
        },
        quitarEjercicio(listaId, ejId) {
          cambiarLista(listaId, (l) => ({ ...l, ejercicios: l.ejercicios.filter((e) => e.id !== ejId) }));
        },
        moverEjercicio(listaId, ejId, direccion) {
          cambiarLista(listaId, (l) => {
            const i = l.ejercicios.findIndex((e) => e.id === ejId);
            const j = i + direccion;
            if (i < 0 || j < 0 || j >= l.ejercicios.length) return l;
            const ejercicios = [...l.ejercicios];
            [ejercicios[i], ejercicios[j]] = [ejercicios[j]!, ejercicios[i]!];
            return { ...l, ejercicios };
          });
        },

        // ── Bitácora ─────────────────────────────────────────────────────────────────
        crearEntrada(listaId) {
          const lista = get().listas.find((l) => l.id === listaId);
          // Los ejercicios se copian con id nuevo: editar la entrada no cambia la lista, ni al revés.
          const ejercicios: EjercicioRegistro[] = (lista?.ejercicios ?? []).map((e) => ({
            ...e,
            id: newId(),
            hecho: false,
          }));
          const entrada: EntradaBitacora = {
            id: newId(),
            fecha: ahoraIso(),
            titulo: lista?.nombre ?? 'Entrenamiento',
            ejercicios,
            nota: '',
          };
          set({ bitacora: [entrada, ...get().bitacora] });
          return entrada;
        },
        editarEntrada(id, cambios) {
          cambiarEntrada(id, (e) => ({ ...e, ...cambios }));
        },
        eliminarEntrada(id) {
          set({ bitacora: get().bitacora.filter((e) => e.id !== id) });
        },
        agregarEjercicioEntrada(id, nombre) {
          cambiarEntrada(id, (e) => ({ ...e, ejercicios: [...e.ejercicios, { ...ejercicioNuevo(nombre), hecho: false }] }));
        },
        editarEjercicioEntrada(id, ejId, cambios) {
          cambiarEntrada(id, (e) => ({
            ...e,
            ejercicios: e.ejercicios.map((x) => (x.id === ejId ? { ...x, ...cambios } : x)),
          }));
        },
        quitarEjercicioEntrada(id, ejId) {
          cambiarEntrada(id, (e) => ({ ...e, ejercicios: e.ejercicios.filter((x) => x.id !== ejId) }));
        },
      };
    },
    // ── Persistencia local ───────────────────────────────────────────────────────
    {
      // Clave en AsyncStorage. Es distinta a la de la versión anterior (gymtrack-v1) porque la
      // forma de los datos cambió por completo.
      name: 'gymtrack-simple-v1',
      storage: createJSONStorage(() => AsyncStorage),
      // Solo se guardan datos; `hidratado` es una bandera de esta apertura.
      partialize: (s) => ({ listas: s.listas, bitacora: s.bitacora, sembrado: s.sembrado }),
      onRehydrateStorage: () => () => {
        // Corre cuando termina de leer lo guardado (haya datos o no). La primera vez carga la
        // lista de ejemplo; pase lo que pase, suelta el layout raíz.
        const st = useStore.getState();
        if (!st.sembrado) useStore.setState({ listas: [listaEjemplo()], sembrado: true });
        useStore.setState({ hidratado: true });
      },
    },
  ),
);
