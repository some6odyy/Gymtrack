// Fila: una fila de lista dentro de una tarjeta: contenido a la izquierda, algo chico a la derecha
// y una línea abajo. Con onPress se vuelve tocable.
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

// `ultimo` quita la línea de abajo para no dibujar un borde doble con el de la tarjeta.
export function Fila({
  onPress,
  izquierda,
  derecha,
  ultimo = false,
}: {
  onPress?: () => void;
  izquierda: ReactNode;
  derecha?: ReactNode;
  ultimo?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className={`flex-row items-center gap-3 py-3 ${ultimo ? '' : 'border-b border-tinta/10'} ${onPress ? 'active:opacity-70' : ''}`}
    >
      <View className="flex-1">{izquierda}</View>
      {derecha}
    </Pressable>
  );
}
