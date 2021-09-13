const nodeMailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const config = require("../../configs/configEmail");
const mailtrap = require("../../configs/configEmail")

const sendMail = (mailTo, subject, html) => {
  smtpTransport = nodeMailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    secure: false,
    auth: config.auth,
  });

  const options = {
    from: `Boo Food <${config.auth.user}>`,
    to: mailTo,
    subject: subject,
    html: html,
  };

  return smtpTransport.sendMail(options);
};

module.exports = {
  sendMail: sendMail,
};
