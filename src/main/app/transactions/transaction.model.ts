import {model, Schema, Types} from "mongoose";
import {ITransaction} from "../../interfaces/transaction.interface";

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
  },
  {timestamps: true}
);

const TransactionModel = model("transaction", transactionSchema);

export default TransactionModel;
