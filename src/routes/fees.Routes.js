const express = require("express");
const Router = express.Router();
const validateSecretKey = require('../middleware/validate-secretkey');
const feesController = require('../controllers/fee.Controller');

Router.post('/calculatorApplicableFee', [validateSecretKey], feesController.calculatorApplicableFee)

Router.post('/reCalculatorDistanceAndFees', [validateSecretKey, feesController.calculatorDistance], feesController.calculatorApplicableFee)

module.exports = Router;