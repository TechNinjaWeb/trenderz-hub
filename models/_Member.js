// Member Schema
var mongo = require('mongoose'),
    Schema = mongo.Schema;
    
var Member = new Schema({
    firstname: 'String',
    lastname: 'String',
    enabled: Boolean,
    created: {type: Date, default: Date.now},
    user: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addresses: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Address' 
    }],
    stores: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Store'
    }],
    membership: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Membership'
    }
});

Member.methods.getUser = function( id, cb ) {
   return this.model('User').findOne( id, cb );
};

Member.methods.verifyUser = function(id, cb) {
  return this.model('Member').find({"user._id": id}).populate('user membership stores').exec(cb);
};

module.exports = mongo.model('Member', Member);