const adminModel = require("../models/admin.Model");
const userModel = require("../models/user.Model");
const merchantModel = require("../models/merchant.Model");
const logMerchantModel = require("../models/logMerchant.Model");
const productModel = require("../models/product.Model");
const requestUpdateFoodModel = require("../models/requestUpdateFood.Model");

const auth = require("../controllers/auth.Controller");
const unit = require("../unit/randomString");

const tokenController = require("./token.Controller");
const TokenModel = require("../models/token.Model");

const mailer = require("./mail.Controller");

const requestController = require("./request.Controller");
const requestModel = require("../models/request.Model");

require("dotenv").config();
const { data } = require("jquery");

function _signIn(req, res) {
  const admin = req.body.adminInfor;
  tokenController._createTokenAdmin(admin, (errtoken, resutl) => {
    if (errtoken) {
      return res.status(401).send({
        status: 1,
        message: "Create token fail. Please login again",
      });
    } else {
      return res.status(200).send({
        status: 0,
        message: "Login Succesfully",
        token: resutl.token,
        user: {
          id_admin: admin.id_admin,
          displayName: admin.full_name,
          role: admin.role,
          createAt: admin.created_date,
          email: admin.email,
          url_img: admin.url_img,
          is_confirmEmail: admin.is_confirmEmail,
        },
      });
    }
  });
}

function _createNewStaff(req, res) {
  var data = req.body;
  if (data.email && data.full_name) {
    adminModel.getAccountByEmail(data.email, (err, result) => {
      if (result.length === 1) {
        res.status(400).send(err);
      } else {
        var date = new Date();
        var hash_data = auth._hashPassword(process.env.AC_PASSWORDSTAFF);
        console.log(hash_data);
        const admin = new adminModel({
          id_admin: unit._randomAdminId(),
          salt: hash_data.salt,
          hash_pass: hash_data.passwordhash,
          full_name: data.full_name,
          email: data.email,
          created_date: date,
          is_active: false,
          is_enable: false,
          role: 1,
          is_confirmEmail: unit._uuidv4(),
          updated_date: date,
          login_at: "default",
          url_img: "img_default_avatar.png",
        });
        // send mail start
        //send mail end
        adminModel.create(admin, (err1, result) => {
          if (!err1) {
            mailer.mailCreateStaff(data, admin.is_confirmEmail);
            res.status(200).send({
              status: true,
              message: "Created Account Staff Successfully.",
              staff: {
                id_admin: result.id_admin,
                full_name: result.full_name,
                email: result.email,
                created_date: result.created_date,
                is_active: result.is_active,
                is_enable: result.is_enable,
                role: result.role,
                confirm_email: result.confirm_email,
                updated_date: result.updated_date,
                login_at: result.login_at,
              },
            });
            //// Xay dung mail service
          } else {
            res.status(400).send(err1);
          }
        });
      }
    });
  }
}

function assignmentStaff(result) {
  adminModel.randomAssignment((err, data) => {
    if (!err) {
      result(null, data);
    } else {
      result(err, null);
    }
  });
}

function _reviewMerchant(req, res) {
  if (req.decoded.id_admin) {
    adminModel.getTaskMerchant(req.decoded.id_admin, (err, result) => {
      if (err) {
        res.status(401).send({
          status: false,
          message: "Non Find Your Task",
        });
      } else {
        res.status(200).send({
          status: true,
          message: "Select Successful",
          task: result,
        });
      }
    });
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function _requestFromMerchant(req, res) {
  requestModel.getReqForStaff(req.decoded.id_admin, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        result.forEach((item) => {
          try {
            item.note = JSON.parse(item.note);
          } catch (err) {
            item.note = item.note;
            //console.log("Wanning: " + err.message.yellow.italic);
          }
        });
        res.status(200).send(result);
      } else {
        res.status(404).send({
          status: false,
          message: "Non Find Your Req",
        });
      }
    }
  });
}

