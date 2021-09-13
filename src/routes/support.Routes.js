const express = require("express");
const Router = express.Router();
const _controllerSupport = require('../controllers/support.Controller');

Router.post('/', _controllerSupport.Create)

module.exports= Router;