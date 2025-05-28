import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./screens/Home/Home.screen";
import { TransactionProvider } from "./store/transaction.store";

export default function Index() {
  return (
    <NativeRouter>
      <TransactionProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </TransactionProvider>
    </NativeRouter>
  );
}