import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import { firstTimePassword } from "./mail-model";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
const { GOOGLE_USERNAME, GOOGLE_PASSWORD } = process.env;

const auth = {
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: GOOGLE_USERNAME,
    pass: GOOGLE_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpTransport(auth));

/**
 * Takes user and password and sends an email it to Stundent/Teacher
 */
export async function sendMailWithPassword(user, password) {
  let mailBody = firstTimePassword;
  mailBody = mailBody.replace("%name%", user.name);
  mailBody = mailBody.replace("%password%", password);

  const mailOptions = {
    from: `"integrAR" <${GOOGLE_USERNAME}>`,
    to: user.email,
    subject: "Mensaje de confirmación de usuario",
    text: `Hola ${user.name} bienvenido a integrAR! 
          Por favor confirma tu cuenta copiando el siguiente código 
          como contraseña en la app: 
          ${password}
          (Si consideras que fue un error por favor ignora este email)`,
    html: mailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return [true];
  } catch (err) {
    console.log(err);
    return [false, err];
  }
}
