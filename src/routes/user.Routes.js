const express = require("express");
const Router = express.Router();
const _controllerUser = require("../controllers/user.Controller");
const _validationMiddleware = require("../middleware/auth.validation");
const _validationJWT = require("../middleware/validate-request");
const _validationSyntax = require("../middleware/validator");
const _validation_enableToken = require("../middleware/validation-enableToken");
const _validation_confirmEmail = require("../middleware/validation-comfirmEmail");

Router.post(
  "/sign-up",
  [_validationMiddleware.isExitsPhone],
  _controllerUser.signUp
); // Call func create account
Router.post(
  "/sign-up-and-upgrade",
  [_validationMiddleware.isExitsPhone],
  _controllerUser.instantlyCreateMerchant
); // Call func create account

Router.post(
  "/sign-in",
  [
    _validationMiddleware.isPasswordAndUserMatch, // Check Exist on DB
  ],
  _controllerUser.signIn
); // Call func login system for client

Router.post(
  "/mcsign-in",
  [
    _validationMiddleware.isPasswordAndUserMatch, // Check Exist on DB
  ],
  _controllerUser.mcSignIn
);

Router.put("/sign-out", [_validationJWT], _controllerUser.signOut); // log out

Router.post(
  "/upgrade",
  [_validationJWT, _validation_confirmEmail, _validation_enableToken],
  _controllerUser.upgradeAccount
); /// Sent Request Open New Merchant

Router.post(
  "/reset-password",
  [_validationJWT, _validationMiddleware.isPasswordAndUserMatch],
  _controllerUser.resetPassword
); // Reset password

Router.post("/forget-password", [_controllerUser.forgetPassword]); // Forget password
Router.post("/verify-change-password", [_controllerUser.verifyChangePass]); // verify redeem code
Router.post("/change-password", [_controllerUser.changePassword]); // change password

Router.get(
  "/",
  [_validationJWT, _validation_enableToken],
  _controllerUser.getOneUser
); // get infor user at screen edit infor

Router.post("/update-infor", [_validationJWT], _controllerUser.updateProfile); // call func update infor user

Router.put(
  "/phone",
  [_validationJWT, _validationMiddleware.isExitsPhone],
  _controllerUser.updateNumberPhone
); // update number phone

Router.post(
  "/email",
  [
    _validationJWT,
    _validationSyntax._isvalidemailformated,
    _validationMiddleware.isExitsEmail,
  ],
  _controllerUser.updateEmail
); // update Email

Router.delete(
  "/",
  [_validationJWT, _validation_enableToken],
  _controllerUser.deleteUser
); // disable account for user

Router.post(
  "/check-exits",
  [_validationMiddleware.isExitsPhone],
  _controllerUser._checkExistPhone
);

Router.get("/checkConfirm", [_validationJWT], _controllerUser.checkConfirm);

Router.get(
  "/refresh-user",
  [_validationJWT],
  _controllerUser.refreshValidateEmail
);

module.exports = Router;
