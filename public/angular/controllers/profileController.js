// DEFINE PROFILE CONTROLLER
app.controller('profileController', ['$http','$mainService','$cookies','$location','$compile',function($http,$mainService,$cookies,$location,$compile){
   const self =this;
   
   this.usersOnline = []
   
  
   // SET LOGOUT FUNCTION
   this.logout = function(){

       $http.get('/api/logout').then((response)=>{

            console.log(response);
            
            // DISCONNECT SOCKET
            app.userSocket.disconnect(function(){
              console.log('userSocket disconnected')
            });

            $location.path('login');

           }, (err)=>{
            console.log(err);
           })

   }// LOGOUT- END


  // REQUEST FOR USER PROFILE
  $http.get('/api/profile').then((response)=>{

          if(response.data.error){
             
                   console.log('Authentication Failed, you have to login');
                   $location.path('login');
          } else {

           console.log(response);

            // STORE THE USER DETAILS IN MAIN SERVICE
            $mainService.user.userName = response.data.data.userName;
            $mainService.user.email = response.data.data.email;
           

            // STORE THE TOKEN IN THE MAIN SERVICE
            $mainService.token = $cookies.get('token');

            // STORE THE USER DETAILS IN GLOBAL APP
            app.userDetails = $mainService.user;

            // UPDATE USER DETAILS IN THE VIEW
            $('#nname').html((app.userDetails.userName).toUpperCase());
            

            // CONFIGURE THE SOCKET
           
           $('#profilebox').append("<script id='loader' src='localScripts/loader.js'></script>")


            // GET THE SOCKET FROM THE MAIN SERVICE
            self.socket = $mainService.userSocket;
            
          
               
          }

           }, (err)=>{
            console.log(err);
           }) // END PROFILE QUERY

    
   $('#chatContainer').hide();


    
}]);