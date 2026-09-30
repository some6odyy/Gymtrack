# GymTrack

App móvil para armar listas de ejercicios y llevar una bitácora de entrenamiento. Todo se guarda en el teléfono.

## Qué hace (versión 0.2, simplificada)

| Operación | Dónde |
| --- | --- |
| **Editor de listas de ejercicios**: crear, renombrar y eliminar listas; agregar, editar (series, reps, kg), ordenar y quitar ejercicios | Pestaña **Listas** → `lista/[id]` |
| **Bitácora editable**: crear una entrada desde una lista (copia sus ejercicios) o vacía; editar título, marcar ejercicios como hechos, cambiar series/reps/kg, agregar o quitar ejercicios, nota libre, eliminar | Pestaña **Bitácora** → `bitacora/[id]` |
| **Persistencia local**: listas y bitácora se guardan solas en el teléfono con AsyncStorage (zustand `persist`). Al cerrar y abrir la app todo sigue ahí | `src/store/useStore.ts` |
| **Diseño básico**: 3 colores, 1 fuente y navegación con 2 pestañas + pantallas de edición | `packages/tokens`, `src/app/` |

No hay cuentas, servidor ni sincronización.

## Diseño

- **3 colores**: `primario` menta `#45B392` (acción, pestaña activa, ejercicio hecho), `tinta` `#131A17` (texto) y `fondo` `#FFFFFF`. Bordes, rellenos y texto secundario salen de estos con opacidad (`border-tinta/10`, `bg-tinta/5`, `text-tinta/60`).
- **1 fuente**: Manrope en tres pesos (`font-sans`, `font-sans-semibold`, `font-sans-bold`).
- **Navegación**: Expo Router. Dos pestañas abajo (Listas, Bitácora); cada lista y cada entrada se abren en su pantalla con botón de volver.

## Estructura

```
apps/mobile/src/
  app/
    (tabs)/index.tsx      Pestaña Listas
    (tabs)/bitacora.tsx   Pestaña Bitácora
    lista/[id].tsx        Editor de una lista
    bitacora/[id].tsx     Editor de una entrada
  components/
    ui/                   Kit: Txt, Boton, Tarjeta, Campo, Pantalla, Fila, Vacio
    EditorEjercicio.tsx   Tarjeta de ejercicio editable (la usan ambos editores)
  store/
    tipos.ts              Forma de los datos guardados
    useStore.ts           Estado + acciones + persistencia local
  lib/                    ids y formato (fechas, números)
packages/tokens/          Los 3 colores, la fuente y los radios
```

## Cómo correrlo

Requisitos: Node 22 y pnpm 12 (`npm install -g pnpm`).

```bash
pnpm install
pnpm dev
```

Escanea el QR con Expo Go (misma red wifi), o `a` para un emulador de Android. `pnpm web` lo abre en el navegador.

| Comando | Qué hace |
| --- | --- |
| `pnpm typecheck` | TypeScript |
| `pnpm lint` | ESLint con la configuración de Expo |
| `pnpm export:android` | Compila el bundle de Android sin emulador (prueba de humo) |

## Publicar con EAS

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview
```
