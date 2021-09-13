const MerchantModel = require("../models/merchant.Model");
const orderModels = require("../models/order.Model");
const UserModels = require("../models/user.Model");
const shipperModels = require("../models/shipper.Model");
const unit = require("../unit/randomString");
const fcmController = require("./fcm.Controller");

function Oder(req, res) {
  let body = req.body;
  let now = new Date();
  body.timeLine = [];

  shipperModels.random(" ", (errShipper, rowShipper) => {
    ////Tìm được tài xế
    if (!errShipper && rowShipper) {
      body.name_user = req.user.first_name + " " + req.user.last_name;
      body.shipper = rowShipper;

      const oder = new orderModels({
        id_oder: body.id_oder || unit._randomOderId(),
        id_user: body.id_user,
        id_merchant: body.id_merchant,
        createAt: now,
        deli_address: body.deli_address,
        deli_phone: body.deli_phone,
        applicableFee: body.applicableFee,
        applicableDistance: body.applicableDistance,
        subtotal: body.subtotal,
        state: "New",
        note: body.note,
        coupon: body.coupon ? JSON.stringify(body.coupon) : 0,
        paidBy: JSON.stringify(body.paidBy),
      });

      orderModels.Create(oder, (err, result) => {
        if (!err) {
          body.id_oder = oder.id_oder;
          body.products.forEach((element) => {
            let item = {
              id_detail: unit._randomOderId(),
              id_product: element.id_product,
              id_order: oder.id_oder,
              quantity: element.quantity,
              sub_price: element.sub_price,
              unit_price: element.unit_price,
              note: element.note,
            };
            orderModels.CreateOderDetail(item, (err, resultDetail) => {
              if (!err) {
                console.log("Detail", resultDetail);
              }
            });

            let extra_item = {
              id_extra_item: unit._randomAttributeValueId(),
              id_detail: item.id_detail,
              attribute: JSON.stringify(element.attribute),
              addOn: JSON.stringify(element.topping),
            };

            orderModels.CreateOderExtraItem(extra_item, (err, resultExtra) => {
              if (!err) {
                console.log("Extra", resultExtra);
              }
            });
          });

          let TimeLine = {
            id_oderTimeLine: unit._uuidv4(),
            id_order: oder.id_oder,
            point: now,
            state: "Created",
          };

          // console.log(body);
          orderModels.CreateOderTimeline(TimeLine, (err, resultTimeLine) => {
            if (!err) {
              console.log("TimeLine", resultTimeLine);
            } else {
              console.log(err);
            }
          });

          TimeLine.point = new Date(TimeLine.point).toLocaleString();
          body.timeLine.push(TimeLine);

          if (body.coupon) {
            orderModels.CreateOderVoucher(
              {
                id_oderVoucher: unit._uuidv4(),
                id_order: oder.id_oder,
                id_voucher: body.coupon.id_voucher,
              },
              (err, resultOder_Voucher) => {
                if (!err) {
                  console.log("Voucher", resultOder_Voucher);
                }
              }
            );
          }

          shipperModels.FindOneById(
            rowShipper.shipper_id,
            (errFindShipper, RowShipper) => {
              RowShipper.is_active = 1;

              shipperModels.Update(RowShipper, (errUpdate, rowUpdate) => {
                if (!errUpdate) {
                  console.log("Giu tai xe");
                }
              });
            }
          );

          orderModels.CreateOrderShipper(
            {
              oder_shiper_id: unit._uuidv4(),
              status: "Waiting",
              receivedAt: new Date(),
              shipper_id: rowShipper.shipper_id,
              id_oder: body.id_oder,
            },
            (errCreateShipper, rowCreateShipper) => {
              if (!errCreateShipper) {
                fcmController.sentToSingleDevice(
                  {
                    title: "Đơn hàng của bạn",
                    body: "Đã tìm được tài xế.",
                    channelId: "notificationImportant",
                    token: req.user.login_at,
                  },
                  (errSentClient, resSentClient) => {
                    if (!errSentClient) {
                      console.log("Sent to device Client" + req.user.login_at);
                    }
                  }
                );

                fcmController.sentToSingleDevice(
                  {
                    title: "Đơn hàng mới",
                    body: `Bạn có đơn hàng đến ${body.deli_address}`,
                    channelId: "notificationImportant",
                    token: rowShipper.login_at,
                  },
                  (errSentRider, resSentRider) => {
                    if (!errSentRider) {
                      console.log("Sent to device " + rowShipper.login_at);
                    }
                  }
                );

                res.status(200).send(body);

                //console.log("Order Shipper", orderShipper);
              }
            }
          );
        }
      });
    } else {
      fcmController.sentToSingleDevice(
        {
          title: "Đơn hàng bị huỷ",
          body: "Hiện các tài xế đều bận, vui lòng thử lại sau.",
          channelId: "notificationImportant",
          token: req.user.login_at,
        },
        (errSentClient, resSentClient) => {
          if (!errSentClient) {
            console.log("Sent to device Client" + body.login_at);
          }
        }
      );

      res.status(401).send({
        status: false,
        message: "Không thể tìm thấy tài xế",
      });
    }
  });
}

// GET ORER

