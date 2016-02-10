// Address Schema
var mongo = require('mongoose'),
    Schema = mongo.Schema;
    
var Address = new Schema({
    type: String,
    belongsTo: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'User'
    }],
    street: String,
    unit: Number,
    postal: String,
    province: String,
    city: String,
    country: String
    
    
});

module.exports = mongo.model('Address', Address);