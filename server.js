// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
    console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));
let io = require('socket.io').listen(server);


var outputs = io.of('/output');
// Listen for output clients to connect
outputs.on('connection', function (socket) {
    console.log('An output client connected: ' + socket.id);

    // sending the start to input
    socket.on("start", function(data) {
       let count = 5;
    let countdown = setInterval(
	  function(){ 
    // Emit the count
		// console.log(count);
    // inputs.emit('count', count);
      inputs.emit("start", count);
    // Count down
		count--;
		if(count <= 0) clearInterval(countdown);
}, 1000);
      inputs.emit("start", count);
      console.log("emitting start from server");
    });
  
    // Listen for this output client to disconnect
    socket.on('disconnect', function () {
        console.log("An output client has disconnected " + socket.id);
    });
});


let inputs = io.of('/input');

inputs.on('connection', function (socket) {
    console.log('An input client connected: ' + socket.id);
  
  
 
// }
    // Listen for data messages from this input client
  socket.on('click', function(click) {
    let message = {
    id : socket.id,
    data : click
    }
    outputs.emit('message', message);
  })
  
  
    // Listen for this input client to disconnect
    // Tell all clients, this input client disconnected
    socket.on('disconnect', function () {
        console.log("Client has disconnected " + socket.id);
        inputs.emit('disconnected', socket.id);
        outputs.emit('disconnected', socket.id);
    });
});
