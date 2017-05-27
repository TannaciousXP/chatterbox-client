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

app.checkRoom = function(obj) {
  //grab the name of the room from obj.roomname
   //check if the room exist, else
  var room = $(`#roomSelect option[value = ${obj.roomname}]`);
  console.log(room);
  if (room[0]) {
    return true;
  }
  
  return false;
};

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
    contentType: 'application/json',
    success: function (data) {
      console.log('fetch: received message,' + JSON.stringify(data.results, null, 2));
      
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
  var name = message.username;
  var room = message.roomname;
  var text = message.text;
  var div = document.createElement('div');
  div.innerText = name + ': ' + text;
  $('#chats').append(div);
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










