import "dotenv/config";
const keys = {
  DB_URL_PRODUCTION: process.env.DB_PRO_URL,
  DB_URL_DEVELOPMENT: process.env.DB_DEV_URL,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT_PRODUCTION: "8080",
  PORT_DEVELOPMENT: "5000",
  GMAIL_EMAIL: "ahureinebenezer@gmail.com",
  GMAIL_PASS: "nzbndbmgipvzoqtw",
  SMTP_HOST: "gmail",
  BASE_URL: process.env.BASE_URL,
  IDS_TOKEN_KEY: process.env.IDS_TOKEN_KEY,
  BASE_HOOK_URL: process.env.BASE_HOOK_URL
};

export {keys};
