import { useFonts } from 'expo-font';
import { Text, View } from "react-native";
import AuthLayout from "./features/auth";

export default function Index() {
  const [loaded] = useFonts({
    'Zain-Regular': require('../lib/assets/fonts/Zain-Regular.ttf'),
    // add other weights if you have them…
  });

  if (!loaded) return <View><Text>Loading fonts</Text></View>;
  return (
    <AuthLayout />
  );
}