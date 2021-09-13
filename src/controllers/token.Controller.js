/// Xaay dung ham tao token
const jwt = require("jsonwebtoken");
const config = require("../../configs/secretkey");
const tokenModel = require("../models/token.Model");
const tokenAdminModel = require("../models/tokenAdmin.Model");
const unit = require("../unit/randomString");


function _createTokenClient(user, result) {
    jwt.sign({
        id_user: user.id_user,
        role: user.role,
        is_active: user.is_active,
        is_GoogleAccount: user.is_GoogleAccount,
        is_FacebookAccount: user.is_FacebookAccount
    }, config.secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 3 }, function(err, tokenCode) {
        if (!err) {
            var created_date = new Date();

            const token = new tokenModel({
                id_token: unit._randomTokenId(),
                id_user: user.id_user,
                state: true,
                reg_date: created_date,
                token: tokenCode
            });

            tokenModel.create(token, (err, data) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, {...token });
            })

        }
    })
}
// admin
function _createTokenAdmin(admin, result) {
    jwt.sign({
        id_admin: admin.id_admin,
        role: admin.role,
        is_enable: admin.is_enable,
        create_date: admin.create_date,
        email: admin.email,
    }, config.secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 3 }, function(err, tokenCode) {
        if (!err) {
            var created_date = new Date();

            const token = new tokenAdminModel({
                id_token: unit._randomTokenId(),
                id_admin: admin.id_admin,
                state: true,
                reg_date: created_date,
                token: tokenCode
            });

            tokenAdminModel.create(token, (err, data) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, {...token });
            })

        }
    })
}

function createTokenShipper(shipper, result){
    jwt.sign({
        shipper_id: shipper.shipper_id,
        phone: shipper.phone
    }, config.secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 3 }, function(errToken, tokenCode) {
        if(!errToken){
            var created_date = new Date();
            let token = {
                id_token: unit._randomTokenId(),
                shipper_id: shipper.shipper_id,
                state: true,
                reg_date: created_date,
                token: tokenCode
            }
            tokenModel.createShipper(token, (err, data) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }else{
                    result(null, {...token });
                }
                
            })
        }else{
            console.log(errToken);
            result(errToken, null);
        }
    })
}
module.exports = {
    _createTokenClient: _createTokenClient,
    _createTokenAdmin: _createTokenAdmin,
    _createTokenShipper:createTokenShipper
}