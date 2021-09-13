const mysql = require("../../configs/database");

const Menu = function (menu) {
  (this.id_menu = menu.id_menu),
    (this.id_merchant = menu.id_merchant),
    (this.is_enable = menu.is_enable),
    (this.name_menu = menu.name_menu),
    (this.createdAt = menu.createdAt),
    (this.updatedAt = menu.updatedAt),
    (this.view = menu.view);
};

Menu.addNew = (newMenu, result) => {
  mysql.query("INSERT INTO MENU SET ?", newMenu, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, newMenu);
    }
  });
};

Menu.findOne = (id_menu, result) => {
  mysql.query("SELECT * FROM `menu` WHERE id_menu=?", id_menu, (err, rows) => {
    if (err) {
      result(err, null);
    } else {
      result(null, rows[0]);
    }
  });
};

Menu.update = (menu, result) => {
  mysql.query(
    "UPDATE MENU SET ? WHERE id_menu = ?",
    [menu, menu.id_menu],
    (err, rows) => {
      if (err) {
        result(err, null);
      } else {
        result(null, rows[0]);
      }
    }
  );
};
Menu.deleteMenu = (id_menu, result) => {
  mysql.query("DELETE FROM MENU WHERE id_menu = ?", [id_menu], (err, rows) => {
    if (err) {
      result(err, null);
    } else {
      result(null, null);
    }
  });
};

Menu.selectAll = (id, result) => {
  mysql.query(`CALL _getMenu ('${id}')`, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};

Menu.getMenuMerchant = (id_merchant, result) => {
  let sql = `SELECT *,
  (SELECT COUNT(*) FROM menu_item WHERE menu_item.id_menu = menu.id_menu) AS quantity
  FROM menu
  WHERE menu.id_merchant =?`;
  mysql.query(sql, id_merchant, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};
Menu.checkQuantity = (id_menu, result) => {
  let sql = `SELECT COUNT(*) as quantity FROM menu_item WHERE menu_item.id_menu = ?`;
  mysql.query(sql, id_menu, (err, rows) => {
    if (!err) {
      result(null, rows[0]);
    } else {
      result(err, null);
    }
  });
};

module.exports = Menu;
