const requestModel = require("../models/request.Model");
const requestUpdateProduct = require("../models/requestUpdateFood.Model");
const merchantModel = require("../models/merchant.Model");
const adminModel = require("../models/admin.Model");
const productModel = require("../models/product.Model");
const Unit = require("../unit/randomString");

function _RequestFromMerchant(req, res) {
  // Gởi yêu cầu suport
  adminModel.randomAssignment((err, resultModelAss) => {
    if (!err) {
      merchantModel.getMerchantByIdAccount(req.decoded.id_user, (err, data) => {
        if (!err && data) {
          requestModel.findPenning(data, (err, result) => {
            if (!err) {
              if (result) {
                let date1 = new Date(result.createAt);
                let date2 = new Date();
                let date =
                  Math.abs(date2.getTime() - date1.getTime()) /
                  (1000 * 3600 * 24);
                if (date * 24 >= (1 / 60) * 5) {
                  if (!err) {
                    let createAt = new Date();
                    console.log(req.body.id_question);
                    let Request = new requestModel({
                      id_request: Unit._randomRequestId(),
                      note: req.body.note,
                      createAt: createAt,
                      updateAt: null,
                      id_merchant: data,
                      id_admin: resultModelAss.id_admin,
                      id_question: req.body.id_question,
                      state: "New",
                    });

                    requestModel.Create(Request, (err, result) => {
                      if (!err) {
                        res.status(200).send({
                          status: true,
                          message: "Sent Request Successfull",
                        });
                      } else {
                        res.status(401).send({
                          status: false,
                          message: "Fail",
                        });
                      }
                    });
                  } else {
                    res.status(401).send({
                      status: false,
                      message: "Fail id Merchant",
                    });
                  }
                } else {
                  res.status(200).send({
                    status: false,
                    message:
                      "Staff is processing will contact with you later, try again in 5 minute.",
                  });
                }
              } else {
                if (!err) {
                  let createAt = new Date();
                  let Request = new requestModel({
                    id_request: Unit._randomRequestId(),
                    note: req.body.note,
                    createAt: createAt,
                    updateAt: null,
                    id_merchant: data,
                    id_admin: resultModelAss.id_admin,
                    id_question: req.body.id_question,
                    state: "New",
                  });

                  requestModel.Create(Request, (err, result) => {
                    if (!err) {
                      res.status(200).send({
                        status: true,
                        message: "Sent Request Successfull",
                      });
                    } else {
                      res.status(401).send({
                        status: false,
                        message: "Fail",
                      });
                    }
                  });
                } else {
                  res.status(401).send({
                    status: false,
                    message: "Fail id Merchant",
                  });
                }
              }
            } else {
              res.status(200).send({
                status: false,
                message: "Try again in few minute.",
              });
            }
          });
        } else {
          res.status(401).send({
            status: false,
            message: "Merchant not exist",
          });
        }
      });
    } else {
      res.status(401).send(err);
    }
  });
}

