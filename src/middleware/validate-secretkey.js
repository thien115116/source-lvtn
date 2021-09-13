const config = require('../../configs/secretkey');
const express = require("express");
const router = express.Router();

let validateSecretKey = (secretKey)=>{
    let flag = false;
    if(config.secret == secretKey){
        flag = true;
        return flag
    }else{
        flag = false;
        return flag
    }
    
}

router.use((req, res, next) => {
    let secretKey = req.body.secretKey || req.query.secretKey || req.headers.secretKey;
    if(validateSecretKey(secretKey)){
        next();
    }else{
        return res.status(403).send({
            success: false,
            message: "Access Denied.",
          });
    }
});

module.exports = router;