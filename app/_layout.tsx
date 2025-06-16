import { AuthProvider } from "@/lib/src/store/auth.store";
import { TransactionProvider } from "@/lib/src/store/transaction.store";
import theme from "@/lib/src/theme";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

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