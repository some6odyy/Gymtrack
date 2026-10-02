// Tarjeta: el contenedor con borde y esquinas redondeadas donde va casi todo. Trae también
// Separador (el título de una sección) y Etiqueta (la pastilla de conteo, "3 ejercicios").
import { Text, View, type ViewProps } from 'react-native';
import { Txt } from './Txt';

// Contenedor base con borde fino y relleno de 16 px. No le pases bg-* ni border-* por className.
export function Tarjeta({ className = '', ...p }: ViewProps & { className?: string }) {
  return <View className={`rounded-card border border-tinta/10 bg-fondo p-4 ${className}`} {...p} />;
}

// Título de sección de una pantalla, en mayúsculas chicas.
export function Separador({ titulo, className = '' }: { titulo: string; className?: string }) {
  return (
    <Txt v="etiqueta" className={`mb-2 mt-6 ${className}`}>
      {titulo}
    </Txt>
  );
}

// Pastilla con un texto corto. `activa` la pinta en menta.
export function Etiqueta({ texto, activa = false }: { texto: string; activa?: boolean }) {
  return (
    <View className={`rounded-full px-2.5 py-1 ${activa ? 'bg-primario' : 'bg-tinta/5'}`}>
      <Text className={`font-sans-semibold text-[11px] ${activa ? 'text-fondo' : 'text-tinta/60'}`}>{texto}</Text>
    </View>
  );
}
