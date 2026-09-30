// ─────────────────────────────────────────────────────────────────────────────
// Editor de ejercicio · Zona: Componentes compartidos
//
// Qué hace: las dos piezas que comparten el editor de listas y el de la bitácora.
// TarjetaEjercicio es un ejercicio editable (nombre, series, reps, kilos) con sus botones; en
// la bitácora suma el botón de "hecho". AgregarEjercicio es el campo + botón para sumar uno.
// Tócalo cuando: quieras cambiar cómo se ve o qué se edita de un ejercicio en ambas pantallas.
// Depende de: @/components/ui y @/store/tipos.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Boton, BotonRedondo, Campo, CampoNumero, EntradaDiferida, Tarjeta } from '@/components/ui';
import type { CambiosEjercicio } from '@/store/useStore';
import type { EjercicioLista } from '@/store/tipos';

// ── Un ejercicio ─────────────────────────────────────────────────────────────
/**
 * Tarjeta de un ejercicio. `onCambio` recibe solo el campo que cambió. Si pasas `onSubir` y
 * `onBajar` aparecen las flechas para ordenar; si pasas `hecho` y `onHecho`, el casillero.
 */
export function TarjetaEjercicio({
  ejercicio,
  onCambio,
  onQuitar,
  onSubir,
  onBajar,
  hecho,
  onHecho,
}: {
  ejercicio: EjercicioLista;
  onCambio: (c: CambiosEjercicio) => void;
  onQuitar: () => void;
  onSubir?: () => void;
  onBajar?: () => void;
  hecho?: boolean;
  onHecho?: () => void;
}) {
  return (
    <Tarjeta className={`gap-3 ${hecho ? 'border-primario' : ''}`}>
      <View className="flex-row items-center gap-2">
        {onHecho ? (
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: !!hecho }}
            accessibilityLabel="marcar como hecho"
            onPress={onHecho}
            hitSlop={6}
            className={`h-7 w-7 items-center justify-center rounded-full border-2 ${
              hecho ? 'border-primario bg-primario' : 'border-tinta/20 bg-fondo'
            }`}
          >
            {hecho ? <Text className="font-sans-bold text-sm text-fondo">✓</Text> : null}
          </Pressable>
        ) : null}
        <EntradaDiferida
          valor={ejercicio.nombre}
          onConfirmar={(t) => onCambio({ nombre: t.trim() || ejercicio.nombre })}
          placeholder="Nombre del ejercicio"
          accessibilityLabel="nombre del ejercicio"
          className="flex-1 py-1 font-sans-bold text-base text-tinta"
        />
        {onSubir ? <BotonRedondo glifo="↑" etiqueta="subir" onPress={onSubir} /> : null}
        {onBajar ? <BotonRedondo glifo="↓" etiqueta="bajar" onPress={onBajar} /> : null}
        <BotonRedondo glifo="×" etiqueta="quitar ejercicio" onPress={onQuitar} />
      </View>
      <View className="flex-row gap-2">
        <CampoNumero etiqueta="Series" valor={ejercicio.series} onCambio={(n) => onCambio({ series: n })} />
        <CampoNumero etiqueta="Reps" valor={ejercicio.reps} onCambio={(n) => onCambio({ reps: n })} />
        <CampoNumero etiqueta="Kg" valor={ejercicio.pesoKg} decimal onCambio={(n) => onCambio({ pesoKg: n })} />
      </View>
    </Tarjeta>
  );
}

// ── Agregar ejercicio ────────────────────────────────────────────────────────
/** Campo con el nombre y botón para sumar un ejercicio al final. */
export function AgregarEjercicio({ onAgregar }: { onAgregar: (nombre: string) => void }) {
  const [nombre, setNombre] = useState('');
  const agregar = () => {
    onAgregar(nombre);
    setNombre('');
  };
  return (
    <View className="flex-row items-end gap-2">
      <Campo
        className="flex-1"
        placeholder="Nuevo ejercicio"
        value={nombre}
        onChangeText={setNombre}
        onSubmitEditing={agregar}
      />
      <Boton titulo="Agregar" variante="secundario" onPress={agregar} className="py-3.5" />
    </View>
  );
}
