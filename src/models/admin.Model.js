const mysql = require("../../configs/database");

const Admin = function (admin) {
  (this.id_admin = admin.id_admin),
    (this.salt = admin.salt),
    (this.hash_pass = admin.hash_pass),
    (this.full_name = admin.full_name),
    (this.email = admin.email),
    (this.created_date = admin.created_date),
    (this.is_active = admin.is_active),
    (this.is_enable = admin.is_enable),
    (this.role = admin.role),
    (this.is_confirmEmail = admin.is_confirmEmail),
    (this.updated_date = admin.updated_date),
    (this.login_at = admin.login_at);
  this.url_img = admin.url_img;
};

Admin.create = (admin, result) => {
  mysql.query("INSERT INTO ADMIN SET ?", admin, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, admin);
    }
  });
};
Admin.Delete = (id_admin, result) => {
  mysql.query("DELETE FROM ADMIN where id_admin = ?", id_admin, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Admin.getAllIMG = (result) => {
  mysql.query(`CALL _get_img_admin`, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res[0]);
    }
  });
};
Admin.randomAssignment = (result) => {
  mysql.query(
    `SELECT * FROM ADMIN WHERE admin.email = '${process.env.AC_EMAILADMIN}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        //console.log("Get admin: " + res[0]);
        result(null, res[0]);
      }
    }
  );
};
Admin.verify = (token, result) => {
  mysql.query(
    `SELECT * FROM ADMIN WHERE is_confirmEmail = ?`,
    token,
    (err, row) => {
      if (err) {
        result(err, null);
        console.log(err);
      } else {
        console.log("Du Lieu 1", row);
        result(null, row[0]);
      }
    }
  );
};

Admin.getAccountById = (admin, result) => {
  mysql.query(`SELECT * FROM ADMIN WHERE id_admin= '${admin}'`, (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, { ...rows[0] });
    }
  });
};
Admin.getAccountByEmail = (email, result) => {
  mysql.query(`SELECT * FROM ADMIN WHERE email=?`, email, (err, rows) => {
    if (err) {
      result(err, null);
    } else {
      console.log(rows);
      result(null, rows);
    }
  });
};
Admin.update = (admin, result) => {
  mysql.query(
    "UPDATE ADMIN SET ? WHERE id_admin = ?",
    [admin, admin.id_admin],
    (err, rows) => {
      if (!err) {
        result(null, "Updated");
      } else {
        result(err, null);
      }
    }
  );
};

Admin.getTaskMerchant = (admin, result) => {
  var sqlgetTask = `CALL _reviewMerchant(?)`;

  mysql.query(sqlgetTask, admin, (err, rows) => {
    if (err) {
      console.log(admin + "Get Task err: " + err);
      result(err, null);
    } else {
      result(null, rows[0]);
    }
  });
};

Admin.getAllAccount = (result) => {
  mysql.query(`SELECT * FROM ADMIN`, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};

module.exports = Admin;
