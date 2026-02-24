// Interactive Scene
// Ben Hoover
// 2/24/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//https://p5js.org/examples/angles-and-motion-aim/

let gamestate = "Game";
let laserspeed = 15;
let playerspeed;
let playerX;
let playerY;
let astroidX;
let astroidY;
let astroiddx;
let astroiddy;
let laseractive = false;
let laserX;
let laserY;
let laserdx;
let laserdy;
let radius = 100;
// let starX;
// let starY;

function setup() {
  randomSeed(99);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  playerX = width / 2;
  playerY = height / 2;
  playerspeed = 5;

  astroidlocation();

  //picks a starting speed for astroid
  astroiddx = 5;
  astroiddy = 5;
}

function draw() {
  //checks if player is near astroid and if true end the game
  let dead = dist(playerX, playerY, astroidX, astroidY);
  if (dead < radius - radius / 2) {
    gamestate = "End";
    if (gamestate === "End") {
      return;
    }
  }

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
  rect(0, 0, 25, 25);
  pop();
}

//pick a random corner to spawn
function astroidlocation() {
  astroidX = random([radius / 2, width - radius / 2]);
  astroidY = random([radius / 2, height - radius / 2]);
}

function displayastroid() {
  fill(200);
  circle(astroidX, astroidY, radius);
}

function bounce() {
  if (astroidX > width - radius / 2 || astroidX < radius / 2) {
    astroiddx *= -1;
  }
  if (astroidY > height - radius / 2 || astroidY < radius / 2) {
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
  circle(laserX, laserY, 15);

  let distance = dist(laserX, laserY, astroidX, astroidY);

  if (distance < radius - radius / 2) {
    //dx = random(5, 9);
    //dy = random(5, 9);

    astroiddx += 1;
    astroiddx += 1;

    radius += 30;
    astroidlocation();
    laseractive = false;
  }
  if (laserX < 0 || laserX > width || laserY < 0 || laserY > height) {
    laseractive = false;
  }
}

//creates a star pattern
function stars() {
  //fill(0, 0, random(25,200));
  for (let sX = 0; sX < width; sX += 100) {
    for (let sY = 0; sY < height + 100; sY += 10) {
      fill(100, 100, 100);
      circle(sX, sY, 2);
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
