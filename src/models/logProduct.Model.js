const mysql = require('../../configs/database');

const LogProduct = function (product){
    this.id_log_monan = product.id_log_monan, 
    this.id_admin        = product.id_admin, 
    this.id_product     = product.id_product, 
    this.active_old      = product.active_old, 
    this.active_new      = product.active_new, 
    this.note            = product.note, 
    this.updated_date    = product.updated_date
}


LogProduct.Create = (newLog, resutl)=>{
    mysql.query("INSERT INTO LOG_ADMIN_FOOD SET ?", newLog, (err, res) => {
        if (err) {
          console.log("error: ", err);
          resutl(err, null);
          return;
        }
    
        console.log("Created Log: ", {...newLog}); 
        resutl(null, {...newLog});
      }); 
}

module.exports = LogProduct;