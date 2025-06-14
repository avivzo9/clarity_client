// import { useAuth } from '@/lib/src/store/auth.store';
import { useFonts } from 'expo-font';
// import { router } from 'expo-router';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from "react-native";

export default function Index() {
  const [loaded] = useFonts({
    'Zain-Regular': require('../lib/assets/fonts/Zain-Regular.ttf'),
    // add other weights if you have them…
  });

  useEffect(() => {
    if (loaded) {
      // Use a microtask to ensure navigation happens after render
      Promise.resolve().then(() => {
        router.push('/features/auth');
      });
    }
  }, [loaded]);

  if (!loaded) return <View><Text>Loading fonts</Text></View>;
  return null;
}