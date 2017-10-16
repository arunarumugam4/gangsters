// DEFINE MAIN SERVICE

app.service('$mainService', [function(){


  let self = this;

  // USERS ONLINE
  self.usersOnline = [];

	// USER DETAILS HOLDER
	self.user ={
		userName: null,
		email :null,
    
	}

  // USER SOCKET
  self.userSocket = null;

	// USER TOKEN HOLDER FOR SOCKET AUTHENTICATION AND FOR MORE
    self.token = null;

	
   
    
   




}]);//END-MAIN-SERVICE