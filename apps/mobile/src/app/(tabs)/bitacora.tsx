// ─────────────────────────────────────────────────────────────────────────────
// Pestaña Bitácora · Zona: Rutas
//
// Qué hace: muestra las entradas de la bitácora de la más nueva a la más vieja. Deja crear una
// entrada vacía o a partir de una lista (copia sus ejercicios). Al tocar una se abre su editor
// (bitacora/[id]).
// Depende de: @/store/useStore, @/components/ui y @/lib/formato (fmtFecha).
// ─────────────────────────────────────────────────────────────────────────────
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Boton, Cabecera, Etiqueta, Fila, Pantalla, Separador, Tarjeta, Txt, Vacio } from '@/components/ui';
import { fmtFecha } from '@/lib/formato';
import { useStore } from '@/store/useStore';

export default function Bitacora() {
  const bitacora = useStore((s) => s.bitacora);
  const listas = useStore((s) => s.listas);
  const crearEntrada = useStore((s) => s.crearEntrada);

  const nueva = (listaId?: string) => {
    const e = crearEntrada(listaId);
    router.push(`/bitacora/${e.id}`);
  };

  return (
    <Pantalla>
      <Cabecera titulo="Bitácora" subtitulo="Registra y edita lo que entrenaste" />

      <Tarjeta className="gap-3">
        <Txt v="etiqueta">Nueva entrada</Txt>
        {listas.length > 0 ? (
          <View className="flex-row flex-wrap gap-2">
            {listas.map((l) => (
              <Boton key={l.id} titulo={l.nombre} variante="secundario" chico onPress={() => nueva(l.id)} />
            ))}
          </View>
        ) : null}
        <Boton titulo="Entrada vacía" variante="borde" chico onPress={() => nueva()} />
      </Tarjeta>

      <Separador titulo="Entradas" />
      {bitacora.length === 0 ? (
        <Vacio titulo="Todavía no hay entradas" texto="Elige una lista arriba para registrar tu entrenamiento." />
      ) : (
        <Tarjeta className="py-1">
          {bitacora.map((e, i) => {
            const hechos = e.ejercicios.filter((x) => x.hecho).length;
            const completa = e.ejercicios.length > 0 && hechos === e.ejercicios.length;
            return (
              <Fila
                key={e.id}
                ultimo={i === bitacora.length - 1}
                onPress={() => router.push(`/bitacora/${e.id}`)}
                izquierda={
                  <View className="gap-1">
                    <Txt v="cuerpoMedio">{e.titulo}</Txt>
                    <Txt v="secundario">{fmtFecha(e.fecha)}</Txt>
                  </View>
                }
                derecha={
                  <View className="flex-row items-center gap-2">
                    <Etiqueta texto={`${hechos}/${e.ejercicios.length}`} activa={completa} />
                    <Text className="font-sans-bold text-lg text-tinta/40">›</Text>
                  </View>
                }
              />
            );
          })}
        </Tarjeta>
      )}
    </Pantalla>
  );
}
