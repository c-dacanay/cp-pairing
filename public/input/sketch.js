// Asking for permision for motion sensors on iOS 13+ devices
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
  document.body.addEventListener('click', function () {
    DeviceOrientationEvent.requestPermission();
    DeviceMotionEvent.requestPermission();
  })
}

let socket = io('/input');
let countdown; 
socket.on('connect',function(){
console.log("Connected");
});

let state = 0;
let timer = 0;
let timeStamp = 0;
let interval = 100;

function setup(){
createCanvas(windowWidth,windowHeight);

socket.on('disconnected',function(id){
delete users[id];
});
}

function draw(){
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(width/15);

  if(state == 0){
  text("Waiting for your partner...",width/2,height/2);
  
  socket.on("start",function(count){
    console.log("recieveing start");
    countdown = count;
    state = 1;
  });
    
}
  if(state ==1){
  text(countdown, width/2, height/2);
    if (countdown <= 1){
        state = 2;
    }
     }
if (state === 2){
  text("Tap while blinking",width/2,height/2);
  }

}

function touchStarted(){
  socket.emit('click', {time: Date.now()});
  console.log(Date.now());
}

