const bannerModel = require("../models/banner.Model");
const { doStartBanner, doEndBanner } = require("../service/banner.Service");
const unit = require("../unit/randomString");
const uploadController = require("./upload.Controller");

function _createBanner(req, res) {
  console.log(req.body);
  let date = new Date();
  let datePub = new Date(req.body.publicAt);
  let datePri = new Date(req.body.privateAt);
  console.log(datePub);
  console.log(datePri);
  let banner = new bannerModel({
    id_banner: unit._randomBannerId(),
    url_image: req.body.images[0],
    created_date: date,
    disable_date: datePri,
    public_date: datePub,
    state: 0,
    url_blog: "",
  });
  console.log(banner);
  bannerModel.create(banner, (err, result) => {
    if (!err) {
      console.log(result);
      doStartBanner(result);
      doEndBanner(result);
      res.status(200).send({
        status: 0,
        message: "Create Success",
        banner: result,
      });
    } else {
      res.status(201).send({
        status: 1,
        message: "Create fail",
      });
    }
  });
}
function _updateBanner(req, res) {
  console.log(req.body);
  let date = new Date();
  let datePub = new Date(req.body.publicAt);
  let datePri = new Date(req.body.privateAt);

  let banner = new bannerModel({
    id_banner: req.body.id,
    url_image: req.body.images[0],
    created_date: date,
    disable_date: datePri,
    public_date: datePub,
    state: 0,
    url_blog: "",
  });

  bannerModel.update(banner, (err, result) => {
    if (!err) {
      doStartBanner(result);
      doEndBanner(result);
      res.status(200).send({
        status: 0,
        message: "Create Success",
      });
    } else {
      res.status(201).send({
        status: 1,
        message: "Create fail",
      });
    }
  });
}
function _deleteBanner(req, res) {
  console.log(req.body.id);
  bannerModel.setState(req.body.id, 2, (err, result) => {
    if (!err) {
      res.status(200).send({
        status: 0,
        message: "Update Success",
      });
    } else {
      res.status(201).send({
        status: 1,
        message: "Update fail",
      });
    }
  });
}
function _getAllBanner(req, res) {
  bannerModel.getAll((err, result) => {
    if (!err) {
      res.status(200).send({
        message: "OK",
        data: result,
      });
    } else {
      res.status(201).send({
        message: "Khong OK",
        err: err,
      });
    }
  });
}
function _getBannerOnline(req, res){
  bannerModel.getBannerOnline((err, result) => {
    if (!err) {
      res.status(200).send({
        status: true,
        data: result,
      });
    } else {
      res.status(201).send({
        status: false,
        err: err,
      });
    }
  });
}
module.exports = {
  _createBanner: _createBanner,
  _getAllBanner: _getAllBanner,
  _updateBanner: _updateBanner,
  _deleteBanner: _deleteBanner,
  _getBannerOnline: _getBannerOnline
};
