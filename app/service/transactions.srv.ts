import api from "../clients/api";
import { Transaction } from "../models/Transaction.mdl";

export class TransactionsService {

    async getAll(): Promise<Transaction[]> {
        try {
            const transactions = await api.get<Transaction[]>('/transaction');

            if (!transactions) return [];

            return transactions.data;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return Promise.reject(err.response.data);
            }

            return Promise.reject(err);
        }
    }
}