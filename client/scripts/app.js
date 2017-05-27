// YOUR CODE HERE:
/*
message format
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

ajax request
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
*/

var app = {};
app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
app.chat = $('#chats');


app.init = function() {
  // create an array to store all the fetch messages  
  // var message = app fetch message
  // render the message in the chat box
  // start a for loop to start at the rendermessage end
  // filter the chat room
    // create the chatroom
    // add the messages to the corresponding chatroom
    
  // set time out in the function to repeatly fetch and sort through the data
  
  //***set a see more chats***
  // var messages = app.fetch();
  // console.log(messages);
  // var fetchNext = function() {
  //   app.clearMessages();
  //   app.fetch();
  //   setTimeout(fetchNext, 3000);  
  // };
  // fetchNext();
  app.fetch();
};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent: ' + JSON.stringify(data));
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/  console.error  
      console.error('chatterbox: Failed to send message', data);
    }
  });    
};

app.fetch = function() {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
      console.log('fetch: received message,' + JSON.stringify(data.results, null, 2));
      for (let i = 0; i < 10; i++) {
        // let name = data.results[i].username;
        // let room = data.results[i].roomname;
        // let text = data.results[i].text;
        // if (name.includes('<script>') || text.includes('<script>') || room.includes('<script>')) {
        //   messsage.username = 'Attempted Hack';
        //   message.roomname = 'Attempted Hack';
        //   message.text = 'Attempted Hack';
        // }
        
        if (!app.hasRoom(data.results[i].roomname)) {
          app.renderRoom(data.results[i].roomname);
        }
        
        app.renderMessage(data.results[i]);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/  console.error  
      console.error('fetch: Failed to receive message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {
  // if (message.username.includes('<script>') || message.text.includes('<script>') || message.roomname.includes('<script>')) {
  //   messsage.username = 'Attempted Hack';
  //   message.roomname = 'Attempted Hack';
  //   message.text = 'Attempted Hack';
  // }
  // let userMessage = JSON.stringify(message.text);
  // let userName = JSON.stringify(message.username);
  $('#chats').append(`<div><a href="#" class="addUser">${xssFilters.inHTMLData(message.username)}</a>:<br> ${xssFilters.inHTMLData(message.text)}</div>`);
  // go to #roomSelect
    // check if roomname exist
    // if exist post in that roomchat
    // else post in regular channael
};

app.renderRoom = function(roomName) {
  var opt = document.createElement('option');
  opt.innerText = roomName;
  opt.value = roomName;
  $('#roomSelect').append(opt);

};

app.hasRoom = function(obj) {
  if ( || obj.roomname.length === 0 || obj.roomname === undefined) {
    obj.roomname = 'main';
  }
  var room = $(`#roomSelect option[value = ${obj.roomname}]`);
  if (room[0]) {
    return true;
  }
  return false;
};

// app.sanitizeInput = function(string) {
//   //<script>
//   //return 
// };




// check roomname exist
  // if true 
    // append message to roomname
  // else 
    // create room and append message to that room 



// install npm install xss-filters


