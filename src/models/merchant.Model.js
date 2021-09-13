const mysql = require("../../configs/database");

const Merchant = function (merchant) {
  (this.id_merchant = merchant.id_merchant),
    (this.id_user = merchant.id_user),
    (this.name_merchant = merchant.name_merchant),
    (this.is_active = merchant.is_active),
    (this.is_enable = merchant.is_enable),
    (this.locations = merchant.locations),
    (this.latitude = merchant.latitude),
    (this.longtitude = merchant.longtitude),
    (this.accept_date = merchant.accept_date),
    (this.update_date = merchant.update_date),
    (this.reg_date = merchant.reg_date),
    (this.type_business = merchant.type_business);
  this.id_brand = merchant.id_brand;
  this.openingHours = merchant.openingHours;
};

Merchant.create = (newMerchant, result) => {
  mysql.query("INSERT INTO MERCHANT SET ?", newMerchant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created merchant: ", { ...newMerchant }); // (...newMerchant) có nghĩa là cái resutl sau khi thêm thành công, thì nó gán đèn lên cái newMerchant lại.
    result(null, { ...newMerchant });
  });
};

Merchant.update = (newMerchant, result) => {
  mysql.query(
    "UPDATE MERCHANT SET ? WHERE id_merchant=?",
    [newMerchant, newMerchant.id_merchant],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...newMerchant });
    }
  );
};
Merchant.removeMerchantFromBrand = (data, result) => {
  mysql.query(
    "UPDATE MERCHANT SET id_brand = null WHERE `id_merchant`=?",
    data,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, rows);
      }
    }
  );
};
Merchant.getMerchantById = (merchantId, result) => {
  mysql.query(
    "SELECT * FROM MERCHANT WHERE `id_merchant`=?",
    merchantId,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, rows);
      }
    }
  );
};
Merchant.getMerchantNotWork = (data, result) => {
  mysql.query("CALL get_Merchant_Not_Working", (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, rows[0]);
    }
  });
};
// Update Ngay Gio Mo App
Merchant.updateHour = (data, result) => {
  mysql.query(
    `UPDATE MERCHANT SET openingHours= '${data.hour}' WHERE MERCHANT.id_merchant = '${data.id}' `,
    (err, rows) => {
      if (err) {
        result(err, null);
      } else {
        result(null, rows);
      }
    }
  );
};

Merchant.getMerchantByIdAccount = (accountId, result) => {
  mysql.query(
    "SELECT `id_merchant` FROM MERCHANT WHERE `id_user`=?",
    accountId,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else if (rows.length > 0) {
        result(null, rows[0].id_merchant);
      } else {
        result(err, null);
      }
    }
  );
};

Merchant.accept_open = (data, result) => {
  var accept_date = new Date();
  var update_date = new Date();
  mysql.query(
    `UPDATE MERCHANT SET is_enable = 0, accept_date= ?, update_date= ? WHERE id_merchant = ?`,
    [accept_date, update_date, data],
    (err, rows) => {
      if (err) {
        console.log("Update merchant fail.", err);
        result(err, null);
      } else {
        result(null, {
          status: true,
          message: "Update DB Successful.",
        });
      }
    }
  );
};

Merchant.denied_open = (data, result) => {
  var update_date = new Date();
  mysql.query(
    `UPDATE MERCHANT SET is_enable = 1, update_date=? WHERE id_merchant = ?`,
    [update_date, data],
    (err, rows) => {
      if (err) {
        console.log("Update merchant fail.");
        result(err, null);
      } else {
        result(null, {
          status: true,
          message: "Update DB Successful.",
        });
      }
    }
  );
};

Merchant.getRestaurantsNear = (data, result) => {
  mysql.query(
    `CALL _restaurants_near(${data.lat}, ${data.lon}, ${data.radius})`,
    (err, row) => {
      if (!err) {
        result(null, row);
      } else {
        console.log(err);
        result(err, null);
      }
    }
  );
};

Merchant.getMerchantInApp = (data, result) => {
  mysql.query(
    `CALL _infor_merchant(${data.lat}, ${data.lon},'${data.id_merchant}')`,
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        console.log(err);
        result(err, null);
      }
    }
  );
};
Merchant.getMerchantInAppByAdmin = (data, result) => {
  mysql.query(`CALL _infor_merchant_admin('${data}')`, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

Merchant.getMerchantByUserOnWebApp = (data, result) => {
  mysql.query(`CALL _infor_merchant_admin('${data}')`, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

Merchant.findMerchantByName = (data, result) => {
  if (typeof data === "number" || isFinite(data) || Math.round(data) === data) {
    mysql.query(`CALL _find_infor_merchant('${data}')`, (err, rows) => {
      if (!err) {
        result(null, rows[0]);
      } else {
        console.log(err);
        result(err, null);
      }
    });
  } else {
    mysql.query(
      `CALL _find_infor_merchant(?)`,
      "%" + data + "%",
      (err, rows) => {
        if (!err) {
          result(null, rows[0]);
        } else {
          console.log(err);
          result(err, null);
        }
      }
    );
  }
};
Merchant.getTopMerchant = (result) => {
  mysql.query(`CALL _get_Top_merchant`, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};
Merchant.getAllMerchant = (result) => {
  mysql.query(`CALL _get_all_merchant`, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};
module.exports = Merchant;
