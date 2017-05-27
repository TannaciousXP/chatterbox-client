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
          
  app.fetch();
  $('#send').on('submit', app.handleSubmit);
  $('.chat .username').on('click', app.handleUsernameClick); 
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

    url: app.server,
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
      // console.log('fetch: received message,' + JSON.stringify(data.results, null, 2));
      var count = 0;
      for (let i = 0; i < data.results.length; i++) {

        if (count === 20) {
          return;
        }
        if (app.isValidMessage(data.results[i])) {

          if (!app.hasRoom(data.results[i])) {
            app.renderRoom(data.results[i].roomname);
          }          
          app.renderMessage(data.results[i]);
          count++;
        } 
        
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
  var username = $('<a href="#" class"username">' + xssFilters.inHTMLData(message.username) + '</a>');
  $(username).on('click', app.handleUsernameClick);
  $('#chats').append(`<div class="chat"><a href="#" class="username">${xssFilters.inHTMLData(message.username)}</a>:<br> ${xssFilters.inHTMLData(message.text)}</div>`);
};

app.renderRoom = function(roomName) {
  var opt = document.createElement('option');
  opt.innerText = roomName;
  opt.value = roomName;
  $('#roomSelect').append(opt);

};

app.hasRoom = function(obj) {
  obj.roomname = obj.roomname.split(' ').join('_');
  var room = $(`#roomSelect option[value=${obj.roomname}]`);
  if (room[0]) {

    return true;
  }
  return false;
};

app.isValidMessage = function(obj) {
  
  if (obj.roomname && obj.text && obj.username) {
    if (!obj.roomname.includes('<script>') || !obj.username.includes('<script>') || !obj.text.includes('<script>')) {
      return true;
    }    
  }
  
  return false;
};

app.handleUsernameClick = function() {
  console.log(this);
};

app.handleSubmit = function(event) {
  event.preventDefault();
  
  var text = $('#message').val();
  var roomName = $('#roomSelect option:selected').val();
  console.log(roomName);
  var message = {
    text: text, 
    username: window.location.search.slice(10), 
    roomname: roomName
  };
  $.when(app.send(message)).then(app.clearMessages()).then(app.fetch()); 
};


