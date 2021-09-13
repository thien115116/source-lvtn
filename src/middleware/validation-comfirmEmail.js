const mysql = require('../../configs/database');
const express = require("express");

const router = express.Router();

router.use((req, res, next) =>{
    mysql.query('SELECT email FROM ACCOUNT WHERE id_user= ?', req.decoded.id_user, (err, rows)=>{
        if(!err && rows[0].email){
            mysql.query('SELECT * FROM ACCOUNT WHERE email = ?',rows[0].email,(err2, rows2)=>{
                if(!err){
                    if(rows2[0].is_confirmEmail){
                        return res.status(403).send({
                            success: false,
                            message: "Please confirm email before request open merchant.",
                        });
                    }else{
                        //console.log(rows2);
                        next();
                    }
                    
                }else{
                    return res.status(500).send({
                        success: false,
                        message: "Eror.",
                    });
                }
            })
        }else{
            return res.status(403).send({
                success: false,
                message: "Please add email to your prifile and confirm this email.",
            });
        }
    })
})

module.exports = router;
