// Category Schema
var mongo = require('mongoose'),
    Schema = mongo.Schema;
    
var Category = new Schema({
   name: {
       type: String,
       unique: true
   },
   description: String,
   image: String
});

module.exports = mongo.model('Category', Category);