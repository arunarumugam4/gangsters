// END POINT FOR LOGOUT
// CHAT END POINT

// DEPENDENCIES
const mongoose = require('mongoose');
const userModel = mongoose.model('userModel');
const userSecretModel = mongoose.model('userSecretModel');
const express = require('express');
const _router = express.Router();
const validator = require('email-validator');
const isAllFieldsAvailable = require('../../customMiddlewares/isAllFieldsAvailable');
const jwt    = require('jsonwebtoken');
const messageModel = mongoose.model('messageModel');
const jwtVerification = require('../../customMiddlewares/jwtVerification');

// EXPORT 
module.exports = (app, responseFormat) => {

	_router.post('/messages',jwtVerification, (req, res) => {
        
          console.log(req.body.from, req.body.to);  
         
         // SERCH FOR THE CONVERSATION
         messageModel.findOne({'users':{'$all':[req.body.from,req.body.to]}},function(err,user){
         	if(err){
         		console.log(err);
         	}

         	if(user){

         		let data = user.messages;
         		res.json(data);

         	} else {
         		res.json([])
         	}
         })
        
        


	})// END-LOGOUT




    // MOUNT THE ROUTER IN APP AS A MIDDLEWARE
    app.use('/api', _router);
}