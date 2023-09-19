require("dotenv").config();
const nodemailer = require("nodemailer");

const EMAIL_PASSWORD = process.env.POSTCZ_PASSWORD;

const emailConfigOptions = {
  host: "smtp.seznam.cz",
  port: 465,
  secure: true,
  auth: {
    user: "pracevcz@post.cz",
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(emailConfigOptions);

const sendEmaile = async (data) => {
  const email = {
    ...data,
    from: "pracevcz@post.cz",
  };

  transport.sendMail(email);
  console.log("Email send success");
  return true;
};
module.exports = sendEmaile;
