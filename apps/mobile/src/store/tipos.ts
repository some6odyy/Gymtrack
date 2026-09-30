// ─────────────────────────────────────────────────────────────────────────────
// Tipos de los datos · Zona: Datos
//
// Qué hace: define la forma de todo lo que la app guarda en el teléfono: las listas de
// ejercicios y las entradas de la bitácora.
// Tócalo cuando: una lista, un ejercicio o una entrada necesite un campo nuevo. Un campo nuevo
// va opcional (?) o con valor por defecto al leer: los teléfonos ya tienen datos guardados con
// la forma vieja.
// Depende de: nada.
// ─────────────────────────────────────────────────────────────────────────────

// ── Listas de ejercicios ─────────────────────────────────────────────────────
/** Un ejercicio dentro de una lista, con lo que se planea hacer. */
export interface EjercicioLista {
  id: string;
  nombre: string;
  series: number;
  reps: number;
  /** Kilos. 0 si es con peso corporal. */
  pesoKg: number;
}

/** Una lista de ejercicios que el usuario arma y edita ("Pierna", "Empuje"). */
export interface ListaEjercicios {
  id: string;
  nombre: string;
  ejercicios: EjercicioLista[];
  /** Fecha ISO del último cambio. Las listas se muestran de la más reciente a la más vieja. */
  actualizadaAt: string;
}

// ── Bitácora ─────────────────────────────────────────────────────────────────
/**
 * Un ejercicio registrado en la bitácora: lo que realmente se hizo. Es una copia, así que
 * editar la lista después no cambia lo ya registrado.
 */
export interface EjercicioRegistro extends EjercicioLista {
  hecho: boolean;
}

/** Una entrada de la bitácora: un día de entrenamiento con sus ejercicios y una nota. */
export interface EntradaBitacora {
  id: string;
  /** Fecha ISO en que se creó la entrada. */
  fecha: string;
  titulo: string;
  ejercicios: EjercicioRegistro[];
  nota: string;
}
