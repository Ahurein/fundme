import mongoose, {Types} from "mongoose";

export interface IBalance {
  userId: mongoose.Schema.Types.ObjectId;
    amountDeposited: number,
    amountReceived: number,
    amountDonated: number,
}
