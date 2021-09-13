const express = require("express");
const Router = express.Router();
const _controllerMenu = require("../controllers/menu.Controller");
const _validationJWT = require("../middleware/validate-request");

Router.get("/:id_merchant", _controllerMenu.getAll);

Router.get("/", [_validationJWT], _controllerMenu.getGetMenu);

Router.post("/", [_validationJWT], _controllerMenu.createNewMenu);

Router.put("/:id_menu", [_validationJWT], _controllerMenu.update);

Router.post(
  "/add-product",
  [_validationJWT],
  _controllerMenu.addNewProductToMenu
);
Router.get(
  "/has-food/:id_menu",
  [_validationJWT],
  _controllerMenu.getFoodOfMenu
);

Router.delete("/delete-food", [_validationJWT], _controllerMenu.deleteOne);
Router.delete(
  "/delete-menu/:id_menu",
  [_validationJWT],
  _controllerMenu.deleteMenu
);

module.exports = Router;
