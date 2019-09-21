const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EMSUserSchema = new Schema({
   email: {
       type: String,
       required: true,
       unique: true,
       trim: true
   },

    phone_number: {
       type: String,
        required: false,
        unique: true,
        trim: true
    }
});