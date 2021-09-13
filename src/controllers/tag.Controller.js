const Tag = require("../models/tag.Model");
const TagModel = require("../models/tag.Model");
const unit = require("../unit/randomString");

function create(req, res) {
  if (req.body.tagName) {
    const tag = new TagModel({
      id_tag: unit._randomTagId(),
      tag_name: req.body.tagName,
    });
    TagModel.create(tag, (err, result) => {
      if (!err) {
        res.status(200).send({
          id_tag: result.id_tag,
          tag_name: result.tag_name,
        });
      } else {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer.",
        });
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "Cancle create tag.",
    });
  }
}

function findByName(req, res) {
  if (req.query.keyWord) {
    TagModel.findByName(req.query.keyWord, (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        return res.status(500).send({
          message: err.message || "Some error occurred while search the Tag.",
        });
      }
    });
  }
}

function find(req, res) {
  TagModel.find(null, (err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      return res.status(500).send({
        message: err.message || "Some error occurred while search the Tag.",
      });
    }
  });
}

function findTop(req, res) {
  TagModel.findTop(null, (err, result) => {
    if (!err) {
      res.status(200).send(result.sort((a, b) => (a.quantity > b.quantity ? -1 : 1)));
    } else {
      return res.status(500).send({
        message: err.message || "Some error occurred while search the Tag.",
      });
    }
  });
}

function createTagFood(id_product, listTagFood, result) {
  // listTagFood.forEach(function(items){
  //     Tag.createTagFood(itemsTag={
  //         id_hashtag_monan: unit._randomTagsId(),
  //         id_tag: items.id_tag,
  //         id_product: id_product
  //     }, (err, res)=>{
  //         if(err){
  //             console.log('An error occurred create tag: '+ items);
  //         }
  //     })
  // });
  // result(null, {...listTagFood});

  Array.from(listTagFood).forEach(function (items) {
    Tag.createTagFood(
      (itemTag = {
        id_hashtag_monan: unit._randomTagsId(),
        id_tag: items.id_tag,
        id_product: id_product,
      }),
      (err, res) => {
        if (err) {
          console.log("An error occurred create tag: " + items);
        }
      }
    );
  });
  result(null, { ...listTagFood });
}

function createTagFoodAdmin(id_product, listTagFood, result) {
  console.log(listTagFood);
  if (typeof listTagFood === "undefined") {
    result(null, null);
  } else if (listTagFood && listTagFood.length > 50) {
    let a = JSON.parse(listTagFood);
    Tag.createTagFood(
      (itemTag = {
        id_hashtag_monan: unit._randomTagsId(),
        id_tag: a.id_tag,
        id_product: id_product,
      })
    );
    result(null, listTagFood);
  } else {
    Array.from(listTagFood).forEach(function (items) {
      Tag.createTagFood(
        (itemTag = {
          id_hashtag_monan: unit._randomTagsId(),
          id_tag: JSON.parse(items).id_tag,
          id_product: id_product,
        }),
        (err, res) => {
          if (err) {
            console.log("An error occurred create tag: " + items);
          }
        }
      );
    });
    result(null, { ...listTagFood });
  }
}

function _adminFindTagOfProduct(req, res) {
  console.log(req.query.id_product);
  TagModel.findTagOfProduct(req.query.id_product, (err, result) => {
    console.log(result);
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(403).send({ message: "Error" });
    }
  });
}

module.exports = {
  _create: create,
  _findByName: findByName,
  _find: find,
  _findTop: findTop,
  _createTagFood: createTagFood,
  createTagFoodAdmin: createTagFoodAdmin,
  _adminFindTagOfProduct: _adminFindTagOfProduct,
};
