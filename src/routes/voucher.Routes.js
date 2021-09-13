const express = require("express");
const Router = express.Router();
const _controllerVoucher = require('../controllers/voucher.Controller');

Router.get('/', _controllerVoucher.getAll);

Router.post('/use', _controllerVoucher.use)

module.exports = Router;