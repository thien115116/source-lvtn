const mysql = require("../../configs/database");

const User = function (user) {
  (this.id_user = user.userId),
    (this.email = user.email),
    (this.phone = user.phoneNumber),
    (this.role = user.role),
    (this.first_name = user.first_name),
    (this.last_name = user.last_name),
    (this.salt = user.salt),
    (this.hash_password = user.hash_password),
    (this.url_avt = user.url_avt),
    (this.create_date = user.create_day),
    (this.is_active = user.is_active),
    (this.language = user.language),
    (this.is_enable = user.is_enable),
    (this.is_GoogleAccount = user.is_GoogleAccount),
    (this.is_FacebookAccount = user.is_FacebookAccount);
  (this.is_confirmEmail = user.is_confirmEmail),
    (this.login_at = user.login_at);
};

User.create = (newUser, result) => {
  mysql.query("INSERT INTO ACCOUNT SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("Created user: ", { ...newUser }); // (...newUser) có nghĩa là cái resutl sau khi thêm thành công, thì nó gán đèn lên cái newUser lại.
      result(null, { ...newUser });
    }
  });
};
User.getUserById = (userId, result) => {
  mysql.query(
    `SELECT * FROM ACCOUNT WHERE id_user= '${userId}'`,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      userId = rows[0];
      //console.log("user: ", { ...userId });
      result(null, { ...userId });
    }
  );
};
User.verify = (token, result) => {
  mysql.query(
    `SELECT * FROM ACCOUNT WHERE is_confirmEmail = ?`,
    token,
    (err, row) => {
      if (err) {
        result(err, null);
        console.log(err);
      } else {
        console.log("Du Lieu 2", row);
        result(null, row[0]);
      }
    }
  );
};
User.update = (user, result) => {
  let sql = `UPDATE ACCOUNT SET ? WHERE id_user = ?`;
  mysql.query(sql, [user, user.id_user], (err, row) => {
    if (!err) {
      result(null, { ...user });
    } else {
      result(err, null);
    }
  });
};

User.updateUserPassword = (data, result) => {
  mysql.query(
    `UPDATE ACCOUNT SET salt="${data.user.salt}", hash_password="${data.user.hash_password}" WHERE ACCOUNT.id_user = ? `,
    data.id_user,
    (err, rows) => {
      if (!err) {
        console.log(`Update user ${data.id_user} successful in filed password`);
        result(null, {
          status: true,
          messeage: " Update Account Successful",
        });
      } else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    }
  );
};

User.updateUserPasswordByMail = (data, result) => {
  mysql.query(
    `UPDATE ACCOUNT SET salt="${data.user.salt}", hash_password="${data.user.hash_password}" WHERE ACCOUNT.email = ? `,
    data.email,
    (err, rows) => {
      if (!err) {
        result(null, {
          status: true,
          messeage: " Update Account Successful",
        });
      } else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    }
  );
};

User.updateDisplayName = (data, result) => {
  mysql.query(
    `UPDATE ACCOUNT SET first_name="${data.firstName}", last_name="${data.lastName}" WHERE ACCOUNT.id_user = ?`,
    data.id_user,
    (err, rows) => {
      if (!err) {
        console.log(
          `Update user ${data.id_user} successful in filed display name`
        );
        result(null, {
          status: true,
          messeage: "Update Account Successful",
        });
      } else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    }
  );
};

User.updatePhoneNumber = (data, result) => {
  mysql.query(
    `UPDATE ACCOUNT SET phone="${data.phoneNumber}" WHERE ACCOUNT.id_user = ?`,
    data.id_user,
    (err, rows) => {
      if (!err) {
        console.log(`Update user ${data.id_user} successful in filed phone`);
        result(null, {
          status: true,
          messeage: "Update Account Successful",
        });
      } else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    }
  );
};

User.checkMailExist = (data, result) => {
  mysql.query(`SELECT * FROM ACCOUNT WHERE email="${data}"`, (err, rows) => {
    // console.log(rows[0]);
    if (typeof rows[0] !== "undefined") {
      console.log(`Email ${data} Exist`);
      result(false, {
        status: true,
        messeage: "",
      });
    } else {
      console.log("error: ", err);
      result(true, null);
      return;
    }
  });
};

User.saveConfirmCode = (data, result) => {
  mysql.query(
    `UPDATE ACCOUNT SET confirmCode="${data.number}" WHERE ACCOUNT.email = ?`,
    data.email,
    (err, rows) => {
      if (!err) {
        result(null, {
          status: true,
          messeage: "Update Account Successfully",
        });
      } else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    }
  );
};

User.getRedeemCode = (data, result) => {
  mysql.query(`SELECT * FROM ACCOUNT WHERE email="${data}"`, (err, rows) => {
    if (typeof rows[0] !== "undefined") {
      result(false, rows[0].confirmCode);
    } else {
      console.log("error: ", err);
      result(true, null);
      return;
    }
  });
};

User.updateEmail = (data, result) => {
  mysql.query(
    `UPDATE ACCOUNT SET email="${data.email}", is_confirmEmail = false  WHERE ACCOUNT.id_user = ?`,
    data.id_user,
    (err, rows) => {
      if (!err) {
        console.log(`Update user ${data.id_user} successful in filed email`);
        result(null, {
          status: true,
          messeage: "Update Account Successful",
        });
      } else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    }
  );
};

User.updateRole = (data, result) => {
  mysql.query(
    `UPDATE ACCOUNT SET role="${data.role}" WHERE ACCOUNT.id_user = ?`,
    data.id_user,
    (err, rows) => {
      if (!err) {
        console.log(`Update user ${data.id_user} successful in filed role`);
        result(null, {
          status: true,
          messeage: "Update Acount Successful",
        });
      } else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    }
  );

  User.updateStateAccount = (data, result) => {
    mysql.query(
      `UPDATE ACCOUNT SET is_enable="${data.is_enable}" WHERE ACCOUNT.id_user = ?`,
      data.id_user,
      (err, rows) => {
        if (!err) {
          console.log(
            `Update user ${data.id_user} successful in filed is_enable`
          );
          result(null, {
            status: true,
            messeage: "Update Acount Successful",
          });
        } else {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      }
    );
  };
};

module.exports = User;
