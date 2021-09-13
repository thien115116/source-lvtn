const mysql = require("../../configs/database");

const Attribute_values = function(attributeValue){
    this.id_attr_value = attributeValue.id_attr_value,
    this.value = attributeValue.value,
    this.price= attributeValue.price,
    this.id_product= attributeValue.id_product,
    this.id_attr = attributeValue.id_attr
}

Attribute_values.createValue = (attributeValue, result) => {
    mysql.query("INSERT INTO ATTRIBUTE_VALUES SET ?", attributeValue, (err, rows) => {
      if (err) {
        console.log("err" + err);
        result(err, null);
        return;
      } else {
        console.log("Created Attribute Value: " + attributeValue);
        result(null, { ...attributeValue });
      }
    });
};

Attribute_values.findByIdProduct = (id_product, result)=>{
   
}

Attribute_values.deleteAttributeValueFromProduct = (data, result)=>{

}

module.exports = Attribute_values;