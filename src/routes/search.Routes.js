const express = require("express");
const Router = express.Router();
const searchController = require('../controllers/search.Controller')

Router.get('/search-by-tag', searchController.findByTag);

Router.get('/search-by-keyword', searchController.findByKeyWord);

module.exports = Router;