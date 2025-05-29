import { AuthService } from "../service/auth.srv";
import { TransactionsService } from "../service/transactions.srv";

export const services = {
    auth: new AuthService(),
    transactions: new TransactionsService()
}

export default services;