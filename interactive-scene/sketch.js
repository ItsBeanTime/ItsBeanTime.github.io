// Interactive Scene
// Ben Hoover
// 2/24/2026
//
// Extra for Experts:
// I used the mouse wheel to control the players speed and the lasers speed

//https://p5js.org/examples/angles-and-motion-aim/

let gamestate = "Game";

// player variable
let player = {
  x:0,
  y:0,
  size: 50,
  speed: 5, 
};

// laser variable
let laser = {
  x:0,
  y:0,
  dx:0,
  dy:0,
  speed: 15,
  size: player.size /2,
  active: false,
};

// astroid variables
let asteroid = {
  x:0,
  y:0,
  dx:6,
  dy:6,
  radius:50,
};

function setup() {
  player.x = width / 2;
  player.y = height  / 2;
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  astroidlocation();
}

function draw() {

  //checks if player is near astroid and if true end the game
  let dead = dist(player.x, player.y, asteroid.x, asteroid.y);
  if (dead < player.size + asteroid.radius/3) {
    gamestate = "End";
    if (gamestate === "End") {
      return;
    }
  }
  // calling fuctions  
  astroidRand();
  background(0, 0, 25);
  stars();
  displayplayer();
  moveplayer();
  displayastroid();
  bounce();
  asteroid.x += asteroid.dx;
  asteroid.y += asteroid.dy;
 
  //check if laseractive is true
  if (laser.active) {
    movelaser();
  }
}

//player movement
function moveplayer() {
  if (keyIsDown(65)) {
    player.x -= player.speed;
  }
  if (keyIsDown(68)) {
    player.x += player.speed;
  }
  if (keyIsDown(87)) {
    player.y -= player.speed;
  }
  if (keyIsDown(83)) {
    player.y += player.speed;
  }

  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

//make the player face towards the mouse
function displayplayer() {
  push();
  translate(player.x, player.y);
  Angle = atan2(mouseY - player.y, mouseX - player.x);
  fill(255);
  rotate(Angle);
  rectMode(CENTER);
  rect(0, 0, player.size, player.size);
  pop();
}

// randomize the dx and dy of the asteroid
function astroidRand(){
  asteroid.dx += random(0.1, 1);
  asteroid.dy += random(0.1, 1);
  asteroid.dx -= random(0.1, 1);
  asteroid.dy -= random(0.1, 1);
}
//pick a random corner to spawn
function astroidlocation() {
  asteroid.x = random([-asteroid.radius, width + asteroid.radius]);
  asteroid.y = random([-asteroid.radius, height + asteroid.radius]);
}

//displays the asteroid
function displayastroid() {
  fill(200);
  circle(asteroid.x, asteroid.y, asteroid.radius);
}

//bounce the asteroid
function bounce() { 
  if (asteroid.x > width - asteroid.radius / 2 && asteroid.dx > 0) {
    asteroid.dx *= -1;
  }
  if (asteroid.x < asteroid.radius / 2 && asteroid.dx < 0){
    asteroid.dx *= -1;
  }
  if (asteroid.y > height - asteroid.radius / 2 && asteroid.dy > 0) {
    asteroid.dy *= -1;
  }
  if (asteroid.y < asteroid.radius /2 && asteroid.dy < 0){
    asteroid.dy *= -1;
  }
}

//check if mouse pressed then make the laser face towards player and make laser active
function mousePressed() {
  if (!laser.active) {
    laser.x = player.x;
    laser.y = player.y;
    let angle2 = atan2(mouseY - player.y, mouseX - player.x);
    laser.dx = cos(angle2) * laser.speed;
    laser.dy = sin(angle2) * laser.speed;
    laser.active = true;
  }
}

//creates the laser and checks for collisions
function movelaser() {
  laser.x += laser.dx;
  laser.y += laser.dy;

  fill(255, 0, 0);
  circle(laser.x, laser.y, laser.size);

  let distance = dist(laser.x, laser.y, asteroid.x, asteroid.y);

  if (distance < laser.size + asteroid.radius/2.5) {
    asteroid.radius += 20;
    astroidlocation();
    laser.active = false;
  }
  if (laser.x < 0 || laser.x > width || laser.y < 0 || laser.y > height) {
    laser.active = false;
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
  player.speed -= event.delta * 0.01;
  player.speed = constrain(player.speed, 1, 30);

  laser.speed -= event.delta * 0.01;
  laser.speed = constrain(laser.speed, 15, 50);
  console.log("speed is", player.speed, "laser speed is", laser.speed);
}
