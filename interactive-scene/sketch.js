// Interactive Scene
// Ben Hoover
// 2/24/2026
//
// Extra for Experts:
// I used the mouse wheel to control the players speed and the lasers speed

//https://p5js.org/examples/angles-and-motion-aim/

let gamestate = "Game";

// player variables
let playerspeed = 5;
let playerX;
let playerY;
let playerSize = 50;

// laser variables
let laserspeed = 15;
let laseractive = false;
let laserX;
let laserY;
let laserdx;
let laserdy;
let laserRadius = playerSize / 2;

// astroid variables
let astroidX;
let astroidY;
let astroiddx = 6;
let astroiddy = 6;
let radius = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  playerX = width / 2;
  playerY = height / 2;
  astroidlocation();
}

function draw() {
  astroidRand();

  //checks if player is near astroid and if true end the game
  let dead = dist(playerX, playerY, astroidX, astroidY);
  if (dead < playerSize + radius/3) {
    gamestate = "End";
    if (gamestate === "End") {
      return;
    }
  }
  // calling fuctions
  background(0, 0, 25);
  stars();
  moveplayer();
  displayplayer();
  displayastroid();

  astroidX += astroiddx;
  astroidY += astroiddy;

  bounce();

  //check if laseractive is true
  if (laseractive) {
    movelaser();
  }
}

//player movement
function moveplayer() {
  if (keyIsDown(65)) {
    playerX -= playerspeed;
  }
  if (keyIsDown(68)) {
    playerX += playerspeed;
  }
  if (keyIsDown(87)) {
    playerY -= playerspeed;
  }
  if (keyIsDown(83)) {
    playerY += playerspeed;
  }

  playerX = constrain(playerX, 0, width);
  playerY = constrain(playerY, 0, height);
}

//make the player face towards the mouse
function displayplayer() {
  push();
  translate(playerX, playerY);
  Angle = atan2(mouseY - playerY, mouseX - playerX);
  fill(255);
  rotate(Angle);
  rectMode(CENTER);
  rect(0, 0, playerSize, playerSize);
  pop();
}

function astroidRand(){
  astroiddx += random(0.1, 1);
  astroiddy += random(0.1, 1);
  astroiddx -= random(0.1, 1);
  astroiddy -= random(0.1, 1);
}
//pick a random corner to spawn
function astroidlocation() {
  astroidX = random([-radius, width + radius]);
  astroidY = random([-radius, height + radius]);
}

//displays the stroid
function displayastroid() {
  fill(200);
  circle(astroidX, astroidY, radius);
}

//bounce the astroid
function bounce() { 
  if (astroidX > width - radius / 2 && astroiddx > 0) {
    astroiddx *= -1;
  }
  if (astroidX < radius / 2 && astroiddx < 0){
    astroiddx *= -1;
  }
  if (astroidY > height - radius / 2 && astroiddy > 0) {
    astroiddy *= -1;
  }
  if (astroidY < radius /2 && astroiddy < 0){
    astroiddy *= -1;
  }
}

//check if mouse pressed then make the laser face towards player and make laser active
function mousePressed() {
  if (!laseractive) {
    laserX = playerX;
    laserY = playerY;
    let angle2 = atan2(mouseY - playerY, mouseX - playerX);
    laserdx = cos(angle2) * laserspeed;
    laserdy = sin(angle2) * laserspeed;
    laseractive = true;
  }
}

//creates the laser and checks for collisions
function movelaser() {
  laserX += laserdx;
  laserY += laserdy;

  fill(255, 0, 0);
  circle(laserX, laserY, laserRadius);

  let distance = dist(laserX, laserY, astroidX, astroidY);

  if (distance < laserRadius + radius/2.5) {
    radius += 20;
    astroidlocation();
    laseractive = false;
  }
  if (laserX < 0 || laserX > width || laserY < 0 || laserY > height) {
    laseractive = false;
  }
}

//creates a "star" pattern but its more like a backround design right now
function stars() {
  // fill(0, 0, random(25,200));
  for (let sX = 0; sX < width; sX += 100) {
    for (let sY = 0; sY < height + 100; sY += 10) {
      fill(100, 100, 100);
      circle(sX, sY, 3);
    }
  }
}

//lets the mousewheel control the player speed and the lasers speed
function mouseWheel(event) {
  playerspeed -= event.delta * 0.01;
  playerspeed = constrain(playerspeed, 1, 30);

  laserspeed -= event.delta * 0.01;
  laserspeed = constrain(laserspeed, 15, 50);
  console.log("speed is", playerspeed, "laser speed is", laserspeed);
}
