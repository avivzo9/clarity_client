export interface Transaction {
    id: string;
    approved: boolean;
    transactionDate: Date;
    description: string;
    category: string;
    transactionAmount: number;
    billingAmount: number;
    createdAt: Date;
    notes: string;
    isCash: boolean;
    isExternal: boolean;
    userId: string;
}