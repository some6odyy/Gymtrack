// ─────────────────────────────────────────────────────────────────────────────
// Tokens de diseño · Zona: Diseño
//
// Qué hace: es la única fuente de verdad de la apariencia de GymTrack. Diseño básico:
// tres colores, una fuente (Manrope, en tres pesos) y los radios de las esquinas.
// De aquí salen las clases de NativeWind (bg-primario, text-tinta, bg-fondo, font-sans-bold,
// rounded-card) y el objeto que se usa desde código cuando no hay className.
// Tócalo cuando: quieras cambiar uno de los tres colores, la fuente o un radio. Un cambio acá
// se ve en toda la app sin tocar ninguna pantalla.
// No lo toques para: cambiar cómo se ve un botón o una tarjeta en particular (eso vive en
// apps/mobile/src/components/ui/) ni para registrar la fuente al arrancar (eso lo hace
// apps/mobile/src/app/_layout.tsx con useFonts).
// Depende de: nada. Lo leen tailwind.preset.js y la app vía @gymtrack/tokens.
// ─────────────────────────────────────────────────────────────────────────────

// Es CommonJS porque tailwind.config.js lo carga con require en Node, sin transpilar.

// ── Colores ──────────────────────────────────────────────────────────────────
/**
 * Los tres colores de la app. No hay más: bordes, rellenos de campos y texto secundario se
 * sacan de estos mismos con opacidad (`border-tinta/10`, `bg-tinta/5`, `text-tinta/60`,
 * `bg-primario/15`). Nunca pongas un hexadecimal en una pantalla.
 * Ojo: apps/mobile/app.json repite a mano `fondo` (fondo del splash). Si lo cambias,
 * actualízalo allá también.
 */
const colors = {
  // Menta. La acción: botón principal, pestaña activa, ejercicio marcado como hecho.
  primario: '#45B392',
  // Tinta. Todo el texto, y con opacidad los bordes y rellenos.
  tinta: '#131A17',
  // Fondo. Pantallas y tarjetas; también el texto sobre un botón primario.
  fondo: '#FFFFFF',
};

// ── Fuente ───────────────────────────────────────────────────────────────────
/**
 * Una sola familia (Manrope) en tres pesos. En React Native cada peso cargado es una familia
 * distinta, por eso las clases llevan el peso en el nombre (`font-sans-bold`) y nunca se usa
 * `font-bold` a secas. Si agregas un peso, súmalo acá, en tailwind.preset.js y en el useFonts
 * de apps/mobile/src/app/_layout.tsx.
 */
const fonts = {
  sans: {
    regular: 'Manrope_400Regular',
    semibold: 'Manrope_600SemiBold',
    bold: 'Manrope_700Bold',
  },
};

// ── Radios ───────────────────────────────────────────────────────────────────
/** Radios de esquina en píxeles: campos, botones, tarjetas y la pestaña activa. */
const radius = { field: 12, button: 14, card: 16, tab: 12 };

module.exports = { colors, fonts, radius };
