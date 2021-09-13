const mysql = require("../../configs/database");

const Token = function (token){
   this.id_token= token.id_token,
   this.id_user= token.id_user,
   this.state= token.state,
   this.reg_date=token.reg_date,
   this.token= token.token
};

Token.create = (newToken, result)=>{
    mysql.query("INSERT INTO TOKEN SET ?", newToken, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
       // console.log("Created token: ", {...newToken});
        result(null, {...newToken});
    });
}

Token.createShipper = (newToken, result)=>{
  mysql.query("INSERT INTO SHIPPER_TOKEN SET ?", newToken, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
     // console.log("Created token: ", {...newToken});
      result(null, {...newToken});
  });
}

Token.update = (data , result)=>{
    mysql.query('UPDATE `token` SET `state`= false WHERE token = ?',data.token, (err, res)=>{
      if(!err){
          console.log(data.id_user + " Logout succes.");
        result(null, {
          status: true,
          messeage: "Update Acount Successful"
        });
      }else{
        console.log("error: ", err);
          result(err, null);
          return;
      }
    })
}

Token.getIs_EnableToken = (data, result)=>{
  mysql.query('SELECT * FROM token WHERE token = ? and `state` = true',data,(err, rows)=>{
    if(!err){
      if(rows.length == 0){
        result('Fail', null);
        return;
      }
      result(null, {...data});
      return;
    }else{
      console.log(err);
      result(err, null);
      return;
    }
})
}

module.exports = Token;