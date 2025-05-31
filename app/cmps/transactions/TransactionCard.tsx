import { StyleSheet, View } from "react-native";

interface TransactionCardProps {
    children: React.ReactNode;
}

export default function TransactionCard({ children }: TransactionCardProps) {

    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    }
});