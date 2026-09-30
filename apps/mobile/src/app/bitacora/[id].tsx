// ─────────────────────────────────────────────────────────────────────────────
// Editor de entrada de bitácora · Zona: Rutas
//
// Qué hace: edita una entrada de la bitácora: título, cada ejercicio (marcar como hecho, series,
// reps, kilos), agregar o quitar ejercicios y una nota libre. Todo se guarda solo.
// Depende de: @/store/useStore, @/components/ui, @/components/EditorEjercicio y @/lib/formato.
// ─────────────────────────────────────────────────────────────────────────────
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { AgregarEjercicio, TarjetaEjercicio } from '@/components/EditorEjercicio';
import { Boton, Cabecera, CampoDiferido, Confirmar, Pantalla, Separador, Txt, Vacio } from '@/components/ui';
import { fmtFecha } from '@/lib/formato';
import { useStore } from '@/store/useStore';

export default function EditorEntrada() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entrada = useStore((s) => s.bitacora.find((e) => e.id === id));
  const s = useStore.getState();
  const [borrando, setBorrando] = useState(false);

  if (!entrada) {
    return (
      <Pantalla>
        <Cabecera titulo="Entrada no encontrada" atras />
        <Txt v="secundario">Puede que la hayas eliminado.</Txt>
      </Pantalla>
    );
  }

  const hechos = entrada.ejercicios.filter((e) => e.hecho).length;

  return (
    <Pantalla>
      <Cabecera
        titulo={entrada.titulo}
        subtitulo={`${fmtFecha(entrada.fecha)} · ${hechos} de ${entrada.ejercicios.length} hechos`}
        atras
      />

      <CampoDiferido etiqueta="Título" valor={entrada.titulo} onConfirmar={(t) => s.editarEntrada(entrada.id, { titulo: t.trim() || entrada.titulo })} />

      <Separador titulo="Ejercicios" />
      <View className="gap-3">
        {entrada.ejercicios.length === 0 ? <Vacio titulo="Sin ejercicios" texto="Agrega lo que hiciste abajo." /> : null}
        {entrada.ejercicios.map((e) => (
          <TarjetaEjercicio
            key={e.id}
            ejercicio={e}
            hecho={e.hecho}
            onHecho={() => s.editarEjercicioEntrada(entrada.id, e.id, { hecho: !e.hecho })}
            onCambio={(c) => s.editarEjercicioEntrada(entrada.id, e.id, c)}
            onQuitar={() => s.quitarEjercicioEntrada(entrada.id, e.id)}
          />
        ))}
        <AgregarEjercicio onAgregar={(n) => s.agregarEjercicioEntrada(entrada.id, n)} />
      </View>

      <Separador titulo="Nota" />
      <CampoDiferido
        valor={entrada.nota}
        onConfirmar={(t) => s.editarEntrada(entrada.id, { nota: t })}
        placeholder="Cómo te sentiste, qué cambiar la próxima vez..."
        multiline
        textAlignVertical="top"
        style={{ minHeight: 96 }}
      />

      <View className="mt-8 gap-3">
        {borrando ? (
          <Confirmar
            pregunta="¿Eliminar esta entrada de la bitácora?"
            si="Eliminar"
            onSi={() => {
              s.eliminarEntrada(entrada.id);
              router.back();
            }}
            onNo={() => setBorrando(false)}
          />
        ) : (
          <Boton titulo="Eliminar entrada" variante="borde" onPress={() => setBorrando(true)} />
        )}
      </View>
    </Pantalla>
  );
}
