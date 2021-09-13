const mysql = require("../../configs/database");

const REQUEST_UPDATE_FOOD = function (request) {
  (this.id_request = request.id_request),
    (this.id_merchant = request.id_merchant),
    (this.id_product = request.id_product),
    (this.id_admin = request.id_admin),
    (this.note = request.note),
    (this.createAt = request.createAt),
    (this.updateAt = request.updateAt),
    (this.state = request.state),
    (this.priceOld = request.priceOld),
    (this.priceNew = request.priceNew),
    (this.nameOld = request.nameOld),
    (this.nameNew = request.nameNew),
    (this.dicriptionsOld = request.dicriptionsOld),
    (this.dicriptionsNew = request.dicriptionsNew),
    (this.discountOld = request.discountOld),
    (this.discountNew = request.discountNew);
};

REQUEST_UPDATE_FOOD.Create = (request, result) => {
  mysql.query(`INSERT INTO REQUEST_UPDATE_FOOD SET ?`, request, (err, rows) => {
    if (!err) {
      result(null, "Updated");
    } else {
      result(err, null);
    }
  });
};

REQUEST_UPDATE_FOOD.FindOne = (id_request, result) => {};

REQUEST_UPDATE_FOOD.Update = (request, result) => {};
REQUEST_UPDATE_FOOD.UpdateState = (data, result) => {
  mysql.query(
    "UPDATE REQUEST_UPDATE_FOOD set state = ? where id_request = ?",
    [data.state, data.id_request],
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        result(err, null);
      }
    }
  );
};

module.exports = REQUEST_UPDATE_FOOD;
