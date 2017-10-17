// SOCKET CONFIGURATION
// DEPENDECIES
const mongoose = require('mongoose');
const messageModel = require('../app/models/Message');


// CONNECTIONS ONLINE
let connections = [];

// USERS ONLINE
let usersOnline = [];





// EXPORT
module.exports = (io,app) => {
  


     // CONNECTION EVENT HANDLER
     io.on('connection', function(socket){

         // PUSH THE SOCKETS TO THE CONNECTIONS
         connections.push(socket);
         console.log(`No of sockets online : ${connections.length}`);

         // EMIT THE AVAILABLE USERS ONLINE
         emitUsersOnline()

         // DISCONNECT EVENT HANDLER
         socket.on('disconnect', function(){

           console.log(socket.email)
              //REMOVE THE USERS FROM ONLINE
              for(let i in usersOnline){

                if(usersOnline[i].email === socket.email){

                 usersOnline.splice(i, 1);
               }
             }
             
              // REMOVE THE SOCKET FROM CONNECTIONS
              connections.splice(connections.indexOf(socket),1);

              console.log(`No of sockets online : ${connections.length}`);

              // UPDATE THE USERS ONLINE
              emitUsersOnline();

         })//DISCONNECT-EVENT-END 


         // NEW USER EVENT HANDLER
         socket.on('newUser', function(user){
           
           if(user){
             // ATTACH NEW USER EMAIL TO THE SOCKET FOR IDENTIFICATION PURPOSE
             socket.email = user.email

             // CHECK SAME USER AVAILABLE
             /*for(let i in connections){
                if(connections[i].email===user.email){
                   console.log("=================================")
                     console.log(connections[i].email)
                     console.log(connections.length);
                     console.log("=================================")
                    // REMOVE THAT OLD SOCKET CONNECTION
                    connections.splice(i,1);
                    console.log(connections.length);
                }
             }*/
            connections = connections.filter(function(connection){

                return(connection.email !== user.email);
             })

             console.log("=================================")
                     
                     console.log(connections.length);
                     console.log("=================================")

             // UPDATE USERS ONLINE
             usersOnline = usersOnline.filter(function(userOnline){

                  return (userOnline.email !== user.email);
             })

             // AGIN PUSH THE NEW SOCKET CONNECTION
             connections.push(socket);

             // PUSH THE USER TO THE USERS ONLINE
             usersOnline.push(user);

             // UPDATE THE USERS ONLINE
             emitUsersOnline();

           }


         })//NEW-USER-EVENT-END


         // PRIVATE ONE-TO-ONE CHAT EVENT HANDLER
         socket.on('privateChat', function(email, msg){
           console.log(email);
           console.log(msg);
           console.log(connections.length);


           if(email && socket.email){

              // SAVE THE MESSAGE TO THE DATABASE
              setTimeout(function(){
               
                  // CHECK THE USERS IN THE DATABASE
                  messageModel.findOne({'users':{'$all':[email,socket.email]}}, function(err,user){
                    if(err){
                      console.log(err)
                    }
                    console.log(user);
                    // CONVERSION IS ALREADY EXIST BETWEEN THE USERS JUST SAVE IT 
                    if(user){
                      let message = {
                        msg:msg,
                        by :socket.email

                      }
                      user.messages.push(message);
                      user.save(function(err){
                        if(err){
                          console.log(err)
                        }
                        console.log('message saved to the existing conversation')
                      }) 
                    } else {

                     let newConversation = new messageModel();
                     newConversation.users = [];
                     newConversation.users.push(email);
                     newConversation.users.push(socket.email);
                     newConversation.messages = [];
                     newConversation.messages.push({
                      msg :msg,
                      by :socket.email
                    })
                     


                     newConversation.save(function(err){
                       if(err){
                        console.log(err)
                      }

                      console.log('new conversation has been created and message saved on that conversation');
                    })

                   }

                 })



             },0)//END-MESSAGE-SAVE-TO-DATABASE



            }


            


             // LOOP THROUGH ALL SOCKET FIND THE MATCHED ONE
             for (let i in connections){

              if(connections[i].email === email) {
                let msgData = {
                  from: socket.email,
                  msg :msg
                }

                io.sockets.connected[(connections[i].id)].emit('privateMessage' ,msgData);
                
              }
            }

         })//END PRIVATE CHAT HANDLER



          // EMIT USERS ONLINE FUNCTION
          function emitUsersOnline(){

            io.emit('usersOnline', usersOnline)

          }

          
        // TYPING EVENT HANDLER
        socket.on('typing', function(data){



             // LOOP THROUGH ALL SOCKET FIND THE MATCHED ONE
             for (let i in connections){

              if(connections[i].email === data.to) {
               

                io.sockets.connected[(connections[i].id)].emit('typingMessage' ,data.from);
                
              }
            }

            
          })        
        

     }) //CONNECTION-EVENT-END








}