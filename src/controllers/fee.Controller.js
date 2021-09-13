const FEE_APPLICABLE = require("../../configs/feeApplicable");
const OderModel = require("../models/order.Model");
const MerchantModel = require("../models/merchant.Model");

function calculatorApplicableFee(req, res) {
    if (req.body.distance && req.body.subtotal) {
        let hours = new Date();
        if (hours.getHours() > 20 || hours.getHours() < 6) {
            let BASE_FEE = FEE_APPLICABLE.BASE_OVERTIME_FEE_APPLICABLE.fee;
            if (req.body.distance < FEE_APPLICABLE.BASE_DISTANCE.value) {
                res.status(200).send({
                    status: true,
                    distance: req.body.distance,
                    applicableFee: BASE_FEE + FEE_APPLICABLE.SERVICE_FEE.value,
                });
            } else if (
                req.body.distance > FEE_APPLICABLE.MAX_DISTANCE_SUPPORT.value
            ) {
                res.status(401).send({
                    status: false,
                    distance: req.body.distance,
                    applicableFee: -1,
                });
            } else {
                if (req.body.subtotal > FEE_APPLICABLE.VALUE_BASE_ODER.valueBase) {
                    let fee =
                        BASE_FEE +
                        FEE_APPLICABLE.SERVICE_FEE.value *
                        (req.body.distance - FEE_APPLICABLE.BASE_DISTANCE.value);
                    res.status(200).send({
                        status: true,
                        distance: req.body.distance,
                        applicableFee: fee,
                    });
                } else {
                    let fee =
                        BASE_FEE +
                        (FEE_APPLICABLE.SERVICE_FEE.value +
                            FEE_APPLICABLE.SMALL_ODER_FEE.value) *
                        (req.body.distance - FEE_APPLICABLE.BASE_DISTANCE.value);
                    res.status(200).send({
                        status: true,
                        distance: req.body.distance,
                        applicableFee: fee,
                    });
                }
            }
        } else {
            if (req.body.distance < FEE_APPLICABLE.BASE_DISTANCE.value) {
                res.status(200).send({
                    status: true,
                    distance: req.body.distance,
                    applicableFee:
                        FEE_APPLICABLE.BASE_FEE_APPLICABLE.fee +
                        FEE_APPLICABLE.SERVICE_FEE.value,
                });
            } else if (
                req.body.distance > FEE_APPLICABLE.MAX_DISTANCE_SUPPORT.value
            ) {
                res.status(401).send({
                    status: false,
                    distance: req.body.distance,
                    applicableFee: -1,
                });
            } else {
                if (req.body.subtotal > FEE_APPLICABLE.VALUE_BASE_ODER.valueBase) {
                    let fee =
                        FEE_APPLICABLE.BASE_FEE_APPLICABLE.fee +
                        FEE_APPLICABLE.SERVICE_FEE.value *
                        (req.body.distance - FEE_APPLICABLE.BASE_DISTANCE.value);
                    res.status(200).send({
                        status: true,
                        distance: req.body.distance,
                        applicableFee: fee,
                    });
                } else {
                    let fee =
                        FEE_APPLICABLE.BASE_FEE_APPLICABLE.fee +
                        (FEE_APPLICABLE.SERVICE_FEE.value + FEE_APPLICABLE.SMALL_ODER_FEE.value) *
                        (req.body.distance - FEE_APPLICABLE.BASE_DISTANCE.value);
                    res.status(200).send({
                        status: true,
                        distance: req.body.distance,
                        applicableFee: fee,
                    });
                }
            }
        }
    }else{
        res.status(401).send({
            status: false,
            applicableFee: -1,
        });
    }
}

function calculatorDistance(req, res, next){
    MerchantModel.getMerchantInAppByAdmin(req.body.id_merchant, (err, result)=>{
        if(!err){
            req.merchant = result[0][0]
            OderModel.calculator_distance(req, (err, result)=>{
                if(!err){
                    req.body.distance = result;
                    next();
                }else{
                    res.status(401).send({
                        status: false,
                        message: "Err",
                      });
                }
            })
        }else{
            res.status(401).send({
                status: false,
                message: "Err",
              });
        }
    })
}

module.exports = {
    calculatorApplicableFee: calculatorApplicableFee,
    calculatorDistance: calculatorDistance
};
