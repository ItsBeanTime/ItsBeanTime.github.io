// 2D arrays assignment
// Ben Hoover
// 3/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Game state variables
let firstLevel = false;
let titleScreen = true;

//Tile variables
let tiles;
let cellSize;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;

//Scrolling and player movement
let canMove = true;
let canScroll = true;
let screenScroll = 0;
let screenSpeed;
let bgScroll = 0;
let groundScroll = 0;
let rotation = 0;

//music/sfx variables
let titleMusic
let firstLevelMusic;
let deathSound;
let clickSound;


let groundLevel;
let lines;
let level;

// Jump variables
let gravity;
let jumpStrength;

// Image variables
let icon;
let ground;
let block;
let background;
let spike;
let empty;
let end;
let title;

//Player position and velocity
let player = {
  x: 0,
  y: 0,
  vy: 1,
};



function preload(){
  //load level from a txt file
  level = "assets/level.txt";
  lines = loadStrings(level);

  //load music/sfx
  titleMusic = loadSound("584131_Geometry-Dash-Menu-Theme.mp3");
  firstLevelMusic = loadSound("Geometry Dash Stereo Madness soundtrack - MRN1ice (128k).mp3");
  deathSound = loadSound("Geometry Dash Death Sound Effect - Canned Sound Collection (128k).mp3");
  clickSound = loadSound("geometry-dash-click-sound.mp3");

  //load images
  playButton = loadImage("gd-playbutton.png");
  title = loadImage("gd-title.png");
  end = loadImage("gd-end.png");
  empty = loadImage("empty.png");
  background = loadImage("gd-background.png");
  block = loadImage("gd-block.png");
  ground = loadImage("gd-ground.png");
  spike = loadImage("gd-spike.png");
  icon = loadImage("gd-cube2.png");
}

