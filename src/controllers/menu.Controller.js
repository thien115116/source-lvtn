const MerchantModel = require("../models/merchant.Model");
const MenuModel = require("../models/menu.Model");
const MenuItemModel = require("../models/menuItem.Model");
const { _randomMenuId, _randomMenuItemId } = require("../unit/randomString");
const { _getFoodByIdMerChant } = require("./product.Controller");

function getAll(req, res) {
  if (req.params.id_merchant) {
    MenuModel.selectAll(req.params.id_merchant, (err, result) => {
      if (!err) {
        notEmptyArray = result[0].filter((item) => item.id_menu);
        let newArray = groupBy(notEmptyArray, "id_menu");
        let finalArray = [];
        if (Array.isArray(newArray)) {
          for (let index = 0; index < newArray.length; index++) {
            const element = newArray[index];
            let filterArray = filterData(element);
            finalArray.push(filterArray);
          }
        }
        res.status(200).send(finalArray);
      } else {
        res.status(401).send({
          status: true,
          message: "Nodata",
        });
      }
    });
  }
}

function filterData(array) {
  let products = [];
  let resultArray = null;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    products.push({
      id_product: element.id_product,
      name_product: element.name_product,
      price: element.price,
      discount: element.discount,
      dicriptions: element.dicriptions,
      created_date: element.created_date,
      is_active: element.is_active,
      is_enable: element.is_enable,
      type_food: element.type_food,
      group: element.group,
      img: element.img,
    });
    if (resultArray === null) {
      resultArray = {
        id_menu: element.id_menu,
        name_menu: element.name_menu,
        view: element.view,
        is_enable: element.is_enable,
        createdAt: element.createdAt,
        id_menu_item: element.id_menu_item,
      };
    }
  }
  resultArray.product = products;
  return resultArray;
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

function createNewMenu(req, res) {
  if (req.decoded.id_user) {
    MerchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err, id_merchant) => {
        if (!err) {
          if (req.body) {
            let newMenu = {
              id_menu: _randomMenuId(),
              id_merchant: id_merchant,
              is_enable: 1, // 1 : enable , -1: disable
              name_menu: req.body.name,
              createdAt: new Date(),
              updatedAt: null,
              view: req.body.view, // 0: Ngang , -1 : Dọc
            };
            console.log(newMenu);
            MenuModel.addNew(newMenu, (err, result) => {
              if (!err) {
                result.quantity = 0;
                res.status(200).send({
                  message: "Success",
                  code: 1,
                  Menu: result,
                });
              } else {
                res.status(500).send(err);
              }
            });
          } else {
            res.status(400).send({
              message: "No Data",
            });
          }
        } else {
          res.status(500).send(err);
        }
      }
    );
  }
}

function addNewProductToMenu(req, res) {
  if (req.decoded.id_user) {
    if (req.body.id_menuItem || req.body.id_product) {
      let newItem = {
        id_menu_item: _randomMenuItemId(),
        id_menu: req.body.id_menuItem,
        id_product: req.body.id_product,
      };
      MenuItemModel.create(newItem, (err, result) => {
        if (!err) {
          console.log(newItem);
          res.status(200).send({
            status: true,
            message: "Success",
          });
        } else {
          console.log(err);
          res.status(400).send({
            Message: "Data is not available !",
          });
        }
      });
    } else {
      res.status(400).send({
        Message: "Data is not available !",
      });
    }
  }
}

