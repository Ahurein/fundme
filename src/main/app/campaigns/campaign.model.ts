import mongoose, {model, Schema, Types} from "mongoose";
import {sendCampaignVerifyEmail} from "../../helpers/sendEmail";
import {ICampaign, ICampaignModel} from "../../interfaces/campaign.interface";
import {logger} from "../../logger";

const campaignSchema = new Schema<ICampaign>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    targetAmount: {
      type: Number,
      required: [true, "Target amount is required"],
      min: [100, "Target amount can not be less than $100"],
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["Verified", "Pending", "Declined"],
      default: "Pending",
    },
    targetReached: {
      type: Boolean,
      default: false,
    },
    goal: {
      type: String,
      required: [true, "Campaign goal is required"],
    },
    approvals: [
      {
        _id: false,
        email: String,
        verified: {type: mongoose.Schema.Types.Boolean, default: false},
      },
    ],
    approved: {
      type: Boolean,
      default: false,
    },
    additionalInfo: {
      type: String,
      required: [true, "Enter additional information for the campaign"],
    },
    pictures: {
      type: [String],
    },
    videos: {
      type: [String],
    },
  },
  {timestamps: true}
);

//TODO: move this function to avoid rerenders
campaignSchema.pre("save", function (next) {
  this.approvals.forEach(async ({email}) => {
    if (await sendCampaignVerifyEmail(this.id, email)) {
      logger.info("Verification email sent successfully");
    } else {
      logger.warn("Verification email not sent");
    }
  });

  next();
});
const CampaignModel = model<ICampaignModel>("campaign", campaignSchema);

export default CampaignModel;
