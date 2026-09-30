# Guía del equipo

Cómo está armado GymTrack, dónde se toca cada cosa y qué revisar antes de subir.

## Cómo correrlo en tu computador

1. Instala Node 22 y pnpm (`npm install -g pnpm`).
2. Clona el repo y en la raíz: `pnpm install`.
3. `pnpm dev` levanta el servidor y muestra un QR. Escanéalo con Expo Go (mismo wifi). `pnpm web` lo abre en el navegador.
4. Antes de subir: `pnpm typecheck` y `pnpm lint`. Los dos tienen que pasar; el CI de GitHub corre lo mismo más el bundle de Android.

## El mapa: qué zona toca cada cosa

| Quiero | Zona | Archivo |
| --- | --- | --- |
| Cambiar la pestaña Listas | Rutas | `apps/mobile/src/app/(tabs)/index.tsx` |
| Cambiar la pestaña Bitácora | Rutas | `apps/mobile/src/app/(tabs)/bitacora.tsx` |
| Cambiar el editor de una lista | Rutas | `apps/mobile/src/app/lista/[id].tsx` |
| Cambiar el editor de una entrada de la bitácora | Rutas | `apps/mobile/src/app/bitacora/[id].tsx` |
| Cambiar cómo se edita un ejercicio (en ambos editores) | Componentes | `apps/mobile/src/components/EditorEjercicio.tsx` |
| Cambiar un botón, tarjeta o campo que se repite | Kit de interfaz | `apps/mobile/src/components/ui/` |
| Agregar una acción (crear, editar, borrar) o cambiar qué se guarda | Store | `apps/mobile/src/store/useStore.ts` |
| Agregar un campo a una lista, ejercicio o entrada | Datos | `apps/mobile/src/store/tipos.ts` |
| Cambiar uno de los 3 colores, la fuente o un radio | Diseño | `packages/tokens/index.js` |
| Cambiar las pestañas | Rutas | `apps/mobile/src/app/(tabs)/_layout.tsx` |

## Cómo fluyen los datos

```
pantalla  ->  useStore (acciones)  ->  estado en memoria  ->  AsyncStorage (se guarda solo)
    ^                                        |
    +------ useStore (selectores) -----------+
```

- Todo lo que el usuario cambia pasa por una acción del store. No se muta un objeto a mano.
- Al crear una entrada desde una lista, los ejercicios se copian: editar la entrada no cambia la lista, ni al revés.

## Convenciones

- **Idioma**: todo lo que ve el usuario en español, con tuteo. Sin emojis. Los nombres en el código también van en español.
- **Colores**: solo los 3 tokens (`primario`, `tinta`, `fondo`), enteros o con opacidad (`text-tinta/60`). No pongas hexadecimales en las pantallas ni agregues colores nuevos.
- **Fuente**: nunca `font-bold` ni `font-semibold`. Usa `font-sans`, `font-sans-semibold` o `font-sans-bold`.
- **Texto**: `<Txt v="secundario">` con sus variantes.
- **Campos de texto**: `CampoDiferido`, `EntradaDiferida` o `CampoNumero` para lo que se guarda en el store; confirman al perder el foco. `Campo` solo para estado local.
- **Confirmaciones**: `<Confirmar>` en línea. `Alert.alert` con botones no funciona en web.

## Cómo están comentados los archivos

Cada archivo empieza con una cabecera que dice su zona, qué hace, cuándo tocarlo y de qué depende. Cuando agregues un archivo, copia la cabecera de uno vecino.

## Cómo agregar cosas

**Una pantalla nueva.** Crea el archivo en `src/app/` (la ruta es el nombre del archivo). Usa `<Pantalla>` y `<Cabecera atras>`. Si va en las pestañas, agrégala en `src/app/(tabs)/_layout.tsx`.

**Un campo nuevo en un dato guardado.** Agrégalo en `tipos.ts` como opcional o con valor por defecto al leer: los teléfonos ya tienen datos guardados con el esquema viejo.

## Git

Ramas cortas y pull request, o directo a `main` si es algo chico. Commits en español, en presente, diciendo qué cambia para el usuario.
