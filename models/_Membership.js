// Membership Schema
var mongo = require('mongoose'),
    Schema = mongo.Schema;
    
var Membership = new Schema({
   name: {
       type: String,
       required: true,
       unique: true
   },
   maxProducts: Number,
   price: Number,
   fee: Number,
   days: Number
});

module.exports = mongo.model('Membership', Membership);