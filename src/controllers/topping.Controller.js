const toppingModels = require("../models/topping.Models");
const merchantModels = require("../models/merchant.Model");
const unit = require("../unit/randomString");

function findAllByIdMerchant(req, res) {
  let id_user = req.user.id_user || req.query.id_user;
  merchantModels.getMerchantByIdAccount(id_user, (err, result) => {
    if (!err) {
      toppingModels.findAllByIdMerchant(result, (err, resultFind) => {
        if (!err) {
          res.status(200).send(resultFind);
        } else {
          return res.status(500).send({
            message: err.message,
          });
        }
      });
    } else {
      return res.status(500).send({
        message: err.message,
      });
    }
  });
}
function findAllToppingForAdmin(req, res) {
  toppingModels.findAllByIdMerchant(
    req.query.id_merchant,
    (err, resultFind) => {
      if (!err) {
        res.status(200).send(resultFind);
      } else {
        return res.status(500).send({
          message: err.message,
        });
      }
    }
  );
}
function getAllByMerchant(req, res) {
  merchantModels.getMerchantByIdAccount(req.decoded.id_user, (err, id) => {
    if (!err) {
      toppingModels.findAllByIdMerchant(id, (err, resultFind) => {
        if (!err) {
          res.status(200).send(resultFind);
        } else {
          return res.status(500).send({
            message: err.message,
          });
        }
      });
    }
  });
}

function Create(req, res) {
  let body = req.body;
  merchantModels.getMerchantByIdAccount(req.user.id_user, (err, result) => {
    if (!err) {
      const topping = new toppingModels({
        id_topping: unit._randomToppingId(),
        name: body.name,
        price: body.price,
        id_merchant: result,
        is_active: true,
        is_enable: true,
      });
      toppingModels.Create(topping, (err, result) => {
        if (!err) {
          if (!err) {
            res.status(200).send(result);
          } else {
            return res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Customer.",
            });
          }
        }
      });
    } else {
      return res.status(500).send({
        message: err.message,
      });
    }
  });
}

function UpdateActive(req, res) {
  if (req.body.is_active && req.body.id_topping) {
    merchantModels.getMerchantByIdAccount(req.user.id_user, (err, result1) => {
      if (!err) {
        toppingModels.findOne(req.body.id_topping, (err, result) => {
          if (!err) {
            if (result.id_merchant == result1) {
              result.is_active = req.body.is_active;
              toppingModels.Update(result, (err, result) => {
                if (!err) {
                  res.status(200).send(result);
                } else {
                  return res.status(500).send({
                    message: err.message,
                  });
                }
              });
            } else {
              return res.status(403).send({
                status: false,
                message: "Access Denied",
              });
            }
          }
        });
      } else {
        return res.status(500).send({
          message: err.message,
        });
      }
    });
  } else {
    return res.status(401).send({
      message: "Content not empty",
    });
  }
}

function UpdateInfo(req, res) {
  if (req.body.name && req.body.id_topping && req.body.price) {
    merchantModels.getMerchantByIdAccount(req.user.id_user, (err, result1) => {
      if (!err) {
        console.log(req.body.id_topping);
        toppingModels.findOne(req.body.id_topping, (err, result) => {
          if (!err) {
            if (result.id_merchant == result1) {
              result.name = req.body.name;
              result.price = req.body.price;
              toppingModels.Update(result, (err, result) => {
                if (!err) {
                  res.status(200).send({
                    status: true,
                    message: "Updated",
                  });
                } else {
                  return res.status(500).send({
                    message: err.message,
                  });
                }
              });
            } else {
              return res.status(403).send({
                status: false,
                message: "Access Denied",
              });
            }
          }
        });
      } else {
        return res.status(500).send({
          message: err.message,
        });
      }
    });
  } else {
    return res.status(401).send({
      message: "Content not empty",
    });
  }
}

function Delete(req, res) {
  if (req.body.id_topping || req.params.id_topping || req.params.id) {
    merchantModels.getMerchantByIdAccount(req.user.id_user, (err, result1) => {
      if (!err) {
        let data = req.body.id_topping
          ? req.body.id_topping
          : req.params.id
          ? req.params.id
          : req.params.id_topping;
        console.log(data);
        toppingModels.findOne(data, (err, result) => {
          if (!err) {
            if (result.id_merchant == result1) {
              result.is_enable = false;
              toppingModels.Update(result, (err, result) => {
                if (!err) {
                  res.status(200).send({
                    status: true,
                    message: "Deleted",
                  });
                } else {
                  return res.status(500).send({
                    message: err.message,
                  });
                }
              });
            } else {
              return res.status(403).send({
                status: false,
                message: "Access Denied",
              });
            }
          }
        });
      } else {
        return res.status(500).send({
          message: err.message,
        });
      }
    });
  } else {
    return res.status(401).send({
      message: "Content not empty",
    });
  }
}

module.exports = {
  Create: Create,
  UpdateActive: UpdateActive,
  UpdateInfo: UpdateInfo,
  Delete: Delete,
  findAllByIdMerchant: findAllByIdMerchant,
  findAllToppingForAdmin: findAllToppingForAdmin,
  getAllByMerchant: getAllByMerchant,
};
