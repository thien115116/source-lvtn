const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../../configs/secretkey");
const adminModel = require("../models/admin.Model");

const router = express.Router();

router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers.authorization;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        // return res.json({ success: false, message: 'Failed to authenticate token.' });
        return res.status(403).send({
          success: false,
          message: "Failed to authenticate token.",
        });
      
      }
      // return res.status(403).send({
      //   success: false,
      //   message: "User is deactivate or not exist",
      // });
      adminModel.getAccountById(decoded.id_admin, (err, data)=>{
            if(err){
              return res.status(403).send({
                success: false,
                message: "User does not exits.",
              });
            }else{
              req.decoded = decoded;
              req.user = data;
              next();
            }
          })
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
});

module.exports = router;
