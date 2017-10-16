// MIDDLEWARE CONFIGURATION

// DEPENDENCIES
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



// EXPORT 
module.exports= (app) =>{

	// INITIATE ALL THE REQUIRED MIDDLEWARES
	app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
}

// END





