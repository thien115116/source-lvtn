// Biulda func for merchant
const MerchantModel = require("../models/merchant.Model");
const LogProduct = require("../controllers/logProduct.Controller");
const _productModel = require("../models/product.Model");
const Unit = require("../unit/randomString");

function create(req, result) {
  if (
    req.body.nameMerchant ||
    req.body.address ||
    req.body.phoneNumber ||
    req.body.lat ||
    req.body.lon
  ) {
    var date = new Date();
    const merchant = new MerchantModel({
      id_merchant: Unit._randomMerchantId(),
      id_user: req.decoded.id_user || req.id_user,
      name_merchant: req.body.nameMerchant,
      is_active: false,
      is_enable: -1,
      locations: req.body.address,
      latitude: req.body.lat,
      longtitude: req.body.lon,
      accept_date: null,
      update_date: null,
      reg_date: date,
      type_business: req.body.type_business,
      id_brand: req.body.id_brand || null,
      openingHours: req.body.openingHours,
    });
    MerchantModel.create(merchant, (err, data) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else {
        result(null, { ...merchant });
      }
    });
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}
function instantlyCreate(data, result) {
  var date = new Date();
  const merchant = new MerchantModel({
    id_merchant: Unit._randomMerchantId(),
    id_user: data.id_user,
    name_merchant: data.nameMerchant,
    is_active: false,
    is_enable: -1,
    locations: data.address,
    latitude: data.lat,
    longtitude: data.lon,
    accept_date: null,
    update_date: null,
    reg_date: date,
    type_business: data.type_business,
    id_brand: data.id_brand || null,
    openingHours: data.openingHours,
  });
  MerchantModel.create(merchant, (err, data) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, { ...merchant });
    }
  });
}

