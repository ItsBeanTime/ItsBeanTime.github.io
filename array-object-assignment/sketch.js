// Object Notation & Arrays
// Ben Hoover
// 3/17/2026
//
// Extra for Experts:
// im using framecount as a timer

//https://p5js.org/examples/angles-and-motion-aim/

let gamestate = "title"; // sets the gamestate to title
let counter = 0; // sets the timer to 0
let best = 0; // sets new best to 0


let player = { // player variable
  x:0,
  y:0,
  size: 50,
  speed: 5, 
};

let lasers = []; // laser array

let asteroids = [];// laser array

function setup() {

  createCanvas(windowWidth, windowHeight); // makes height and width the screen size
  angleMode(DEGREES); 
  background(0); // sets background to black

  player.x = width / 2; // put the player into the center of the screen
  player.y = height / 2;

  spawnasteroid(); // spawn the first asteroid
}

function draw() {

  if (gamestate === "title"){
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text('Click R to Start', width /2, height/2); 
  }
  //checks if player is near astroid and if true end the game
 
  if (gamestate === "End") {
    background(0);
    fill(255);
    textAlign(CENTER);
    asteroids.length = 1; // sets the amount of asteroids on screen back to 1
    player.x = width/2;
    player.y = height/2;
    text('Click R to Play Again', width/2,height/2);
  }
  

  if (keyIsDown(82)){
    gamestate = "game";
  }
  
  if (gamestate === "game") {
    background(0, 0, 25);
    stars();
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text(`Player Speed: ${Math.floor(player.speed)}`, 20, height/8); 
    text(`Points: ${counter} Best: ${best}`, width/2, height/5);
    asteroidTimer();
    displayplayer();
    moveplayer();

    for (let asteroid of asteroids){ // asteroid
      displayasteroid(asteroid);
      bounce(asteroid);
      asteroidRand(asteroid);

      asteroid.x += asteroid.dx;
      asteroid.y += asteroid.dy;
      
      let dead = dist(player.x, player.y, asteroid.x, asteroid.y);
      if (dead < player.size + asteroid.radius/3) {
        asteroid.x = 0;
        asteroid.y = 0;
        asteroid.size = 20;
        if (counter > best){
          best = counter;
        }
        counter = 0;
        gamestate = "End";
      }
    }
    
    for (let i = lasers.length - 1; i >= 0; i-- ){
      movelaser(lasers[i], i);
    }
  }
}

//player movement
function moveplayer() {
  if (keyIsDown(65)) { // move left
    player.x -= player.speed;
  }
  if (keyIsDown(68)) { // move right
    player.x += player.speed;
  }
  if (keyIsDown(87)) { // move up
    player.y -= player.speed;
  }
  if (keyIsDown(83)) { // move down
    player.y += player.speed;
  }

  // contrains the player in the window
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

//make the player face towards the mouse
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

// spawns a asteroid at a random corner
function spawnasteroid(){
  let asteroidcopy = {
    x: random([-50, width + 50]),
    y: random([-50, height + 50]),
    dx:4,
    dy:4,
    radius:50,
  };
  asteroids.push(asteroidcopy);
}

// randomize the dx and dy of the asteroid
function asteroidRand(asteroid){
  asteroid.dx += random(0.1, 0.6);
  asteroid.dy += random(0.1, 0.6);
  asteroid.dx -= random(0.1, 0.6);
  asteroid.dy -= random(0.1, 0.6);
}

//displays the asteroid
function displayasteroid(asteroid) {
  fill(200);
  circle(asteroid.x, asteroid.y, asteroid.radius);
}

//bounce the asteroid
function bounce(asteroid) { 
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
  let angle2 = atan2(mouseY - player.y, mouseX - player.x);
  let copyLasers = {
    x:player.x,
    y:player.y,
    dx: cos(angle2) * 15,
    dy: sin(angle2) * 15,
    size: player.size /2,
  }; 
  lasers.push(copyLasers);
}


//creates the laser and checks for collisions
function movelaser(laser, i) {
  laser.x += laser.dx;
  laser.y += laser.dy;

  fill(255, 0, 0);
  circle(laser.x, laser.y, laser.size);

  for (let asteroid of asteroids){
    let distance = dist(laser.x, laser.y, asteroid.x, asteroid.y);

    if (distance < laser.size + asteroid.radius/2.5) {
      counter++;
      if (asteroid.radius < 90){
        asteroid.radius += 5;
      }
 
      asteroid.x =  random([-50, width + 50]),
      asteroid.y =  random([-50, height + 50]),

      lasers.splice(i, 1);
      break;
    }
  }

  if (laser.x < 0 || laser.x > width || laser.y < 0 || laser.y > height) {
    lasers.splice(i, 1);
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

  console.log("speed is", player.speed,);
}

function keyPressed(){ // spawn an asteroid
  if (key === "e") {
    spawnasteroid();
  }
}

function asteroidTimer(){ // spawns an asteroid every few seconds
  if (frameCount % 500 === 0){
    spawnasteroid();
  }
}

