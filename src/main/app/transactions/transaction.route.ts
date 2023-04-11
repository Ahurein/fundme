import { IRouter } from "express";
import { addTransaction } from "./transaction.controller";

export const transactionRoute = (router: IRouter) => {
    router.route('/transaction/hook/donate/:id').get(addTransaction)
}

