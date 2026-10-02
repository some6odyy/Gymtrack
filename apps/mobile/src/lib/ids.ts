// Generador de ids: inventa el id único de cada cosa que se guarda (lista, ejercicio, entrada de
// la bitácora). Todo lo que el store crea pasa por aquí.

// Devuelve un id corto y único en el teléfono, tipo "m1x9k2a-4f8zq1".
// Mezcla la hora actual con un número al azar: para datos que viven en un solo celular alcanza,
// no hace falta un UUID.
export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
