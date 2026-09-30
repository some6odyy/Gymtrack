// ─────────────────────────────────────────────────────────────────────────────
// Editor de lista · Zona: Rutas
//
// Qué hace: edita una lista de ejercicios: el nombre, y agregar, editar, ordenar y quitar
// ejercicios. Desde acá se registra la lista en la bitácora o se elimina. Todo se guarda solo.
// Depende de: @/store/useStore, @/components/ui y @/components/EditorEjercicio.
// ─────────────────────────────────────────────────────────────────────────────
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { AgregarEjercicio, TarjetaEjercicio } from '@/components/EditorEjercicio';
import { Boton, Cabecera, CampoDiferido, Confirmar, Pantalla, Separador, Txt, Vacio } from '@/components/ui';
import { useStore } from '@/store/useStore';

export default function EditorLista() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lista = useStore((s) => s.listas.find((l) => l.id === id));
  const s = useStore.getState();
  const [borrando, setBorrando] = useState(false);

  if (!lista) {
    return (
      <Pantalla>
        <Cabecera titulo="Lista no encontrada" atras />
        <Txt v="secundario">Puede que la hayas eliminado.</Txt>
      </Pantalla>
    );
  }

  const registrar = () => {
    const e = s.crearEntrada(lista.id);
    router.replace(`/bitacora/${e.id}`);
  };

  return (
    <Pantalla>
      <Cabecera titulo={lista.nombre} subtitulo={`${lista.ejercicios.length} ejercicios`} atras />

      <CampoDiferido etiqueta="Nombre" valor={lista.nombre} onConfirmar={(t) => s.renombrarLista(lista.id, t)} />

      <Separador titulo="Ejercicios" />
      <View className="gap-3">
        {lista.ejercicios.length === 0 ? <Vacio titulo="Sin ejercicios" texto="Agrega el primero abajo." /> : null}
        {lista.ejercicios.map((e, i) => (
          <TarjetaEjercicio
            key={e.id}
            ejercicio={e}
            onCambio={(c) => s.editarEjercicio(lista.id, e.id, c)}
            onQuitar={() => s.quitarEjercicio(lista.id, e.id)}
            onSubir={i > 0 ? () => s.moverEjercicio(lista.id, e.id, -1) : undefined}
            onBajar={i < lista.ejercicios.length - 1 ? () => s.moverEjercicio(lista.id, e.id, 1) : undefined}
          />
        ))}
        <AgregarEjercicio onAgregar={(n) => s.agregarEjercicio(lista.id, n)} />
      </View>

      <View className="mt-8 gap-3">
        <Boton titulo="Registrar en la bitácora" onPress={registrar} disabled={lista.ejercicios.length === 0} />
        {borrando ? (
          <Confirmar
            pregunta={`¿Eliminar "${lista.nombre}"? Las entradas de la bitácora se conservan.`}
            si="Eliminar"
            onSi={() => {
              s.eliminarLista(lista.id);
              router.back();
            }}
            onNo={() => setBorrando(false)}
          />
        ) : (
          <Boton titulo="Eliminar lista" variante="borde" onPress={() => setBorrando(true)} />
        )}
      </View>
    </Pantalla>
  );
}
