const mysql = require("../../configs/database");

const Brand = function (brand) {
  (this.id_brand = brand.id_brand),
    (this.code = brand.code),
    (this.createAt = brand.createAt),
    (this.is_enable = brand.is_enable),
    (this.nameBrand = brand.nameBrand);
  (this.legalRepresentative = brand.legalRepresentative),
    (this.address = brand.address),
    (this.dateActive = brand.dateActive);
};

Brand.Create = (brand, result) => {
  mysql.query("INSERT INTO BRAND SET ?", brand, (err, row) => {
    if (err) {
      if ((err.errno = 1062)) {
        console.log(err);
        result(
          {
            message: err.sqlMessage,
          },
          null
        );
      } else {
      }
    } else {
      result(null, { ...brand });
    }
  });
};

Brand.FindOne = (code, result) => {
  mysql.query("SELECT * FROM BRAND WHERE code = ?", code, (err, row) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, row);
    }
  });
};

Brand.FindOneById = (id_brand, result) => {
  mysql.query(
    "SELECT * FROM BRAND WHERE id_brand = ?",
    id_brand,
    (err, row) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, row[0]);
      }
    }
  );
};
Brand.FindDetailByAdmin = (id_brand, result) => {
  mysql.query(
    "SELECT * FROM MERCHANT WHERE id_brand = ?",
    id_brand,
    (err, row) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, row);
      }
    }
  );
};

Brand.Find = (brand, result) => {
  mysql.query("SELECT * FROM BRAND", (err, row) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, row);
    }
  });
};
Brand.FindByAdmin = (brand, result) => {
  mysql.query("CALL get_brand", (err, row) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, row[0]);
    }
  });
};

Brand.Update = (brand, result) => {
  mysql.query(
    "UPDATE BRAND SET ? WHERE id_brand =?",
    [brand, brand.id_brand],
    (err, row) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, { ...brand });
      }
    }
  );
};

Brand.Delete = (brand, result) => {};

module.exports = Brand;
