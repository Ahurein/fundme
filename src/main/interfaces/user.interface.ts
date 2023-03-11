import { ObjectId } from "mongoose";

export interface IUser {
  userId: ObjectId;
  firstName: String;
  lastName: String;
}