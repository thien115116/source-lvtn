const mysql = require("../../configs/database");

const ORDER = function (order) {
  (this.id_oder = order.id_oder), (this.id_user = order.id_user);
  (this.id_merchant = order.id_merchant),
    (this.createAt = order.createAt),
    (this.deli_address = order.deli_address),
    (this.deli_phone = order.deli_phone),
    (this.applicableFee = order.applicableFee),
    (this.subtotal = order.subtotal),
    (this.state = order.state),
    (this.note = order.note),
    (this.coupon = order.coupon),
    (this.applicableDistance = order.applicableDistance),
    (this.paidBy = order.paidBy);
};

ORDER.Create = (order, result) => {
  mysql.query("INSERT INTO `order` SET ?", order, (err, row) => {
    if (!err) {
      result(null, {
        status: true,
        message: "Success",
      });
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.Update = (order, result) => {
  mysql.query(
    "UPDATE `ORDER` SET ? WHERE order.id_oder = ?",
    [order, order.id_oder],
    (err, res) => {
      if (err) {
        result(err, null);
        console.log("Err" + err);
        return;
      }
      result(null, { ...order });
    }
  );
};
ORDER.GetAll = (result) => {
  mysql.query("SELECT * FROM `ORDER`", (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};
ORDER.getToday = (data, result) => {
  mysql.query(
    "SELECT * FROM `order` WHERE DAY(`order`.createAt) = DAY(CURRENT_DATE) AND state = 'Delivered'",
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        result(err, null);
      }
    }
  );
};

ORDER.getWeek = (data, result) => {
  mysql.query(
    "SELECT * FROM `order` WHERE createAt BETWEEN ? AND ? AND state = 'Delivered' AND id_merchant = ?",
    [data.date.start, data.date.end, data.id_merchant],
    (err, rows) => {
      if (!err) {
        // console.log(rows);
        result(null, rows);
      } else {
        result(err, null);
      }
    }
  );
};

ORDER.getCustom = (data, result) => {
  console.log(data.date.end);
  console.log(data.date.start);
  mysql.query(
    "SELECT * FROM `order` WHERE createAt BETWEEN ? AND ? AND state = 'Delivered' AND id_merchant = ?",
    [data.date.start, data.date.end, data.id_merchant],
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        result(err, null);
      }
    }
  );
};

ORDER.getMonth = (data, result) => {
  mysql.query(
    "SELECT * FROM `order` WHERE MONTH(createAt) = ? AND state = 'Delivered' AND id_merchant = ?",
    [data.date.month, data.id_merchant],
    (err, rows) => {
      if (!err) {
        console.log(rows);
        result(null, rows);
      } else {
        result(err, null);
      }
    }
  );
};

ORDER.getTodayByMerchant = (id, result) => {
  mysql.query(
    "SELECT * FROM `order` WHERE DAY(`order`.createAt) = DAY(CURRENT_DATE) AND id_merchant = ? AND state = 'Delivered'",
    id,
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        result(err, null);
      }
    }
  );
};

ORDER.FindOne = (id_order, result) => {
  mysql.query(
    "SELECT * FROM `ORDER` WHERE order.id_oder = ?",
    id_order,
    (err, rows) => {
      if (err) {
        result(err, null);
        console.log(err);
      } else {
        result(null, rows);
      }
    }
  );
};

ORDER.GetTimeLineOrder = (id_order, result) => {
  mysql.query(
    "SELECT * FROM `ORDER_TIMELINE` WHERE id_order = ?",
    id_order,
    (err, rows) => {
      if (err) {
        result(err, null);
      } else {
        result(null, rows);
      }
    }
  );
};

ORDER.getHistoryOrder = (id_user, result) => {
  mysql.query("CALL getHistoryOrder(?)", id_user, (err, rows) => {
    if (err) {
      result(err, null);
      console.log("Err" + err);
      return;
    }
    result(null, rows[0]);
  });
};

/// <!> Bảng Many Many
ORDER.CreateLogOrderCancel = (LOG, result) => {
  mysql.query("INSERT INTO `log_order_cancel` SET ?", LOG, (err, row) => {
    if (!err) {
      result(null, {
        status: true,
        message: "Success",
      });
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.FindOneOrder = (id_order, result) => {
  mysql.query("CALL Get_Order(?)", id_order, (err, rows) => {
    if (err) {
      console.log(err);
      result(err, null);
    }
    result(null, ...rows[0]);
  });
};

ORDER.GetProductAndExtraItem = (id_order, result) => {
  mysql.query("CALL GET_DETAIL_ORDER(?)", id_order, (err, rows) => {
    if (err) {
      console.log(err);
      result(err, null);
    }
    result(null, ...rows);
  });
};

ORDER.CreateOderDetail = (item, result) => {
  mysql.query("INSERT INTO `order_detail` SET ?", item, (err, row) => {
    if (!err) {
      result(null, {
        status: true,
        message: "Success",
      });
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.CreateOderExtraItem = (item, result) => {
  mysql.query("INSERT INTO `extra_item` SET ?", item, (err, row) => {
    if (!err) {
      result(null, {
        status: true,
        message: "Success",
      });
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.CreateOderTimeline = (point, result) => {
  mysql.query(`INSERT INTO ORDER_TIMELINE SET ?`, point, (err, row) => {
    if (!err) {
      result(null, {
        status: true,
        message: "Success",
      });
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.CreateOderShipper = (oderShipper, result) => {
  mysql.query(`INSERT INTO ORDER_SHIPPER SET ?`, oderShipper, (err, row) => {
    if (!err) {
      result(null, {
        status: true,
        message: "Success",
      });
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.CreateOderVoucher = (oderVoucher, result) => {
  mysql.query(`INSERT INTO ORDER_VOUCHER SET ?`, oderVoucher, (err, row) => {
    if (!err) {
      result(null, {
        status: true,
        message: "Success",
      });
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.findOrderByIdUser = (id_user, result) => {
  let sql = `Call GetQuantityOder(?)`;
  mysql.query(sql, id_user, (err, row) => {
    if (!err) {
      result(null, row[0]);
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.findOrderOnGoing = (id_merchant, result) => {
  let sql = `Call _GetOrderOngoing(?)`;
  mysql.query(sql, id_merchant, (err, row) => {
    if (!err) {
      result(null, row[0]);
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.findOrderDone = (id_merchant, result) => {
  let sql = `Call _GetOrderDoneToday(?)`;
  mysql.query(sql, id_merchant, (err, row) => {
    if (!err) {
      result(null, row[0]);
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

ORDER.CreateOrderShipper = (shipper, result) => {
  mysql.query(`INSERT INTO ORDER_SHIPPER SET ?`, shipper, (err, row) => {
    if (!err) {
      result(null, row[0]);
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

/// <!> Bảng Many Many

ORDER.calculator_distance = (req, result) => {
  mysql.query(
    `CALL _calculator_distance(?,?,?,?)`,
    [
      req.merchant.latitude,
      req.merchant.longtitude,
      req.body.latitude,
      req.body.longitude,
    ],
    (err, row) => {
      if (!err) {
        //console.log(row);
        result(null, row[0][0].distance);
      } else {
        console.log(err);
        result(err, null);
      }
    }
  );
};

module.exports = ORDER;
