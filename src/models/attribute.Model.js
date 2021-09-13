const mysql = require("../../configs/database");

const Attribute = function (att) {
  (this.id_attr = att.id_attr), (this.name = att.name), (this.type = att.type);
};

Attribute.create = (newAttr, result) => {
  mysql.query("INSERT INTO ATTRIBUTES SET ?", newAttr, (err, rows) => {
    if (err) {
      console.log("err" + err);
      result(err, null);
      return;
    } else {
      console.log("Created Attribute: " + newAttr);
      result(null, { ...newAttr });
    }
  });
};
Attribute.deleteAttByMerchant = (id, result) => {
  console.log(id);
  mysql.query("DELETE FROM ATTRIBUTES WHERE id_attr= ?", id, (err, rows) => {
    if (err) {
      console.log(err.errno);
      result(err, null);
    } else {
      console.log(rows);
      result(null, rows);
    }
  });
};
Attribute.updateByMerchant = (data, result) => {
  mysql.query(
    "UPDATE ATTRIBUTES SET name= ?, type= ? WHERE id_attr= ?",
    [data.name, data.type, data.id],
    (err, rows) => {
      if (err) {
        result(err, null);
      } else {
        result(null, rows);
      }
    }
  );
};
Attribute.getAttOfMerchant = (id, result) => {
  mysql.query(
    "SELECT * FROM ATTRIBUTES WHERE id_merchant= ?",
    id,
    (err, rows) => {
      if (err) {
        result(err, null);
      } else {
        result(null, rows);
      }
    }
  );
};
Attribute.findByType = (data, result) => {
  mysql.query(
    `SELECT * from attributes WHERE attributes.id_merchant LIKE ? OR attributes.id_merchant IS NULL HAVING attributes.type = ?`,
    [data.id_merchant, data.type],
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

Attribute.findAll = (result) => {
  mysql.query(`SELECT * FROM ATTRIBUTES`, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};

Attribute.getHierarchyAttribute = (id_product, result) => {
  mysql.query(`Call _attribute_by_idproduct(?)`, id_product, (err, rows) => {
    if (!err) {
      result(null, rows[0]||[]);
    } else {
      result(err, null);
    }
  });
};

module.exports = Attribute;
