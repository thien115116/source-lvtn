const axios = require('axios');
require('dotenv').config()
const config = require("../../configs/configFirebase");
// Node.js
var admin = require('firebase-admin');

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(config),
});

const NOTIFICATION = function (notification) {
    this.data = {
        title: notification.title,
        body: notification.content,
        channel: notification.channel
    },
        this.registrationTokens = notification.registrationTokens, //Array
        this.topic = notification.topic,
        this.to = notification.token
}

NOTIFICATION.pushNotificationTopic = async (notification_body, result) => {
    // Send a message to devices with the registered tokens
    await admin.messaging().send({

        topic: notification_body.topic,

        data: notification_body.data

    }).then((response) => {
        // Response is a message ID string.

        result(null, response)

    }).catch((error) => {

        console.log('Error sending message:', error);

        result(error, null)

    });
}

NOTIFICATION.pushNotificationGroup = async (notification_body, result) => {

    await admin.messaging().sendMulticast({

        tokens: notification_body.registrationTokens, // ['token_1', 'token_2', ...]

        data: notification_body.data,

        channel: notification_body.channel

    }).then((response) => {
        // Response is a message ID string.

        result(null, response)

    }).catch((error) => {

        console.log('Error sending message:', error);

        result(error, null)

    });

}

NOTIFICATION.pushNotificationSingleDevice = async (notification_body, result) => {

    await admin.messaging().send({

        token: notification_body.token, // 'token_1'

        data: notification_body.data

    }).then((response) => {
        // Response is a message ID string.

        result(null, response)

    }).catch((error) => {

        console.log('Error sending message:', error);

        result(error, null)

    });

}

NOTIFICATION.subscribeToTopic = async (registrationTokens, result) => {

    await admin.messaging().subscribeToTopic(

        registrationTokens,

        topic

    ).then((response) => {

        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.

        console.log('Successfully subscribed to topic:', response);
        result(null, response)
    }).catch((error) => {
        console.log('Error subscribing to topic:', error);
        result(error, null)


    });
}

NOTIFICATION.unsubscribeFromTopic = async (registrationTokens, result) => {

    await admin.messaging().unsubscribeFromTopic(

        registrationTokens,

        topic

    ).then((response) => {

        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        result(null, response.messaging)
        console.log('Successfully subscribed to topic:', response);

    }).catch((error) => {

        result(error.messaging, null)
        console.log('Error subscribing to topic:', error);

    });
}

module.exports = NOTIFICATION;
