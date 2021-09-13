const unit = require("../unit/randomString");
const merchantModel = require('../models/merchant.Model');

function _findRestaurantsNear(req, res) {
    if(req.query.lat && req.query.lon && req.query.radius){
        merchantModel.getRestaurantsNear(req.query, (err, rows)=>{
            if(!err){
                let result =[]
                rows[0].forEach(element => {
                    if(element.listfood!=null){
                        result.push(element);
                    }
                });
                res.status(200).send(result.sort((a, b)=> (a.distance > b.distance)?1:-1))
            }else{
                res.status(400).send({
                    status: false,
                    message: 'Failed',
                    data: null
                })
            }
        })
    }else{
        res.status(400).send({
            message: "Content can not be empty!",
          });
    }
    
}

function _findNewRestaurants(req, res) {
    
}

function _findBreakfast(req, res) {}

function _findMainmeal(req, res) {}

function _findDiscount20(req, res) {}

function _findDiscount35(req, res) {}

function _findDiscount50(req, res) {}

function _findDish(req, res) {}

module.exports = {
  findRestaurantsNear: _findRestaurantsNear,
  findNewRestaurants: _findNewRestaurants,
  findBreakfast: _findBreakfast,
  findMainmeal: _findMainmeal,
  findDiscount20: _findDiscount20,
  findDiscount35: _findDiscount35,
  findDiscount50: _findDiscount50,
  findDish: _findDish,
};
