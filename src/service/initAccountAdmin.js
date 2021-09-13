const mysql = require('../../configs/database');
const auth = require('../controllers/auth.Controller');
const unit = require('../unit/randomString');
require('dotenv').config()

const ERROR_CODE_DATABASE_DUPLICATE = 1062;

var generateAcountAdmin= ()=>{
    var date = new Date();
    var hash_data = auth._hashPassword(process.env.AC_PASSWORDADMIN);
    const Admin = {
        id_admin: unit._randomAdminId(), 
        salt: hash_data.salt, 
        hash_pass: hash_data.passwordhash , 
        full_name: "Administrator", 
        email: process.env.AC_EMAILADMIN, 
        created_date: date, 
        is_active: true, 
        is_enable: true, 
        role: 2, 
        is_confirmEmail:null, 
        updated_date: date, 
        login_at: "defaul"
    };

    return Admin;
}

function _initAccount(){
    var sqlScript = `INSERT INTO ADMIN SET ?`;
    mysql.query(sqlScript,generateAcountAdmin(), (err, rows)=>{
        if(!err){
            console.log({
                status: true,
                message: "Administrator account has been created."
            })
        }else if (err.errno == ERROR_CODE_DATABASE_DUPLICATE){
            console.log({
                status: false,
                message: "Administrator account already exists"
            })
        }else{
            console.log({
                status: false,
                message: "Err"
            })
        }
    })
}
module.exports = {
    _initAccount: _initAccount
}