function getOrder(req, res) {
  orderModels.FindOneOrder(req.params.id_order, (err, result) => {
    if (!err && result) {
      result.paidBy = JSON.parse(result.paidBy);
      if (result.coupon != "0") {
        result.coupon = JSON.parse(result.coupon);
      } else {
        delete result.coupon;
      }

      orderModels.GetProductAndExtraItem(
        req.params.id_order,
        (err, resultDetail) => {
          if (!err) {
            resultDetail.forEach((item) => {
              try {
                item.attribute = JSON.parse(item.attribute);
              } catch {
                console.log("Has issue parse JSON attribute");
              }

              try {
                item.topping = JSON.parse(item.topping);
              } catch {
                console.log("Has issue parse JSON topping");
              }
            });
            result.products = resultDetail;
            orderModels.GetTimeLineOrder(
              req.params.id_order,
              (err, resultTimeline) => {
                if (!err) {
                  result.timeLine = resultTimeline.sort((a, b) =>
                    a.point < b.point ? -1 : 1
                  );
                  let i = 0;
                  result.timeLine.forEach((item) => {
                    result.timeLine[i].point = new Date(
                      result.timeLine[i].point
                    ).toLocaleString();
                    i++;
                  });
                  shipperModels.getInfoShipperOrder(
                    req.params.id_order,
                    (err, shipper) => {
                      if (!err) {
                        result.shipper = shipper;
                        console.log(result);
                        res.status(200).send(result);
                      }
                    }
                  );
                } else {
                  console.log(err);
                }
              }
            );
          } else {
            console.log(err);
          }
        }
      );
    } else {
      console.log(err);
    }
  });
}

function getOrderForDriver(req, res) {
  orderModels.FindOneOrder(req.params.id_order, (err, result) => {
    if (!err) {
      result.paidBy = JSON.parse(result.paidBy);
      result.name_client = result.name_user;
      result.expPrice = parseInt(calculatorOrder_PaidForMerchant(result));
      result.fee_ship = parseInt(calculatorOrder_PaidForShipper(result));
      result.collectClient = parseInt(calculatorOrder_PaidForClient(result));

      if (result.coupon != "0") {
        result.coupon = JSON.parse(result.coupon).expPrice;
      } else {
        result.coupon = 0;
      }

      orderModels.GetProductAndExtraItem(
        req.params.id_order,
        (err, resultDetail) => {
          if (!err) {
            resultDetail.forEach((item) => {
              try {
                item.attribute = JSON.parse(item.attribute);
              } catch {
                console.log("Has issue parse JSON attribute");
              }

              try {
                item.topping = JSON.parse(item.topping);
              } catch {
                console.log("Has issue parse JSON topping");
              }
            });
            result.products = resultDetail;
            orderModels.GetTimeLineOrder(
              req.params.id_order,
              (err, resultTimeline) => {
                if (!err) {
                  result.timeLine = resultTimeline.sort((a, b) =>
                    a.point < b.point ? -1 : 1
                  );
                  let i = 0;
                  result.timeLine.forEach((item) => {
                    result.timeLine[i].point = new Date(
                      result.timeLine[i].point
                    ).toLocaleString();
                    i++;
                  });
                  shipperModels.getInfoShipperOrder(
                    req.params.id_order,
                    (err, shipper) => {
                      if (!err) {
                        console.log(shipper);
                        result.shipper = shipper;
                        if (
                          result.shipper.shipper_id === req.decoded.shipper_id
                        ) {
                          //console.log(result);
                          res.status(200).send(result);
                        } else {
                          res.status(403).send({
                            success: false,
                            message:
                              "Failed to authenticate token. Denied query.",
                          });
                        }
                      }
                    }
                  );
                } else {
                  console.log(err);
                }
              }
            );
          } else {
            console.log(err);
          }
        }
      );
    } else {
      console.log(err);
    }
  });
}

function getOrderForMerchant(req, res) {
  orderModels.FindOneOrder(req.params.id_order, (err, result) => {
    if (!err && result) {
      result.subtotal = parseInt(calculatorOrder_PaidForMerchant(result));
      result.paidBy = JSON.parse(result.paidBy);
      if (result.coupon != "0") {
        result.coupon = JSON.parse(result.coupon);
      } else {
        delete result.coupon;
      }

      orderModels.GetProductAndExtraItem(
        req.params.id_order,
        (err, resultDetail) => {
          if (!err) {
            resultDetail.forEach((item) => {
              try {
                item.attribute = JSON.parse(item.attribute);
              } catch {
                console.log("Has issue parse JSON attribute");
              }

              try {
                item.topping = JSON.parse(item.topping);
              } catch {
                console.log("Has issue parse JSON topping");
              }
            });
            result.products = resultDetail;
            orderModels.GetTimeLineOrder(
              req.params.id_order,
              (err, resultTimeline) => {
                if (!err) {
                  result.timeLine = resultTimeline.sort((a, b) =>
                  a.point < b.point ? -1 : 1
                );
                  let i = 0;
                  result.timeLine.forEach((item) => {
                    result.timeLine[i].point = new Date(
                      result.timeLine[i].point
                    ).toLocaleString();
                    i++;
                  });
                  shipperModels.getInfoShipperOrder(
                    req.params.id_order,
                    (err, shipper) => {
                      if (!err) {
                        result.shipper = shipper;
                        res.status(200).send(result);
                      }
                    }
                  );
                } else {
                  console.log(err);
                }
              }
            );
          } else {
            console.log(err);
          }
        }
      );
    } else {
      console.log(err);
    }
  });
}

