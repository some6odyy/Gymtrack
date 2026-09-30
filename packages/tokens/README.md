# @gymtrack/tokens

El diseño básico de GymTrack en un solo lugar.

- `index.js`: el objeto para usar desde código (por ejemplo, el color de un placeholder).
- `tailwind.preset.js`: el mismo objeto como preset de Tailwind. La app lo carga en `tailwind.config.js`.

**Tres colores:** `primario` (menta `#45B392`, la acción), `tinta` (`#131A17`, el texto) y `fondo` (`#FFFFFF`). Bordes, rellenos y texto secundario salen de estos con opacidad: `border-tinta/10`, `bg-tinta/5`, `text-tinta/60`, `bg-primario/15`.

**Una fuente:** Manrope en tres pesos. Las clases llevan el peso en el nombre: `font-sans`, `font-sans-semibold`, `font-sans-bold`. No uses `font-bold`: en React Native no combina el peso con la familia.
