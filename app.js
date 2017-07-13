var express = require("express");
var path = require('path');
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

io.on('connection', function(socket) {
  // Use socket to communicate with this particular client only, sending it it's own id
  socket.emit('welcome', { message: 'Welcome!', id: socket.id });

  socket.on('i am client', console.log);

  socket.on('update', function(data){
    console.log(data);
  });

});


// 5 seconds
var dictionary = { 0 : 'Very good catch by mid-on player.', 1 :'Classic Text Book Shot', 2: 'Missed to field', 3: 'Hat trick', 4 : ' Classical Shot', 5: 'Unbelievable miss', 6: 'Good Shot'};


var generateScore = function(){
    var choice = Math.floor(Math.random() * 7); //generates from 0 till 6
  io.emit('time', { time: dictionary[choice], score : choice});

}

setInterval(generateScore, 2000);

server.listen(3000, function(){//???
  console.log("Server Started");

});


