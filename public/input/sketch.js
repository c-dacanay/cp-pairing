let socket = io('/input');

socket.on('connect',function(){
console.log("Connected");
});

let user = {};
let timer = 0;
let timaStamp = 0;
let interval = 100;

function setup(){
createCanvas(windoeWidth,windowHeight);

socket.on('disconnected',function(id){
delete users[id];
});
}

function draw(){
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(width/15);
  text("Tap while blinking",width/2,height/2);

  // listening for the start from output and start counting the time
  socket.on('started',function(){
    if (millis() - timeStamp > interval){
      timer++;
      timeStamp = millis();
    }
  });
}

function touchStarted(){
  socket.emit('timing',{timer : timer});
}
