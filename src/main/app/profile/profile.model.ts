import {model, Schema, Types} from "mongoose";
import { IProfile } from "../../interfaces/profile.interface";

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
      unique: true
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    picture: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {timestamps: true}
);


const ProfileModel = model("profile", profileSchema);

export default ProfileModel;