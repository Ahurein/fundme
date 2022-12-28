import express from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import db from "../config/db";

const app = express();

const PORT = config.get("server.port") || 3001;

app.get("/", (req, res, next) => {
  res.send("Integration successful");
});

app.listen(PORT, async () => {
  await db();
  console.log(`Server running on port ${PORT}`);
});
