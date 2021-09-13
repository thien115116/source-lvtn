const mysql = require("../../configs/database");

const Request = function (Request) {
  (this.id_request = Request.id_request),
    (this.note = Request.note),
    (this.createAt = Request.createAt),
    (this.updateAt = Request.updateAt),
    (this.id_merchant = Request.id_merchant),
    (this.id_admin = Request.id_admin),
    (this.state = Request.state);
  this.id_question = Request.id_question;
};

Request.Create = (request, result) => {
  mysql.query(
    "INSERT INTO request_from_merchant SET ?",
    request,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Request: ", { ...request });
      result(null, { ...request });
    }
  );
};

Request.FindOneById = (id, result) => {
  mysql.query(
    `SELECT * FROM REQUEST_FROM_MERCHANT WHERE id_request = "${id}"`,
    (err, row) => {
      if (!err) {
        result(null, row[0]);
      } else {
        console.log(err, null);
        result(err, null);
      }
    }
  );
};
Request.FindReqUpdate = (id, result) => {
  mysql.query(
    `SELECT * FROM request_update_food WHERE id_request = "${id}"`,
    (err, row) => {
      if (!err) {
        result(null, row[0]);
      } else {
        console.log(err, null);
        result(err, null);
      }
    }
  );
};

Request.Update = (request, result) => {
  mysql.query(
    "UPDATE REQUEST_FROM_MERCHANT SET ? WHERE id_request = ?",
    [request, request.id_request],
    (err, rows) => {
      if (!err) {
        result(null, "Updated");
      } else {
        result(err, null);
      }
    }
  );
};
Request.UpdateReqFood = (request, result) => {
  mysql.query(
    "UPDATE request_update_food SET ? WHERE id_request = ?",
    [request, request.id_request],
    (err, rows) => {
      if (!err) {
        result(null, "Updated");
      } else {
        result(err, null);
      }
    }
  );
};

Request.findPenning = (data, result) => {
  // Lấy request cuối cùng để giới hạn việc yêu cầu liên tục
  mysql.query(
    `SELECT * FROM REQUEST_FROM_MERCHANT WHERE REQUEST_FROM_MERCHANT.id_merchant = "${data}" AND REQUEST_FROM_MERCHANT.state = "Penning"`,
    (err, row) => {
      if (!err) {
        //console.log(row);
        result(null, row[row.length - 1]);
      } else {
        result(err, null);
      }
    }
  );
};

Request.getReqForStaff = (data, result) => {
  let sql = `CALL _get_Req_Admin("${data}")`;
  mysql.query(sql, (err, row) => {
    if (!err) {
      result(null, row[0]);
    } else {
      result(err, null);
    }
  });
};
Request.getReqUpdateFoodForStaff = (id, result) => {
  let sql = `SELECT * FROM request_update_food WHERE state= 'Penning' AND id_admin = ? `;
  mysql.query(sql, id, (err, row) => {
    if (!err) {
      result(null, row);
    } else {
      result(err, null);
    }
  });
};

Request._getAllRequest_For_Administrator = (data, result) => {
  let sql = `CALL _get_all_request_administrator("${data}")`;
  mysql.query(sql, (err, row) => {
    if (!err) {
      result(null, row[0]);
    } else {
      result(err, null);
    }
  });
};
Request.getReqUpdateFood = (result) => {
  mysql.query(
    `SELECT * FROM request_update_food where state !='Done'`,
    (err, row) => {
      if (!err) {
        // console.log(row);
        result(null, row);
      } else {
        result(err, null);
      }
    }
  );
};
module.exports = Request;
