const _productModel = require("../models/product.Model");
const merchantModel = require("../models/merchant.Model");
const imageModel = require("../models/image.Model");
const attributeModel = require("../models/attribute.Model");
const toppingModel = require("../models/topping.Models");
const unit = require("../unit/randomString");
const attributeValueController = require("./attributeValues.Controller");
const toppingValueController = require("../controllers/toppingValue.Controller");
const tagController = require("../controllers/tag.Controller");
const attributeController = require("../controllers/attribute.Controller");
const merchantController = require("./merchant.Controller");

function _addNewProduct(req, res) {
  console.log(merchantController);
  console.log(toppingValueController);
  console.log(attributeValueController);
  if (req.decoded.role == 1) {
    merchantController.findByIdAccount(req.decoded.id_user, (err, data) => {
      if (err) {
        result(null, {
          status: false,
          message: "Can't get id merchant !",
        });
      } else {
        var date = new Date();
        var uuid = unit._randomFoodId();
        const product = new _productModel({
          id_product: uuid,
          id_merchant: data,
          name_product: req.body.name_product,
          price: req.body.price,
          discount: req.body.discount,
          dicriptions: req.body.dicriptions,
          created_date: date,
          is_active: true,
          is_enable: true,
          update_date: null,
          type_food: req.body.type_food,
          group: req.body.group,
        });
        _productModel.create(product, (err, result) => {
          if (!err) {
            req.body.id_product = uuid;
            addImage(result.id_product, req.body.images, (err, resultIMG) => {
              if (!err) {
                // Attribute
                attributeValueController.Create(req);
                // topping
                toppingValueController.Create(req);

                tagController._createTagFood(
                  result.id_product,
                  req.body.tags,
                  (err, resultTAG) => {
                    if (err) {
                      res.status(400).send({
                        message: "An error occurred during the create process!",
                      });
                      return;
                    } else {
                      res.status(200).send({
                        status: true,
                        message: {
                          id_product: result.id_product,
                          name_product: result.name_product,
                          discount: result.discount,
                          price: result.price,
                          images: `/upload/${req.body.images[0]}`,
                        },
                      });
                    }
                  }
                );
                /// Call func process Tag.
              }
            });
          } else {
            res.status(400).send({
              status: false,
              message: "An error occurred during the create process!",
            });
            return;
          }
        });
      }
    });
  } else {
    res.status(201).send({
      status: false,
      message: "Access Denied.",
    });
  }
}

function _addNewFood(req, res) {
  //console.log(req.body);
  var date = new Date();
  var uuid = unit._randomFoodId();
  const product = new _productModel({
    id_product: uuid,
    id_merchant: req.body.id_merchant,
    name_product: req.body.name_product,
    price: req.body.price,
    discount: req.body.discount,
    dicriptions: req.body.dicriptions,
    created_date: date,
    is_active: true,
    is_enable: true,
    update_date: null,
    type_food: req.body.type_food,
    group: req.body.group,
  });

  _productModel.create(product, (err, result) => {
    if (!err) {
      req.body.id_product = result.id_product;
      addImage(result.id_product, req.body.images, (err, resultIMG) => {
        if (!err) {
          tagController.createTagFoodAdmin(
            result.id_product,
            req.body.tags,
            (err, resultTAG) => {
              if (err) {
                res.status(400).send({
                  message: "An error occurred during the create process!",
                });
                return;
              } else {
                // Attribute
                attributeValueController.Create(req);
                // topping
                toppingValueController.Create(req);

                res.status(200).send({
                  status: true,
                  data: {
                    id_product: result.id_product,
                    name_product: result.name_product,
                    price: result.price,
                    images: `/upload/${req.body.images[0]}`,
                    attr: req.body.attributes,
                  },
                });
              }
            }
          );
          /// Call func process Tag.
        }
      });
    } else {
      res.status(400).send({
        message: "An error occurred during the create process!",
      });
      return;
    }
  });
}

function _addNewFoodByAdmin(req, res) {
  var date = new Date();
  var uuid = unit._randomFoodId();
  const product = new _productModel({
    id_product: uuid,
    id_merchant: req.body.id_merchant,
    name_product: req.body.name_product,
    price: req.body.price,
    discount: req.body.discount,
    dicriptions: req.body.dicriptions,
    created_date: date,
    is_active: true,
    is_enable: true,
    update_date: null,
    type_food: req.body.type_food,
    group: req.body.group,
  });

  _productModel.create(product, (err, result) => {
    if (!err) {
      req.body.id_product = result.id_product;
      addImage(result.id_product, req.body.images, (err, resultIMG) => {
        if (!err) {
          tagController.createTagFoodAdmin(
            result.id_product,
            req.body.tags,
            (err, resultTAG) => {
              if (err) {
                res.status(400).send({
                  message: "An error occurred during the create process!",
                });
                return;
              } else {
                // Attribute
                attributeValueController.CreateAttByAdmin(req);
                // topping
                toppingValueController.CreateByAdmin(req);

                res.status(200).send({
                  status: true,
                  data: {
                    id_product: result.id_product,
                    name_product: result.name_product,
                    price: result.price,
                    images: `/upload/${req.body.images[0]}`,
                  },
                });
              }
            }
          );
          /// Call func process Tag.
        }
      });
    } else {
      res.status(400).send({
        message: "An error occurred during the create process!",
      });
      return;
    }
  });
}

