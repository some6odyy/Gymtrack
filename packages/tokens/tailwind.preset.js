// Preset de Tailwind: traduce los tokens de index.js a clases de Tailwind/NativeWind: bg-primario,
// text-tinta, bg-fondo, font-sans-bold, rounded-card. La app lo carga desde
// apps/mobile/tailwind.config.js junto con el preset de NativeWind.

const { colors, fonts, radius } = require('./index.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      // Tres colores. Las variantes se sacan con opacidad: bg-primario/15, text-tinta/60.
      colors: {
        primario: colors.primario,
        tinta: colors.tinta,
        fondo: colors.fondo,
      },
      // Una clave por peso porque en React Native cada peso es una familia distinta.
      fontFamily: {
        sans: [fonts.sans.regular],
        'sans-semibold': [fonts.sans.semibold],
        'sans-bold': [fonts.sans.bold],
      },
      borderRadius: {
        field: `${radius.field}px`,
        button: `${radius.button}px`,
        card: `${radius.card}px`,
        tab: `${radius.tab}px`,
      },
    },
  },
};
