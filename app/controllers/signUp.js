// API END POINT FOR SIGN UP

// DEPENDENCIES
const mongoose = require('mongoose');
const userModel = mongoose.model('userModel');
const userSecretModel = mongoose.model('userSecretModel');
const express = require('express');
const _router = express.Router();
const validator = require('email-validator');
const isAllFieldsAvailable = require('../../customMiddlewares/isAllFieldsAvailable');

// EXPORT
module.exports = (app, responseFormat) => {
   
	//SIGN UP ROUTE
    _router.post('/signup',isAllFieldsAvailable, (req, res) => {
          
            // WRAP THE SIGNUP PROCESS SETPS WITH ASYNC/AWAIT FUNCTION
            
            async function signupProcess (){

            	// VALIDATE THE PROVIDED EMAIL ADDRESS
		        if(!(validator.validate(req.body.email))){
		          	 const response = responseFormat(true,'This is not a valid email address, try a valid one',400,null);
		          	 return res.json(response);
		          }

            	// CHECK FOR THE DUPLICATE EMAIL
            	let condition = await  userModel.isEmailDuplicate(req.body.email);
                
		        if(condition){
		          	const response = responseFormat(true,'This email id is already taken, if you already a member try login',400,null);
		          	return res.json(response);
		          }

		        // STORE THE USER SECRETS BEFORE HASHING THE PASSWORD (USEFULL FOR RETRIVE THE PASSWORD)
		        await userSecretModel.saveSecrets(req.body.email, req.body.password);

		        // CREATE THE NEW USER
		        const newUser = new userModel();
		        newUser.userName = req.body.userName;
		        newUser.email = req.body.email;
		        newUser.password = newUser.createHash(req.body.password);

		        // SAVE THE NEW USER
		        newUser.save((err)=>{
		        	if(err){
		        		console.log(err);
		        	}
		           const response = responseFormat(false,'successfully signed up with Gangster',200,null);
		           return res.json(response);
		        })

               
             

            	
            }

      


            // RUN THE ASYNC/AWAIT FUNCTION
             signupProcess();
           


    }); // END-SIGNUP


    // MOUNT THE ROUTER IN APP AS A MIDDLEWARE
    app.use('/api', _router);
}
