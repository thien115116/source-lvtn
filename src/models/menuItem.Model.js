const mysql = require("../../configs/database");

const MenuItem = function (menu) {
  (this.id_menu_item = menu.id_menu_item),
    (this.id_menu = menu.id_menu),
    (this.id_product = menu.id_merchant),
    (this.view = menu.view);
};

MenuItem.create = (item, result) => {
  mysql.query("INSERT INTO MENU_ITEM SET ?", item, (err, res) => {
    if (!err) {
      result(null, res);
    } else {
      result(err, null);
    }
  });
};
MenuItem.getOneByID = (id, result) => {
  mysql.query("SELECT * FROM MENU_ITEM WHERE id_menu = ?", id, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};
MenuItem.deleteOne = (id, result) => {
  mysql.query(
    "DELETE FROM MENU_ITEM WHERE id_menu_item = ?",
    id,
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        result(err, null);
      }
    }
  );
};
module.exports = MenuItem;
