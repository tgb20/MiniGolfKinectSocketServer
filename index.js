var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);
console.log("Starting Server");

var inPosition = "false";

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  
  console.log('A User Connected');

  socket.on('pos', function(args){
    //console.log(args);
    inPosition = args;
  });

  socket.on('postUpdate', function(args){
    console.log(inPosition);
    socket.emit('fetchUpdate', inPosition);
  });

  socket.on('disconnect', function() {
    console.log('A User Disconnected');
  });
  
});