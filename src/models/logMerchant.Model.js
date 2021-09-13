const mysql = require('../../configs/database');

const LogMerchant = function (merchant){
    this.id_log_merchant = merchant.id_log_merchant, 
    this.id_admin        = merchant.id_admin, 
    this.id_merchant     = merchant.id_merchant, 
    this.active_old      = merchant.active_old, 
    this.active_new      = merchant.active_new, 
    this.note            = merchant.note, 
    this.updated_date    = merchant.updated_date
}

LogMerchant.create = (newLog, resutl)=>{
    mysql.query("INSERT INTO LOG_ADMIN_MERCHANT SET ?", newLog, (err, res) => {
        if (err) {
          console.log("error: ", err);
          resutl(err, null);
          return;
        }
    
        console.log("Created Log: ", {...newLog}); 
        resutl(null, {...newLog});
      }); 
}

module.exports = LogMerchant;