// APP LEVEL KEY VALUES




// EXPORT 
module.exports = (app, io) => {

	// SET THE SECRET OF JWT TOKEN
    app.set('secret', 'cool_app**');

    // SET THE IO IN APP
    app.set('socketIo', io);

    


}