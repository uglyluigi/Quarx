const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const EMSUserSchema = new Schema({
   email: {
       type: String,
       required: true,
       unique: true,
       trim: true,
       validate: [validateEmail, "Invalid email address."],
   },

    phone_number: {
       type: String,
        required: false,
        unique: true,
        trim: true,
        validate: [validatePhoneNumber, "Invalid phone number."],
    }
});

function validateEmail(value) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value.toLowerCase());
}

function validatePhoneNumber(value) {
    let pn_obj;

    try {
        pn_obj = phoneUtil.parse(value, 'US');
    } catch (e) {
        return false;
    }

    return phoneUtil.isValidNumber(pn_obj);
}

const EMSUser = mongoose.model('ems-user', EMSUserSchema);
module.exports = EMSUser;