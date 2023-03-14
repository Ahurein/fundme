import mongoose from "mongoose";

export interface ITransaction {
  userId: mongoose.Schema.Types.ObjectId;
  campaignId: mongoose.Schema.Types.ObjectId;
  transactionStatus: string;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
}
