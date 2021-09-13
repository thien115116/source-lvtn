const mysql = require("../../configs/database");
const tokenModel = require("../models/token.Model");

const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;

  if (token) {
    tokenModel.getIs_EnableToken(token, (err, data) => {
      if (err == "Fail") {
        return res.status(403).send({
          success: false,
          message: "Token does not already use.",
        });
      } else {
        next();
      }
    });
  }
});

module.exports = router;
