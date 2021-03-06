import {IS_TEST_ENV, BASE_URL} from "../constants";

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const EMSUser = require('../models/ems-user.model');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendToAll(subject, html) {
    //Gets all users and send them the email
    EMSUser.find({}, (error, users) => {
        if (users.length === 0) {
            console.log('No email addresses to send emails to');
        }

        for (let user of users) {
            sendEmail(user.email, 'alerts@quarx.com', subject, html + `<br/>To unsubscribe, click <a href=\"${BASE_URL}/api/event-messenger/delete?email=${user.email}\">here</a>`);
        }
    });
}

function sendEmail(to, from, subject, html) {
    const msg = {
        to: to,
        from: from,
        subject: subject,
        html: html,
    };

    if (IS_TEST_ENV) {
        console.log(`Sending email to ${to}`);
    }

    sgMail.send(msg);
}

module.exports = {sendToAll, sendEmail};