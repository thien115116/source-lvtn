const mysql = require('../../configs/database');

const SUPPORT = function(support){
    this.id_question = support.id_question,
    this.id_type_user = support.id_type_user,
    this.content= support.content,
    this.state=support.state
}

SUPPORT.Create = (support, result)=>{
    mysql.query(`INSERT INTO QUESTION SET ?`,support, (err, rows)=>{
        if(!err){
            result(null, {...support})
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

module.exports = SUPPORT;