function _updateStateRequest(req, res) {
  console.log(req.body);
  if (req.body.id_request && req.body.state)
    requestModel.FindOneById(req.body.id_request, (err, result) => {
      if (!err) {
        result.state = req.body.state;
        requestModel.Update(result, (err, resultUpdate) => {
          if (!err) {
            console.log(resultUpdate);
          } else {
            console.log(err);
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

function _getAllRequest_For_Administrator(req, res) {
  requestModel._getAllRequest_For_Administrator(
    req.user.id_admin,
    (err, result) => {
      if (!err) {
        if (result.length > 0) {
          result.forEach((item) => {
            try {
              item.note = JSON.parse(item.note);
            } catch (err) {
              item.note = item.note;
              //console.log("Wanning: " + err.message.yellow.italic);
            }
            item.priority = formatPriority(item.createAt);
          });
          res.status(200).send(result);
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(401).send({
          status: false,
          message: "Merchant not exist",
        });
      }
    }
  );
}

function _assignForStaff(req, res) {
  if (req.body.id_request && req.body.id_admin) {
    let id_request = req.body.id_request;
    let id_admin = req.body.id_admin;
    console.log(id_request);
    console.log(id_admin);
    requestModel.FindOneById(id_request, (err, result) => {
      if (!err && result) {
        result.id_admin = id_admin;
        result.state = "Penning";
        requestModel.Update(result, (err, result) => {
          if (!err) {
            res.status(200).send({
              status: true,
              message: "Updated",
              id: id_admin,
            });
          } else {
            res.status(401).send({
              status: false,
              message: err,
            });
          }
        });
      } else {
        res.status(401).send({
          status: false,
          message: err,
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content non empty.",
    });
  }
}
function assignUpdateFood(req, res) {
  if (req.body.id_request && req.body.id_admin) {
    let id_request = req.body.id_request;
    let id_admin = req.body.id_admin;
    console.log(id_request);
    console.log(id_admin);
    requestModel.FindReqUpdate(id_request, (err, result) => {
      if (!err && result) {
        result.id_admin = id_admin;
        result.state = "Penning";
        requestModel.UpdateReqFood(result, (err, result) => {
          if (!err) {
            res.status(200).send({
              status: true,
              message: "Updated",
              id: id_admin,
            });
          } else {
            res.status(401).send({
              status: false,
              message: err,
            });
          }
        });
      } else {
        res.status(401).send({
          status: false,
          message: err,
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content non empty.",
    });
  }
}

function formatPriority(createAt) {
  let date1 = new Date(createAt);
  let date2 = new Date();
  let time =
    (Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)) * 24;
  if (time <= 6) {
    return "Low";
  } else if (time > 6 && time <= 12) {
    return "Medium";
  } else if (time > 12 && time < 24) {
    return "Hight";
  } else {
    return "ASAP";
  }
}

function requestUpdateFood(req, res) {
  let request = req.body;
  //Select Info Food
  //Create new UpdateFood
  productModel.findOne(request.id_product, (err, row) => {
    let tempProduct = row[0];
    console.log(tempProduct);
    if (!err) {
      if (tempProduct.state === "Processing") {
        res.status(401).send({
          status: true,
          message: "Fail",
        });
      } else {
        let tempRequest = {
          id_request: Unit._uuidv4(),
          id_merchant: tempProduct.id_merchant,
          id_product: tempProduct.id_product,
          id_admin: "AD-1624252284435-464189e89dc307d7161",
          note: request.note,
          createAt: new Date(),
          updateAt: new Date(),
          state: "New",
          priceOld: tempProduct.price,
          priceNew: request.priceNew,
          nameOld: tempProduct.name_product,
          nameNew: request.name_product,
          dicriptionsOld: tempProduct.dicriptions,
          dicriptionsNew: request.dicriptionsNew,
          discountOld: tempProduct.discount,
          discountNew: request.discountNew,
        };
        console.log(tempRequest);
        requestUpdateProduct.Create(tempRequest, (errCreate, resultCreate) => {
          if (!errCreate) {
            tempProduct.state = "Processing";
            productModel.Update(tempProduct, (errUpdate, rowsUpdate) => {
              if (!errUpdate) {
                res.status(200).send({
                  status: true,
                  message: "Sent Request Success",
                });
              } else {
                console.log(errUpdate);
              }
            });
          } else {
            console.log(errCreate);
            res.status(401).send({
              status: true,
              message: "Fail",
            });
          }
        });
      }
    }
  });
}
function getReqUpdateFood(req, res) {
  requestModel.getReqUpdateFood((err, result) => {
    if (!err) {
      if (result.length === 1) {
        result[[0]].priority = formatPriority(result[0].createAt);
        res.status(200).send(result);
      } else {
        result.forEach((item) => {
          item.priority = formatPriority(item.createAt);
        });
        res.status(200).send(result);
      }
    } else {
      res.status(203).send({ status: true, Message: "Get Data Fail" });
    }
  });
}
function getReqUpdateFoodForStaff(req, res) {
  if (req.decoded.id_admin) {
    let id_admin = req.decoded.id_admin;
    requestModel.getReqUpdateFoodForStaff(id_admin, (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(203).send({ status: true, Message: "Get Data Fail" });
      }
    });
  }
}

module.exports = {
  RequestFromMerchant: _RequestFromMerchant,
  _updateStateRequest: _updateStateRequest,
  _getAllRequest_For_Administrator: _getAllRequest_For_Administrator,
  _assignForStaff: _assignForStaff,
  assignUpdateFood: assignUpdateFood,
  requestUpdateFood: requestUpdateFood,
  getReqUpdateFood: getReqUpdateFood,
  getReqUpdateFoodForStaff: getReqUpdateFoodForStaff,
};
