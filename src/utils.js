import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const transport = nodemailer.createTransport(
  sgTransport({
    apiKey: process.env.SENDGRID_API_KEY
  })
);

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "soyouda@gmail.com",
    to: adress,
    subject: "🔒Login Secret for Polagram🔒",
    html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`
  };
  return transport.sendMail(email);
};

/**
const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};
*/
