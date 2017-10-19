# gangsters
private chat application


//FIRST CLONE THE REPO USING THIS COMMAND
https://github.com/coolarun/gangsters.git

===================================

//CHANGE MONGODB URL
go to the config folder there you have database.js file. open that file
in that file change the dbUrl to your mongodb url

===================================

//THEN PERFOM FOLLOWING COMMAND STEP BY STEP(ON TERMINAL)

>>npm install 

>> node server.js

===================================

// THAT'S IT YOUR APP IS NOW RUNNING ON THE PORT 3000
go to - http://localhost:3000
now you can see the running app

===================================

// IMPORTANT API END POINTS

1. api/signup (POST)
end point for  sign up 
body-parameters:  userName, email, password

2. api/login (POST)
end point for login  
body-parameters : email, password

3. api/logout (GET)
end point for logout

4. api/profile (GET)
jwt token is required to access this end point, you can send token in any one of the following format
url query, cookies 

5. api/messages (POST)
end point for getting all the conversation between the two users
body-parameter : from,to (both are emails of those people)

===================================
