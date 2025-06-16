import { authService } from "../service/auth.srv";
import { transactionsService } from "../service/transactions.srv";

export const services = {
    auth: authService,
    transactions: transactionsService
}

export default services;