function setup(){
  titleMusic.play();
  createCanvas(windowWidth, windowHeight);

  //set the cell size
  cellSize = height / 12;
  //sets the ground level
  groundLevel = cellSize * 8;
  //put the player on the ground
  player.y = groundLevel;

  //gravity, speed and jump strength based on cell size so it doesnt break depending on the windows scale
  gravity = cellSize * 0.029;
  jumpStrength = -cellSize * 0.35;
  screenSpeed = cellSize * 0.19;

  //get the tile demensions from txt file
  tilesHigh = lines.length;
  tilesWide = lines[0].length;
  tileWidth = cellSize;
  tileHeight = cellSize;

  //create an empty 2d array
  tiles = createEmptyArray(tilesWide, tilesHigh);

  for (let y = 0; y < tilesHigh; y++){
    for (let x = 0; x < tilesWide; x++){
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}

function draw(){
  //shows the title screen if true
  if (titleScreen === true){
    displayTitle();
  }
  //runs the first level if false
  else if (titleScreen === false && firstLevel === true){
    //display the level
    display();
    //display player
    playerDisplay();
    //player
    playerMove();    
  }
}

function mousePressed(){
  //checks if mouse clicks the start button
  if (titleScreen === true && mouseX >= width/2 - width/12 && mouseX <= width/2 + width/12 &&
     mouseY >= height/2 - width/12 && mouseY <= height/2 + width/12){

    //title screen set to false
    titleScreen = false;

    //fist level starts
    firstLevel = true;

    //setting screen scroll back because it conflicted with the title screen
    if (titleMusic.isPlaying()){
      titleMusic.stop();
    }
    clickSound.play();
    firstLevelMusic.play();
    screenScroll = -cellSize * 0.1;
  }
}



function playerDisplay(){
  //when in the air rotate the player
  if (player.vy !== 0){
    rotation += 0.135;
  }

  //displays the player as well as rotating it from the center
  push();
  translate(player.x + cellSize/2, player.y + cellSize/2);
  rotate(rotation);
  imageMode(CENTER);
  image(icon, 0, 0, cellSize, cellSize);
  pop();
  imageMode(CORNER);
}

function playerMove(){
  //player moves forward at the start then stops
  if (canScroll === true){
    if (player.x < cellSize * 5){
      player.x += screenSpeed;
    }
    else{
      screenScroll += screenSpeed; //makes the screen scroll after player reaches a position
    }    
  } 
  else if (canScroll === false && canMove === true) {
    player.x += screenSpeed;    
  }
  
  //use the gravity
  player.vy += gravity;
  player.y += player.vy;

  playerCollisions();
}

function playerCollisions(){
  //check the bottom, top and front of a tile for collisions
  let bottom = getTile(player.x + cellSize / 3, player.y + cellSize);
  let top = getTile(player.x + cellSize / 2, player.y);
  let front = getTile(player.x + cellSize, player.y + cellSize / 2);
  //spike hitbox is made smaller so the game is for forgiving
  let spikeHitbox = getTile(player.x + cellSize * 0.5, player.y + cellSize * 0.45);
  
  //the finish hitbox is placed a bit in front of the actual image because i was going to make 
  //a ending animation but ran out of time
  let finishHitbox = getTile(player.x + cellSize * 6, player.y + cellSize /2);
  let stopScrollHitbox = getTile(player.x + cellSize / 2, player.y + cellSize / 2);

  //check finish collision
  if (finishHitbox === "F"){
    canMove = false;
    // endAnimation();
  
    firstLevelMusic.stop();
    titleScreen = true;
    firstLevel = false;
    screenScroll = -cellSize * 5;
  }

  //stop screen scroll tile
  if (stopScrollHitbox === "P"){
    canScroll = false;
  }

  //check spike collision
  if (spikeHitbox === "s"){
    killPlayer();
  }

  //check if player land on top of a block
  if (bottom === "b"){
    player.y = floor((player.y + cellSize) / cellSize) * cellSize - cellSize;
    player.vy = 0;

    //forces the rotation to nearest multiple of 90
    rotation = round(rotation / 90) * 90;

    //player can jump when on block
    if (keyIsDown(32)){
      player.vy = jumpStrength;
    }
  }

  //check if player is touching the top or front of a block then kill them
  else if (top === "b" || front === "b"){
    killPlayer();
  }

  //put player on ground
  else if (player.y >= groundLevel){
    player.y = groundLevel;
    player.vy = 0;

    //forces rotation again
    rotation = round(rotation / 90) * 90;

    //jump
    if (keyIsDown(32)){
      player.vy = jumpStrength;
    }
  }
}

//sets the screen scroll to go back
function killPlayer(){
  deathSound.play();
  firstLevelMusic.stop();
  firstLevelMusic.play();
  screenScroll = -cellSize * 5;
}

function getTile(x,y){
  //checks which tile the player is in
  let col = floor((x + screenScroll) / tileWidth);
  let row = floor(y / tileHeight);

  return tiles[row][col]
}

function displayTitle(){
  screenScroll += screenSpeed * 0.5;

  let groundSpacing = cellSize * 3;
  let groundY = height - groundSpacing;

  bgScroll += screenSpeed * 0.3;

  //loop background
  if (bgScroll >= width){
    bgScroll -= width;
  }
  image(background, -bgScroll, 0, width, height - groundSpacing);
  image(background, -bgScroll + width, 0, width, height - groundSpacing);

  //draw title
  imageMode(CENTER);
  image(title, width/2, height/6, width/3, height / 3);
  image(playButton, width / 2, height / 2, width / 6, width / 6)
  imageMode(CORNER);

  //draw button
  // rectMode(CENTER); 
  // square(width/2, height/2, width /6); 

  //loop ground tiles
  if (canScroll === true){
    groundScroll += screenSpeed - 0.5;
  }
  
  if (groundScroll >= groundSpacing){
    groundScroll = 0;
  }
  for (let i = -width; i < width * 2; i += groundSpacing){
    image(ground, i - groundScroll ,groundY, cellSize * 3.5, cellSize * 3.5);
  } 
}

function display(){
  // firstLevelMusic.play();
  let groundSpacing = cellSize * 3;
  let groundY = height - cellSize * 3;

  bgScroll = screenScroll * 0.3;

  if (bgScroll >= width){
    bgScroll -= width;
  }

  image(background, -bgScroll, 0, width, height - groundSpacing);
  image(background, -bgScroll + width, 0, width, height - groundSpacing);
  image(background, -bgScroll + width * 2, 0, width, height - groundSpacing);

  if (canScroll === true && player.x >= cellSize * 5){
    groundScroll += screenSpeed;
  }
  
  if (groundScroll >= groundSpacing){
    groundScroll = 0;
  }
    for (let i = -width; i < width * 2; i += groundSpacing){
      image(ground, i - groundScroll ,groundY, cellSize * 3.5, cellSize * 3.5);
    } 
  for(let y = 0; y < tilesHigh; y++){
    for(let x = 0; x < tilesWide; x++){
      showTile(tiles[y][x], x, y);
    }
  }
}
function showTile(location, x, y){
  if (location === "s"){ //check if its a spike
    image(spike, x * tileWidth - screenScroll, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "b"){ //check if its a block
    image(block, x * tileWidth - screenScroll, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "F"){ //check if its the finish
    image(end, x * tileWidth - screenScroll, y * tileHeight, tileWidth + 32, tileHeight);
  }
  else if (location === "P"){// check if its a pause
    image(empty, x * tileWidth - screenScroll, y * tileHeight, tileWidth, tileHeight);
  }
  else{ // check if tile is empty
    image(empty, x * tileWidth - screenScroll, y * tileHeight, tileWidth, tileHeight);
  } 
}

// function endAnimation(){
//   player.y -= cellSize * 0.2;
//   player.x -= cellSize * 0.2;
// }

function createEmptyArray(cols, rows){
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      randomGrid[y].push(0);
    }
  }
  return randomGrid;
}




