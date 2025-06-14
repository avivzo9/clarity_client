import TransactionsMonth from "@/app/cmps/transactions/TransactionsMonth";
import { useAuth } from "@/app/store/auth.store";
import { useTransaction } from "@/app/store/transaction.store";
import theme from "@/app/theme";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function TransactionsLayout() {
    const { user } = useAuth();
    const { transactions } = useTransaction();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTxt}>Hello {user?.username}!</Text>
            </View>

            <TransactionsMonth transactions={transactions} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: theme.colors.lightBgc,
    },
    headerContainer: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTxt: {
        fontSize: 25,
        height: 22
    }
});