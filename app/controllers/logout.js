// END POINT FOR LOGOUT

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

	_router.get('/logout', (req, res) => {
        
        // DESTROY COOKIES IN THE CLIENT SIDE (THIS IS A MINIMAL APPROACH NOT A SECURE WAY)
        res.cookie('token',null);


        let response = responseFormat(false,"user successfully logged out",200,null)
        res.json(response);


	})// END-LOGOUT




    // MOUNT THE ROUTER IN APP AS A MIDDLEWARE
    app.use('/api', _router);
}