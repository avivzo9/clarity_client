import { Transaction } from "../models/Transaction.mdl";

export class TransactionsService {
    private transactions: Transaction[] = [];

    getAll(): Promise<Transaction[]> {
        return new Promise((resolve) => {
            resolve(this.transactions);
        });
    }
}