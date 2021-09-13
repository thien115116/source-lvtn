const voucherModels = require("../models/voucher.Model");

function getAll(req, res) {
    let VOUCHER = [];
    if (req.query.brand_id && req.query.merchant_id) {
        voucherModels.FindAllByBrandId(
            req.query.brand_id,
            (errBrand, resultBrand) => {
                if (!errBrand) {
                    resultBrand.forEach((element) => {
                        VOUCHER.push(element);
                    });
                    voucherModels.FindAllByMerchantId(
                        req.query.merchant_id,
                        (errMerchant, resultMerchant) => {
                            if (!errMerchant) {
                                resultMerchant.forEach((element) => {
                                    VOUCHER.push(element);
                                });

                                voucherModels.FindAll((err, result) => {
                                    if (!err) {
                                        result.forEach((element) => {
                                            VOUCHER.push(element);
                                        });

                                        res
                                            .status(200)
                                            .send(
                                                removeDuplicates(VOUCHER, (item) => item.id_voucher)
                                            );
                                    } else {
                                        res
                                            .status(200)
                                            .send(
                                                removeDuplicates(VOUCHER, (item) => item.id_voucher)
                                            );
                                    }
                                });
                            } else {
                                res
                                    .status(200)
                                    .send(removeDuplicates(VOUCHER, (item) => item.id_voucher));
                            }
                        }
                    );
                } else {
                    console.log(err);
                    res.status(401).send({
                        status: false,
                        message: err.message,
                    });
                }
            }
        );
    } else if (!req.query.brand_id && req.query.merchant_id) {
        let VOUCHER = [];
        voucherModels.FindAllByMerchantId(
            req.query.merchant_id,
            (errMerchant, resultMerchant) => {
                if (!errMerchant) {
                    resultMerchant.forEach((element) => {
                        VOUCHER.push(element);
                    });

                    voucherModels.FindAll((err, result) => {
                        if (!err) {
                            result.forEach((element) => {
                                VOUCHER.push(element);
                            });

                            res
                                .status(200)
                                .send(removeDuplicates(VOUCHER, (item) => item.id_voucher));
                        } else {
                            res
                                .status(200)
                                .send(removeDuplicates(VOUCHER, (item) => item.id_voucher));
                        }
                    });
                } else {
                    console.log(err);
                    res.status(401).send({
                        status: false,
                        message: err.message,
                    });
                }
            }
        );
    } else {
        console.log(err);
        res.status(401).send({
            status: false,
            message: err.message,
        });
    }
}

function use(req, res) {
    if (req.body.id_voucher && req.body.subtotal) {
        voucherModels.FindOne(req.body.id_voucher, (err, result) => {
            if (!err && result) {
                let now = new Date();
                let startAt = new Date(result.dateStart_At);
                let endAt = new Date(result.dateEnd_At);
                if (now >= startAt && now <= endAt && startAt < endAt) {
                    if (req.body.subtotal >= result.totalAmount) {
                        switch (result.typeName) {
                            case "fixed":
                                if (result.totalUser > 0) {
                                    //console.log(result.expPrice);
                                    res.status(200).send({
                                        status: true,
                                        codeName: result.codeName,
                                        discount: result.expPrice,
                                    });
                                } else {
                                    res.status(401).send({
                                        status: false,
                                        message: "Voucher is not available",
                                    });
                                }
                                break;
                            default:
                                let discount = req.body.subtotal * (result.expPrice / 100);
                                if (discount <= result.totalAmount) {
                                    res.status(200).send({
                                        status: true,
                                        codeName: result.codeName,
                                        discount: discount,
                                    });
                                } else {
                                    res.status(200).send({
                                        status: true,
                                        codeName: result.codeName,
                                        discount: result.totalAmount,
                                    });
                                }
                                break;
                        }
                    } else {
                        res.status(403).send({
                            status: false,
                            message: "Voucher Not Use",
                        });
                    }
                } else {
                    res.status(401).send({
                        status: false,
                        message: "Voucher has been expire",
                    });
                }
            } else {
                res.status(403).send({
                    status: false,
                    message: "Voucher Not Use",
                });
            }
        });
    } else {
        res.status(401).send({
            status: false,
            message: "Content non empty",
        });
    }
}

function removeDuplicates(data, key) {
    return [...new Map(data.map((item) => [key(item), item])).values()];
}

function getVoucherHome(req, res){
    voucherModels.FindVoucherSuggestBrand(req, (err, result)=>{
        if(!err){
            voucherModels.FindVoucherSuggestAll(req, (err, resultAll)=>{
                if(!err){
                    res.status(200).send({
                        brand: result,
                        boo: resultAll
                    })
                }
            })
        }
    })
}

module.exports = {
    getAll: getAll,
    use: use,
    getVoucherHome:getVoucherHome
};
