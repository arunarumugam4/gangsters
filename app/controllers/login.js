// API END POINT FOR LOGIN

// DEPENDENCIES
const mongoose = require('mongoose');
const userModel = mongoose.model('userModel');
const userSecretModel = mongoose.model('userSecretModel');
const express = require('express');
const _router = express.Router();
const validator = require('email-validator');
const isAllFieldsAvailable = require('../../customMiddlewares/isAllFieldsAvailable');
const jwt    = require('jsonwebtoken');


// EXPORT
module.exports = (app, responseFormat) => {

    //SIGN UP ROUTE
    _router.post('/login',isAllFieldsAvailable, (req, res) => {
          
            // WRAP THE LOGIN PROCESS SETPS WITH ASYNC/AWAIT FUNCTION
            
            async function loginProcess (){

                // VALIDATE THE PROVIDED EMAIL ADDRESS
                if(!(validator.validate(req.body.email))){
                     const response = responseFormat(true,'This is not a valid email address, try a valid one',400,null);
                     return res.json(response);
                  }

                // CHECK THE REQUESTED USER EXIST OR NOT
                let user = await  userModel.isEmailDuplicate(req.body.email);
               
                if(!user){
                    const response = responseFormat(true,'No user find with this email id',400,null);
                    return res.json(response);
                  }

                // CHECK THE REQUESTED USER PASSWORD MATCH WITH ACCOUNT PASSWORD
                let isPasswordValid = user.verifyHash(req.body.password);

                if(!isPasswordValid){
                    const response = responseFormat(true,'provided password is not matched with the user email',400,null);
                    return res.json(response);
                        
                }  
                 
                // IF EVERYTHING OK, GENERATE THE JWT TOKEN AND SENT IT TO THE CLIENT
                const token = jwt.sign(user.toObject(), app.get('secret'), {expiresIn : 60*60*24 }); // ** validity 24 hours only **
                let data = {
                  
                   token : token

                } 
                     
                // CHECK WEATHER CLIENT REQUESTED FOR COOKIE
                if(req.body.cookie){
                       // SET THE TOKEN IN THE COOKIE
                       res.cookie('token', token);
                       const response = responseFormat(false,'successfully loged in to the account, token stored in cookie',200,null);
                       return res.json(response);
                }

                // IF CLIENT NOT REQUESTED FOR COOKIE THEN SEND THE TOKEN AS JSON RESPONSE
                const response = responseFormat(false,'successfully loged in to the account',200,data);
                return res.json(response);

                     
            }

      


            // RUN THE ASYNC/AWAIT FUNCTION
             loginProcess();


   }); // END-SIGNUP


     


    // MOUNT THE ROUTER IN APP AS A MIDDLEWARE
    app.use('/api', _router);
}
