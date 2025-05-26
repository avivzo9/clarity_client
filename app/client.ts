import { TransactionsService } from "./service/transactions.srv";

export const client = {
    transactions: new TransactionsService()
}