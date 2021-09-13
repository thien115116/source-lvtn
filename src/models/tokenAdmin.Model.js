const mysql = require("../../configs/database");


const Token = function(token) {
    this.id_token = token.id_token,
        this.id_admin = token.id_admin,
        this.state = token.state,
        this.reg_date = token.reg_date,
        this.token = token.token
};

Token.create = (newToken, result) => {
    mysql.query("INSERT INTO TOKEN_ADMIN SET ?", newToken, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, {...newToken });
    });
}


module.exports = Token;