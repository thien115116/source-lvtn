const express = require("express");
const Router = express.Router();
const _validationJWT = require("../middleware/validate-request");
const _controllerMerchantClient = require("../controllers/merchantClient.Controller");
const _controllerAttribute = require("../controllers/attribute.Controller");
const _controllerTopping = require("../controllers/topping.Controller");
const _controllerProduct = require("../controllers/product.Controller");
const _controllerOrder = require("../controllers/oder.Controller");
const _tagController = require("../controllers/tag.Controller");
const _controllerAtt = require("../controllers/attribute.Controller");
Router.get(
  "/merchant",
  [_validationJWT],
  _controllerMerchantClient._get_Merchant_ByID
);
Router.get("/tags/all", [_validationJWT], _tagController._find);
Router.get(
  "/tag-product",
  [_validationJWT],
  _tagController._adminFindTagOfProduct
);

Router.get("/att/:type", [_validationJWT], _controllerAtt._getAttributeByType);

Router.post(
  "/update-hour",
  [_validationJWT],
  _controllerMerchantClient.updateHourOpen
);
Router.delete(
  "/delete-food",
  [_validationJWT],
  _controllerProduct._deleteProduct
);
//Attribute
Router.get(
  "/attribute",
  [_validationJWT],
  _controllerAttribute.getMerchantAttribute
);
Router.post(
  "/attribute/add",
  [_validationJWT],
  _controllerAttribute.addByMerchant
);
Router.put(
  "/attribute/edit",
  [_validationJWT],
  _controllerAttribute.editByMerchant
);

Router.delete(
  "/attribute/:id",
  [_validationJWT],
  _controllerAttribute.deleteAttByMerchant
);
//Topping
Router.get(
  "/get-topping",
  [_validationJWT],
  _controllerTopping.getAllByMerchant
);
Router.post("/topping/add", [_validationJWT], _controllerTopping.Create);
Router.put("/topping/edit", [_validationJWT], _controllerTopping.UpdateInfo);

Router.delete("/topping/:id", [_validationJWT], _controllerTopping.Delete);

//Order

Router.get(
  "/order-today",
  [_validationJWT],
  _controllerOrder.getTodayByMerchant
);
Router.get("/order-week", [_validationJWT], _controllerOrder.getWeekByMerchant);
Router.get(
  "/order-month",
  [_validationJWT],
  _controllerOrder.getMonthByMerchant
);
Router.get(
  "/order-custom",
  [_validationJWT],
  _controllerOrder.getCustomByMerchant
);

module.exports = Router;
