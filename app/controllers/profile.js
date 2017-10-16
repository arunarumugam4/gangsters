// API END POINT FOR PROFILE

// DEPENDENCIES
const mongoose = require('mongoose');
const userModel = mongoose.model('userModel');
const userSecretModel = mongoose.model('userSecretModel');
const express = require('express');
const _router = express.Router();
const jwt    = require('jsonwebtoken');
const jwtVerification = require('../../customMiddlewares/jwtVerification');



// EXPORT
module.exports = (app, responseFormat) => {

    //SIGN UP ROUTE
    _router.get('/profile',jwtVerification, (req, res) => {
          
            // WRAP THE LOGIN PROCESS SETPS WITH ASYNC/AWAIT FUNCTION
            
            async function profileProcess (){
                     
                   // SEND THE USER DETAILS
                   let data = {}
                   data.userName = req.decoded.userName;
                   data.email = req.decoded.email;
                   let response = responseFormat(false,'Enter to your profile',200,data);
                   return res.json(response);

                   

                     
            }

      


            // RUN THE ASYNC/AWAIT FUNCTION
             profileProcess();


   }); // END-SIGNUP


     


    // MOUNT THE ROUTER IN APP AS A MIDDLEWARE
    app.use('/api', _router);
}
