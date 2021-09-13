const crypto = require("crypto");
const stringLenght = 16;
const { v4: uuidv4 } = require("uuid");

let _randomSalt = function () {
  return crypto
    .randomBytes(Math.ceil(stringLenght / 2))
    .toString("hex")
    .slice(0, stringLenght);
};

var _randomUserId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "AC-" + date + "-" + genarateData;
};

var _randomTokenId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "TK-" + date + "-" + genarateData;
};

var _randomAdminId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "AD-" + date + "-" + genarateData;
};

var _randomTokenAdminId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(16 / 2))
    .toString("hex")
    .slice(0, 16);
  var date = Date.now();
  return "TK-AD-" + date + "-" + genarateData;
};

var _randomMerchantId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "MC-" + date + "-" + genarateData;
};

var _randomFoodId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "FO-" + date + "-" + genarateData;
};
var _randomBannerId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "BN-" + date + "-" + genarateData;
};
var _randomTagId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "TG-" + date + "-" + genarateData;
};

var _randomRequestId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "RQ-" + date + "-" + genarateData;
};

var _randomTagsId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "TS-" + date + "-" + genarateData;
};

var _randomAttributeId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "AT-" + date + "-" + genarateData;
};

var _randomAttributeValueId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(16 / 2))
    .toString("hex")
    .slice(0, 16);
  var date = Date.now();
  return "AT-VL-" + date + "-" + genarateData;
};
var _randomImageId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(10 / 2))
    .toString("hex")
    .slice(0, 10);
  var date = Date.now();
  return "IMG-FD-" + date + "-" + genarateData;
};

var _randomImageAvatarId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(13 / 2))
    .toString("hex")
    .slice(0, 13);
  var date = Date.now();
  return "AVT-" + date + "-" + genarateData;
};

var _randomLog = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(13 / 2))
    .toString("hex")
    .slice(0, 13);
  var date = Date.now();
  return "LOG-" + date + "-" + genarateData;
};

var _random6Number = function () {
  return Math.floor(100000 + Math.random() * 900000);
};

var uuid = function () {
  let id = uuidv4();
  return id;
};

var _randomBrandId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "BR-" + date + "-" + genarateData;
};

var getRandomArbitrary = function () {
  return Math.floor(Math.random() * (9999 - 1000) + 1000);
};

var _randomToppingId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "TP-" + date + "-" + genarateData;
};
var _randomMenuId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "MN-" + date + "-" + genarateData;
};

var _randomOderId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "OD-" + date + "-" + genarateData;
};

var _randomMenuItemId = function () {
  var genarateData = crypto
    .randomBytes(Math.ceil(19 / 2))
    .toString("hex")
    .slice(0, 19);
  var date = Date.now();
  return "MI-" + date + "-" + genarateData;
};

module.exports = {
  _randomBannerId: _randomBannerId,
  _randomSalt: _randomSalt,
  _randomUserId: _randomUserId,
  _randomTokenId: _randomTokenId,
  _randomAdminId: _randomAdminId,
  _randomTokenAdminId: _randomTokenAdminId,
  _randomMerchantId: _randomMerchantId,
  _randomFoodId: _randomFoodId,
  _randomTagId: _randomTagId,
  _randomTagsId: _randomTagsId,
  _randomAttributeId: _randomAttributeId,
  _randomAttributeValueId: _randomAttributeValueId,
  _randomImageId: _randomImageId,
  _randomImageAvatarId: _randomImageAvatarId,
  _randomLog: _randomLog,
  _random6Number: _random6Number,
  _randomRequestId: _randomRequestId,
  _uuidv4: uuid,
  _randomBrandId: _randomBrandId,
  _getRandomArbitrary: getRandomArbitrary,
  _randomToppingId: _randomToppingId,
  _randomMenuId: _randomMenuId,
  _randomMenuItemId: _randomMenuItemId,
  _randomOderId: _randomOderId,
};
