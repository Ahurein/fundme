import mongoose, {Types} from "mongoose";

export interface ICampaign {
  userId: mongoose.Schema.Types.ObjectId;
  targetAmount: number;
  currentAmount: number;
  approvals: [];
  status: string;
  targetReached: boolean;
  goal: string;
  additionalInfo: string;
  currency: string;
  pictures?: string;
  videos?: string;
  approved?: boolean,
  createdAt?: string,
  updatedAt?: string
}


export type ICampaignModel  = ICampaign & mongoose.Document;