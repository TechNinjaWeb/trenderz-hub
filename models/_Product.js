// Product Schema
var mongo = require('mongoose'),
    Schema = mongo.Schema;
    
var Product = new Schema({
   name: String,
   price: Number,
   description: String,
   enabled: Boolean,
   qty: Number,
   groups: [String],
   categories: [{
       type: mongo.Schema.Types.ObjectId,
       ref: 'Category'
   }],
   belongsTo: {
       type: mongo.Schema.Types.ObjectId,
       ref: 'Store'
   }
});

module.exports = mongo.model('Product', Product);