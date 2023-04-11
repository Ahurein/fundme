import mongoose, { ObjectId } from "mongoose";

export interface IUser {
  userId: ObjectId;
  firstName: String;
  lastName: String;
}

export type IUserModel = IUser & mongoose.Document