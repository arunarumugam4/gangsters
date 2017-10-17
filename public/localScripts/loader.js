    // EVENT LISTENERS
          // INIT THE SOCKET
          //var socket = io("https://gangsters007.herokuapp.com");
          var socket = io("http://localhost:3000");

          // SET SOCKET IN SERVICE
          self.userSocket = socket;

          // SET THE SOCKET GLOBALLY ON APP
          app.userSocket = socket;
 
          // USERS ONLINE EVENT
          socket.on('usersOnline', function(usersOnline){
              
            

             $('#whoisinonline').html('');

             $('#noone').remove();




             // REMOVE THE CLIENT FROM USERS ONLIE LIST


            usersOnline = usersOnline.filter(function(users){
                       return (app.userDetails.email !== users.email);
                   })

                app.usersOnline = usersOnline;
                  console.log(usersOnline);

           


             // ADD ALL THE ITEM TO THE VIEWS
             for (let i in usersOnline){
 
                      $('#whoisinonline').append("<h6 class='onuser'  emailId="+usersOnline[i].email+" >"+usersOnline[i].userName.toUpperCase()+" <span style='background: rgb(66, 183, 42); border-radius: 50%; display: inline-block; height: 6px; margin-left: 4px; width: 6px;'></span></h6>")
                      $('#onuser').fadeIn('slow');
             }

            if(!($('#info').length>0)){

              $('#whoisinonline').prepend("<small id='info' style='text-align:center;'>click the person and chat with them in private</small>")

            }
             

          

             // IF NO USERS AVAILABLE
             if(usersOnline.length === 0){
                     $('#whoisinonline').append("<h5 style='color:gray;text-align:center;' id='noone' class=''>No one in online</h5>");
             } else {

                    $('#noone').remove();
             }





           
                   $('.onuser').click(function(){
                    
                   let email = $(this).attr('emailid');

                   // SHOW CHAT BOX
                   $('#chatContainer').fadeIn('slow');

                   // AUTO SCROLLING TO THE BOTTOM
              
                   /*$(window).scrollTop($('body').height())*/
                   $("html, body").animate({ scrollTop: $('body').height() }, 3000);


                   // ATTACH THIS EMAIL TO THE CHAT BOX
                   $('#chattbox').attr('person', email);

                   // REMOVE THE CHAT CONTENTS
                   $('#chattbox').html('');

                   // ADD THE PREVIOUS MESSAGE BY QUERYING 
                   setTimeout(function(){

                         $.post('/api/messages',{from:app.userDetails.email, to:email},function(data){
                          console.log(data);
                          
                          // CHECK IF ANY PREVIOUS MESSAGES AVILABLE OR NOT
                          if(data.length>0){

                            // LOOP THROGH THE DATA AND PREPEND IT TO THE CHATTBOX
                            for(let i in data){
                               
                                let date = new Date(data[i].date);
                                if(data[i].by===app.userDetails.email){
                                  
                                  $('#chattbox').append("<div id='ownmsg' class='well'><img id='me' src='/assets/you1.png' /><small id='name'>"+"YOU"+"</small></br><hr style='box-shadow:0px 0px 2px gray'></hr><p id='coolmsg'>"+data[i].msg+"</p><span id='date'>"+date.toLocaleDateString()+"  "+date.toLocaleTimeString()+"</span></div>")
                                   
                                } else {
                                   
                                  $('#chattbox').append("<div id='othersmsg' class='well'><img id='you' src='/assets/me1.png' /><small id='name'>"+$('#tittit').html().toUpperCase()+"</small></br><hr style='box-shadow:0px 0px 2px gray'></hr><p id='coolmsg'>"+data[i].msg+"</p><span id='date'>"+date.toLocaleDateString()+"  "+date.toLocaleTimeString()+"</span></div>")
                                }



                            }

                          }

                           // AUTO SCROLLING
              let chattbox = document.getElementById('chattbox');
              chattbox.scrollTop = chattbox.scrollHeight

                         })
                   },0)


                   // ATTACH THE TITLE HEAD
                   for(let i in app.usersOnline){
                    if(app.usersOnline[i].email === email){
                      $('#tittit').html((app.usersOnline[i].userName).toUpperCase())
                    }
                   
                   }

                 
                });
                             




             
                       

          }); //END USERS ONLINE HANDLER


 
          socket.on('privateMessage', function(data){
           
           // REMOVE TYPING ICON
           if($('#typeloading').length>0){

            $('#typeloading').remove();

           }


            console.log(data);
            for(let i in app.usersOnline){
                app.usersOnline[i].email
              if(app.usersOnline[i].email === data.from){
                      let from = app.usersOnline[i].userName;
                      let date = new Date();
                      $('#chattbox').append("<div id='othersmsg' class='well'><img id='you' src='/assets/me1.png' /><small id='name'>"+from.toUpperCase()+"</small></br><hr style='box-shadow:0px 0px 2px gray'></hr><p id='coolmsg'>"+data.msg+"</p><span id='date'>"+date.toLocaleDateString()+"  "+date.toLocaleTimeString()+"</span></div>")
                       $('#othersmsg').fadeIn('slow');
              }      

              
              // AUTO SCROLLING
              let chattbox = document.getElementById('chattbox');
              chattbox.scrollTop = chattbox.scrollHeight


            }
             
                                
                 
             
                      })
    
    // SEND THE MESSAGE 
    $('#msgbtn').unbind("click").click(function(){



                       // REPLACE THE TYPING ICON
                         if($('#typeloading').length>0){
                           
                          
                          $('#typeloading').remove();

                         }


                        let msg = $('#inputfield').val();
                        console.log(msg);

                          let email = $('#chattbox').attr('person');

                         // EMIT PRIVATE CHAT
                         app.userSocket.emit('privateChat', email, msg);

                         $('#inputfield').val('');

                         
                         let date = new Date();
                          
                         $('#chattbox').append("<div id='ownmsg' class='well'><img id='me' src='/assets/you1.png' /><small id='name'>"+"YOU"+"</small></br><hr style='box-shadow:0px 0px 2px gray'></hr><p id='coolmsg'>"+msg+"</p><span id='date'>"+date.toLocaleDateString()+"  "+date.toLocaleTimeString()+"</span></div>")
                          $('#ownmsg').fadeIn('slow');


              // AUTO SCROLLING
              let chattbox = document.getElementById('chattbox');
              chattbox.scrollTop = chattbox.scrollHeight
                         
                })        







    
   // EVENT EMITTERS
        
         // EMIT THE NEW USER
         socket.emit('newUser', app.userDetails);


// TYPING EVENT EMITTER
$('#inputfield').on('input',function(){
  console.log('input field is changing');

    let data = {

      from : app.userDetails.email,
      to : $('#chattbox').attr('person')
    }

    socket.emit('typing', data);

});


// TYPING MESSAGE HANDLER
socket.on('typingMessage', function(from){
   
   if(!($('#loaderr').length>0)){
   $('#chattbox').append("<div id='typeloading'><img id='you' src='assets/me1.png' /> <img id='loaderr' src='assets/typing.svg' /></div>");

             // AUTO SCROLLING
              let chattbox = document.getElementById('chattbox');
              chattbox.scrollTop = chattbox.scrollHeight;

   }
   console.log(from +" is typing ......");

})



// GO TOP 
$('#up').click(function(){
 $("html, body").animate({ scrollTop: 0 }, 700);
        
 
})

