import { AuthProvider } from "@/lib/src/store/auth.store";
import { TransactionProvider } from "@/lib/src/store/transaction.store";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import theme from "../lib/src/theme";

const MaterialDesignIcons = Platform.OS === 'web' ? require('@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf') : null;

export default function RootLayout() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <PaperProvider theme={theme}>
          <React.Fragment>
            {Platform.OS === 'web' && <style type="text/css">{`
              @font-face {
                font-family: 'MaterialDesignIcons';
                src: url(${MaterialDesignIcons}) format('truetype');
              }
            `}</style>}
            <Stack />
          </React.Fragment>
        </PaperProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}