// MESSAGE MODEL

// DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MESSAGE  SCHEMA
const messageSchema = new Schema({
     
     users : [],
     messages : [{
          by : {type:String},
     	date : {type:Date, default:Date.now()},
     	msg : {type:String}
     }]
    
});



// MESSAGE MODEL
mongoose.model('messageModel', messageSchema);

// EXPORT
module.exports = mongoose.model('messageModel');