function getFoodOfMenu(req, res) {
  let arrayFood = null;
  let arrayFinal = [];
  //console.log(req);
  if (req.decoded.id_user) {
    MerchantModel.getMerchantByIdAccount(
      req.decoded.id_user,
      (err, id_merchant) => {
        if (!err) {
          _getFoodByIdMerChant(id_merchant, (err1, result) => {
            if (!err1) {
              arrayFood = result;
              // console.log(arrayFood);
              if (req.params.id_menu) {
                let id_menu = req.params.id_menu;
                MenuItemModel.getOneByID(id_menu, (err, result) => {
                  if (!err) {
                    for (let i = 0; i < arrayFood.length; i++) {
                      //Khởi tạo list full ban đầu chưa được check
                      arrayFinal = [
                        ...arrayFinal,
                        {
                          id_product: arrayFood[i].id_product,
                          name_product: arrayFood[i].name_product,
                          discount: arrayFood[i].discount,
                          price: arrayFood[i].price,
                          is_check: false,
                        },
                      ];
                    }
                    //Check xem menu này có món chưa
                    if (result.length > 0) {
                      // Trường hợp có món rồi thì tiếp tục
                      for (let j = 0; j < result.length; j++) {
                        const foodInMenu = result[j];
                        for (let i = 0; i < arrayFinal.length; i++) {
                          const food = arrayFinal[i];

                          if (foodInMenu.id_product === food.id_product) {
                            food.is_check = true;
                            //console.log(food);
                            food.id_menu_item = foodInMenu.id_menu_item;
                          }
                        }
                      }
                      res.status(200).send(
                        arrayFinal.sort(function (a, b) {
                          return b.is_check - a.is_check;
                        })
                      );
                    } else {
                      // Trường hợp này không có món thì trả về toàn bộ list món của nó
                      res.status(200).send(arrayFinal);
                    }
                  } else {
                    res.status(203).send(err);
                  }
                });
              }
            } else {
              console.log(err1);
            }
          });
        } else {
          console.log(err);
        }
      }
    );
  }
}

function deleteOne(req, res) {
  // console.log(req.query.id_menuItem);
  if (req.query.id_menuItem) {
    let id_menu_item = req.query.id_menuItem;
    MenuItemModel.deleteOne(id_menu_item, (err, result) => {
      if (!err) {
        res.status(200).send({
          status: true,
          Message: "Delete Success",
        });
      } else {
        res.status(203).send({
          status: true,
          Message: "Delete Fail",
        });
      }
    });
  }
}
function getGetMenu(req, res) {
  MerchantModel.getMerchantByIdAccount(
    req.decoded.id_user,
    (err, id_merchant) => {
      if (!err) {
        MenuModel.getMenuMerchant(id_merchant, (errMenu, rowMenu) => {
          if (!err) {
            res.status(200).send(rowMenu);
          } else {
            res.status(401).send(err);
          }
        });
      }
    }
  );
}

function update(req, res) {
  MenuModel.findOne(req.params.id_menu, (err, row) => {
    if (!err) {
      row.name_menu = req.body.name_menu;
      console.log(req.body.view ? 1 : 0);
      console.log(req.body.view);
      row.view = req.body.view ? 1 : 0;
      row.updatedAt = new Date();
      MenuModel.update(row, (errUpdate, resUpdate) => {
        if (!errUpdate) {
          res.status(200).send({
            status: true,
            message: "Update",
          });
        } else {
          res.status(401).send({
            status: true,
            message: "Fail",
          });
        }
      });
    }
  });
}
function deleteMenu(req, res) {
  MerchantModel.getMerchantByIdAccount(
    req.decoded.id_user,
    (err, id_merchant) => {
      if (!err) {
        let id_menu = req.params.id_menu;
        MenuModel.checkQuantity(id_menu, (errMenu, rowMenu) => {
          if (!errMenu && rowMenu.quantity === 0) {
            console.log(req.params);
            MenuModel.deleteMenu(id_menu, (errDelete, result) => {
              if (!errDelete) {
                res.status(200).send({ status: true, message: "Success" });
              }
            });
          } else {
            res.status(201).send({ status: false, message: "Fail" });
          }
        });
      }
    }
  );
}
module.exports = {
  createNewMenu: createNewMenu,
  addNewProductToMenu: addNewProductToMenu,
  getAll: getAll,
  getFoodOfMenu: getFoodOfMenu,
  deleteOne: deleteOne,
  getGetMenu: getGetMenu,
  update: update,
  deleteMenu,
};
