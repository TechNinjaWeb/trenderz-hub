// Store Schema
var mongo = require('mongoose'),
    Schema = mongo.Schema;
    
var Store = new Schema({
   name: {
       type: String,
       required: true,
       unique: true
   },
   enabled: Boolean,
   created: {type: Date, default: Date.now},
   expires: Date,
   membership: {
       type: mongo.Schema.Types.ObjectId,
       ref: 'Membership',
       required: true
   },
   address: {
       type: mongo.Schema.Types.ObjectId,
       ref: 'Address'
   },
   website: String,
   header: String,
   body: String,
   conditions: String,
   delivers: Boolean,
   products: [{
       type: mongo.Schema.Types.ObjectId,
       ref: 'Product'
   }]
});

module.exports = mongo.model('Store', Store);