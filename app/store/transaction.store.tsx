import { createContext, ReactNode, useContext, useState } from 'react';

// Define the transaction type
export interface Transaction {
    id: string;
    amount: number;
    date: string;
    description: string;
    // Add more fields as needed
}

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
