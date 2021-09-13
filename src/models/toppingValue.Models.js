const mysql = require('../../configs/database')

const ToppingValue = function(toppingValue){
    this.id_topping_value = toppingValue.id_topping_value,
    this.id_topping = toppingValue.id_topping,
    this.id_product = toppingValue.id_product
}

ToppingValue.Create = (topping, result)=>{
    mysql.query("INSERT INTO TOPPING_VALUES SET ?", topping, (err, rows) => {
        if (err) {
          console.log("err" + err);
          result(err, null);
          return;
        } else {
          console.log("Created Attribute Value: " + topping);
          result(null, { ...topping });
        }
      });
}

module.exports = ToppingValue;