const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let vegetable = new Schema({

    sellerName :{
        type :String,
        required :true
    },

    phoneNumber :{
        type :String,
        required :true
    },

    location :{
        type :String,
        required :true
    },

    vegetableName :{
        type :String,
        required :true
    },

    amount :{
        type :String,
        required :true
    },

    startDate :{
        type :Date,
        required :true
    },
    endDate :{
        type :Date,
        required :true
    }


})

module.exports = mongoose.model('vegetable',vegetable);