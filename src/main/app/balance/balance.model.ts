import {model, Schema, Types} from "mongoose";
import { IBalance } from "../../interfaces/balance.interface";

const balanceSchema = new Schema<IBalance>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    amountDeposited: {
      type: Number,
    },
    amountReceived: {
      type: Number,
    },
    amountDonated: {
      type: Number,
    },
  },
  {timestamps: true}
);

const BalanceModel = model("balance", balanceSchema);

export default BalanceModel;
