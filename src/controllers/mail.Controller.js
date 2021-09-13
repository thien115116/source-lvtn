const mailer = require("../service/mail.Service");
const fs = require("fs");
var handlebars = require("handlebars");

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

function sendMailActive(data, result) {
  let author = data.author;
  let phone = data.phoneNumber;
  try {
    readHTMLFile(
      __dirname + "\\..\\..\\views\\activeMerchant.html",
      async function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          fullName: author,
          phoneNumber: phone,
        };
        //console.log(replacements);
        var htmlToSend = await template(replacements);
        mailer.sendMail(
          data.mailTo,
          "[BOO FOOD] Successful Registration",
          htmlToSend
        );
        console.log(htmlToSend.green);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function sendMailDenied(data, result) {
  let author = data.author;
  try {
    readHTMLFile(
      __dirname + "\\..\\..\\views\\deniedMerchant.html",
      async function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          fullName: author,
          phoneNumber: phone,
        };
        //console.log(replacements);
        var htmlToSend = await template(replacements);
        mailer.sendMail(
          data.mailTo,
          "[BOO FOOD] Successful Registration",
          htmlToSend
        );
        console.log(htmlToSend.green);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function mailCreateStaff(data, token) {
  let mail = data.email;

  let pass = process.env.AC_PASSWORDSTAFF;
  console.log(data.is_confirmEmail);
  let url = `http://localhost:3100/verify-email?token=${token}`;
  try {
    readHTMLFile(
      __dirname + "\\..\\..\\views\\mailCreateStaff.html",
      async function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          email: mail,
          pass: pass,
          url: url,
        };
        var htmlToSend = await template(replacements);
        mailer.sendMail(
          mail,
          "[BOO FOOD STAFF] Successful Registration",
          htmlToSend
        );
        console.log(htmlToSend.green);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function mailDeniedRequest(data) {
  let mail = data;
  try {
    readHTMLFile(
      __dirname + "\\..\\..\\views\\deniedRequest.html",
      async function (err, html) {
        var template = handlebars.compile(html);
        var htmlToSend = await template();
        mailer.sendMail(
          mail,
          "[BOO] Your Request Has Been Cancel !",
          htmlToSend
        );
        console.log(htmlToSend.green);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function mailUserGet6Number(data) {
  let email = data.email;
  let number = data.number;
  console.log(data);
  try {
    readHTMLFile(
      __dirname + "\\..\\..\\views\\mailUserGetNumber.html",
      async function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          email: email,
          number: number,
        };
        var htmlToSend = await template(replacements);
        mailer.sendMail(
          email,
          "[BOO ] " + number + " là mã xác thực của bạn !",
          htmlToSend
        );
        console.log(htmlToSend.green);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function mailConfirmAccountUser(data) {
  let user = data.first_name + " " + data.last_name;
  let url = "http://localhost:3100/verify-email?token=" + data.is_confirmEmail;

  try {
    readHTMLFile(
      __dirname + "\\..\\..\\views\\confirm_account.html",
      async function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          user: user,
          url: url,
        };
        var htmlToSend = await template(replacements);
        mailer.sendMail(
          data.email,
          "[BOO FOOD] Please verify your email address.",
          htmlToSend
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  sendMailActive: sendMailActive,
  sendMailDenied: sendMailDenied,
  mailCreateStaff: mailCreateStaff,
  mailUserGet6Number: mailUserGet6Number,
  mailDeniedRequest: mailDeniedRequest,
  mailConfirmAccountUser: mailConfirmAccountUser,
};
