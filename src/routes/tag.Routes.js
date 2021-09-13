const express = require("express");
const Router = express.Router();
const _validationJWT = require("../middleware/validate-request");
const _tagController = require('../controllers/tag.Controller');


Router.post('/',[_validationJWT], _tagController._create)

Router.get('/', _tagController._findByName)

Router.get('/all', _tagController._find);

Router.get('/top', _tagController._findTop);

module.exports = Router;