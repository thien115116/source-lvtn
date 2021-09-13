const express = require("express");
const orderController  = require("../controllers/oder.Controller");
const shipperController = require("../controllers/shipper.Controller");
const Router = express.Router();
const _validationMiddleware = require("../middleware/auth.validation");
const _validationJWT = require("../middleware/validate-requestShipper");

Router.post("/sign-in",[_validationMiddleware.isPasswordShipperMatch], shipperController.signIn);

Router.put("/state/:is_state",[_validationJWT], shipperController.setState);

Router.get("/state", [_validationJWT], shipperController.getState)

Router.post("/location",[_validationJWT], shipperController.updateLocation)

Router.get("/order/review", [_validationJWT], orderController.getReviewOrder)

Router.get("/:id_order/detail", [_validationJWT], orderController.getOrderForDriver)

//CHANGE STATE IN ORDER.
Router.put("/accept-order/:id_order", [_validationJWT], orderController.acceptOrder)

Router.put("/eject-order/:id_order", [_validationJWT], orderController.ejectOrder)

Router.put("/pickup-order/:id_order", [_validationJWT], orderController.pickUpOrder)

Router.put("/delivered-order/:id_order", [_validationJWT], orderController.deliveredOrder)

module.exports = Router;