function findById(req, res) {
  if (req.query.id_merchant || req.query.lat || req.query.lon) {
    MerchantModel.getMerchantInApp(req.query, (err, result) => {
      if (!err) {
        _productModel._getFoodByIdMerChant(
          req.query.id_merchant,
          (err1, result1) => {
            if (!err1 && result[0].length > 0) {
              let info = result[0][0];
              info.products = result1;
              res.status(200).send(info);
            } else {
              res.status(401).send({
                status: false,
                message: "Err",
              });
            }
          }
        );
      } else {
        res.status(401).send({
          message: "Err",
        });
      }
    });
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function get_All_Merchant(req, res) {
  MerchantModel.getAllMerchant((err, result) => {
    if (!err) {
      res.status(200).send(result[0]);
    } else {
      res.status(201).send({
        message: "Error When Getting Data",
        status: 1,
      });
    }
  });
}

function _get_Merchant_ByID(req, res) {
  console.log(req);
  if (req.params.id || req.query.id) {
    let id = req.params.id || req.query.id;
    MerchantModel.getMerchantInAppByAdmin(id, (err, result) => {
      if (!err) {
        _productModel._getFoodByIdMerChant(id, (err1, result1) => {
          _productModel.getImg(id, (err2, result2) => {
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
          // if (!err1 && result[0].length > 0) {
          //   let info = result[0][0];
          //   info.products = result1;
          //   res.status(200).send(info);
          // } else {
          //   res.status(401).send({
          //     status: false,
          //     message: "Err",
          //   });
          // }
        });
      } else {
        res.status(401).send({
          message: "Err",
        });
      }
    });
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

function findByIdAccount(id, result) {
  if (id) {
    MerchantModel.getMerchantByIdAccount(id, (err, data) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else {
        result(null, data);
      }
    });
  } else {
    result(null, {
      status: false,
      message: "Content can not be empty!",
    });
  }
}

function getFoodByIdMerchant(req, res) {
  MerchantModel.getMerchantByIdAccount(req.decoded.id_user, (err, data) => {
    if (!err) {
      _productModel._getFoodByIdMerChant(data, (err1, result1) => {
        if (!err1) {
          res.status(200).send(result1);
        } else {
          res.status(401).send({
            message: "Err",
          });
        }
      });
    } else {
      res.status(400).send({
        status: false,
        message: "Not find merchant",
      });
    }
  });
}

function getTopMerchant(req, res) {
  MerchantModel.getTopMerchant((err, result) => {
    if (!err) {
      res.status(200).send({
        listMerchant: result,
        status: 0,
      });
    } else {
      res.status(201).send({
        message: "Error When Getting Data",
        status: 1,
      });
    }
  });
}

function updateActive(req, res) {
  MerchantModel.getMerchantByIdAccount(req.user.id_user, (err, data) => {
    if (!err) {
      MerchantModel.getMerchantById(data, (errget, resultMerchant) => {
        if (!err) {
          resultMerchant[0].is_active = req.params.state;
          MerchantModel.update(resultMerchant[0], (err, dateUpdate) => {
            if (!err) {
              res.status(200).send({
                status: true,
                message: "Updated",
              });
            } else {
              res.status(401).send({
                status: true,
                message: "Updated",
              });
            }
          });
        } else {
          res.status(401).send(err);
        }
      });
    } else {
      res.status(401).send({
        status: false,
        message: err,
      });
    }
  });
}

function getState(req, res) {
  MerchantModel.getMerchantByIdAccount(req.user.id_user, (err, data) => {
    if (!err) {
      MerchantModel.getMerchantById(data, (errget, resultMerchant) => {
        if (!err) {
          res.status(200).send({
            status: true,
            message: resultMerchant[0].is_active,
          });
        } else {
          res.status(401).send(err);
        }
      });
    } else {
      res.status(401).send({
        status: false,
        message: err,
      });
    }
  });
}

function updateHourOpen(req, res) {
  if (req.decoded.id_user) {
    MerchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err, id_merchant) => {
        if (!err) {
          if (req.body) {
            let data = {
              hour: req.body.hourOpening,
              id: id_merchant,
            };
            MerchantModel.updateHour(data, (err, result) => {
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

function getHoursOpen(req, res) {
  if (req.decoded.id_user) {
    MerchantModel.getMerchantByIdAccount(req.decoded.id_user, (err, result) => {
      if (!err) {
        MerchantModel.getMerchantById(result, (err, row) => {
          res.status(200).send({
            status: true,
            message: row[0].openingHours,
          });
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Non",
        });
      }
    });
  }
}

function getStatisticsToday(req, res) {}

function getStatisticsWeak(req, res) {}

function getStatisticsInterval(req, res) {}

function getMerchantNotWork(req, res) {
  MerchantModel.getMerchantNotWork("", (err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(401).send({
        status: false,
        message: "Non",
      });
    }
  });
}
function removeMerchantFromBrand(req, res) {
  console.log(req.params);
  if (req.params) {
    let data = req.params.id;
    MerchantModel.removeMerchantFromBrand(data, (err, result) => {
      if (!err) {
        res.status(200).send({ status: true, message: "Success" });
      } else {
        res.status(401).send({
          status: false,
          message: "Non",
        });
      }
    });
  }
}
function getMerchantByID(req, res) {
  if (req.query.id) {
    let id = req.query.id;
    MerchantModel.getMerchantById(id, (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(401).send(err);
      }
    });
  }
}
module.exports = {
  create: create,
  findById: findById,
  getFoodByIdMerchant: getFoodByIdMerchant,
  findByIdAccount: findByIdAccount,
  get_All_Merchant: get_All_Merchant,
  getTopMerchant: getTopMerchant,
  _get_Merchant_ByID: _get_Merchant_ByID,
  updateActive: updateActive,
  getState: getState,
  updateHourOpen: updateHourOpen,
  getHoursOpen: getHoursOpen,
  getMerchantNotWork: getMerchantNotWork,
  removeMerchantFromBrand: removeMerchantFromBrand,
  instantlyCreate: instantlyCreate,
  getMerchantByID: getMerchantByID,
};
