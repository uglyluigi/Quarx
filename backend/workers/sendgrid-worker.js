require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const EMSUser = require('../models/ems-user.model');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendToAll(subject, html) {
    //Gets all users and send them the email
    EMSUser.find({}, (error, users) => {
        for (let user of users) {
            sendEmail(user.email, 'alerts@quarx.com', subject, html);
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

    sgMail.send(msg);
}

module.exports = {sendToAll, sendEmail};