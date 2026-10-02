// Boton: los botones de la app. Boton es el de texto (Guardar, Crear lista, Eliminar);
// BotonRedondo es el circulito con un signo (subir, bajar, quitar).
import { Pressable, Text, type PressableProps } from 'react-native';

// Tres variantes con los tres colores: lleno en menta, suave en menta y con borde de tinta.
const BOTONES = {
  primario: { caja: 'bg-primario', texto: 'text-fondo' },
  secundario: { caja: 'bg-primario/15', texto: 'text-tinta' },
  borde: { caja: 'border border-tinta/20 bg-fondo', texto: 'text-tinta' },
} as const;

export type VarianteBoton = keyof typeof BOTONES;

// Botón con texto. `chico` para la versión compacta que cabe en una fila.
export function Boton({
  titulo,
  variante = 'primario',
  chico = false,
  className = '',
  disabled,
  ...p
}: PressableProps & { titulo: string; variante?: VarianteBoton; chico?: boolean; className?: string }) {
  const e = BOTONES[variante];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={`items-center justify-center rounded-button ${chico ? 'px-4 py-2.5' : 'px-5 py-4'} ${e.caja} ${
        disabled ? 'opacity-40' : 'active:opacity-80'
      } ${className}`}
      {...p}
    >
      <Text className={`font-sans-bold ${chico ? 'text-sm' : 'text-base'} ${e.texto}`}>{titulo}</Text>
    </Pressable>
  );
}

// Botón circular con un solo signo. Pásale siempre `etiqueta` para el lector de pantalla.
export function BotonRedondo({
  glifo,
  onPress,
  disabled = false,
  etiqueta,
}: {
  glifo: string;
  onPress: () => void;
  disabled?: boolean;
  etiqueta: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={etiqueta}
      onPress={onPress}
      disabled={disabled}
      hitSlop={6}
      className={`h-9 w-9 items-center justify-center rounded-full border border-tinta/10 bg-fondo ${
        disabled ? 'opacity-30' : 'active:opacity-70'
      }`}
    >
      <Text className="font-sans-bold text-base text-tinta">{glifo}</Text>
    </Pressable>
  );
}
