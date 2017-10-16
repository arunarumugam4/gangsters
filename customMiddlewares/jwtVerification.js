 // MIDDLEWARE FOR JSON TOKEN VERIFICATION AND DICIDE WEATHER GIVE PERMISION OR NOT

// DEPENDECIES
const responseFormat = require('../customLib/responseFormat');
const jwt    = require('jsonwebtoken');
const express = require('express');
const app = express();

// SET APP LEVEL KEY VALUES (JWT-SECRET)
require('../config/keyValue')(app);


// EXPORT
module.exports = (req, res, next) => {
    

	 // CHECK FOR THE TOKEN
     const token = req.body.token || req.query.token || req.cookies.token
     
     if(token){

     	// VERIFY THE TOKEN
     	jwt.verify(token,app.get('secret'),(err, decoded) => {
     		
     		if (err){
     			let response = responseFormat(true,'Authentication Failed, invalid token',401,null);
     			return res.json(response);
     		} else {
                 // SAVE THE DECODED VALUES
                 req.decoded = decoded;
                 
                 return next();
     		}

     	})
     }  else {
     	// IF TOKEN NOT PRESENT
     	let response = responseFormat(true,'Your are not authenicated to use this',403,null);
        return res.json(response);
     }

}