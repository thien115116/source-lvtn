const searchModel = require("../models/search.Model");

function findByTag(req, res) {
    if (req.query.lon && req.query.lat && req.query.tag) {
        let listMerchants = [];

        const temp_merchant = function (merchant) {
            (this.id_merchant = merchant.id_merchant),
                (this.name_merchant = merchant.name_merchant),
                (this.listfood = merchant.listfood),
                (this.is_active = merchant.is_active),
                (this.type_business = merchant.type_business),
                (this.url = merchant.img),
                (this.distance = merchant.distance),
                (this.products = []);
        };

        searchModel.findByTag(req.query, (err, result) => {
            if (!err) {
                groupBy(result, "id_merchant").forEach((element) => {
                    let merchant = new temp_merchant({
                        id_merchant: element[0].id_merchant,
                        name_merchant: element[0].name_merchant,
                        is_active: element[0].is_active,
                        type_business: element[0].type_business,
                        img: element[0].img,
                        distance: element[0].distance,
                        listfood: element[0].listfood,
                    });
                    merchant.products = element;
                    listMerchants.push(merchant);
                });
                res.status(200).send(listMerchants);
            }
        });
    } else {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
}

function findByKeyWord(req, res) {
    if (req.query.lon && req.query.lat && req.query.keyword) {
        let listMerchants = [];

        const temp_merchant = function (merchant) {
            (this.id_merchant = merchant.id_merchant),
                (this.name_merchant = merchant.name_merchant),
                (this.listfood = merchant.listfood);
            (this.is_active = merchant.is_active),
                (this.type_business = merchant.type_business),
                (this.url = merchant.img),
                (this.distance = merchant.distance);
            this.products = [];
        };


        searchModel.searchByKeyWord(req.query, (err, result) => {
            if (!err) {
                groupBy(result, "id_merchant").forEach((element) => {
                    let merchant = new temp_merchant({
                        id_merchant: element[0].id_merchant,
                        name_merchant: element[0].name_merchant,
                        is_active: element[0].is_active,
                        type_business: element[0].type_business,
                        img: element[0].img,
                        distance: element[0].distance,
                        listfood: element[0].listfood,
                    });
                    merchant.products = element;
                    listMerchants.push(merchant);
                });
                res.status(200).send(listMerchants);
            }
        });
    } else {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
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

module.exports = {
    findByTag: findByTag,
    findByKeyWord: findByKeyWord,
};
