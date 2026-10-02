// Tipos de los tokens: le cuenta a TypeScript qué exporta index.js, para tener autocompletado en
// `import { colors } from '@gymtrack/tokens'`.

// Los tres colores de la app.
export interface Colors {
  primario: string;
  tinta: string;
  fondo: string;
}

// Nombre de familia de cada peso de Manrope, tal como lo registra expo-font.
export interface Fonts {
  sans: { regular: string; semibold: string; bold: string };
}

// Radios de esquina en píxeles.
export interface Radius {
  field: number;
  button: number;
  card: number;
  tab: number;
}

export const colors: Colors;
export const fonts: Fonts;
export const radius: Radius;
