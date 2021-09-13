const mysql = require("../../configs/database");

const Banner = function (banner) {
  (this.id_banner = banner.id_banner),
    (this.url_image = banner.url_image),
    (this.created_date = banner.created_date),
    (this.disable_date = banner.disable_date),
    (this.public_date = banner.public_date),
    (this.state = banner.state),
    (this.url_blog = banner.url_blog);
};

Banner.create = (banner, result) => {
  mysql.query("INSERT INTO BANNER SET ?", banner, (err, res) => {
    if (err) {
      result(err, null);
      console.log("Err" + err);
      return;
    }
    result(null, { ...banner });
  });
};
Banner.update = (banner, result) => {
  mysql.query(
    "UPDATE BANNER SET ? WHERE id_banner = ?",
    [banner, banner.id_banner],
    (err, res) => {
      if (err) {
        result(err, null);
        console.log("Err" + err);
        return;
      }
      result(null, { ...banner });
    }
  );
};

Banner.getState1 = (state, result) => {
  mysql.query(
    "SELECT * FROM BANNER WHERE BANNER.state=?",
    state,
    (err, rows) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, [...rows]);
      }
    }
  );
};
Banner.setState = (id, state, result) => {
  mysql.query(
    `UPDATE BANNER SET state="${state}" WHERE id_banner = ?`,
    id,
    (err, rows) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, null);
      }
    }
  );
};
Banner.getAll = (result) => {
  mysql.query("SELECT * FROM BANNER WHERE state=1 || state=0", (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
};

Banner.getBannerOnline = (result)=>{
  mysql.query("SELECT * FROM BANNER WHERE state=1", (err, rows) => {
    if (!err) {
      result(null, rows);
    } else {
      result(err, null);
    }
  });
}
module.exports = Banner;
