const shipperModels = require('../models/shipper.Model');
const unit = require('../unit/randomString');
const tokenController = require("./token.Controller");


function signIn(req, res) {
    let body = req.body.shipper;
    if (body.phone) {
        let shipper = {
            shipper_id: body.shipper_id,
            phone: body.phone
        }
        tokenController._createTokenShipper(shipper, (errToken, result) => {
            if (errToken) {
                res.status(400).send({
                    status: false,
                    message: "Create token fail. Please login again",
                });
            } else {
                body.login_at = req.body.token;
                shipperModels.Update(body, (errUpdate, resultUpdate) => {
                    if (!errUpdate) {
                        shipperModels.FindProfileById(body.shipper_id, (err, row) => {
                            if (!err) {
                                res.status(200).send({
                                    status: true,
                                    message: "Login Succesfully",
                                    avatar: row.image_person,
                                    email: body.email,
                                    token: result.token,
                                    displayName: row.name,
                                    number_vehicle: body.number_vehicle
                                });
                            } else {
                                res.status(400).send({
                                    status: false,
                                    message: err,
                                });
                            }
                        })
                    } else {
                        res.status(401).send({
                            status: false,
                            message: "Fail",
                        });
                    }
                })

            }
        });
    } else {
        res.status(401).send({
            status: false,
            message: "Content non empty",
        });
    }
}

function setState(req, res) {
    shipperModels.FindOneAccountById(req.decoded.shipper_id, (err, rows) => {
        if (!err) {
            rows.state = req.params.is_state;
            shipperModels.Update(rows, (errUpdate, rowUpdate) => {
                if (!errUpdate) {
                    res.status(200).send({
                        status: true,
                        message: "Updated"
                    })
                } else {
                    console.log(errUpdate);
                    res.status(401).send({
                        status: false,
                        message: "Updated"
                    })
                }
            })
        } else {
            res.status(401).send(err);
        }
    })
}

function getState(req, res) {
    shipperModels.FindOneAccountById(req.decoded.shipper_id, (err, rows) => {
        if (!err) {
            res.status(200).send({
                status: true,
                message: rows.state
            })
        } else {
            res.status(401).send(err);
        }
    })
}


function updateLocation(req, res) {
    shipperModels.FindOneAccountById(req.decoded.shipper_id, (err, rows) => {
        if (!err) {
            rows.latitude = req.body.latitude;
            rows.longitude = req.body.longitude;
            shipperModels.Update(rows, (errUpdate, rowUpdate) => {
                if (!errUpdate) {
                    res.status(200).send({
                        status: true,
                        message: "Updated"
                    })
                } else {
                    console.log(errUpdate);
                    res.status(401).send({
                        status: false,
                        message: "Updated"
                    })
                }
            })
        } else {
            res.status(401).send(err);
        }
    })
}

module.exports = {
    signIn: signIn,
    setState: setState,
    getState: getState,
    updateLocation: updateLocation
};