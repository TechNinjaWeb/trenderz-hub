// Category Schema
var mongo = require('mongoose'),
    Schema = mongo.Schema;
    
var Category = new Schema({
   name: String,
   description: String,
   image: String
});

module.exports = mongo.model('Category', Category);