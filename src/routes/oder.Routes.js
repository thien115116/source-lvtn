const express = require("express");
const Router = express.Router();
const _controllerOder = require("../controllers/oder.Controller");
const _validationJWT = require("../middleware/validate-request");

Router.post('/',[_validationJWT], _controllerOder.Oder);

Router.get('/:id_order/view', _controllerOder.getOrder);

Router.get("/", [_validationJWT], _controllerOder.getOrderById);

Router.put('/:id_oder/cancel', _controllerOder.cancelOrder);

Router.put('/:id_oder/isSeen', [_validationJWT],_controllerOder.isSeen);

Router.post('/cancelOrderByMerchant', [_validationJWT], _controllerOder.merchantCancelOrder)

Router.get("/history", [_validationJWT], _controllerOder.historyOrder)

module.exports = Router;
