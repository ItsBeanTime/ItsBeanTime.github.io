// 2D arrays assignment
// Ben Hoover
// 3/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Constants
const CELL_SIZE = 64;

let isJumping = false;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let lines;
let level;

// Image variables
let icon;
let ground;
let block;
let background;
let spike;
let empty;

let player = {
  x: 0,
  y: 0,
};
let startScroll = false;


function preload(){
  level = "assets/level.txt";
  lines = loadStrings(level);

  empty = loadImage("empty.png");
  background = loadImage("gd-background.png");
  block = loadImage("gd-block.png");
  ground = loadImage("gd-ground.png");
  spike = loadImage("gd-spike.png");
  icon = loadImage("gd-cube2.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  player.y = CELL_SIZE * 9;

  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = CELL_SIZE;
  tileHeight = CELL_SIZE;

  tiles = createEmptyArray(tilesWide, tilesHigh);

  for (let y = 0; y < tilesHigh; y++){
    for (let x = 0; x < tilesWide; x++){
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}

function draw(){
  display();
  playerDisplay();
  playerMove();
}

function playerDisplay(){
  image(icon, player.x, player.y, CELL_SIZE, CELL_SIZE);
}

function playerMove(){
  if (player.x < CELL_SIZE * 5){
    player.x += 7;
  }
  if (isJumping === false){
    if (player.y <= CELL_SIZE *8.9){
      player.y += 10;
    }
    else if (keyIsDown(32)){
      isJumping = true;
    }
  }
  if (isJumping === true){
    if (player.y >= CELL_SIZE * 7){
      player.y -= 10;
    }
    else{
      isJumping = false;
    }
  }
}
function display(){
  image(background, 0, 0, width, height - CELL_SIZE * 3);  
  for (let i = 0; i < CELL_SIZE * 35; i += CELL_SIZE * 3){
    image(ground, i, height - CELL_SIZE * 3.5, CELL_SIZE * 3.5, CELL_SIZE * 3.5);
  } 
  for(let y = 0; y < tilesHigh; y++){
    for(let x = 0; x < tilesWide; x++){
      showTile(tiles[y][x], x, y);
    }
  }
}

function showTile(location, x, y){
  if (location === "s"){
    image(spike, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "b"){
    image(block, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else{
    image(empty, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
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




