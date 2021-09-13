const express = require("express");
const Router = express.Router();
const attribute = require("../controllers/attribute.Controller");
const validationAdmin = require("../middleware/validate-requestAdmin");

Router.get("/:type", attribute._getAttributeByType);

Router.get("/", attribute._getAll);

Router.post("/" ,[
    validationAdmin
], attribute._createAttribute);

module.exports = Router;
