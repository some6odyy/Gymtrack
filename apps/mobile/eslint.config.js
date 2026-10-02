// Config de ESLint: define qué revisa `pnpm lint` (que corre `expo lint`) en la app. Usa las
// reglas que recomienda Expo, que ya traen TypeScript, React, los hooks y las del compilador de
// React que menciona la guía del equipo (nada de Date.now() en el cuerpo de un componente, nada de
// setState directo dentro de un efecto, nada de escribir una ref durante el render), más el orden
// de los imports. Y le dice qué carpetas ignorar: lo que genera `expo export` y la caché de Expo.

// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

// Config "flat" de ESLint 9: un arreglo de bloques que se aplican en orden. Primero todo lo de
// Expo y después nuestros ajustes. Un bloque con solo `ignores` (sin `files`) es global: esas
// carpetas no se revisan nunca, ni aunque las pidas explícitamente.
module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', '.expo/*', 'node_modules/*'],
  },
]);
