const express = require("express");
const Router = express.Router();
const _controllerUpload = require("../controllers/upload.Controller");
const _controllerProduct = require("../controllers/product.Controller");
const _validationJWT = require("../middleware/validate-request");
const _requestController = require('../controllers/request.Controller');
const at = require('../controllers/attribute.Controller')

Router.post(
  "/",
  [_validationJWT],
  _controllerProduct._addNewProduct
);

Router.delete(
  "/:id_product",
  [_validationJWT],
  _controllerProduct._deleteProduct
);

Router.get("/:id_product", _controllerProduct.findOne)

Router.post("/is_active", _controllerProduct.setStateFood)

Router.post("/sent-update", [_validationJWT], _requestController.requestUpdateFood)

module.exports = Router;
 