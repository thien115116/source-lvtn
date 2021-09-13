const mysql = require("../../configs/database");
const auth = require("../controllers/auth.Controller");

function isPasswordAndUserMatch(req, res, next) {
  const userInput = req.body;
  console.log(userInput);
  if (userInput.phoneNumber && userInput.password) {
    const sql = `SELECT * FROM ACCOUNT WHERE phone = ?`;
    try {
      mysql.query(sql, userInput.phoneNumber, (err, rows) => {
        console.log(err);
        if (!err) {
          console.log(rows.length);
          if (rows.length > 0) {
            var encrypted_password = auth._verifyPassword(
              userInput.password,
              rows[0].salt
            );
            // console.log(encrypted_password.passwordhash);
            // console.log(rows[0].hash_password);
            if (encrypted_password.passwordhash == rows[0].hash_password) {
              if (rows[0].is_enable == true) {
                req.body.userInfor = rows[0];
                next();
              } else {
                return res.status(403).send({
                  success: false,
                  message: "Access Denied.",
                });
              }
            } else {
              console.log(userInput.phoneNumber + " Login Wrong password.");
              return res.status(401).send({
                success: false,
                message: "Wrong password.",
              });
            }
          } else {
            console.log("Không có");
            return res.status(401).send({
              success: false,
              message: "Account does not exist.",
            });
          }
        } else {
          console.log(err);
          return res.status(500).send({
            success: false,
            message: "Internal Server Error.",
          });
        }
      });
    } catch (err) {
      console.log(error.message);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error.",
      });
    }
  }
}

function isExitsPhone(req, res, next) {
  const phoneNumber = req.body.phoneNumber;
  if (phoneNumber) {
    const sql = `SELECT * FROM ACCOUNT where phone = ?`;
    try {
      mysql.query(sql, phoneNumber, (err, result) => {
        if (!err) {
          if (result.length > 0) {
            return res.status(400).json({
              success: false,
              msg: "Number Phone already exists",
            });
          } else {
            return next();
          }
        } else {
          console.log(err.message);
          return res.status(500).send({
            success: false,
            message: "Internal Server Error.",
          });
        }
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error.",
      });
    }
  } else {
    return res.status(403).send({
      success: false,
      message: "No phone provided.",
    });
  }
}

function isExitsEmail(req, res, next) {
  const email = req.body.email;
  if (email) {
    const sql = `SELECT * FROM ACCOUNT where email = ?`;
    try {
      mysql.query(sql, email, (err, result) => {
        if (!err) {
          if (result.length > 0) {
            return res.status(400).json({
              success: false,
              message: "Email already exists",
            });
          }
          return next();
        } else {
          console.log(err.message);
          return res.status(500).send({
            success: false,
            message: "Internal Server Error.",
          });
        }
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error.",
      });
    }
  } else {
    return res.status(403).send({
      success: false,
      message: "No phone provided.",
    });
  }
}

function isPasswordAdminMatch(req, res, next) {
  const userInput = req.body;
  const email = req.body.email || req.decoded.email;
  if (email && userInput.password) {
    const sql = `SELECT * FROM ADMIN WHERE email = ?`;
    try {
      mysql.query(sql, email, (err, rows) => {
        if (!err) {
          //console.log(rows.length);
          if (rows.length > 0) {
            var encrypted_password = auth._verifyPassword(
              userInput.password,
              rows[0].salt
            );
            // console.log(encrypted_password.passwordhash);
            // console.log(rows[0].hash_password);
            if (encrypted_password.passwordhash == rows[0].hash_pass) {
              req.body.adminInfor = rows[0];
              next();
            } else {
              console.log(userInput.email + " Login Wrong password.");
              return res.status(401).send({
                success: false,
                message: "Wrong password.",
              });
            }
          } else {
            return res.status(401).send({
              success: false,
              message: "Account does not exist.",
            });
          }
        } else {
          console.log(err);
          return res.status(500).send({
            success: false,
            message: "Internal Server Error.",
          });
        }
      });
    } catch (err) {
      console.log(error.message);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error.",
      });
    }
  }
}

function isPasswordShipperMatch(req, res, next) {
  const userInput = req.body;
  const phone = req.body.phone || req.decoded.phone;
  if (phone && userInput.password) {
    const sql = `SELECT * FROM account_shipper WHERE account_shipper.phone = '${phone}' AND is_enable = 0`;
    try {
      mysql.query(sql, phone, (err, rows) => {
        if (!err) {
          if (rows.length > 0) {
            var encrypted_password = auth._verifyPassword(
              userInput.password,
              rows[0].salt
            );
            if (encrypted_password.passwordhash == rows[0].hash_password) {
              req.body.shipper = rows[0];
              next();
            } else {
              console.log(userInput.phone + " Login Wrong password.");
              return res.status(401).send({
                success: false,
                message: "Wrong password.",
              });
            }
          } else {
            return res.status(401).send({
              success: false,
              message: "Account does not exist.",
            });
          }
        } else {
          console.log(err);
          return res.status(500).send({
            success: false,
            message: "Internal Server Error.",
          });
        }
      });
    } catch (err) {
      console.log(error.message);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error.",
      });
    }
  }
}

module.exports = {
  isPasswordAndUserMatch: isPasswordAndUserMatch,
  isPasswordAdminMatch: isPasswordAdminMatch,
  isPasswordShipperMatch: isPasswordShipperMatch,
  isExitsPhone: isExitsPhone,
  isExitsEmail: isExitsEmail,
};
