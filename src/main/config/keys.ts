import "dotenv/config";
const keys = {
  DB_URL_PRODUCTION: process.env.DB_PRO_URL,
  DB_URL_DEVELOPMENT: process.env.DB_DEV_URL,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT_PRODUCTION: "8080",
  PORT_DEVELOPMENT: "5000",
  GMAIL_EMAIL: process.env.GMAIL_EMAIL,
  GMAIL_PASS: process.env.GMAIL_PASS,
  SMTP_HOST: process.env.SMTP_HOST,
  BASE_URL: process.env.BASE_URL,
  IDS_TOKEN_KEY: process.env.IDS_TOKEN_KEY,
  BASE_HOOK_URL: process.env.BASE_HOOK_URL,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY

};

export {keys};
