// Txt: es el texto de toda la app. En vez de repetir fuente, tamaño y color en cada pantalla, se
// elige una variante con nombre: titulo, h2, cuerpo, secundario, etiqueta.
import { Text, type TextProps } from 'react-native';

// Cada variante trae fuente, tamaño y color. Solo se usa la tinta, entera o con opacidad.
const VARIANTES = {
  titulo: 'font-sans-bold text-2xl text-tinta',
  h2: 'font-sans-bold text-lg text-tinta',
  cuerpo: 'font-sans text-base text-tinta',
  cuerpoMedio: 'font-sans-semibold text-base text-tinta',
  secundario: 'font-sans text-sm text-tinta/60',
  etiqueta: 'font-sans-semibold text-xs uppercase tracking-widest text-tinta/60',
} as const;

export type VarianteTxt = keyof typeof VARIANTES;

// Texto con estilo por variante. Úsalo en vez de <Text> en las pantallas.
export function Txt({ v = 'cuerpo', className = '', ...p }: TextProps & { v?: VarianteTxt; className?: string }) {
  return <Text className={`${VARIANTES[v]} ${className}`} {...p} />;
}
