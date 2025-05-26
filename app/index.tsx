import { Text, View } from "react-native";
import { useTransactions } from "./store/transaction.store";

export default function Index() {
  const { transactions } = useTransactions();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello.</Text>
    </View>
  );
}