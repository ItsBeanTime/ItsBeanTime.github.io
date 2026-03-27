// 2D arrays assignment
// Ben Hoover
// 3/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Constants
const CELL_SIZE = 64;
const GROUND = 1;

let rows;
let cols;
let grid;



// Image variables
let iconImg;
let groundImg;
let blockImg;
let backgroundImg;
let spikeImg;

function preload(){
  backgroundImg = loadImage("gd-background.png");
  blockImg = loadImage("gd-block.png");
  groundImg = loadImage("gd-ground.png");
  spikeImg = loadImage("gd-spike.png");
  iconImg = loadImage("gd-cube2.png");
}

function setup(){


  createCanvas(windowWidth, windowHeight);
  image(backgroundImg, 0, 0, width, height - CELL_SIZE * 3);
  image(blockImg, CELL_SIZE * 12, height - CELL_SIZE * 4, CELL_SIZE, CELL_SIZE);

}

function draw(){

  let thePlayer = {
    x: 0,
    y: height + CELL_SIZE * 8 - 6,
  };

  for (let i = 0; i < CELL_SIZE * 35; i += CELL_SIZE * 3){
    image(groundImg, i, height - CELL_SIZE * 3, CELL_SIZE * 3, CELL_SIZE * 3);
  }
  for (let j = 0; j < CELL_SIZE * 3; j+= CELL_SIZE){
    image(spikeImg, j + CELL_SIZE* 13, height - CELL_SIZE * 4, CELL_SIZE, CELL_SIZE);
  }
  
  for (let start = 0; start < 100; start += 10){
    image(iconImg, thePlayer.x, thePlayer.y, CELL_SIZE, CELL_SIZE);
    thePlayer.x += start;
  }
}