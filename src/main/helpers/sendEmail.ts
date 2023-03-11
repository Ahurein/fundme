import nodemailer from "nodemailer";
import {keys} from "../config/keys";
import {logger} from "../logger";
import fs from "fs";
import path, {toNamespacedPath} from "path";
import handlebars from "handlebars";
import { encodeToken } from "./auth.helpers";

interface IEmailProps {
  email: string;
  type: string;
}

interface IEmailOptions {
  from: string;
  to: string;
  subject: string;
  html: any;
}

const transporter = nodemailer.createTransport({
  service: keys.SMTP_HOST,
  auth: {
    user: keys.GMAIL_EMAIL,
    pass: keys.GMAIL_PASS,
  },
});

const sendEmail = async (options: IEmailOptions) => {
  try {
    const emailStatus = await transporter.sendMail(options);
  } catch (error) {
    logger.warn(error);
  }
};

const loadTemplate = async (name: string, data: any) => {
  if (!name) return false;
  const sourceFile = fs.readFileSync(
    `${path.resolve(__dirname)}/../templates/${name}.handlebars`
  );
  const template = handlebars.compile(String(sourceFile));
  return template(data);
};

const sendCampaignVerifyEmail = async (id: string, email: string) => {
  try {
    const actionUrl = `${keys.BASE_URL}/campaign/verify/${encodeToken({id, email}, keys.IDS_TOKEN_KEY!)}`
    const template = await loadTemplate("verifyCampaign", {actionUrl});

    const emailOptions = {
      from: keys.GMAIL_EMAIL,
      to: email,
      subject: "Campaign Verification",
      html: template,
    };
    await sendEmail(emailOptions);
    return true;
  } catch (error) {
    logger.warn(error);
    return false;
  }
};

export {sendCampaignVerifyEmail};
