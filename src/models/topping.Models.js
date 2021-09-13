const mysql = require("../../configs/database");

const Topping = function (topping) {
  (this.id_topping = topping.id_topping),
    (this.name = topping.name),
    (this.price = topping.price),
    (this.id_merchant = topping.id_merchant),
    (this.is_active = topping.is_active),
    (this.is_enable = topping.is_enable);
};

Topping.findOne = (id_topping, result) => {
  mysql.query(
    `SELECT * FROM TOPPING WHERE id_topping = '${id_topping}' AND is_enable = true`,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...rows[0] });
    }
  );
};

Topping.findAllByIdMerchant = (id_merchant, result) => {
  mysql.query(
    `SELECT * FROM TOPPING WHERE id_merchant = '${id_merchant}' AND is_enable = true`,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, rows);
    }
  );
};

Topping.Create = (topping, result) => {
  mysql.query("INSERT INTO TOPPING SET ?", topping, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, topping);
  });
};

Topping.Update = (topping, result) => {
  mysql.query(
    "UPDATE TOPPING SET ? WHERE id_topping = ?",
    [topping, topping.id_topping],
    (err, rows) => {
      if (!err) {
        result(null, "Updated");
      } else {
        result(err, null);
      }
    }
  );
};

Topping.getHierarchyTopping = (id_product, result) => {
  mysql.query(`
  SELECT topping.name,topping.price,topping.id_topping
  FROM topping 
  INNER JOIN topping_values ON topping.id_topping = topping_values.id_topping
  WHERE topping_values.id_product = '${id_product}' AND topping.is_enable=1`, (err, rows)=>{
    if(!err){
      result(null,rows);
    }else{
      console.log(err);
      result(err, null);
    }
  });
};

module.exports = Topping;
