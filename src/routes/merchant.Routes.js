const express = require("express");
const Router = express.Router();
const _controllerMerchant = require("../controllers/merchant.Controller");
const _controllerUser = require("../controllers/user.Controller");
const _requestController = require("../controllers/request.Controller");
const _validationJWT = require("../middleware/validate-request");
const _validation_enableToken = require("../middleware/validation-enableToken");
const oderController = require("../controllers/oder.Controller");
const _controllerOder= require("../controllers/oder.Controller");

Router.get("/", _controllerMerchant.findById);

Router.post(
  "/request-support",
  [_validationJWT],
  _requestController.RequestFromMerchant
);

Router.post("/setHourOpening", [_validationJWT], _controllerMerchant.updateHourOpen)

Router.get("/HourOpening",[_validationJWT], _controllerMerchant.getHoursOpen)

Router.get("/foods", [_validationJWT], _controllerMerchant.getFoodByIdMerchant);

Router.put('/isActive/:state', [_validationJWT], _controllerMerchant.updateActive);

Router.get('/isActive', [_validationJWT], _controllerMerchant.getState);

Router.get('/order',[_validationJWT], oderController.getOrderOnGoing)

Router.get('/:id_order/view', _controllerOder.getOrderForMerchant);

module.exports = Router;
