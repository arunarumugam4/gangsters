// DEFINE LOGIN CONTROLLER
app.controller('loginController', ['$http','$location', function($http,$location){
   const self =this;
   console.log('hey')
   this.userData = {}
   // SET THE COOKIE ENABLED
   this.userData.cookie = true;

   // LOGIN ERROR STATUS MESSAGE
   this.message ='null';

   // LOADING ICON
   this.load = false;
   

   // SIGN UP REQUEST
  this.login = function(){
           
            self.load= true;
        
				  	$http.post('/api/login', self.userData).then((response)=>{

              if(response.data.error){
                self.load= false;
                 self.message = response.data.message;
              }
              
              // IF LOGGED IN SUCCESSFULL REDIRECT TO THE PROFILE PAGE
              if(!(response.data.error)){
                    self.load= false;
                    $location.path('profile');
              }
				   	console.log(response)
				   }, (err)=>{
				   	console.log(err);
				   })



        }
   
   

}]);