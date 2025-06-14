import { Stack } from "expo-router";
import { Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./store/auth.store";
import { TransactionProvider } from "./store/transaction.store";
import theme from "./theme";

const MaterialDesignIcons = Platform.OS === 'web' ? require('@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf') : null;

export default function RootLayout() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <PaperProvider theme={theme}>
          <>
            {Platform.OS === 'web' ? (
              <style type="text/css">{`
                @font-face {
                  font-family: 'MaterialDesignIcons';
                  src: url(${MaterialDesignIcons}) format('truetype');
                }
              `}</style>
            ) : null}
            <Stack />
          </>
        </PaperProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}