function addImage(id_product, listImage, result) {
  listImage.forEach((items) => {
    var uuid = unit._randomImageId();
    _productModel.createImage(
      (Items = {
        id_photo: uuid,
        id_product: id_product,
        url_image: `/upload/${items}`,
      }),
      (err, res) => {
        if (err) {
          console.log("An error occurred create image: " + items);
        }
      }
    );
  });
  result(null, { ...listImage });
}

function _deleteProduct(req, res) {
  console.log(req.query.id_product);
  if (req.params.id_product || req.query.id_product) {
    _productModel.findOne(
      req.params.id_product || req.query.id_product,
      (err, result) => {
        if (!err) {
          merchantModel.getMerchantByIdAccount(
            req.decoded.id_user,
            (err, resultmer) => {
              console.log(result[0].id_merchant);
              console.log(resultmer);
              if (result[0].id_merchant == resultmer) {
                _productModel.delete(
                  req.params.id_product || req.query.id_product,
                  (err, resultFoo) => {
                    res.status(200).send({
                      status: true,
                      message: "Delete Successful",
                    });
                  }
                );
              } else {
                res.status(201).send({
                  status: false,
                  message: "Access Denied.",
                });
              }
            }
          );
        } else {
          res.status(400).send({
            message: "An error occurred during the create process!",
          });
        }
      }
    );
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

function _getFoodByIdMerChant(id_merchant, res) {
  _productModel._getFoodByIdMerChant(id_merchant, (err1, result1) => {
    if (!err1) {
      res(null, result1);
    } else {
      res(err, null);
    }
  });
}

function setStateFood(req, res) {
  _productModel.findOne(req.body.id_product, (err, row) => {
    if (!err) {
      row[0].is_active = req.body.is_active;
      _productModel.Update(row[0], (err, row2) => {
        res.status(200).send({
          status: true,
          message: "Updated",
        });
      });
    }
  });
}

function findOne(req, res) {
  let Product;
  _productModel.findOne(req.params.id_product, (err, row) => {
    Product = row[0];
    attributeModel.getHierarchyAttribute(
      req.params.id_product,
      (err, row_attr) => {
        if (!err) {
          // res.send(row_attr);
          Product.attributes = buildHierarchyAttribute(
            groupBy(row_attr, "id_attr")
          );
          toppingModel.getHierarchyTopping(
            req.params.id_product,
            (err, row_topping) => {
              if (!err) {
                Product.topping = row_topping;
                imageModel.findByIdFood(
                  req.params.id_product,
                  (err, rowImages) => {
                    if (!err && rowImages.length > 0) {
                      Product.images = rowImages;
                      res.status(200).send(Product);
                    } else {
                      console.log(err);
                      res.status(401).send({
                        status: false,
                        message: "Not find food.",
                      });
                    }
                  }
                );
              } else {
                console.log(err);
                res.status(401).send({
                  status: false,
                  message: "Not find food.",
                });
              }
            }
          );
        } else {
          console.log(err);
          res.status(401).send({
            status: false,
            message: "Not find food.",
          });
        }
      }
    );
  });
}

function buildHierarchyAttribute(row) {
  let collection = [];
  row.forEach((element) => {
    let item = {
      id_attr: element[0].id_attr,
      name: element[0].name,
      value: [],
    };
    element.forEach((itemValue) => {
      let obj = {
        id_attr: element[0].id_attr,
        name: element[0].name,
        id_attr_value: itemValue.id_attr_value,
        value: itemValue.value,
        price: itemValue.price,
      };
      item.value.push(obj);
      item.value.sort((a, b) => (a.price > b.price ? 1 : -1));
    });
    collection.push(item);
  });
  return collection;
}

function groupBy(collection, property) {
  var i = 0,
    val,
    index,
    values = [],
    result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
}

function updateFood(req, res) {
  //Something
}
module.exports = {
  _addNewProduct: _addNewProduct,
  _deleteProduct: _deleteProduct,
  _getFoodByIdMerChant: _getFoodByIdMerChant,
  _addNewFood: _addNewFood,
  findOne: findOne,
  _addNewFoodByAdmin: _addNewFoodByAdmin,
  groupBy: groupBy,
  setStateFood: setStateFood,
  updateFood: updateFood,
};
