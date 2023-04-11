import {model, Schema, Types} from "mongoose";
import {ITransaction, ITransactionModel} from "../../interfaces/transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    campaignId: {
      type: Types.ObjectId,
      ref: "campaign",
      required: [true, "Campaign id is required"],
    },
    transactionStatus: {
      type: String,
      enum: ["Pending", "Successful", "Declined"],
      default: "Pending",
    },
    amount: {
      type: Schema.Types.Number,
    }
  },
  {timestamps: true}
);

const TransactionModel = model<ITransactionModel>("transaction", transactionSchema);

export default TransactionModel;
