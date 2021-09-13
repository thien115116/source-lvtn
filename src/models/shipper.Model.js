const mysql = require("../../configs/database");

const Shipper = function (shipper) {
  (this.shipper_id = shipper.shipper_id),
    (this.phone = shipper.phone),
    (this.is_active = shipper.is_active),
    (this.is_enable = shipper.is_enable),
    (this.longitude = shipper.longitude),
    (this.latitude = shipper.latitude),
    (this.created_date = shipper.created_date),
    (this.updated_date = shipper.updated_date),
    (this.state = shipper.state);
};

Shipper.Create = (shipper, result) => {
  mysql.query(`INSERT INTO account_shipper SET ?`, shipper, (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }else{
      console.log("Created shipper: ", { ...shipper });
    result(null, { ...shipper });
    }
    
  });
};

Shipper.random = (id_shipper, result) => {
  mysql.query(`Call findRandomShipper('${id_shipper}')`, (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }else{
      result(null, rows[0][0]);
    }
    
  });
};

Shipper.Update = (shipper, result) => {
  mysql.query(
    "UPDATE account_shipper SET ? WHERE shipper_id = ?",
    [shipper, shipper.shipper_id],
    (err, rows) => {
      if (!err) {
        result(null, "Updated");
      } else {
        result(err, null);
      }
    }
  );
};

Shipper.FindOneById = (shipper_id, result) => {
  mysql.query(
    `SELECT * FROM account_shipper WHERE shipper_id = '${shipper_id}' AND is_enable = 0`,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }else{
         console.log(rows[0]);
      result(null, rows[0]);
      }
     
    }
  );
};

Shipper.FindAll = (result) => {
  mysql.query(
    `SELECT * FROM account_shipper WHERE shipper_id = '${shipper_id}'`,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {

        result(null, { ...rows[0] });
      }
    }
  );
};

//// Many table

Shipper.FindProfileById = (shipper_id, result) => {
  mysql.query(
    "SELECT * FROM `profile` WHERE `profile`.shipper_id = ?",
    shipper_id,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {

        result(null, rows[0]);
      }
    }
  );
};

Shipper.UpdateOrderShipper = (body, result) => {
  mysql.query(
    "UPDATE order_shipper SET order_shipper.`status` = ? WHERE order_shipper.id_oder = ? AND order_shipper.shipper_id=? ",
    [body.status, body.id_oder, body.shipper_id],
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, "Updated");
      }
    }
  );
}

Shipper.FindOneAccountById = (shipper_id, result) => {
  mysql.query(
    "SELECT * FROM `account_shipper` WHERE `account_shipper`.shipper_id = ?",
    shipper_id,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, rows[0]);
    }
  );
};

Shipper.getInfoShipperOrder = (id_order, result) => {
  mysql.query(`CALL getShipperByOrder(?)`, id_order, (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    console.log(rows[0]);
    let object = rows[0].sort((a, b) => a.point < b.point ? -1 : 1);
    result(null, object[0] );
  });
};
Shipper.reviewOrder = (id_shipper, result) => {
  mysql.query(
    `Call reviewOrderShipper('${id_shipper}')`,
    id_shipper,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }else{
        result(null, rows[0]);
      }
      
    }
  );
}

module.exports = Shipper;
