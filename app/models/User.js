// USER MODEL

// DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


// USER SCHEMA
const userSchema = new Schema({
	userName : {type:String},
	password : {type:String},
	email    : {type:String}
});

// DEFINE SCHEMA METHODS
     // HASHING THE PASSWORD
     userSchema.methods.createHash = function(password) {
     	return  bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
     };
     // VERIFY THE HASH
     userSchema.methods.verifyHash = function(password) {
     	return bcrypt.compareSync(password, this.password);
     }

// DEFINE STATIC METHODS
     // CHECK FOR  DUPLICATE EMAIL ADDRESS
     userSchema.statics.isEmailDuplicate = function(email) {
     	return  this.findOne({'email':email}).exec( (err, user) => {
              if(err){
              	console.log(err)
              }
                 // THIS RETURNS PROMISE
           });
     }



// USER MODEL
mongoose.model('userModel', userSchema);
