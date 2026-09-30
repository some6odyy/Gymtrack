// ─────────────────────────────────────────────────────────────────────────────
// Campo · Zona: Kit de interfaz
//
// Qué hace: los campos de texto de la app. Campo es un TextInput normal para texto que vive en
// el estado de la pantalla (el nombre de una lista nueva antes de crearla). EntradaDiferida y
// CampoDiferido entregan el texto solo al salir del campo, para no escribir en el store (y en
// el teléfono) con cada tecla. CampoNumero es la cajita chica para series, reps y kilos.
// Tócalo cuando: quieras cambiar cómo se ven todos los campos o cuándo confirman.
// Depende de: colors de packages/tokens, Txt (./Txt) y parseNumero/fmtNum (@/lib/formato).
// ─────────────────────────────────────────────────────────────────────────────
import { colors } from '@gymtrack/tokens';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { fmtNum, parseNumero } from '@/lib/formato';
import { Txt } from './Txt';

// El placeholder no acepta className: va como prop. Es la tinta al 40 % (66 en hexadecimal).
const PLACEHOLDER = `${colors.tinta}66`;
const ESTILO_CAMPO = 'rounded-field border border-tinta/10 bg-tinta/5 px-4 py-3 font-sans text-base text-tinta';

// ── Campo simple (estado local) ──────────────────────────────────────────────
/** Campo controlado con etiqueta opcional. Para texto que vive en un useState de la pantalla. */
export function Campo({ etiqueta, className = '', ...p }: TextInputProps & { etiqueta?: string; className?: string }) {
  return (
    <View className={`gap-1.5 ${className}`}>
      {etiqueta ? <Txt v="etiqueta">{etiqueta}</Txt> : null}
      <TextInput placeholderTextColor={PLACEHOLDER} className={ESTILO_CAMPO} {...p} />
    </View>
  );
}

// ── Entrada diferida ─────────────────────────────────────────────────────────
/**
 * TextInput que confirma al perder el foco, al enviar o al desmontarse. `valor` es el texto
 * inicial (del store) y `onConfirmar` se llama con el texto final, solo si cambió.
 */
export function EntradaDiferida({
  valor,
  onConfirmar,
  className = '',
  ...p
}: Omit<TextInputProps, 'value' | 'onChangeText'> & {
  valor: string;
  onConfirmar: (texto: string) => void;
  className?: string;
}) {
  // Refs porque el blur y el desmontaje no pueden depender del estado de React.
  const [texto, setTexto] = useState(valor);
  const ultimo = useRef(valor);
  const confirmado = useRef(valor);
  const onConfirmarRef = useRef(onConfirmar);
  useEffect(() => {
    onConfirmarRef.current = onConfirmar;
  });

  const confirmar = () => {
    if (ultimo.current === confirmado.current) return;
    confirmado.current = ultimo.current;
    onConfirmarRef.current(ultimo.current);
  };

  // Si se vuelve atrás con el teclado abierto no siempre llega el blur: se confirma acá.
  useEffect(() => {
    return () => {
      if (ultimo.current !== confirmado.current) onConfirmarRef.current(ultimo.current);
    };
  }, []);

  return (
    <TextInput
      value={texto}
      onChangeText={(t) => {
        ultimo.current = t;
        setTexto(t);
      }}
      onBlur={confirmar}
      onSubmitEditing={confirmar}
      placeholderTextColor={PLACEHOLDER}
      className={className}
      {...p}
    />
  );
}

/** EntradaDiferida con etiqueta y el mismo estilo de Campo. Es el campo que va con el store. */
export function CampoDiferido({
  etiqueta,
  className = '',
  ...p
}: Omit<TextInputProps, 'value' | 'onChangeText'> & {
  etiqueta?: string;
  valor: string;
  onConfirmar: (texto: string) => void;
  className?: string;
}) {
  return (
    <View className={`gap-1.5 ${className}`}>
      {etiqueta ? <Txt v="etiqueta">{etiqueta}</Txt> : null}
      <EntradaDiferida className={ESTILO_CAMPO} {...p} />
    </View>
  );
}

// ── Campo numérico ───────────────────────────────────────────────────────────
/**
 * Cajita numérica con etiqueta arriba ("Series", "Reps", "Kg"). Pensada para ir de a tres en
 * una fila: ocupa el ancho que le toca con flex-1. Confirma al salir del campo; un texto vacío o
 * inválido se descarta y vuelve al valor anterior. `decimal` deja escribir "47,5".
 */
export function CampoNumero({
  etiqueta,
  valor,
  onCambio,
  decimal = false,
}: {
  etiqueta: string;
  valor: number;
  onCambio: (n: number) => void;
  decimal?: boolean;
}) {
  return (
    <View className="flex-1 gap-1">
      <Txt v="etiqueta" className="text-[10px]">
        {etiqueta}
      </Txt>
      {/* La key vuelve a montar el campo si el valor cambia desde afuera. */}
      <EntradaDiferida
        key={valor}
        valor={fmtNum(valor)}
        onConfirmar={(t) => {
          const n = parseNumero(t);
          if (n != null && n >= 0) onCambio(decimal ? Math.round(n * 100) / 100 : Math.round(n));
        }}
        keyboardType={decimal ? 'decimal-pad' : 'number-pad'}
        selectTextOnFocus
        accessibilityLabel={etiqueta}
        className="rounded-field border border-tinta/10 bg-tinta/5 px-2 py-2 text-center font-sans-semibold text-base text-tinta"
      />
    </View>
  );
}
