const mysql = require("../../configs/database");

const Product = function (product) {
  (this.id_product = product.id_product),
    (this.id_merchant = product.id_merchant),
    (this.name_product = product.name_product),
    (this.price = product.price),
    (this.discount = product.discount),
    (this.dicriptions = product.dicriptions),
    (this.created_date = product.created_date),
    (this.is_active = product.is_active),
    (this.is_enable = product.is_enable),
    (this.update_date = product.update_date),
    (this.type_food = product.type_food),
    (this.group = product.group);
};
Product.getImg = (id_merchant, result) => {
  mysql.query("CALL _get_img_product(?)", id_merchant, (err, row) => {
    if (!err) {
      result(null, row[0]);
    } else {
      result(err, null);
      console.log(err);
    }
  });
};
Product.create = (newProduct, result) => {
  mysql.query("INSERT INTO PRODUCT SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created product: ", { ...newProduct }); // (...newUser) có nghĩa là cái resutl sau khi thêm thành công, thì nó gán đèn lên cái newUser lại.
    result(null, { ...newProduct });
  });
};

Product.createImage = (Items, result) => {
  mysql.query("INSERT INTO IMAGE_FOOD SET ?", Items, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, { ...Items });
    }
  });
};

Product.delete = (id_product, result) => {
  mysql.query(
    "UPDATE PRODUCT SET is_enable = false WHERE id_product = ?",
    id_product,
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else {
        result(null, ...id_product);
      }
    }
  );
};

Product._getFoodByIdMerChant = (id_merchant, result) => {
  let sql = `SELECT product.id_product,product.name_product,product.state,product.price,product.discount,product.dicriptions,product.created_date,product.is_active,product.is_enable,product.type_food,product.group
  ,
  (
  SELECT IM.url_image
  FROM image_food AS IM
  RIGHT JOIN product AS P ON IM.id_product = P.id_product
  WHERE P.id_merchant = '${id_merchant}' AND product.id_product = IM.id_product ORDER BY RAND() LIMIT 1
  ) AS img
  FROM PRODUCT JOIN image_food ON image_food.id_product = PRODUCT.id_product
  WHERE id_merchant = ? AND is_enable = true GROUP BY id_product`;

  mysql.query(sql, id_merchant, (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      console.log(err);
      result(err, null);
    }
  });
};

Product.findOne = (id_product, result) => {
  mysql.query(
    `SELECT * FROM PRODUCT WHERE id_product = "${id_product}" AND is_enable = true`,
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        console.log(err);
        result(err, null);
      }
    }
  );
};

Product.Update = (product, result)=>{
  mysql.query(
    `UPDATE PRODUCT SET ? WHERE id_product = ?`,[product, product.id_product],
    (err, rows) => {
      if (!err) {
        result(null, rows);
      } else {
        console.log(err);
        result(err, null);
      }
    }
  );
}

module.exports = Product;
