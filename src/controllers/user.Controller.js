const UserModel = require("../models/user.Model");
const TokenModel = require("../models/token.Model");
const AdminModel = require("../models/admin.Model");
const requestModel = require("../models/request.Model");
const merchantModel = require("../models/merchant.Model");

const auth = require("../controllers/auth.Controller");
const unit = require("../unit/randomString");
const tokenController = require("./token.Controller");
const merchantController = require("./merchant.Controller");
const adminController = require("./admin.Controller");
const logMerchant = require("../controllers/logMerchant.Controller");
const { _random6Number } = require("../unit/randomString");
const mailController = require("./mail.Controller");
const { use } = require("../middleware/validate-request");
const { CONFLICT } = require("http-status");

function signUp(req, res) {
  //Validate request
  if (
    req.body.password ||
    req.body.firstName ||
    req.body.lastName ||
    req.body.phoneNumber
  ) {
    // colect data
    let rawPassword = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phoneNumber = req.body.phoneNumber;
    var hash_data = auth._hashPassword(rawPassword);
    var newpasswordhash = hash_data.passwordhash;
    var newsalt = hash_data.salt;
    var avatar = "https://gravatar.com/avatar/?s=200&d=retro";
    var created_date = new Date();
    // call Model User Create a user
    let user = new UserModel({
      userId: unit._randomUserId(),
      email: req.body.email || null,
      phoneNumber: phoneNumber,
      role: 0,
      first_name: firstName,
      last_name: lastName,
      salt: newsalt,
      hash_password: newpasswordhash,
      url_avt: avatar,
      create_day: created_date,
      is_active: true,
      language: "VN",
      is_enable: true,
      is_GoogleAccount: false,
      is_FacebookAccount: false,
      is_confirmEmail: null,
      login_at: req.body.token,
    });

    if (user.email) {
      UserModel.checkMailExist(req.body.email, (err, resultEmail) => {
        if (err == false) {
          return res.status(401).send({
            status: false,
            message: `Email ${req.body.email} Exist`,
          });
        } else {
          user.is_confirmEmail = unit._uuidv4();

          mailController.mailConfirmAccountUser(user);
          UserModel.create(user, (err, data) => {
            if (err) {
              return res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the Customer.",
              });
            } else {
              tokenController._createTokenClient(user, (errtoken, result) => {
                if (errtoken) {
                  return res.status(200).send({
                    status: 1,
                    message:
                      " Created User Succesful but create token fail. Please login",
                  });
                } else {
                  return res.status(200).send({
                    id_user: user.userId,
                    status: true,
                    message: " Created User Successfully",
                    token: result.token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email || null,
                    is_confirmEmail: user.is_confirmEmail,
                    language: user.language,
                    avatar: user.url_avt,
                    phoneNumber: user.phone,
                  });
                }
              });
            }
          });
        }
      });
    } else {
      UserModel.create(user, (err, data) => {
        if (err) {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer.",
          });
        } else {
          tokenController._createTokenClient(user, (errtoken, result) => {
            if (errtoken) {
              return res.status(200).send({
                status: 1,
                message:
                  " Created User Succesful but create token fail. Please login",
              });
            } else {
              return res.status(200).send({
                id_user: user.userId,
                status: true,
                message: " Created User Successfully",
                token: result.token,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email || null,
                is_confirmEmail: user.is_confirmEmail,
                language: user.language,
                avatar: user.url_avt,
                phoneNumber: user.phone,
              });
            }
          });
        }
      });
    }
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function instantlyCreateMerchant(req, res) {
  //Đầu tiên tạo 1 tài khoản
  if (
    req.body.password ||
    req.body.firstName ||
    req.body.lastName ||
    req.body.phoneNumber
  ) {
    // colect data
    let rawPassword = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phoneNumber = req.body.phoneNumber;
    var hash_data = auth._hashPassword(rawPassword);
    var newpasswordhash = hash_data.passwordhash;
    var newsalt = hash_data.salt;
    var avatar = "https://gravatar.com/avatar/?s=200&d=retro";
    var created_date = new Date();
    // call Model User Create a user
    let user = new UserModel({
      userId: unit._randomUserId(),
      email: req.body.email,
      phoneNumber: phoneNumber,
      role: 0,
      first_name: firstName,
      last_name: lastName,
      salt: newsalt,
      hash_password: newpasswordhash,
      url_avt: avatar,
      create_day: created_date,
      is_active: true,
      language: "VN",
      is_enable: true,
      is_GoogleAccount: false,
      is_FacebookAccount: false,
      is_confirmEmail: null,
    });
    //Trong trường hợp tạo Merchant bằng cách này người dùng chắc chắn phải nhập email cho nên không cần kiểm tra trường hợp có email hay không !
    UserModel.checkMailExist(req.body.email, (err, resultEmail) => {
      if (err == false) {
        //err == false là chỉ rằng cái mail này nó có tồn tại
        return res.status(401).send({
          status: false,
          message: `Email ${req.body.email} Exist`,
        });
      } else {
        //Ngược lại nếu chưa thì tiếp tục
        user.is_confirmEmail = unit._uuidv4();
        console.log(user);
        mailController.mailConfirmAccountUser(user);
        UserModel.create(user, (err, data) => {
          if (err) {
            return res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Customer.",
            });
          } else {
            tokenController._createTokenClient(user, (errtoken, result) => {
              if (errtoken) {
                return res.status(200).send({
                  status: 1,
                  message:
                    " Created User Succesful but create token fail. Please login",
                });
              } else {
                //Đến đây là coi như tạo thành công, thực hiện tiếp việc nâng cấp tài khoản lên thành tài khoản merchant
                console.log(user.userId);
                UserModel.getUserById(user.id_user, (err, resultUser) => {
                  if (!err) {
                    resultUser.role = 1;
                    resultUser.is_enable = false;
                    resultUser.first_name = req.body.firstName;
                    resultUser.last_name = req.body.lastName;
                    UserModel.update(
                      resultUser,
                      (errUpdate, resultUpdateUser) => {
                        if (!errUpdate) {
                          let data = {
                            nameMerchant: req.body.nameMerchant,
                            address: req.body.address,
                            phoneNumber: req.body.phoneNumber,
                            lat: 10.738199,
                            lon: 106.678581,
                            id_user: user.id_user,
                            openingHours: req.body.openingHours,
                            id_brand: req.body.id_brand,
                            type_business: req.body.type_business,
                          };
                          merchantController.instantlyCreate(
                            data,
                            (errCreate, resultMerchant) => {
                              if (!errCreate) {
                                adminController.assignmentStaff((err, data) => {
                                  let createAt = new Date();
                                  let Request = {
                                    id_request: unit._randomRequestId(),
                                    note: "Không có note",
                                    createAt: createAt,
                                    updateAt: null,
                                    id_merchant: resultMerchant.id_merchant,
                                    id_question:
                                      "7987f5b4-e757-4cd0-b898-7f823423b30c",
                                    id_admin: data.id_admin,
                                    state: "New",
                                  };
                                  requestModel.Create(
                                    Request,
                                    (errCreateREQ, result) => {
                                      if (!err) {
                                        res.status(200).send({
                                          status: true,
                                          message: "Success",
                                        });
                                      } else {
                                        res.status(400).send({
                                          status: false,
                                          message:
                                            "An error occurred during the get user process!",
                                        });
                                      }
                                    }
                                  );
                                  console.log(resultMerchant.id_merchant);
                                });
                              } else {
                                res.status(400).send({
                                  status: false,
                                  message:
                                    "An error occurred during the get user process!",
                                });
                              }
                            }
                          );
                        } else {
                          res.status(400).send({
                            status: false,
                            message:
                              "An error occurred during the get user process!",
                          });
                        }
                      }
                    );
                  } else {
                    res.status(400).send({
                      status: false,
                      message: "An error occurred during the get user process!",
                    });
                  }
                });
                // Kết thúc việc nâng cấp
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function signIn(req, res) {
  let user = req.body.userInfor;
  if (user.role == 0) {
    // Check role user or merchant eject if sign oder app. Client signin app BOOFOOD and Merchant sign in app MERCHANT BOO
    tokenController._createTokenClient(user, (errtoken, result) => {
      if (errtoken) {
        return res.status(204).send({
          status: false,
          message: "Create token fail. Please login again",
        });
      } else {
        user.login_at = req.body.token;
        UserModel.update(user, (errUpdate, resultUpdateUser) => {
          if (!errUpdate) {
            return res.status(200).send({
              id_user: user.id_user,
              status: true,
              message: "Login Successfully",
              token: result.token,
              first_name: user.first_name,
              last_name: user.last_name,
              avatar: user.url_avt,
              email: user.email || null,
              is_confirmEmail: user.is_confirmEmail,
              language: user.language,
              phoneNumber: user.phone,
            });
          } else {
            return res.status(401).send({
              status: false,
              message: "Login Fail.",
            });
          }
        });
      }
    });
  } else {
    console.log({
      status: false,
      message: "Your account can only be used on app BOOFOOD.",
    });
    return res.status(403).send({
      status: false,
      message: "Your account can only be used on app BOOFOOD.",
    });
  }
}

function signOut(req, res) {
  TokenModel.update(
    (data = {
      id_user: req.decoded.id_user,
      token: req.body.token || req.query.token || req.headers.authorization,
    }),
    (err, resutl) => {
      if (!err) {
        return res.status(200).send({
          status: true,
          message: "Logout succesful.",
        });
      } else {
        return res.status(201).send({
          status: false,
          message: "Logout fail but accept clear cache In device and resignin.",
        });
      }
    }
  );
}

function getOneUser(req, res) {
  UserModel.getUserById(req.decoded.id_user, (err, resutl) => {
    if (!err) {
      return res.status(200).send({
        status: 0,
        user: resutl,
      });
    } else {
      res.status(400).send({
        status: 1,
        message: "An error occurred during the get user process!",
      });
      return;
    }
  });
}

function updateUserName(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  if (firstName || lastName) {
    UserModel.updateDisplayName(
      (data = {
        firstName: firstName,
        lastName: lastName,
        id_user: req.decoded.id_user,
      }),
      (err, resutl) => {
        if (!err) {
          return res.status(200).send({
            status: 0,
            message: "Update User Name Succesfully",
          });
        } else {
          return res.status(401).send({
            status: 1,
            message: "Update User Name FAIL",
          });
        }
      }
    );
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function deleteUser(req, res) {}

function upgradeAccount(req, res) {
  let body = req.body;
  UserModel.getUserById(req.decoded.id_user, (err, resultUser) => {
    if (!err) {
      resultUser.role = 1;
      resultUser.is_enable = false;
      resultUser.first_name = body.ownerName
        .substring(0, body.ownerName.indexOf(" "))
        .toUpperCase();

      resultUser.last_name = body.ownerName
        .substring(body.ownerName.indexOf(" ") + 1, body.ownerName.length)
        .toUpperCase();

      UserModel.update(resultUser, (errUpdate, resultUpdateUser) => {
        if (!errUpdate) {
          merchantController.create(req, (errCreate, resultMerchant) => {
            if (!errCreate) {
              adminController.assignmentStaff((err, data) => {
                let createAt = new Date();
                let Request = new requestModel({
                  id_request: unit._randomRequestId(),
                  note: body.note,
                  createAt: createAt,
                  updateAt: null,
                  id_merchant: resultMerchant.id_merchant,
                  id_question: "7987f5b4-e757-4cd0-b898-7f823423b30c",
                  id_admin: data.id_admin,
                  state: "New",
                });

                requestModel.Create(Request, (err, result) => {
                  signOut(req, res);
                });
              });
            } else {
              res.status(400).send({
                status: false,
                message: "An error occurred during the get user process!",
              });
            }
          });
        } else {
          res.status(400).send({
            status: false,
            message: "An error occurred during the get user process!",
          });
        }
      });
    } else {
      res.status(400).send({
        status: false,
        message: "An error occurred during the get user process!",
      });
    }
  });
}

function updateNumberPhone(req, res) {
  if (req.body.phoneNumber) {
    UserModel.updatePhoneNumber(
      (data = {
        phoneNumber: req.body.phoneNumber,
        id_user: req.decoded.id_user,
      }),
      (err, resutl) => {
        if (!err) {
          return res.status(200).send({
            status: 0,
            message: "Update Number Phone Succesfully",
          });
        } else {
          return res.status(401).send({
            status: 1,
            message: "Update Number Phone FAIL",
          });
        }
      }
    );
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function updateEmail(req, res) {
  if (req.body.email) {
    UserModel.getUserById(req.decoded.id_user, (err, result) => {
      UserModel.checkMailExist(req.body.email, (err, resultEmail) => {
        if (err == false) {
          return res.status(401).send({
            status: false,
            message: `Email ${req.body.email} Exist`,
          });
        } else {
          result.email = req.body.email;
          result.is_confirmEmail = unit._uuidv4();

          UserModel.update(result, (err, resetPassword2) => {
            if (!err) {
              return res.status(200).send({
                status: true,
                message: "Succesful",
                is_confirmEmail: result.is_confirmEmail,
              });
            } else {
              return res.status(401).send({
                status: false,
                message: `Fail`,
              });
            }
          });

          mailController.mailConfirmAccountUser(result);
        }
      });
    });
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function resetPassword(req, res) {
  var newPassword = req.body.newPassword;
  if (newPassword) {
    var hash_data = auth._hashPassword(req.body.newPassword);
    const user = new UserModel({
      salt: hash_data.salt,
      hash_password: hash_data.passwordhash,
    });
    UserModel.updateUserPassword(
      (data = {
        user: user,
        id_user: req.decoded.id_user,
      }),
      (err, resutl) => {
        if (!err) {
          return res.status(200).send({
            status: 0,
            message: "Update Password Succesfully",
          });
        } else {
          return res.status(401).send({
            status: 1,
            message: "Update Password FAIL",
          });
        }
      }
    );
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function changePassword(req, res) {
  var newPassword = req.body.newPassword;
  if (newPassword) {
    var hash_data = auth._hashPassword(req.body.newPassword);
    const user = new UserModel({
      salt: hash_data.salt,
      hash_password: hash_data.passwordhash,
    });
    UserModel.updateUserPasswordByMail(
      (data = {
        user: user,
        email: req.body.email,
      }),
      (err, resutl) => {
        if (!err) {
          return res.status(200).send({
            status: 0,
            message: "Update Password Succesfully",
          });
        } else {
          return res.status(401).send({
            status: 1,
            message: "Update Password FAIL",
          });
        }
      }
    );
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function forgetPassword(req, res) {
  const userMail = req.body;
  UserModel.checkMailExist(userMail.email, (err, result) => {
    if (!err) {
      let data = {
        email: userMail.email,
        number: _random6Number(),
      };
      mailController.mailUserGet6Number(data);
      UserModel.saveConfirmCode(data, (err, result) => {
        if (!err) {
          res.status(200).send({
            status: 0,
            message: "Your Request Has Processing ",
          });
        }
      });
    } else {
      return res.status(401).send({
        status: 1,
        message: "Your Email Is Not Exist",
      });
    }
  });
}

function verifyChangePass(req, res) {
  //Xác thực xem redeem code có trùng không
  let email = req.body.email;
  let number = req.body.number;
  // Get RedeemCode
  UserModel.getRedeemCode(email, (err, result) => {
    if (!err) {
      console.log(number);
      console.log(result);
      if (number == result) {
        res.status(200).send({
          status: 0,
          email: email,
          message: "Correct Redeem Code",
        });
      } else {
        res.status(401).send({
          status: 1,
          message: "Not Correct",
        });
      }
    }
  });
}

function mcSignIn(req, res) {
  const user = req.body.userInfor;
  // console.log(user);
  if (user.role == 1) {
    merchantModel.getMerchantByIdAccount(user.id_user, (errMC, RowMC) => {
      merchantModel.getMerchantById(RowMC, (errMerchant, RowMerchant) => {
        console.log(RowMerchant);
        if (RowMerchant[0].is_enable != -1 && !errMerchant) {
          // user.id_merchant =
          // Check role user or merchant eject if sign oder app. Client signin app BOOFOOD and Merchant sign in app MERCHANT BOO
          tokenController._createTokenClient(user, (errtoken, resutl) => {
            if (errtoken) {
              return res.status(400).send({
                status: false,
                message: "Create token fail. Please login again",
              });
            } else {
              user.login_at = !req.body.token ? user.login_at : req.body.token;
              UserModel.update(user, (errUpdate, resultUpdateUser) => {
                if (!errUpdate) {
                  return res.status(200).send({
                    status: true,
                    message: "Login Succesfully",
                    avatar: user.url_avt,
                    email: user.email,
                    token: resutl.token,
                    displayName: user.first_name + " " + user.last_name,
                    avatar: user.url_avt,
                    language: user.language,
                  });
                } else {
                  return res.status(401).send({
                    status: false,
                    message: "Login Fail.",
                  });
                }
              });
            }
          });
        } else {
          return res.status(401).send({
            status: false,
            message: "Login Fail.",
          });
        }
      });
    });
  } else {
    console.log({
      status: false,
      message: "Your account can only be used on app MERCHANT.",
    });
    return res.status(403).send({
      status: false,
      message: "Your account can only be used on app MERCHANT.",
    });
  }
}

function checkExistPhone(req, res) {
  return res.status(200).json({
    success: true,
    message: "Good",
  });
}

function updateProfile(req, res) {
  UserModel.getUserById(req.decoded.id_user, (err, result) => {
    if (!err) {
      result.first_name = req.body.first_name;
      result.last_name = req.body.last_name;
      //console.log(result.email);

      UserModel.update(result, (err, resetPassword2) => {
        if (!err) {
          return res.status(200).send({
            status: true,
            message: "Succesful",
          });
        } else {
          console.log(err);

          return res.status(401).send({
            status: false,
            message: `Fail`,
          });
        }
      });
    }
  });
}

function refreshValidateEmail(req, res) {}

function checkConfirm(req, res) {
  if (req.user.is_confirmEmail) {
    res.status(200).send({
      status: false,
      message: req.user.is_confirmEmail,
    });
  } else {
    res.status(200).send({
      status: true,
      message: null,
    });
  }
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
  signOut: signOut,
  getOneUser: getOneUser,
  updateUserName: updateUserName,
  deleteUser: deleteUser,
  upgradeAccount: upgradeAccount,
  updateNumberPhone: updateNumberPhone,
  updateEmail: updateEmail,
  resetPassword: resetPassword,
  forgetPassword: forgetPassword,
  mcSignIn: mcSignIn,
  _checkExistPhone: checkExistPhone,
  verifyChangePass: verifyChangePass,
  changePassword: changePassword,
  updateProfile: updateProfile,
  refreshValidateEmail: refreshValidateEmail,
  checkConfirm: checkConfirm,
  instantlyCreateMerchant: instantlyCreateMerchant,
};
