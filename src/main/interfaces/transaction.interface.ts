import mongoose from "mongoose";
import { ICampaign, ICampaignModel } from "./campaign.interface";
import { IUser } from "./user.interface";

export interface ITransaction {
  userId: mongoose.Schema.Types.ObjectId;
  campaignId: mongoose.Schema.Types.ObjectId;
  transactionStatus: string;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ITransactionModel = ITransaction & mongoose.Document