import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./store/auth.store";
import { TransactionProvider } from "./store/transaction.store";
import { theme } from "./theme";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <PaperProvider theme={theme}>
          <Stack />
        </PaperProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}
