const attributeModel = require("../models/attribute.Model");
const attributeValue = require("../models/attributeValue.Model");
const unit = require("../unit/randomString");

function Create(req) {
  let object = req.body.attributes;
  if (object && object.length > 0) {
    object.forEach((element) => {
      element.value.forEach((item) => {
        let newItem = new attributeValue({
          id_attr_value: unit._randomAttributeValueId(),
          value: item.name,
          price: item.price,
          id_product: req.body.id_product,
          id_attr: element.id_attr,
        });

        attributeValue.createValue(newItem, (err, result) => {
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
    });
  }
}

function CreateAttByAdmin(req) {
  let object = req.body.attributes;
  console.log("object-------------", JSON.parse(object));
  if (object && object.length > 0) {
    JSON.parse(object).forEach((element) => {
      let a = JSON.parse(JSON.stringify(element.value));
      a.forEach((item) => {
        let newItem = new attributeValue({
          id_attr_value: unit._randomAttributeValueId(),
          value: item.name,
          price: item.price,
          id_product: req.body.id_product,
          id_attr: element.id_attr,
        });

        attributeValue.createValue(newItem, (err, result) => {
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
    });
  }
}

function Delete(req, res) {}

module.exports = {
  Create: Create,
  CreateAttByAdmin: CreateAttByAdmin,
};
