let validateEmail = (email) =>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function _isvalidemailformated(req, res, next){
    if(validateEmail(req.body.email)){
        next();
    }else{
        return res.status(400).send({
            success: false,
            message: "Invalid email format.",
          });
    }
}

function isPhoneNumber(number){
    return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
}

function isVietnamesePhoneNumber(req, res, next) {
   if(isPhoneNumber(req.body.phoneNumber)){
    next();
   }else{
    return res.status(400).send({
        success: false,
        message: "Invalid phone format.",
      });
   }
}



module.exports ={
    _isvalidemailformated: _isvalidemailformated,
    isVietnamesePhoneNumber: isVietnamesePhoneNumber
}