const express = require("express");
const Router = express.Router();
const fcmController = require('../controllers/fcm.Controller');

Router.post('/sendBroadCast', fcmController.sendBroadcastToGroup)

module.exports = Router;