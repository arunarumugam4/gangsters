// USER SECRET MODEL

// DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// USER SECRET SCHEMA
const userSecretSchema = new Schema({
    
    password : {type:String},
	email    : {type:String}
});

// DEFINE STATIC METHODS
    // METHOD FOR SAVE THE USER SECRETS
    userSecretSchema.statics.saveSecrets = function(email, password){
    	  
    	  // CREATE NEW USER SECRETS
    	  const newUserSecrets = new this();
    	  newUserSecrets.email = email;
    	  newUserSecrets.password = password;
    	  
    	
    	return newUserSecrets.save((err)=>{
    	  	 if(err){
    	  	 	console.log(err);

    	  	 }

    	  	 // SUCCESSFULLY SAVED INTO THE USER SECRETS
    	  })
    }

// USER SECRET MODEL
mongoose.model('userSecretModel', userSecretSchema);
