import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid";
import jwt from "jsonwebtoken";

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
    html: `안녕하세요 ! 인증 문자를 안내해드립니다 : <strong>${secret}</strong><br/> 어플/웹사이트에 복사 붙여넣기 하세요.`
  };
  return transport.sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
