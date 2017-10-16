'use strict'
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const responseFormat = require('./customLib/responseFormat');
const fs = require('fs');


// CREATE APP
const app = express();


// CREATE SERVER
const server = http.createServer(app);


// INITIATE THE SOCKET
const io = require('socket.io').listen(server);



// INITIATE SOCKET CONFIGURATION
require('./config/socketConfig')(io,app);




// SET PORT 
const port = process.env.PORT || 3000;


// SET MIDDLEWARES
const middlewaresConfig = require('./config/middlewaresConfig');
middlewaresConfig(app);

// SET APP LEVEL KEY VALUES
require('./config/keyValue')(app, io);

// SET PUBLIC ASSETS 
app.use(express.static(path.join(__dirname,'public')));


// CONFIGURE DATABASE
  // RUN DB CONFIGURATION FILE
 require('./config/databaseConfig');


// IMPORT ALL MODELS
fs.readdirSync('./app/models/').forEach((fileName)=>{
	//CHECK FOR .JS EXTENSION
	if (fileName.indexOf('.js') !== -1){
	 require(`./app/models/${fileName}`);
		
	}

});


// IMPORT ALL ROUTES FROM CONTROLLER
fs.readdirSync('./app/controllers/').forEach((fileName)=>{
	//CHECK FOR .JS EXTENSION
	if (fileName.indexOf('.js') !== -1){
		const route = require(`./app/controllers/${fileName}`);
		route(app, responseFormat);
	}

});


// ERROR SETUP
app.get('*', (req,res)=>{
	res.send("<h1 style='text-align:center;'>404 </br> Page not Found </br> GO TO -  <a href='/#!'>HOME</a></h1>");
})

app.post('*', (req,res)=>{

	let response = responseFormat(true,'This is not a valid api, try a valid one',400,null)
	res.json(response);
})


// LET'S KICK START OUR SERVER
server.listen(port, ()=>console.log(`\n server is waiting on the port ${port}`));

// END