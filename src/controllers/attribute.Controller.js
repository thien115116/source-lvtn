const attributeModel = require("../models/attribute.Model");
const merchantModel = require("../models/merchant.Model");
const { _randomAttributeId } = require("../unit/randomString");
const unit = require("../unit/randomString");

function _createAttribute(req, res) {
  if (req.body.name && req.body.type) {
    let newItem = new attributeModel({
      id_attr: unit._randomAttributeId(),
      name: req.body.name,
      type: req.body.type,
    });

    attributeModel.create(newItem, (err, resultCreate) => {
      if (!err) {
        res.status(200).send({
          status: true,
          message: resultCreate,
        });
      } else {
        console.log(err);
        res.status(401).send({
          status: false,
          message: err.message,
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content Not Empty",
    });
  }
}

function _getAttributeByType(req, res) {
  console.log(req.params);
  if (req.decoded.id_user) {
    merchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err, id_merchant) => {
        if (!err) {
          let data = {
            id_merchant: id_merchant,
            type: req.params.type,
          };
          attributeModel.findByType(data, (err, result) => {
            if (!err) {
              res.status(200).send({
                status: true,
                message: result,
              });
            } else {
              console.log(err);
              res.status(401).send({
                status: false,
                message: err.message,
              });
            }
          });
        }
      }
    );
  }
}
function _getAttributeByTypeForAdmin(req, res) {
  console.log(req);
  let data = {
    id_merchant: req.query.id_merchant,
    type: req.query.type,
  };
  attributeModel.findByType(data, (err, result) => {
    console.log(result);
    if (!err) {
      res.status(200).send({
        status: true,
        message: result,
      });
    } else {
      console.log(err);
      res.status(401).send({
        status: false,
        message: err.message,
      });
    }
  });
}

function _getAll(req, res) {
  attributeModel.findAll((err, result) => {
    if (!err) {
      res.status(200).send({
        status: true,
        message: result,
      });
    } else {
      console.log(err);
      res.status(401).send({
        status: false,
        message: err.message,
      });
    }
  });
}

function addByMerchant(req, res) {
  if (req.body) {
    if (req.decoded.id_user) {
      merchantModel.getMerchantByIdAccount(
        req.decoded.id_user,
        (err, id_merchant) => {
          if (!err) {
            let attribute = {
              id_attr: _randomAttributeId(),
              name: req.body.name,
              type: req.body.group,
              id_merchant: id_merchant,
            };
            attributeModel.create(attribute, (errAtt, result) => {
              if (!errAtt) {
                res.status(200).send(attribute);
              } else {
                res.status(400).send(errAtt);
              }
            });
          }
        }
      );
    }
  }
}
function getMerchantAttribute(req, res) {
  merchantModel.getMerchantByIdAccount(
    req.decoded.id_user,
    (err, id_merchant) => {
      if (!err) {
        attributeModel.getAttOfMerchant(id_merchant, (err, result) => {
          if (!err) {
            res.status(200).send(result);
          } else {
            res.status(500).send(err);
          }
        });
      }
    }
  );
}
function deleteAttByMerchant(req, res) {
  console.log(req.params.id);
  if (req.params) {
    attributeModel.deleteAttByMerchant(req.params.id, (err, result) => {
      if (!err) {
        res.status(200).send({ status: true, message: "Success" });
      } else {
        console.log(err);
        if (err.errno === 1451) {
          // Lỗi khóa ngoại
          res
            .status(202)
            .send({ status: false, message: "Thuộc tính đang được sử dụng." });
        } else {
          res.status(202).send({ status: false, message: "Mã lỗi" });
        }
      }
    });
  }
}
function editByMerchant(req, res) {
  console.log(req.body);
  if (req.body) {
    attributeModel.updateByMerchant(req.body, (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(203).send({ status: false, Message: "Update fail" });
      }
    });
  }
}
module.exports = {
  _createAttribute: _createAttribute,
  _getAttributeByType: _getAttributeByType,
  _getAll: _getAll,
  addByMerchant: addByMerchant,
  getMerchantAttribute: getMerchantAttribute,
  deleteAttByMerchant: deleteAttByMerchant,
  editByMerchant: editByMerchant,
  _getAttributeByTypeForAdmin: _getAttributeByTypeForAdmin,
};
