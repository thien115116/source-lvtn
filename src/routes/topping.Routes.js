const express = require("express");
const Router = express.Router();
const toppingController = require('../controllers/topping.Controller');
const _validationJWT = require("../middleware/validate-request");

Router.get('/', [_validationJWT], toppingController.findAllByIdMerchant);

Router.post('/', [_validationJWT], toppingController.Create);

Router.post('/update', [_validationJWT], toppingController.UpdateActive)

Router.post('/update-info', [_validationJWT], toppingController.UpdateInfo)

Router.delete('/:id_topping', [_validationJWT], toppingController.Delete)

module.exports = Router;