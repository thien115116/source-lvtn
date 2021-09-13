const notification_service = require('../service/fcm.Service');
var fcm_model = require('../models/fcm_Token.Model');
const _uuidV4 = require('../unit/randomString');

function sendBroadcastToGroup(req, res) {
    dataExtra = req.body;
    let notification = {
        data: {
            title: dataExtra.title,
            body: dataExtra.body,
            channel: dataExtra.channelId
        },
        topic: dataExtra.topic
    }
    notification_service.pushNotificationTopic(notification, (err, result) => {
        if (!err) {
            res.status(200).send({
                status: true
            })
        } else {
            res.status(401).send({
                status: false
            })
        }
    })
}

function sentToSingleDevice(dataExtra, result) {

    let notification = {
        data: {
            title: dataExtra.title,
            body: dataExtra.body,
            channel: dataExtra.channelId
        },
        token: dataExtra.token
    }

    notification_service.pushNotificationSingleDevice(notification, (error, response) => {
        if (!error) {
            result(null, response.messaging)
        } else {
            result(error.messaging, null)
        }
    })
}



function register_topic(req, res) {

}

module.exports = {
    sendBroadcastToGroup: sendBroadcastToGroup,
    sentToSingleDevice: sentToSingleDevice
}