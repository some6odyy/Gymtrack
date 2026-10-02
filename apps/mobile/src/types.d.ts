// Declaraciones de tipos del proyecto: le avisa a TypeScript que existen módulos que el código
// importa solo por efecto, como el global.css de NativeWind que carga src/app/_layout.tsx. Sin
// esto, `pnpm typecheck` reclama que no encuentra el módulo '*.css'.

// TypeScript 6 exige declarar los módulos importados solo por efecto (el CSS de NativeWind).
declare module '*.css';
