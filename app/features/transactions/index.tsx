import TransactionCard from "@/app/cmps/transactions/TransactionCard";
import { useTransaction } from "@/app/store/transaction.store";
import { Text, View } from "react-native";

export default function TransactionsLayout() {
    const { transactions } = useTransaction();

    return (
        <View>
            <Text>Transactions Page</Text>

            <TransactionCard>
                <Text>Transactions</Text>
            </TransactionCard>
        </View>
    );
}