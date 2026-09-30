// ─────────────────────────────────────────────────────────────────────────────
// Layout raíz · Zona: Rutas
//
// Qué hace: es lo primero que monta Expo Router. Carga la fuente, espera a que el store termine
// de leer lo guardado en el teléfono y recién ahí esconde el splash y arma la navegación: las
// dos pestañas (Listas y Bitácora) y, encima, el editor de una lista o de una entrada.
// Tócalo cuando: cambies la fuente o cómo se abre una pantalla de la pila.
// No lo toques para: cambiar las pestañas (eso va en (tabs)/_layout.tsx).
// Depende de: @/store/useStore (la bandera hidratado), @gymtrack/tokens (colors) y global.css.
// ─────────────────────────────────────────────────────────────────────────────

// El css va primero: NativeWind lo registra antes de que se pinte cualquier componente.
import '../../global.css';

import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, useFonts } from '@expo-google-fonts/manrope';
import { colors } from '@gymtrack/tokens';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';

// El splash nativo sigue en pantalla hasta que la app esté lista. En web no hay splash.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  // Una sola fuente, Manrope, en los tres pesos de packages/tokens.
  const [fuentesListas, errorFuentes] = useFonts({ Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold });
  // Hasta que el store no lea AsyncStorage, las pantallas verían listas vacías.
  const hidratado = useStore((s) => s.hidratado);
  // Si la fuente falla, se abre igual con la del sistema.
  const listo = (fuentesListas || !!errorFuentes) && hidratado;

  useEffect(() => {
    if (listo) SplashScreen.hideAsync().catch(() => {});
  }, [listo]);

  if (!listo) return <View className="flex-1 bg-fondo" />;

  // headerShown false: cada pantalla dibuja su propia Cabecera del kit de interfaz.
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.fondo } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lista/[id]" />
        <Stack.Screen name="bitacora/[id]" />
      </Stack>
    </SafeAreaProvider>
  );
}
