import mongoose from "mongoose";

export interface IProfile {
  userId: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}


export type IProfileModel = IProfile & mongoose.Document