// Vacio: dos avisos. Vacio es el estado vacío de una lista ("Todavía no hay entradas"); Confirmar
// es la pregunta en línea antes de borrar algo, con su botón de sí y el de cancelar.
import { View } from 'react-native';
import { Boton } from './Boton';
import { Tarjeta } from './Tarjeta';
import { Txt } from './Txt';

// Tarjeta centrada para cuando una lista no tiene nada que mostrar.
export function Vacio({ titulo, texto }: { titulo: string; texto?: string }) {
  return (
    <Tarjeta className="items-center gap-2 py-8">
      <Txt v="cuerpoMedio" className="text-center">
        {titulo}
      </Txt>
      {texto ? (
        <Txt v="secundario" className="text-center">
          {texto}
        </Txt>
      ) : null}
    </Tarjeta>
  );
}

// Confirmación en línea: funciona igual en Android y en web, sin diálogos nativos
// (Alert.alert con botones no funciona en web).
export function Confirmar({
  pregunta,
  si,
  onSi,
  onNo,
}: {
  pregunta: string;
  si: string;
  onSi: () => void;
  onNo: () => void;
}) {
  return (
    <Tarjeta className="gap-3 border-tinta/30">
      <Txt v="cuerpoMedio">{pregunta}</Txt>
      <View className="flex-row gap-2">
        <Boton titulo={si} chico onPress={onSi} className="flex-1" />
        <Boton titulo="Cancelar" variante="borde" chico onPress={onNo} className="flex-1" />
      </View>
    </Tarjeta>
  );
}
