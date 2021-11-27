"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();
const { Config } = require("../config");
const { decrypt } = require("./encrypt");
const auth = {
  user: decrypt(Config.SECRET, Config.EMAIL), // generated ethereal user
  pass: decrypt(Config.SECRET, Config.PASS_DATA), // generated ethereal password
};


// async..await is not allowed in global scope, must use a wrapper
async function sendMaill(to, subject, message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth,
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Show Booking", // sender address
    to: to, // list of receivers
    subject, // Subject line
    text: message, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
  return info;
}

module.exports = {
  sendMaill,
};
