// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player = { // player variable
  x:0,
  y:0,
  size: 50,
  speed: 5, 
};



function setup() {
  createCanvas(windowWidth, windowHeight);
  player.x = width/2;
  player.y = height/2;
}

function draw() {
  background(220);
  displayplayer();
  moveplayer();
}

function moveplayer() {
  if (player.y < height){
    player.y += 10;
  }
  if (keyIsDown(65)) { // move left
    player.x -= player.speed;
  }
  if (keyIsDown(68)) { // move right
    player.x += player.speed;
  }

  // contrains the player in the window
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height - player.size /2);
}

function displayplayer() {
  push();
  translate(player.x, player.y);
  let angle = atan2(mouseY - player.y, mouseX - player.x);
  fill(255);
  rotate(angle);
  rectMode(CENTER);
  rect(0, 0, player.size, player.size);
  pop();
}