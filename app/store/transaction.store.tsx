import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import services from '../clients/client';
import { Transaction } from '../models/Transaction.mdl';

// Context value type
type TransactionContextType = {
    transactions: Transaction[];
    addTransaction: (tx: Transaction) => void;
    removeTransaction: (id: string) => void;
    clearTransactions: () => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        queryTransactions()
    }, [])

    const queryTransactions = async () => {
        try {
            const fetchedTransactions = await services.transactions.getAll();
            setTransactions(fetchedTransactions);
        } catch (err) {
            console.error('Failed to query transactions:', err);
        }
    };

    const addTransaction = (tx: Transaction) => {
        setTransactions((prev) => [...prev, tx]);
    };

    const removeTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    };

    const clearTransactions = () => {
        setTransactions([]);
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction, clearTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionContext);

    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }

    return context;
};
