// ─────────────────────────────────────────────────────────────────────────────
// Pestañas · Zona: Rutas
//
// Qué hace: define las dos pestañas de abajo (Listas y Bitácora) y dibuja la barra a mano, con
// texto y sin iconos: la activa va con fondo menta.
// Tócalo cuando: agregues, quites o reordenes una pestaña, o cambies cómo se ve la barra.
// Depende de: @gymtrack/tokens (colors).
// ─────────────────────────────────────────────────────────────────────────────
import { colors } from '@gymtrack/tokens';
import { Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Lo que la barra necesita de React Navigation, tipado a mano para no depender de un paquete
// que expo-router instala por su cuenta.
interface PropsBarra {
  state: { index: number; routes: { key: string; name: string }[] };
  descriptors: Record<string, { options: { title?: string } } | undefined>;
  navigation: {
    emit: (e: { type: 'tabPress'; target: string; canPreventDefault: true }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}

function BarraPestanas({ state, descriptors, navigation }: PropsBarra) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-row gap-2 border-t border-tinta/10 bg-fondo px-3 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 10) }}
    >
      {state.routes.map((route, index) => {
        const activo = state.index === index;
        const titulo = descriptors[route.key]?.options.title ?? route.name;
        const onPress = () => {
          const evento = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!activo && !evento.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: activo }}
            accessibilityLabel={titulo}
            onPress={onPress}
            className={`flex-1 items-center rounded-tab py-3 ${activo ? 'bg-primario' : ''}`}
          >
            <Text className={`font-sans-bold text-sm ${activo ? 'text-fondo' : 'text-tinta/60'}`}>{titulo}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** El orden de los Tabs.Screen es el orden en la barra. `index` es Listas. */
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BarraPestanas {...(props as unknown as PropsBarra)} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.fondo } }}
    >
      <Tabs.Screen name="index" options={{ title: 'Listas' }} />
      <Tabs.Screen name="bitacora" options={{ title: 'Bitácora' }} />
    </Tabs>
  );
}
