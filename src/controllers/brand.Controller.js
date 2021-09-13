const _modelBrand = require("../models/brand.Model");
const unit = require("../unit/randomString");
const configs = require("../../configs/secretkey");

function find(req, res) {
  _modelBrand.Find(req, (err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(401).send({
        status: false,
        message: "Err",
      });
    }
  });
}

function findOne(req, res) {
  console.log(req);
  if (req.query.code && req.query.secretKey == configs.secret) {
    _modelBrand.FindOne(req.query.code, (err, result) => {
      if (!err) {
        if (result[0]) {
          res.status(200).send(result[0]);
        } else {
          res.status(401).send({
            status: false,
            message: "Empty",
          });
        }
      } else {
        res.status(401).send({
          status: false,
          message: "Fail",
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content not empty",
    });
  }
}

function create(req, res) {
  let brand = req.body;
  let dateAt = new Date();

  let newBrand = new _modelBrand({
    id_brand: unit._randomBrandId(),
    code: brand.code,
    createAt: dateAt,
    is_enable: true,
    nameBrand: brand.nameBrand,
    legalRepresentative: brand.legalRepresentative,
    address: brand.address,
    dateActive: brand.dateActive,
  });

  _modelBrand.Create(newBrand, (err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(401).send({
        status: false,
        err,
      });
    }
  });
}

function update(req, res) {
  let brand = req.body;
  if (brand) {
    _modelBrand.FindOneById(req.params.id_brand, (err, result) => {
      if (!err && result) {
        console.log(result);
        let updateBrand = new _modelBrand({
          id_brand: result.id_brand,
          code: brand.code || result.code,
          createAt: brand.createAt || result.createAt,
          is_enable: brand.is_enable || result.is_enable,
          nameBrand: brand.nameBrand || result.nameBrand,
          legalRepresentative:
            brand.legalRepresentative || result.legalRepresentative,
          address: brand.address || result.address,
          dateActive: brand.dateActive || result.dateActive,
        });

        _modelBrand.Update(updateBrand, (err, resultUpdate) => {
          if (!err) {
            res.status(200).send(resultUpdate);
          } else {
            res.status(401).send({
              status: false,
              message: "Fail",
            });
          }
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Fail",
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Content not empty",
    });
  }
}

function deleteBrand(req, res) {}
function getAllBrandByAdmin(req, res) {
  _modelBrand.FindByAdmin("", (err, result) => {
    if (!err) {
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(401).send({
        status: false,
        message: "Err",
      });
    }
  });
}
function getAllBrandDetailByAdmin(req, res) {
  if (req.params) {
    let data = req.params.id;
    _modelBrand.FindDetailByAdmin(data, (err, result) => {
      if (!err) {
        console.log(result);
        res.status(200).send(result);
      } else {
        console.log(err);
        res.status(401).send({
          status: false,
          message: "Err",
        });
      }
    });
  } else {
    res.status(401).send({
      status: false,
      message: "Err",
    });
  }
}
module.exports = {
  find: find,
  findOne: findOne,
  create: create,
  update: update,
  deleteBrand: deleteBrand,
  getAllBrandByAdmin: getAllBrandByAdmin,
  getAllBrandDetailByAdmin: getAllBrandDetailByAdmin,
};
