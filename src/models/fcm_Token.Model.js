const mysql = require('../../configs/database');

const FCM = function(fcm){
    this.id_fcm = fcm.id_fcm,
    this.fcm_token  = fcm.fcm_token,
    this.create_at = fcm.create_at,
    this.id_user = fcm.id_user
}

FCM.Create = function(fcm, result){
    mysql.query("INSERT INTO FCM_TOKEN SET ?", fcm, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
       // console.log("Created token: ", {...newToken});
        result(null, {...fcm});
    });
}

FCM.Update = function(fcm, result){
    mysql.query('UPDATE FCM_TOKEN SET ? WHERE id_fcm = ?',[
        fcm, fcm.id_fcm
    ], (err, res)=>{
        if(!err){
          result(null, {
            status: true,
            message: "Updated"
          });
        }else{
          console.log("error: ", err);
            result(err, null);
        }
      })
}

FCM.FindOneByToken = (fcm_token, result) => {
    mysql.query(
      `SELECT * FROM FCM_TOKEN WHERE fcm_token = '${fcm_token}' `,
      (err, rows) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        }else{
            result(null, rows[0]);
        }
       
      }
    );
  };

module.exports = FCM;