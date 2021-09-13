const merchantModel = require("../models/merchant.Model");
const _productModel = require("../models/product.Model");
require("dotenv").config();

function _get_Merchant_ByID(req, res) {
  if (req.decoded.id_user) {
    merchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err, id_merchant) => {
        if (!err) {
          merchantModel.getMerchantByUserOnWebApp(
            id_merchant,
            (err, result) => {
             // console.log(id_merchant);
              if (!err) {
                _productModel._getFoodByIdMerChant(
                  id_merchant,
                  (err1, result1) => {
                    _productModel.getImg(id_merchant, (err2, result2) => {
                      if (!err2 && result[0].length > 0 && !err1) {
                        let a = groupImg(result2, result1);
                        let info = result[0][0];
                        info.products = a;
                        res.status(200).send(info);
                      } else {
                        res.status(401).send({
                          status: false,
                          message: "Err",
                        });
                      }
                    });
                  }
                );
              } else {
                res.status(401).send({
                  message: "Err",
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function groupImg(arrayImg, arrayProduct) {
  for (let i = 0; i < arrayProduct.length; i++) {
    let obj = [];
    for (let j = 0; j < arrayImg.length; j++) {
      if (arrayProduct[i].id_product === arrayImg[j].id_product) {
        obj.push(arrayImg[j].url_image);
      }
    }
    arrayProduct[i].list = obj;
  }
  return arrayProduct;
}

function updateHourOpen(req, res) {
  if (req.decoded.id_user) {
    merchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err, id_merchant) => {
        if (!err) {
          if (req.body) {
            let data = {
              hour: JSON.stringify(req.body),
              id: id_merchant,
            };
            merchantModel.updateHour(data, (err, result) => {
              if (!err) {
                res.status(200).send({
                  message: "Success",
                  code: 1,
                });
              } else {
                res.status(404).send({
                  message: "Error",
                  code: 0,
                });
              }
            });
          }
        }
      }
    );
  }
}

module.exports = {
  _get_Merchant_ByID: _get_Merchant_ByID,
  updateHourOpen: updateHourOpen,
};
