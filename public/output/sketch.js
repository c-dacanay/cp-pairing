//open and connect input socket
let socket = io('/output');

//listen to connection

socket.on('connect', () => {
    console.log('Connected!');
})

//keep track of partners
let users = {};
//keep track of taps?
// let pTap;


let gif_createImg;
let flame;
let gameOn = false;

function preload() {
    // gif_loadImg = loadImage("vegetables.gif");
    flame = loadImage("flame.jpg");
    gif_createImg = createImg("hearteyes.gif");


}
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER)

    //listen for a message
    socket.on('message', () => {
        let id = message.id;
        let data = message.data;
    })

    socket.on('disconnected', () => {
        delete users[id];
    })

}

function draw() {
    background(255);
    let score = 0;
    let flameOpacity = 20;

    //if there are two players, calculate the time between cellphone taps
    if (users_arr.length === 2) {

        if (!gameOn) {
            startGame();
        };

        //keep track of taps for each user
        //   let pTap = null;
        let counter = null;

        let users_arr = [];

        //loop through the users and check their taps
        for (let u in users) {
            let user = users[u];

            //check the time of tap for each user??
            // unknown variables lol

            //store user in array of users
            users_arr[counter] = users[u];

            counter++;
        }
        let t = null; //time between taps

        //if the taps are within 1 second of each other,
        if (t < millis(1000)) {
            score += 1;
        } else {
            score = 0;
        }

        noStroke();

        //if user_arr[0] taps ==>
        fill(255, 0, 0);
        ellipse(width * 0.2, height / 4, 200)

        //if user_arr[1] taps ==>
        fill(0, 0, 255);
        ellipse(width * 0.8, height / 4, 200)

        //flame 
        tint(255, flameOpacity);
        image(flame, width * .51, height / 9);

        //show either way
        textSize(18);
        fill(0);
        text('Player 1', width * 0.18, height / 4);
        text('Player 2', width * 0.78, height / 4);

        textSize(25);
        text('Score: ' + score, width * 0.48, height / 4);

        gif_createImg.position(width * .45, height * .6);

        /*
        } else {
            text(windowWidth, windowHeight, "you need two players");
        }
    
        */
    }
}

function startGame() {
    console.log('game start');
    let timer = setInterval(() => {
        gameOn = true;
        // sec--;
        let canClick = true;
        // if (sec < 0) {
        //     clearInterval(timer);
        //     canClick = false;
        //     sec = 5;
        //     replaceText();
        //     isInGame = false;
        // }
        socket.emit('click', canClick);
        // console.log(sec);
    }, 1000);
}