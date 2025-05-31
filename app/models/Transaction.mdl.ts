export interface Transaction {
    id: string;
    approved: boolean;
    transactionDate: Date;
    description: string;
    category: string;
    billingAmount: number;
    createdAt: Date;
    isCash: boolean;
    isExternal: boolean;
    userId: string;
    transactionAmount?: number;
    notes?: string;
}