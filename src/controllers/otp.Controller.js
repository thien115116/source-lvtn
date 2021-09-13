const otpModel = require("../models/otp.Models");
const otpService = require("../service/otpMessage.Service");
const unit = require("../unit/randomString");
const HOST = "BOOFOOD";

function sentOTP(req, res){
    let code = unit._getRandomArbitrary();
    console.log(`${code} is code verify phone number ${req.body.phoneNumber}.`);
    let message = `${code} is code verify phone number.`
    if(req.body.phoneNumber){
        otpService.sentOTP(HOST, req.body.phoneNumber, message);
        res.status(200).send({
            status: true,
            message: "Success"
        })
    }
}
module.exports ={
    sentOTP: sentOTP
}