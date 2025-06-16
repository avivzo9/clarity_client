import TransactionsMonth from "@/app/cmps/transactions/TransactionsMonth";
import { useAuth } from "@/lib/src/store/auth.store";
import { useTransaction } from "@/lib/src/store/transaction.store";
import theme from "@/lib/src/theme";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const TransactionsLayout = () => {
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

export default TransactionsLayout;