const toppingValue = require("../models/toppingValue.Models");
const unit = require("../unit/randomString");

function Create(req) {
  let object = req.body.topping;
  if (object && object.length > 0) {
    object.forEach((element) => {
      let newItem = new toppingValue({
        id_topping_value: unit._randomAttributeValueId(),
        id_topping: element.id_topping,
        id_product: req.body.id_product,
      });
      toppingValue.Create(newItem, (err, result) => {
        if (!err) {
          console.log({
            status: true,
            message: newItem,
          });
        } else {
          console.log({
            status: false,
            message: null,
          });
        }
      });
    });
  }
}
function CreateByAdmin(req) {
  if(req.body.topping)
  {
    if (req.body.topping.length > 50) {
    let object = JSON.parse(req.body.topping);
    if (object) {
      let newItem = new toppingValue({
        id_topping_value: unit._randomAttributeValueId(),
        id_topping: object.id_topping,
        id_product: req.body.id_product,
      });
      toppingValue.Create(newItem, (err, result) => {
        if (!err) {
          console.log({
            status: true,
            message: newItem,
          });
        } else {
          console.log({
            status: false,
            message: null,
          });
        }
      });
    }
  } else {
    let object = req.body.topping;
    if (object.length > 0 && object.length < 50) {
      object.forEach((element) => {
        let a = JSON.parse(element);
        let newItem = new toppingValue({
          id_topping_value: unit._randomAttributeValueId(),
          id_topping: a.id_topping,
          id_product: req.body.id_product,
        });
        toppingValue.Create(newItem, (err, result) => {
          if (!err) {
            console.log({
              status: true,
              message: newItem,
            });
          } else {
            console.log({
              status: false,
              message: null,
            });
          }
        });
      });
    }
  }
  }

  
}

module.exports = {
  Create: Create,
  CreateByAdmin: CreateByAdmin,
};
