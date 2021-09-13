const express = require("express");
const Router = express.Router();
const _controllerAdmin = require("../controllers/admin.Controller");
const _controllerMerchant = require("../controllers/merchant.Controller");

Router.get("/verify", _controllerAdmin._verify);
Router.get("/merchant", _controllerMerchant.getMerchantByID);

module.exports = Router;
