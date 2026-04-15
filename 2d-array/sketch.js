// 2D arrays assignment
// Ben Hoover
// 3/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let firstlevel = false;
let titleScreen = true;


let cellSize;
let rotation = 0;

let canScroll = true;
let screenScroll = 0;
let screenSpeed;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
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

let player = {
  x: 0,
  y: 0,
  vy: 1,
};



function preload(){
  level = "assets/level.txt";
  lines = loadStrings(level);

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

  createCanvas(windowWidth, windowHeight);
  cellSize = height / 12;
  player.y = cellSize * 9.5;

  gravity = cellSize * 0.022;
  jumpStrength = -cellSize * 0.32;

  screenSpeed = cellSize * 0.15;

  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = cellSize;
  tileHeight = cellSize;

  tiles = createEmptyArray(tilesWide, tilesHigh);

  for (let y = 0; y < tilesHigh; y++){
    for (let x = 0; x < tilesWide; x++){
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}

function draw(){
  if (titleScreen === true){
    displayTitle();
  }
  else if (titleScreen === false && firstLevel === true){
    display();
    playerDisplay();
    playerMove();    
  }
}

function mousePressed(){
  if (titleScreen === true){
    screenScroll = -cellSize * 0.1;
  }
  firstLevel = true;
  titleScreen = false;

}

function playerDisplay(){
  if (player.vy !== 0){
    rotation += 0.1;
  }

  push();
  translate(player.x + cellSize/2, player.y + cellSize/2);
  rotate(rotation);
  imageMode(CENTER);
  image(icon, 0, 0, cellSize, cellSize);
  pop();

  imageMode(CORNER);
}

function getTile(x,y){
  let col = floor((x + screenScroll) / tileWidth);
  let row = floor(y / tileHeight);

  if (row >= 0 && row < tilesHigh && col >= 0 && col < tilesWide){
    return tiles[row][col];
  }
  return "";
}

function playerMove(){
  
  if (canScroll === true){
    if (player.x < cellSize * 5){
      player.x += screenSpeed;
    }
    else{
      screenScroll += screenSpeed;
    }    
  } 
  else if (canScroll === false) {
    player.x += screenSpeed;    
  }
  
  player.vy += gravity
  player.y += player.vy;

  let groundLevel = cellSize * 8;

  let bottom = getTile(player.x + cellSize / 3, player.y + cellSize);
  let top = getTile(player.x + cellSize / 2, player.y);
  let front = getTile(player.x + cellSize, player.y + cellSize / 2);
  let spikeHitbox = getTile(player.x + cellSize * 0.5, player.y + cellSize * 0.45);
  let finishHitbox = getTile(player.x + cellSize / 2, player.y + cellSize /2);
  let stopScrollHitbox = getTile(player.x + cellSize / 2, player.y + cellSize / 2);


  if (finishHitbox === "F"){
    noLoop();
  }
  if (stopScrollHitbox === "P"){
    canScroll = false;
  }
  if (spikeHitbox === "s"){
    screenScroll = -cellSize * 0.1;
  }

  if (bottom === "b"){
    player.y = floor((player.y + cellSize) / cellSize) * cellSize - cellSize;
    player.vy = 0;

    rotation = round(rotation / 90) * 90;

    if (keyIsDown(32)){
      player.vy = jumpStrength;
    }
  }
  else if (top === "b" || front === "b"){
    screenScroll = -cellSize * 0.1;
  }

  else if (player.y >= groundLevel){
    player.y = groundLevel;
    player.vy = 0;

    rotation = round(rotation / 90) * 90;

    if (keyIsDown(32)){
      player.vy = jumpStrength;
    }
  }
}

function displayTitle(){
  screenScroll += screenSpeed - 1;

  let bgScroll = screenScroll * 0.3; 

  let groundY = height - cellSize * 3;

  image(background, -bgScroll % width, 0, width, height - cellSize * 3);
  image(background, (-bgScroll % width) + width, 0, width, height - cellSize * 3);
  imageMode(CENTER);
  image(title, width/2, height/6, width /3, height /2);  
  imageMode(CORNER);
  for (let i = -width; i < width * 2; i += cellSize * 3){
    image(ground, i - (screenScroll % (cellSize * 3)),groundY, cellSize * 3.5, cellSize * 3.5);
  } 
}

function display(){
  let bgScroll = screenScroll * 0.3;

  let groundY = height - cellSize * 3;

  image(background, -bgScroll % width, 0, width, height - cellSize * 3);
  image(background, (-bgScroll % width) + width, 0, width, height - cellSize * 3);
  for (let i = -width; i < width * 2; i += cellSize * 3){
    image(ground, i - (screenScroll % (cellSize * 3)),groundY, cellSize * 3.5, cellSize * 3.5);
  } 

  for(let y = 0; y < tilesHigh; y++){
    for(let x = 0; x < tilesWide; x++){
      showTile(tiles[y][x], x, y);
    }
  }
}

function showTile(location, x, y){
  if (location === "s"){
    image(spike, x * tileWidth - screenScroll, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "b"){
    image(block, x * tileWidth - screenScroll, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "F"){
    image(end, x * tileWidth - screenScroll, y * tileHeight, tileWidth + 32, tileHeight);
  }
  else if (location === "P"){
    image(empty, x * tileWidth - screenScroll, y * tileHeight, tileWidth, tileHeight);
  }
  else{
    image(empty, x * tileWidth - screenScroll, y * tileHeight, tileWidth, tileHeight);
  } 
}

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




