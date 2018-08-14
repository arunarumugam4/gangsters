// DEFINE SIGN UP CONTROLLER
app.controller('signupController', ['$http','$location', function($http,$location){
   const self =this;
   console.log('hey')
   this.userData = {}
   
   // ERROR STATUS MESSAGE
   this.message = 'null';

   // LODER
   this.load = false;
   

   // SIGN UP REQUEST
  this.signup = function(){
        
        // LODER
         self.load = true;
          
	  amplitude.getInstance().logEvent('SIGNUP_EVENT');

        // CHECK IF PASSWORD MATCH OR NOT
        if(self.userData.password !== self.userData.confirmPassword){
        	// LODER
            self.load = false;
        	console.log("password doesn't match");
        } else {
				  	$http.post('/api/signup', self.userData).then((response)=>{


              if(response.data.error){

              	// LODER
                self.load = false;

                self.message = response.data.message;

              }

               // IF SIGNUP IS SUCCESSFULL REDIRECT TO THE LOGIN PAGE
              if(!(response.data.error)){

                    // LODER
                    self.load = false;
                    $location.path('login');
              }

				   	console.log(response)
				   }, (err)=>{
				   	console.log(err);
				   })

				  }

        }
   
   

}]);
