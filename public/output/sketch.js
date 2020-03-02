///MIMI QUESTIONS:
// how to get taps from individual users?
// debounce on "tap"?

//open and connect input socket
let socket = io("/output");

//listen to connection

socket.on("connect", () => {
  console.log("Connected!");
});

let users = {};
let tap = false;

let state = 0;
let count = 5;
let score = 0;

let gif_createImg;
let flame;
let flameOpacity;

function preload() {
  flame = loadImage("flame.jpg");
  // gif_createImg = createImg("hearteyes.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  //listen for a message
  socket.on("message", function(message) {
    let id = message.id;
    let click = message.data;
    // console.log('got a click', id, click);
    users[id] = click;
    // console.log(users[id]);

    //need to debounce
    tap = true;
  });
}

function draw() {
  background(255);

  let counter = 0;
  let users_arr = [];

  //         //loop through the users and check their taps
  for (let u in users) {
    let user = users[u];
    // console.log(user);
    users_arr[counter] = users[u];

    // console.log(users_arr[counter]);
    counter++;
    if (counter >= 2) break;
  }

  //check if there's data
  //if (users_arr.length > 1 && tap) {
  if (users_arr.length > 1) {
    let input1 = users_arr[0].time;
    let input2 = users_arr[1].time;
    if (input1 && input2) {
      ellipse
      ellipse
      console.log(input1, input2);
      let value = input1 - input2;
      if (Math.abs(input1 - input2) < 1000) {
        console.log("win", value);
        tap = false;
      } else {
        console.log("lose", value);
        tap = false;
      }
      // Clean out data
      for(let u in users) {
        users[u] = null;
      }
    }
  }

  noStroke();

  if (state == 0) {
    startPage();
    if (mouseIsPressed) {
      socket.emit("start");
      console.log("emitting start from output");
      state = 1;
    }
  }
  if (state == 1) {
    countdown();
  }
  if (state == 2) {
    scorePage();
  }
  // }

  // }
}

function startPage() {
  textSize(width / 40);
  text("Are you ready to gaze?", width * 0.38, height * 0.2);
  text("click to start", width * 0.44, height * 0.28);
}

function countdown() {
  background(255);
  if (count > 0) {
    text(count, width / 2, height / 2);
    if (frameCount % 60 == 0) {
      count--;
    }
  } else {
    state = 2;
  }
}

function scorePage() {
  flameOpacity = 10;
  // text("score", width / 2, height / 2 - 100);
  textSize(width / 10);
  text(score, width / 2, height / 2 + 100);
  textSize(width / 30);

  //if user_arr[0] taps ==>
  fill(255, 0, 0);
  ellipse(width * 0.2, height / 4, width / 12);

  //if user_arr[1] taps ==>
  fill(0, 0, 255);
  ellipse(width * 0.8, height / 4, width / 12);

  //flame
  tint(255, flameOpacity);
  image(flame, width * 0.51, height / 9);

  //show either way
  textSize(18);
  fill(0);
  text("Player 1", width * 0.18, height / 2);
  text("Player 2", width * 0.78, height / 2);

  // gif_createImg.position(width * .45, height * .6);

  /*
        } else {
            text(windowWidth, windowHeight, "you need two players");
        }
    
        */
  // }
}