// TÍNH TOÁN LẠI TIỀN Ở HÀM NÀY
function getOrderOnGoing(req, res) {
  MerchantModel.getMerchantByIdAccount(req.user.id_user, (err, data) => {
    if (!err) {
      orderModels.findOrderOnGoing(data, (err, result) => {
        if (!err) {
          result.forEach((time) => {
            time.createAt = new Date(time.createAt).toLocaleString();
          });

          res
            .status(200)
            .send(result.sort((a, b) => (a.isSeen > b.isSeen ? 1 : -1)));
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

function getOrderById(req, res) {
  let order_onGoing = [];
  orderModels.findOrderByIdUser(req.user.id_user, (err, result) => {
    if (!err) {
      result.forEach((element) => {
        let date =
          new Date(element.createAt).getHours() +
          ":" +
          new Date(element.createAt).getMinutes();
        try {
          element.coupon = JSON.parse(element.coupon);
        } catch (err) {
          console.log(err.message);
        }
        let items = {
          id_oder: element.id_oder,
          state: element.state,
          createAt: date,
          name_merchant: element.name_merchant,
          total: element.subtotal + element.applicableFee - element.coupon || 0,
          paidBy: JSON.parse(element.paidBy).MethodPayment,
          quantity: element.quantity,
        };
        order_onGoing.push(items);
      });
      res.status(200).send(order_onGoing);
    }
  });
} //Cua hang

function getReviewOrder(req, res) {
  let ResponseData = [];
  shipperModels.reviewOrder(req.user.shipper_id, (err, rows) => {
    if (!err && rows.length > 0) {
      let element = rows[0];
      let itemResponse = {
        id_oder: element.id_oder,
        name_merchant: element.name_merchant,
        locations: element.locations,
        name_client: element.first_name + " " + element.last_name,
        deli_address: element.deli_address,
        expPrice: parseInt(calculatorOrder_PaidForMerchant(element)),
        fee_ship: parseInt(calculatorOrder_PaidForShipper(element)),
        applicableDistance: element.applicableDistance,
        count: element.count,
      };
      ResponseData.push(itemResponse);
      res.status(200).send(ResponseData);
    } else {
      res.status(401).send({
        status: false,
        message: "Data length empty",
      });
    }
  });
} ///Tai Xe

function isSeen(req, res) {
  orderModels.FindOne(req.params.id_oder, (err, result) => {
    if (!err) {
      result = result[0];
      result.isSeen = true;
      orderModels.Update(result, (errUpdate, resultUpdate) => {
        if (!errUpdate) {
          res.status(200).send({
            status: true,
            message: "Success",
          });
        } else {
          console.log(errUpdate);

          res.status(401).send({
            status: false,
            message: err,
          });
        }
      });
    } else {
      console.log(err);
      res.status(401).send({
        status: false,
        message: err,
      });
    }
  });
}

// CANCEL ORDER
function cancelOrder(req, res) {
  if (req.params.id_oder) {
    let now = new Date();
    orderModels.FindOne(req.params.id_oder, (err, result) => {
      if (!err) {
        if (result[0].state != "New") {
          res.status(401).send({
            status: false,
            message: "Cancel Fail, This your order on going.",
          });
        } else {
          result[0].state = "Cancelled";

          orderModels.Update(result[0], (err, resultUpdate) => {
            if (!err) {
              let TimeLine = {
                id_oderTimeLine: unit._uuidv4(),
                id_order: req.params.id_oder,
                point: now,
                state: "Cancelled",
              };

              orderModels.CreateOderTimeline(
                TimeLine,
                (errTimeLine, resultTimeLine) => {
                  if (!errTimeLine) {
                    console.log("TimeLine", resultTimeLine);
                  }
                }
              );

              shipperModels.getInfoShipperOrder(
                req.params.id_oder,
                (errFind, RowShipper) => {
                  shipperModels.FindOneById(
                    RowShipper.shipper_id,
                    (errFindShipper, RowShipper) => {
                      RowShipper.is_active = 0;
                      shipperModels.Update(
                        RowShipper,
                        (errUpdate, rowUpdate) => {
                          if (!errUpdate) {
                            fcmController.sentToSingleDevice(
                              {
                                title: "Đơn hàng bị huỷ",
                                body: `Khách hàng đã yêu cầu huỷ đơn hàng ${result[0].deli_address}.`,
                                channelId: "notificationImportant",
                                token: RowShipper.login_at,
                              },
                              (errSentRider, resSentRider) => {
                                if (!errSentRider) {
                                  console.log("Sent to device Rider");
                                }
                              }
                            );

                            shipperModels.UpdateOrderShipper(
                              {
                                status: "Cancelled",
                                id_oder: req.params.id_oder,
                                shipper_id: RowShipper.shipper_id,
                              },
                              (errUpdateMany, UpdateMany) => {
                                console.log("Tra tai xe");
                              }
                            );
                            console.log("Tra tai xe");
                          }
                        }
                      );
                    }
                  );
                }
              );

              orderModels.CreateLogOrderCancel(
                {
                  id_log_oder: unit._uuidv4(),
                  id_order: req.params.id_oder,
                  stateOder: "Ready",
                  reasonCancel: "Thích thì huỷ",
                  person: "Client",
                },
                (errLog, resultLog) => {
                  if (!errLog) {
                    res.status(200).send({
                      status: true,
                      message: "Cancel Success",
                    });
                  }
                }
              );
            }
          });
        }
      }
    });
  }
}

function getOrderOnGoing(req, res) {
  if (!req.query.state) {
    MerchantModel.getMerchantByIdAccount(req.user.id_user, (err, data) => {
      if (!err) {
        orderModels.findOrderOnGoing(data, (err, result) => {
          if (!err) {
            result.forEach((item) => {
              (item.total = parseInt(calculatorOrder_PaidForMerchant(item))),
                (item.createAt = new Date(item.createAt).toLocaleString());
            });
            res
              .status(200)
              .send(result.sort((a, b) => (a.isSeen > b.isSeen ? 1 : -1)));
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
    MerchantModel.getMerchantByIdAccount(req.user.id_user, (err, data) => {
      if (!err) {
        orderModels.findOrderDone(data, (err, result) => {
          if (!err) {
            result.forEach((item) => {
              (item.total = parseInt(calculatorOrder_PaidForMerchant(item))),
                (item.createAt = new Date(item.createAt).toLocaleString());
            });
            res
              .status(200)
              .send(result.sort((a, b) => (a.isSeen > b.isSeen ? 1 : -1)));
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
}

function merchantCancelOrder(req, res) {
  let body = req.body;
  let now = new Date();
  orderModels.FindOne(body.id_order, (err, result) => {
    if (!err) {
      result = result[0];
      result.state = "Cancelled";
      orderModels.Update(result, (errUpdate, resultUpdate) => {
        if (!errUpdate) {
          let TimeLine = {
            id_oderTimeLine: unit._uuidv4(),
            id_order: body.id_order,
            point: now,
            state: "Cancelled",
          };

          orderModels.CreateOderTimeline(
            TimeLine,
            (errTimeLine, resultTimeLine) => {
              if (!errTimeLine) {
                console.log("TimeLine", resultTimeLine);
              } else {
                res.status(401).send({
                  status: false,
                  message: err,
                });
              }
            }
          );
          shipperModels.getInfoShipperOrder(
            body.id_order,
            (errFind, rowShipper) => {
              shipperModels.FindOneById(
                rowShipper.shipper_id,

                (errFindShipper, RowShipper) => {
                  RowShipper.is_active = 0;

                  fcmController.sentToSingleDevice(
                    {
                      title: "[Huỷ Đơn Hàng] Đơn hàng bị huỷ",
                      body: `Đơn hàng đã huỷ bởi lý do ${body.reason}`,
                      channelId: "notificationImportant",
                      token: RowShipper.login_at,
                    },
                    (errSentClient, resSentClient) => {
                      if (!errSentClient) {
                        console.log(
                          "Sent to device Client" + RowShipper.login_at
                        );
                      }
                    }
                  );

                  UserModels.getUserById(
                    result.id_user,
                    (errGetUserOrder, rowGetUserOrder) => {
                      fcmController.sentToSingleDevice(
                        {
                          title: "[Huỷ Đơn Hàng] Đơn hàng bị huỷ",
                          body: `Đơn hàng đã huỷ bởi lý do ${body.reason}`,
                          channelId: "notificationImportant",
                          token: rowGetUserOrder.login_at,
                        },
                        (errSentClient, resSentClient) => {
                          if (!errSentClient) {
                            console.log(
                              "Sent to device Client" + rowGetUserOrder.login_at
                            );
                          }
                        }
                      );
                    }
                  );

                  shipperModels.Update(RowShipper, (errUpdate, rowUpdate) => {
                    if (!errUpdate) {
                      shipperModels.UpdateOrderShipper(
                        {
                          status: "Cancelled",
                          id_oder: body.id_order,
                          shipper_id: RowShipper.shipper_id,
                        },
                        (errUpdateMany, UpdateMany) => {
                          console.log("Tra tai xe");
                        }
                      );
                    }
                  });
                }
              );
            }
          );
          orderModels.CreateLogOrderCancel(
            {
              id_log_oder: unit._uuidv4(),

              id_order: body.id_order,

              stateOder: "Confirmed",

              reasonCancel: body.reason,

              person: "Merchant",
            },
            (errLog, resultLog) => {
              if (!errLog) {
                res.status(200).send(TimeLine);
              } else {
                console.log(errLog);
                res.status(401).send({
                  status: false,
                  message: err,
                });
              }
            }
          );
        } else {
          console.log(errUpdate);

          res.status(401).send({
            status: false,
            message: err,
          });
        }
      });
    } else {
      console.log(err);
      res.status(401).send({
        status: false,
        message: err,
      });
    }
  });
}

//ACCEPT ORDER
function acceptOrder(req, res) {
  console.log(req.params.id_order);
  if (req.params.id_order) {
    let now = new Date();
    orderModels.FindOne(req.params.id_order, (errOrder, rowOrder) => {
      if (!errOrder) {
        if (rowOrder[0].state != "Cancelled") {
          rowOrder[0].state = "Preparing";

          orderModels.Update(rowOrder[0], (errUpdate, resultUpdate) => {
            if (!errUpdate) {
              let TimeLine = {
                id_oderTimeLine: unit._uuidv4(),
                id_order: req.params.id_order,
                point: now,
                state: "Preparing",
              };

              orderModels.CreateOderTimeline(
                TimeLine,
                (errTimeLine, resultTimeLine) => {
                  if (!errTimeLine) {
                    console.log("TimeLine", resultTimeLine);
                  }
                }
              );

              shipperModels.UpdateOrderShipper(
                {
                  status: "Preparing",
                  id_oder: req.params.id_order,
                  shipper_id: req.decoded.shipper_id,
                },
                (errUpdateMany, UpdateMany) => {
                  if (!UpdateMany) {
                    console.log("Đã nhận đơn");
                  } else {
                    console.log(UpdateMany);
                  }
                }
              );

              MerchantModel.getMerchantById(
                rowOrder[0].id_merchant,
                (errGetMerchant, rowGetMerchant) => {
                  if (!errGetMerchant) {
                    // console.log(rowGetMerchant);
                    UserModels.getUserById(
                      rowGetMerchant[0].id_user,
                      (errGetUser, rowGetUser) => {
                        //console.log(rowGetUser);
                        fcmController.sentToSingleDevice(
                          {
                            title: "Đơn hàng mới",
                            body: "Bạn có một đơn hàng mới.",
                            channelId: "notificationImportant",
                            token: rowGetUser.login_at,
                          },
                          (errSentClient, resSentClient) => {
                            if (!errSentClient) {
                              console.log(
                                "Sent to device Client" + rowGetUser.login_at
                              );
                            }
                          }
                        );
                      }
                    );

                    UserModels.getUserById(
                      rowOrder[0].id_user,
                      (errGetUserOrder, rowGetUserOrder) => {
                        fcmController.sentToSingleDevice(
                          {
                            title: "[Đang chuẩn bị] Đơn hàng của bạn",
                            body: "Đơn hàng của bạn đang được chuẩn bị.",
                            channelId: "notificationImportant",
                            token: rowGetUserOrder.login_at,
                          },
                          (errSentClient, resSentClient) => {
                            if (!errSentClient) {
                              console.log(
                                "Sent to device Client" +
                                  rowGetUserOrder.login_at
                              );
                            }
                          }
                        );
                      }
                    );
                  }
                }
              );

              res.status(200).send({
                status: true,
                message: "Preparing",
              });
            } else {
              res.status(401).send({
                status: false,
                message: errUpdate.message,
              });
            }
          });
        } else {
          res.status(401).send({
            status: false,
            message: "Content not null3",
          });
        }
      } else {
        res.status(401).send({
          status: false,
          message: errOrder,
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content not null1",
    });
  }
}

//EJECT ORDER
function ejectOrder(req, res) {
  let id_order = req.params.id_order;
  if (id_order && req.body.reason) {
    orderModels.FindOneOrder(id_order, (errGetOrder, rowGetOrder) => {
      shipperModels.getInfoShipperOrder(id_order, (errFind, oldShipper) => {
        shipperModels.FindOneById(
          oldShipper.shipper_id,
          (errFindShipper, rowFindShipper) => {
            shipperModels.random(
              oldShipper.shipper_id,
              (errNewShipper, newShipper) => {
                //OrderShipper -> Cancel
                //Trả tài củ
                //Ghi Log cùng với lý do
                //Thông báo cảnh cáo.
                shipperModels.UpdateOrderShipper(
                  {
                    status: "Cancelled",
                    id_oder: id_order,
                    shipper_id: oldShipper.shipper_id,
                  },
                  (errUpdateMany, UpdateMany) => {
                    console.log("Trả tài xế cũ");
                  }
                );
                rowFindShipper.is_active = 0;

                shipperModels.Update(
                  rowFindShipper,
                  (errUpdateShiperOld, rowUpdateShiperOld) => {
                    orderModels.CreateLogOrderCancel(
                      {
                        id_log_oder: unit._uuidv4(),
                        id_order: id_order,
                        stateOder: "Ready",
                        reasonCancel: req.body.reason,
                        person: "Shipper",
                      },
                      (errLog, resultLog) => {
                        if (!errLog) {
                        }
                      }
                    );

                    fcmController.sentToSingleDevice(
                      {
                        title: "[Đã Huỷ Đơn] Đơn hàng của bạn",
                        body: `Việc liên tục huỷ đơn, sẽ ảnh hưởng đến uy tín của tài xế.`,
                        channelId: "notificationImportant",
                        token: rowFindShipper.login_at,
                      },
                      (errSentRider, resSentRider) => {
                        if (!errSentRider) {
                          console.log(
                            "Sent to device " + rowFindShipper.login_at
                          );
                        }
                      }
                    );
                  }
                );

                if (!errNewShipper && newShipper) {
                  //OrderShipperNew
                  //Giữ Tài Xế
                  //Thông báo đổi tài
                  orderModels.CreateOrderShipper(
                    {
                      oder_shiper_id: unit._uuidv4(),
                      status: "Waiting",
                      receivedAt: new Date(),
                      shipper_id: newShipper.shipper_id,
                      id_oder: id_order,
                    },
                    (errCreateShipper, rowCreateShipper) => {
                      if (!errCreateShipper) {
                        fcmController.sentToSingleDevice(
                          {
                            title: "Đơn hàng mới",
                            body: `Bạn có đơn hàng đến ${rowGetOrder.deli_address}`,
                            channelId: "notificationImportant",
                            token: newShipper.login_at,
                          },
                          (errSentRider, resSentRider) => {
                            if (!errSentRider) {
                              console.log(
                                "Sent to device " + newShipper.login_at
                              );
                            }
                          }
                        );
                      }
                    }
                  );

                  shipperModels.FindOneById(
                    newShipper.shipper_id,
                    (errFind, RowShipperNew) => {
                      RowShipperNew.is_active = 1;

                      shipperModels.Update(
                        RowShipperNew,
                        (errUpdateShipper, rowUpdateShipper) => {
                          if (!errUpdateShipper) {
                            console.log("Giữ Tài Xế Mới");
                          }
                        }
                      );

                      UserModels.getUserById(
                        rowGetOrder.id_user,
                        (errGetUserOrder, rowGetUserOrder) => {
                          fcmController.sentToSingleDevice(
                            {
                              title: "[Đã tìm thấy tài xế] Đơn hàng của bạn",
                              body: `Đơn hàng đang chờ tài xế xác nhận.`,
                              channelId: "notificationImportant",
                              token: rowGetUserOrder.login_at,
                            },
                            (errSentClient, resSentClient) => {
                              if (!errSentClient) {
                                console.log(
                                  "Sent to device Client" +
                                    rowGetUserOrder.login_at
                                );
                              }
                            }
                          );
                        }
                      );
                    }
                  );
                } else {
                  //Thông báo ko có tài
                  //Huỷ đơn
                  //Log
                  UserModels.getUserById(
                    rowGetOrder.id_user,
                    (errGetUserOrder, rowGetUserOrder) => {
                      fcmController.sentToSingleDevice(
                        {
                          title: "[Đơn đã bị huỷ] Đơn hàng của bạn",
                          body: `Tất cả tài xế đều bận, vui lòng thử lại sau.`,
                          channelId: "notificationImportant",
                          token: rowGetUserOrder.login_at,
                        },
                        (errSentClient, resSentClient) => {
                          if (!errSentClient) {
                            console.log(
                              "Sent to device Client" + rowGetUserOrder.login_at
                            );
                          }
                        }
                      );
                    }
                  );

                  orderModels.CreateOderTimeline(
                    {
                      id_oderTimeLine: unit._uuidv4(),
                      id_order: id_order,
                      point: new Date(),
                      state: "Cancelled",
                    },
                    (errTimeLine, resultTimeLine) => {
                      if (!errTimeLine) {
                        console.log("TimeLine", resultTimeLine);
                      }
                    }
                  );

                  orderModels.FindOne(
                    id_order,
                    (errDetailOrder, rowDetailOrder) => {
                      rowDetailOrder = rowDetailOrder[0];
                      rowDetailOrder.state = "Cancelled";

                      orderModels.Update(
                        rowDetailOrder,
                        (errUpdateEject, rowUpdateEject) => {
                          orderModels.CreateLogOrderCancel(
                            {
                              id_log_oder: unit._uuidv4(),
                              id_order: id_order,
                              stateOder: "Ready",
                              reasonCancel: `{"Reason":"Không tìm được tài xế", "old_Shipper":"${oldShipper.shipper_id}"}`,
                              person: "Rider",
                            },
                            (errLog, resultLog) => {
                              if (!errLog) {
                                res.status(200).send({
                                  status: true,
                                  message: "Đã từ chối",
                                });
                              } else {
                                console.log(errLog);
                                res.status(401).send({
                                  status: false,
                                  message: err,
                                });
                              }
                            }
                          );
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        );
      });
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content not null",
    });
  }
}

///PICKUP ORDER
function pickUpOrder(req, res) {
  if (req.params.id_order) {
    let now = new Date();

    orderModels.FindOne(req.params.id_order, (errOrder, result) => {
      if (!errOrder) {
        result[0].state = "Delivering";

        orderModels.Update(result[0], (errUpdate, resultUpdate) => {
          if (!errUpdate) {
            let TimeLine = {
              id_oderTimeLine: unit._uuidv4(),
              id_order: req.params.id_order,
              point: now,
              state: "Delivering",
            };

            orderModels.CreateOderTimeline(
              TimeLine,
              (errTimeLine, resultTimeLine) => {
                if (!errTimeLine) {
                  console.log("TimeLine", resultTimeLine);
                }
              }
            );

            shipperModels.UpdateOrderShipper(
              {
                status: "Delivering",
                id_oder: req.params.id_order,
                shipper_id: req.decoded.shipper_id,
              },
              (errUpdateMany, UpdateMany) => {
                console.log("Đang giao hàng");
              }
            );

            UserModels.getUserById(
              result[0].id_user,
              (errGetUserOrder, rowGetUserOrder) => {
                fcmController.sentToSingleDevice(
                  {
                    title: "[Đang vận chuyển] Đơn hàng của bạn",
                    body: "Tài xế đã lấy hàng, đang trên đường vận chuyển.",
                    channelId: "notificationImportant",
                    token: rowGetUserOrder.login_at,
                  },
                  (errSentClient, resSentClient) => {
                    if (!errSentClient) {
                      console.log(
                        "Sent to device Client" + rowGetUserOrder.login_at
                      );
                    }
                  }
                );
              }
            );

            res.status(200).send({
              status: true,
              message: "Delivering",
            });
          }
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Content not null",
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content not null",
    });
  }
}

//DELIVERED ORDER
function deliveredOrder(req, res) {
  if (req.params.id_order) {
    let now = new Date();

    orderModels.FindOne(req.params.id_order, (errOrder, result) => {
      if (!errOrder) {
        result[0].state = "Delivered";

        orderModels.Update(result[0], (errUpdate, resultUpdate) => {
          if (!errUpdate) {
            let TimeLine = {
              id_oderTimeLine: unit._uuidv4(),
              id_order: req.params.id_order,
              point: now,
              state: "Delivered",
            };

            orderModels.CreateOderTimeline(
              TimeLine,
              (errTimeLine, resultTimeLine) => {
                if (!errTimeLine) {
                  console.log("TimeLine", resultTimeLine);
                }
              }
            );

            shipperModels.getInfoShipperOrder(
              req.params.id_order,
              (errFind, RowShipper) => {
                shipperModels.FindOneById(
                  RowShipper.shipper_id,
                  (errFindShipper, RowShipper) => {
                    RowShipper.is_active = 0;

                    shipperModels.Update(RowShipper, (errUpdate, rowUpdate) => {
                      if (!errUpdate) {
                        shipperModels.UpdateOrderShipper(
                          {
                            status: "Delivered",
                            id_oder: req.params.id_order,
                            shipper_id: RowShipper.shipper_id,
                          },
                          (errUpdateMany, UpdateMany) => {
                            shipperModels.getInfoShipperOrder(
                              req.params.id_order,
                              (errFind, RowShipper) => {
                                shipperModels.FindOneById(
                                  RowShipper.shipper_id,
                                  (errFindShipper, RowShipper) => {
                                    RowShipper.is_active = 0;

                                    shipperModels.Update(
                                      RowShipper,
                                      (errUpdate, rowUpdate) => {
                                        if (!errUpdate) {
                                          let body = {
                                            status: "Delivered",
                                            id_oder: req.params.id_oder,
                                            shipper_id: RowShipper.shipper_id,
                                          };

                                          MerchantModel.getMerchantById(
                                            result[0].id_merchant,
                                            (
                                              errGetMerchant,
                                              rowGetMerchant
                                            ) => {
                                              if (!errGetMerchant) {
                                                // console.log(rowGetMerchant);
                                                UserModels.getUserById(
                                                  rowGetMerchant[0].id_user,
                                                  (errGetUser, rowGetUser) => {
                                                    //console.log(rowGetUser);
                                                    fcmController.sentToSingleDevice(
                                                      {
                                                        title:
                                                          "[Thành Công] Đơn hàng của bạn",
                                                        body: `Đơn hàng ${result[0].id_oder} đã giao hoàn tất.`,
                                                        channelId:
                                                          "notificationImportant",
                                                        token:
                                                          rowGetUser.login_at,
                                                      },
                                                      (
                                                        errSentClient,
                                                        resSentClient
                                                      ) => {
                                                        if (!errSentClient) {
                                                          console.log(
                                                            "Sent to device Client" +
                                                              rowGetUser.login_at
                                                          );
                                                        }
                                                      }
                                                    );
                                                  }
                                                );

                                                UserModels.getUserById(
                                                  result[0].id_user,
                                                  (
                                                    errGetUserOrder,
                                                    rowGetUserOrder
                                                  ) => {
                                                    fcmController.sentToSingleDevice(
                                                      {
                                                        title:
                                                          "[Đã giao] Đơn hàng của bạn",
                                                        body: "Đơn hàng đã giao thành thành công, chúc bạn ngon miệng.",
                                                        channelId:
                                                          "notificationImportant",
                                                        token:
                                                          rowGetUserOrder.login_at,
                                                      },
                                                      (
                                                        errSentClient,
                                                        resSentClient
                                                      ) => {
                                                        if (!errSentClient) {
                                                          console.log(
                                                            "Sent to device Client" +
                                                              rowGetUserOrder.login_at
                                                          );
                                                        }
                                                      }
                                                    );
                                                  }
                                                );
                                              }
                                            }
                                          );

                                          fcmController.sentToSingleDevice(
                                            {
                                              title:
                                                "[Thành công] Đơn hàng của bạn",
                                              body: `Chúc mừng bạn đã hoàn tất đơn hàng.`,
                                              channelId:
                                                "notificationImportant",
                                              token: RowShipper.login_at,
                                            },
                                            (errSentRider, resSentRider) => {
                                              if (!errSentRider) {
                                                console.log(
                                                  "Sent to device " +
                                                    RowShipper.login_at
                                                );
                                              }
                                            }
                                          );

                                          shipperModels.UpdateOrderShipper(
                                            body,
                                            (errUpdateMany, UpdateMany) => {
                                              res.status(200).send({
                                                status: true,
                                                message: "Delivered",
                                              });
                                            }
                                          );
                                          console.log("Tra tai xe");
                                        }
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    });
                  }
                );
              }
            );
          } else {
            res.status(401).send({
              status: false,
              message: "Content not null",
            });
          }
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Content not null",
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content not null",
    });
  }
}

function calculatorOrder_PaidForMerchant(element) {
  if (element.coupon != "0") {
    let coupon = JSON.parse(element.coupon);
    if (coupon.merchant_id) {
      let paidBefore = element.subtotal - element.subtotal * (10 / 100);
      let paid = paidBefore - paidBefore * (25 / 100) - coupon.expPrice;
      return paid;
    } else {
      let paidBefore = element.subtotal - element.subtotal * (10 / 100);
      let paid = paidBefore - paidBefore * (25 / 100);
      return paid;
    }
  } else {
    let paidBefore = element.subtotal - element.subtotal * (10 / 100);
    let paid = paidBefore - paidBefore * (25 / 100);
    return paid;
  }
}

function calculatorOrder_PaidForShipper(element) {
  return element.applicableFee * (1 - (10 / 100 - 0.9 / 100)) * (80 / 100);
}

function calculatorOrder_PaidForClient(element) {
  if (element.coupon != "0") {
    let coupon = JSON.parse(element.coupon);
    let paid = element.subtotal + element.applicableFee - coupon.expPrice;
    return paid;
  } else {
    let paid = element.subtotal + element.applicableFee;
    return paid;
  }
}

// Get all order for admin

function getAllOrderByAdmin(req, res) {
  orderModels.GetAll((err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(203).send({ status: false, Message: "Get Data Fail" });
    }
  });
}

function getToday(req, res) {
  orderModels.getToday("", (err, result) => {
    if (!err) {
      res.status(200).send(result.sort((a, b) => (a.createAt > b.createAt ? -1 : 1)));
    } else {
      res.status(203).send({ status: false, Message: "Get Data Fail" });
    }
  });
}

function getTodayByMerchant(req, res) {
  if (req.decoded.id_user) {
    MerchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err, id_merchant) => {
        if (!err) {
          orderModels.getTodayByMerchant(id_merchant, (errGetToday, result) => {
            if (!errGetToday) {
              if (Array.isArray(result)) {
                result.forEach((item) => {
                  item.profit = calculatorOrder_PaidForMerchant(item);
                });
                res
                  .status(200)
                  .send(
                    result.sort((a, b) => (a.createAt > b.createAt ? -1 : 1))
                  );
              } else {
                result[0].profit = calculatorOrder_PaidForMerchant(result[0]);
              }
            } else {
              res.status(203).send({ status: false, Message: "Get Data Fail" });
            }
          });
        }
      }
    );
  }
}

function historyOrder(req, res) {
  orderModels.getHistoryOrder(req.user.id_user, (err, rows) => {
    if (!err) {
      rows.forEach((item) => {
        if (item.coupon != "0") {
          item.coupon = JSON.parse(item.coupon).expPrice;
        }

        item.paidBy = JSON.parse(item.paidBy).MethodPayment;
      });

      res
        .status(200)
        .send(rows.sort((a, b) => (a.createAt > b.createAt ? -1 : 1)));
    } else {
      res.status(401).send({
        status: true,
        message: "Success",
      });
    }
  });
}

function getWeekByMerchant(req, res) {
  // console.log(req.query);
  if (req.decoded.id_user) {
    MerchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err3, id_merchant) => {
        if (!err3) {
          if (req.query) {
            let info = {
              date: req.query,
              id_merchant: id_merchant,
            };
            orderModels.getWeek(info, (err, result) => {
              if (!err) {
                if (Array.isArray(result)) {
                  result.forEach((item) => {
                    item.profit = calculatorOrder_PaidForMerchant(item);
                  });
                  res
                    .status(200)
                    .send(
                      result.sort((a, b) => (a.createAt > b.createAt ? -1 : 1))
                    );
                } else {
                  result[0].profit = calculatorOrder_PaidForMerchant(result[0]);
                }
              } else {
                res.status(401).send(result);
              }
            });
          } else {
            res.status(400).send();
          }
        }
      }
    );
  }
}

function getMonthByMerchant(req, res) {
  console.log(req.query);
  if (req.decoded.id_user) {
    MerchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err3, id_merchant) => {
        if (!err3) {
          if (req.query) {
            let info = {
              date: req.query,
              id_merchant: id_merchant,
            };
            orderModels.getMonth(info, (err, result) => {
              if (!err) {
                if (Array.isArray(result)) {
                  result.forEach((item) => {
                    item.profit = calculatorOrder_PaidForMerchant(item);
                  });
                  res
                    .status(200)
                    .send(
                      result.sort((a, b) => (a.createAt > b.createAt ? -1 : 1))
                    );
                } else {
                  result[0].profit = calculatorOrder_PaidForMerchant(result[0]);
                }
              } else {
                res.status(401).send(result);
              }
            });
          } else {
            res.status(400).send();
          }
        }
      }
    );
  }
}

function getCustomByMerchant(req, res) {
  console.log(req);
  if (req.decoded.id_user) {
    MerchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err3, id_merchant) => {
        if (!err3) {
          if (req.query) {
            let info = {
              date: req.query,
              id_merchant: id_merchant,
            };
            orderModels.getCustom(info, (err, result) => {
              if (!err) {
                if (Array.isArray(result)) {
                  result.forEach((item) => {
                    item.profit = calculatorOrder_PaidForMerchant(item);
                  });
                  res.status(200).send(result.sort((a, b) => (a.createAt > b.createAt ? -1 : 1)));
                } else {
                  result[0].profit = calculatorOrder_PaidForMerchant(result[0]);
                }
              } else {
                res.status(401).send(result);
              }
            });
          } else {
            res.status(400).send();
          }
        }
      }
    );
  }
}

module.exports = {
  Oder: Oder,
  getOrder: getOrder,
  getOrderById: getOrderById,
  cancelOrder: cancelOrder,
  getOrderOnGoing: getOrderOnGoing,
  merchantCancelOrder: merchantCancelOrder,
  isSeen: isSeen,
  getAllOrderByAdmin: getAllOrderByAdmin,
  getToday: getToday,
  getTodayByMerchant: getTodayByMerchant,
  historyOrder: historyOrder,
  getReviewOrder: getReviewOrder,
  getOrderForDriver: getOrderForDriver,
  getOrderForMerchant: getOrderForMerchant,
  acceptOrder: acceptOrder,
  pickUpOrder: pickUpOrder,
  deliveredOrder: deliveredOrder,
  getWeekByMerchant: getWeekByMerchant,
  getMonthByMerchant: getMonthByMerchant,
  getCustomByMerchant: getCustomByMerchant,
  ejectOrder: ejectOrder,
};
