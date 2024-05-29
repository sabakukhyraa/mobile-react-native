import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/src/components/useColorScheme';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/Firebase';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Layout />;
}

function Layout() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
      if (!user) {
        router.navigate('/login')
      } else {
        router.navigate('/home')
      }
    })
  }, [])
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false
        }}>
        {!user ? (
          <AuthorizedLayout />
        ) : (
          <UnauthorizedLayout />
        )}
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true, headerBackTitleVisible: true, headerBackTitle: 'Notes', title: 'Notes' }} />
      </Stack>
    </ThemeProvider>
  )

  function AuthorizedLayout() {
    return (
      <>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </>
    )
  }

  function UnauthorizedLayout() {
    return (
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    )
  }
}