// ─────────────────────────────────────────────────────────────────────────────
// Pestaña Listas · Zona: Rutas
//
// Qué hace: muestra las listas de ejercicios guardadas y deja crear una nueva. Al tocar una se
// abre su editor (lista/[id]).
// Depende de: @/store/useStore y @/components/ui.
// ─────────────────────────────────────────────────────────────────────────────
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Boton, Cabecera, Campo, Etiqueta, Fila, Pantalla, Separador, Tarjeta, Txt, Vacio } from '@/components/ui';
import { useStore } from '@/store/useStore';

export default function Listas() {
  const listas = useStore((s) => s.listas);
  const crearLista = useStore((s) => s.crearLista);
  const [nombre, setNombre] = useState('');

  const crear = () => {
    const l = crearLista(nombre);
    setNombre('');
    router.push(`/lista/${l.id}`);
  };

  return (
    <Pantalla>
      <Cabecera titulo="Listas de ejercicios" subtitulo="Arma y edita tus listas" />

      <Tarjeta className="gap-3">
        <Campo placeholder="Nombre de la lista (ej: Empuje)" value={nombre} onChangeText={setNombre} onSubmitEditing={crear} />
        <Boton titulo="Crear lista" onPress={crear} />
      </Tarjeta>

      <Separador titulo="Mis listas" />
      {listas.length === 0 ? (
        <Vacio titulo="Todavía no tienes listas" texto="Crea una arriba para empezar." />
      ) : (
        <Tarjeta className="py-1">
          {listas.map((l, i) => (
            <Fila
              key={l.id}
              ultimo={i === listas.length - 1}
              onPress={() => router.push(`/lista/${l.id}`)}
              izquierda={
                <View className="gap-1">
                  <Txt v="cuerpoMedio">{l.nombre}</Txt>
                  <Txt v="secundario" numberOfLines={1}>
                    {l.ejercicios.map((e) => e.nombre).join(', ') || 'Sin ejercicios'}
                  </Txt>
                </View>
              }
              derecha={
                <View className="flex-row items-center gap-2">
                  <Etiqueta texto={`${l.ejercicios.length}`} />
                  <Text className="font-sans-bold text-lg text-tinta/40">›</Text>
                </View>
              }
            />
          ))}
        </Tarjeta>
      )}
    </Pantalla>
  );
}
