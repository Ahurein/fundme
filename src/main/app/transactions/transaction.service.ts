import { ITransactionModel } from "../../interfaces/transaction.interface";
import TransactionModel from "./transaction.model";

const addTransactionService = async (data: any): Promise<ITransactionModel> => await TransactionModel.create(data) 


export {addTransactionService}