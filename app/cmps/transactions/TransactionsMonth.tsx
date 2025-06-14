// import { Text } from "@/app/cmps/ui/CustomText";
import TransactionCard from "@/app/cmps/ui/transactions/TransactionCard";
import { Constansts } from "@/app/Constants";
import { Transaction } from "@/app/models/Transaction.mdl";
import theme from "@/app/theme";
import moment from "moment";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import PieChart from "../charts/Pie";

interface TransactionsMonthProps {
    transactions: Transaction[];
}

export default function TransactionsMonth({ transactions }: TransactionsMonthProps) {
    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        d.setDate(10);
        return d;
    });

    const filteredTransactions = useMemo(() => {
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        // Filter transactions that fall within the date range
        return transactions.filter(tx => {
            const date = moment(tx.transactionDate);
            return date.isBetween(moment(startDate), moment(endDate), 'day', '[]');
        });
    }, [startDate, transactions]);

    const totalSpending = useMemo(() => {
        if (!filteredTransactions?.length) return 0;

        return filteredTransactions.reduce((acc, tx) => acc + (tx.billingAmount || 0), 0);
    }, [filteredTransactions]);

    const pieValues = useMemo(() => {
        const map = new Map<string, Transaction>();

        filteredTransactions.forEach(tx => {
            if (!tx.category) return;

            const existing = map.get(tx.category);
            if (existing) {
                existing.billingAmount += tx.billingAmount || 0;
            } else {
                map.set(tx.category, { ...tx });
            }
        });

        if (!map.size) return [];

        const values: number[] = [];
        map.forEach(tx => {
            values.push(tx.billingAmount || 0);
        });

        return values;
    }, [filteredTransactions])

    const prevRange = () => {
        setStartDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    }

    const nextRange = () => {
        setStartDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    }

    const goToToday = () => {
        setStartDate(() => {
            const d = new Date();
            d.setMonth(d.getMonth() - 1);
            d.setDate(10);
            return d;
        });
    }

    const getDates = (): string => {
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        return `${moment(startDate).format('MMM YY')} – ${moment(endDate).format('MMM YY')}`
    }

    return (
        <TransactionCard>
            <View style={styles.container}>
                <View>
                    <Text style={styles.headerDate}>{getDates()}</Text>
                    <Text style={styles.smallHeader}>Total Spending</Text>
                    <Text style={styles.total}>{Constansts.ILS + totalSpending.toLocaleString()}</Text>
                </View>

                <View>
                    <IconButton icon={"calendar-today"} onPress={goToToday} />
                </View>
            </View>

            <PieChart values={pieValues} />

            <View style={styles.actions}>
                <IconButton icon="chevron-left" onPress={prevRange} />

                <IconButton icon="chevron-right" onPress={nextRange} />
            </View>
        </TransactionCard>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerDate: {
        fontSize: 20,
        height: 30,
        letterSpacing: -0.5,
        fontWeight: 'bold',
    },
    smallHeader: {
        fontSize: 18,
        marginBottom: theme.margin.xxs,
        letterSpacing: -0.2,
        color: theme.colors.light
    },
    total: {
        fontSize: 24,
        letterSpacing: 0,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});