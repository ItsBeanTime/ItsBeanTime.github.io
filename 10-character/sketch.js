//character in grid demo

const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let rows;
let cols;
let grid;
let thePlayer = {
  x: 0,
  y: 4,
};
let pathimg;
let lavaimg;

function preLoad(){
  pathimg = loadImage("path.jpg");
  lavaimg = loadImage("lava.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height / CELL_SIZE);
  cols = Math.floor(width / CELL_SIZE);
  grid = generateRandomGrid(cols,rows);
  //put character in grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220); 
  displayGrid();
}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);
}

function toggleCell(x, y){
  if (x >= 0 && x < cols && y >= 0 && y < rows){
    //make sure the cell your toggling is in the grid
    if (grid[y][x] === OPEN_TILE){
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE){
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid(){
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE){
        // fill("white");
        image(pathimg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === IMPASSIBLE){
        // fill ("black");
        image(lavaimg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function generateRandomGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(IMPASSIBLE);
      }
    }
  }
  return newGrid;
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if (key === "e"){
    grid = generateEmptyGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if (key === "s"){
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  else if (key === "w"){
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  else if (key === "d"){
    movePlayer(thePlayer.x + 1, thePlayer.y);
  } 
  else if (key === "a"){
    movePlayer(thePlayer.x - 1, thePlayer.y);
  } 
}

function movePlayer(x, y){
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE){
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;

    thePlayer.x = x;
    thePlayer.y = y;

    grid[thePlayer.y][thePlayer.x] = PLAYER;
    grid[oldY][oldX] =  OPEN_TILE;
  }
 
}

function generateEmptyGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}