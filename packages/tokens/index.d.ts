// ─────────────────────────────────────────────────────────────────────────────
// Tipos de los tokens · Zona: Diseño
//
// Qué hace: le cuenta a TypeScript qué exporta index.js, para tener autocompletado en
// `import { colors } from '@gymtrack/tokens'`.
// Tócalo cuando: agregues, renombres o saques una clave en index.js. Se escribe a mano.
// Depende de: nada. Tiene que calzar clave por clave con index.js.
// ─────────────────────────────────────────────────────────────────────────────

/** Los tres colores de la app. */
export interface Colors {
  primario: string;
  tinta: string;
  fondo: string;
}

/** Nombre de familia de cada peso de Manrope, tal como lo registra expo-font. */
export interface Fonts {
  sans: { regular: string; semibold: string; bold: string };
}

/** Radios de esquina en píxeles. */
export interface Radius {
  field: number;
  button: number;
  card: number;
  tab: number;
}

export const colors: Colors;
export const fonts: Fonts;
export const radius: Radius;
