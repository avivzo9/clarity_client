import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from "react-native";
import AuthLayout from "./features/auth";
import { useAuth } from './store/auth.store';

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [loaded] = useFonts({
    'Zain-Regular': require('./assets/fonts/Zain-Regular.ttf'),
    // add other weights if you have them…
  });

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: process.env.IOS_CLIENT_ID,
      webClientId: process.env.WEB_CLIENT_ID,
      profileImageSize: 150
    })
  }, []);

  if (!loaded) return <View><Text>Loading fonts</Text></View>;
  if (!isAuthenticated) return <AuthLayout />;

  router.push('/features/transactions');
}