const express = require("express");
const Router = express.Router();
const _controllerUpload = require('../controllers/upload.Controller');
const _valadationJWT = require('../middleware/validate-request');

Router.use('/multi-upload',_controllerUpload.uploadImages, _controllerUpload.resizeImages,_controllerUpload.getResult);

Router.use('/avatar',[_valadationJWT],_controllerUpload.uploadImages, _controllerUpload.resizeImages,_controllerUpload.getResult);

module.exports=Router;