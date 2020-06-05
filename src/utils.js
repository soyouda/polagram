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
    subject: "🔒Polagram에서 보낸 인증 메일 입니다.🔒",
    html: `안녕하세요 ! 인증 문자를 안내해드립니다 : <strong>${secret}</strong>.<br/> 어플/웹사이트에 복사 붙여넣기 하세요.`
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
