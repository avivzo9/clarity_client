// import { useAuth } from '@/lib/src/store/auth.store';
import { useFonts } from 'expo-font';
// import { router } from 'expo-router';
import { Text, View } from "react-native";
import AuthLayout from './features/auth';

const Index = () => {
  const [loaded] = useFonts({
    'Zain-Regular': require('../lib/assets/fonts/Zain-Regular.ttf'),
  });

  if (!loaded) return <View><Text>Loading fonts</Text></View>;
  return (
    <AuthLayout />
  );
}

export default Index;