import mongoose, {Connection} from "mongoose";
import config from "config";

export default async () => {
  const db_uri = `${config.get<string>("server.db_uri")}`.replace(
    "<password>",
    config.get<string>("server.db_pass")
  );
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