function _accept_merchant(req, res) {
  if (req.body.id_merchant && req.body.id_request) {
    merchantModel.accept_open(req.body.id_merchant, (err, result) => {
      if (!err) {
        var date = new Date();
        const logMerchant = {
          id_log_merchant: unit._randomLog(),
          id_admin: req.decoded.id_admin,
          id_merchant: req.body.id_merchant,
          active_old: -1,
          active_new: 1, // Active hiện có -1 và 1 cho dễ sử dụng
          note: req.body.note + " ",
          updated_date: date,
        };
        let data = {
          mailTo: req.body.mailTo,
          author: req.body.author,
          phoneNumber: req.body.phoneNumber,
        };

        req.body.state = "Done";
        requestController._updateStateRequest(req, (err, result)); // accept

        mailer.sendMailActive(data, (err, res)); // sentMail

        logMerchantModel.create(logMerchant, (err, result) => {
          if (!err) {
            //console.log("Create merchant assign for " + data.id_admin);
            res.status(200).send({
              status: true,
              message: "Accept open successful.",
            });
          } else {
            console.log("Write Log Fail.");
          }
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Accept Failed.",
        });
      }
    });
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function _denied_request(req, res) {
  const email = req.body.mailto;
  mailer.mailDeniedRequest(email);
  res.status(200).send({
    message: "success",
  });
}

function _denied_merchant(req, res) {
  if (req.body.id_merchant && req.body.id_request && req.body.mailTo) {
    merchantModel.denied_open(req.body.id_merchant, (err, result) => {
      if (!err) {
        var date = new Date();
        const logMerchant = {
          id_log_merchant: unit._randomLog(),
          id_admin: req.decoded.id_admin,
          id_merchant: req.body.id_merchant,
          active_old: 0,
          active_new: 1,
          note: req.body.note + " ",
          updated_date: date,
        };

        let data = {
          mailTo: req.body.mailTo,
        };

        requestController._updateStateRequest(
          req.body.id_request,
          (err, result)
        ); // accept

        mailer.sendMailDenied(data, (err, res)); // sentMail

        logMerchantModel.create(logMerchant, (err, result) => {
          if (!err) {
            //console.log("Create merchant assign for " + data.id_admin);
            res.status(200).send({
              status: true,
              message: "Denied Merchant Successful.",
            });
          } else {
            console.log("Write Log Fail.");
          }
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Accept Failed.",
        });
      }
    });
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function findByName(req, res) {
  if (req.query.keyword) {
    merchantModel.findMerchantByName(
      req.query.keyword.toUpperCase(),
      (err, resutl) => {
        if (err) {
          res.status(400).send({
            status: false,
          });
        } else {
          res.status(200).send(resutl);
        }
      }
    );
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}
function changeProfile(req, res) {
  console.log(req.body.images[0]);
  const data = req.body;
  adminModel.getAccountById(req.user.id_admin, (err, result) => {
    if (!err) {
      if (data.full_name) {
        result.full_name = data.full_name;
      }
      if (req.body.images[0]) {
        result.url_img = req.body.images[0];
      }

      result.updated_date = new Date();
      adminModel.update(result, (err, result2) => {
        if (!err) {
          res.status(200).send({
            profile: {
              id_admin: result.id_admin,
              displayName: result.full_name,
              role: result.role,
              createAt: result.created_date,
              email: result.email,
              url_img: result.url_img,
            },
          });
        } else {
          res.status(401).send({
            message: "Update Fail",
            err: err,
          });
        }
      });
    }
  });
}
function resetPassword(req, res) {
  let newPassword = req.body.newPassword;
  if (newPassword) {
    var hash_data = auth._hashPassword(req.body.newPassword);
    adminModel.getAccountById(req.body.adminInfor.id_admin, (err, result) => {
      if (!err) {
        result.salt = hash_data.salt;
        result.hash_pass = hash_data.passwordhash;
        adminModel.update(result, (err, result2) => {
          if (!err) {
            res.status(200).send({
              message: "Password updated",
            });
          } else {
            res.status(401).send({
              message: "Update Password Fail",
            });
          }
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Empty data",
        });
      }
    });
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}
function _getAllAdmin(req, res) {
  adminModel.getAllAccount((err, result) => {
    if (!err) {
      let data = [];
      result.forEach((item) => {
        data.push({
          id_admin: item.id_admin,
          full_name: item.full_name,
          email: item.email,
          created_date: item.created_date,
          is_active: item.is_active,
          is_enable: item.is_enable,
          role: item.role,
          is_confirmEmail: item.is_confirmEmail,
          updated_date: item.updated_date,
          login_at: item.login_at,
        });
      });

      res.status(200).send({
        Account: data,
        status: 0,
        Message: "Lấy dữ liệu thành công",
      });
    } else {
      res.status(404).send({
        status: 1,
        message: "Không tìm thấy dữ liệu",
      });
    }
  });
}
function _getAdminIMG(req, res) {
  adminModel.getAllIMG((err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(404).send({
        message: "Lỗi",
      });
    }
  });
}
function _verify(req, res) {
  let token = req.query.token;
  console.log(token);
  adminModel.verify(token, (err, result) => {
    if (!err && typeof result !== "undefined") {
      //Trường hợp Verify của Merchant
      result.is_enable = 1;
      result.is_confirmEmail = null;
      console.log(result);
      adminModel.update(result, (err1, result1) => {
        if (!err1) {
          res.status(200).send({ status: true });
        } else {
          res.status(404).send({ status: false });
          console.log(err1);
        }
      });
    }
  });
  // Trường hợp verify của merchant
  userModel.verify(token, (err, result) => {
    if (!err) {
      if (typeof result !== "undefined") {
        //Trường hợp Verify của Merchant
        result.is_enable = 1;
        result.is_confirmEmail = null;
        console.log(result);
        userModel.update(result, (err1, result1) => {
          if (!err1) {
            res.status(200).send({ status: true });
          } else {
            res.status(404).send({ status: false });
            console.log(err1);
          }
        });
      }
    }
  });
}

function updateFood(req, res) {
  if (req.body) {
    let id_product = req.body.id_product;
    productModel.findOne(id_product, (err, food) => {
      if (!err) {
        let data = req.body;
        food[0].name_product = data.name_product;
        food[0].price = data.priceNew;
        food[0].discount = data.discountNew;
        food[0].dicriptions = data.descriptionNew;
        food[0].state = null;

        productModel.Update(food[0], (err1, result) => {
          if (!err1) {
            let info = {
              state: "Done",
              id_request: data.id_request,
            };
            console.log("info ------------------------------", info);
            requestUpdateFoodModel.UpdateState(info, (err2, result2) => {
              if (!err2) {
                res.status(200).send({ status: true, Message: "Success" });
              } else {
                res.status(203).send({ status: false, Message: "Fail" });
              }
            });
          } else {
            res.status(203).send({ status: false, Message: "Fail" });
          }
        });
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
}
function ejectUpdateFood(req, res) {
  let info = {
    state: "Cancel",
    id_request: req.body.id_request,
  };
  console.log("info----------------------", info);
  requestUpdateFoodModel.UpdateState(info, (err2, result2) => {
    if (!err2) {
      let id_product = req.body.id_product;
      productModel.findOne(id_product, (err, food) => {
        if (!err) {
          food[0].state = "Cancel";
          productModel.Update(food[0], (err1, result) => {
            if (!err1) {
              res.status(200).send({ status: true, Message: "Success" });
            } else {
              res.status(203).send({ status: false, Message: "Fail" });
            }
          });
        } else {
          res.status(203).send({ status: false, Message: "Fail" });
        }
      });
    }
  });
}
function deleteStaff(req, res) {
  if (req.params.id_admin) {
    let id_admin = req.params.id_admin;
    adminModel.Delete(id_admin, (err, result) => {
      if (!err) {
        res.status(200).send({ status: true, Message: "Success" });
      } else {
        res.status(203).send({ status: false, Message: "false" });
      }
    });
  } else {
    res.status(203).send({ status: false, Message: "false" });
  }
}
module.exports = {
  _signIn: _signIn,
  _createNewStaff: _createNewStaff,
  deleteStaff: deleteStaff,
  _reviewMerchant: _reviewMerchant,
  _accept_merchant: _accept_merchant,
  _denied_merchant: _denied_merchant,
  findByName: findByName,
  changeProfile: changeProfile,
  resetPassword: resetPassword,
  _requestFromMerchant: _requestFromMerchant,
  _denied_request: _denied_request,
  assignmentStaff: assignmentStaff,
  _getAllAdmin: _getAllAdmin,
  _getAdminIMG: _getAdminIMG,
  _verify: _verify,
  updateFood: updateFood,
  ejectUpdateFood: ejectUpdateFood,
};
