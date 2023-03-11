import mongoose, {Connection} from "mongoose";
import config from "config";
import {keys} from "./keys";

export default async () => {
  const DB_URL =
    process.env.NODE_ENV === "production"
      ? keys.DB_URL_PRODUCTION
      : keys.DB_URL_DEVELOPMENT;

  const db_uri = `${DB_URL}`.replace("<password>", keys.DB_PASSWORD!);

  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(db_uri);
    return conn;
  } catch (error) {
    if (error) {
      console.log("Can not connect to database");

      process.exit(1);
    }
  }
};
