const express = require("express");
const Router = express.Router();
const _validationJWT = require("../middleware/validate-requestAdmin");
const _controllerBrand = require("../controllers/brand.Controller");

Router.get("/", [_validationJWT], _controllerBrand.find);

Router.get("/code", _controllerBrand.findOne);

Router.post("/", [_validationJWT],_controllerBrand.create);

Router.put("/:id_brand", [_validationJWT], _controllerBrand.update);

Router.delete("/:id_brand", [_validationJWT], _controllerBrand.deleteBrand);

module.exports = Router;