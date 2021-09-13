const express = require("express");
const Router = express.Router();
const _controllerHomeClient = require("../controllers/homeClient.Controller");
const _controllerBanner = require('../controllers/banner.Controller');
const voucherController = require("../controllers/voucher.Controller");

// Banner
Router.get('/banners', _controllerBanner._getBannerOnline);

// Voucher
Router.get('/voucher', voucherController.getVoucherHome);

// PIN
Router.get('/restaurants-near', _controllerHomeClient.findRestaurantsNear);

// Async  realtime
Router.get('/new-restaurants', _controllerHomeClient.findNewRestaurants);

Router.get('/breakfast-restaurants', _controllerHomeClient.findBreakfast);

Router.get('/mainmeal-restaurants', _controllerHomeClient.findMainmeal);


// Offer
Router.get('/discountto20-restaurants', _controllerHomeClient.findDiscount20);

Router.get('/discountto35-restaurants', _controllerHomeClient.findDiscount35);

Router.get('/discountto50-restaurants', _controllerHomeClient.findDiscount50);


Router.get('/dish-restaurants', _controllerHomeClient.findDish); // chay

module.exports = Router;