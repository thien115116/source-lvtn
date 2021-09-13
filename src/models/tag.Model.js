const mysql = require("../../configs/database");

const Tag = function (tag) {
  (this.id_tag = tag.id_tag), (this.tag_name = tag.tag_name);
};

Tag.create = (newtag, result) => {
  mysql.query("INSERT INTO TAG SET ?", newtag, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created tag: ", { ...newtag }); // (...newUser) có nghĩa là cái resutl sau khi thêm thành công, thì nó gán đèn lên cái newUser lại.
    result(null, { ...newtag });
  });
};

Tag.findTagOfProduct = (id, result) => {
  mysql.query(
    `SELECT tag.tag_name from tag_food JOIN tag on tag.id_tag = tag_food.id_tag WHERE tag_food.id_product = ?`,
    id,
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        console.log("Get Tag Of Product Error", err);
      }
    }
  );
};

Tag.findByName = (keyword, result) => {
  mysql.query(
    `SELECT * FROM TAG WHERE tag_name LIKE ?`,
    "%" + keyword + "%",
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else {
        result(null, rows);
      }
    }
  );
};

Tag.find = (req, result) => {
  mysql.query(`SELECT * FROM TAG`, (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, rows);
    }
  });
};

Tag.findTop = (req, result) => {
  mysql.query(`CALL getHashTagTopOrder()`, (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, rows[0]);
    }
  });
};

Tag.createTagFood = (itemsTag, result) => {
  mysql.query("INSERT INTO TAG_FOOD SET ?", itemsTag, (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("Created tag: ", { ...itemsTag }); // (...newUser) có nghĩa là cái resutl sau khi thêm thành công, thì nó gán đèn lên cái newUser lại.
      // result(null, {...itemsTag});
    }
  });
};

Tag.findOneByName = (item, result) => {
  mysql.query("");
};

module.exports = Tag;
