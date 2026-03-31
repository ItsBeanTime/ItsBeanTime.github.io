// 2D arrays assignment
// Ben Hoover
// 3/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Constants
const CELL_SIZE = 64;

let lines;
let level;
let rows;
let cols;

// Image variables
let iconImg;
let groundImg;
let blockImg;
let backgroundImg;
let spikeImg;

function preload(){
  level = "assets/level.txt";
  lines = loadStrings(level);

  backgroundImg = loadImage("gd-background.png");
  blockImg = loadImage("gd-block.png");
  groundImg = loadImage("gd-ground.png");
  spikeImg = loadImage("gd-spike.png");
  iconImg = loadImage("gd-cube2.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height);
  cols = Math.floor(width);

  image(backgroundImg, 0, 0, width, height - CELL_SIZE * 3);

}

function draw(){
  for (let i = 0; i < CELL_SIZE * 35; i += CELL_SIZE * 3){
    image(groundImg, i, height - CELL_SIZE * 3.5, CELL_SIZE * 3.5, CELL_SIZE * 3.5);
  }
  image(iconImg, 0, height - CELL_SIZE * 4.5, CELL_SIZE, CELL_SIZE);
}


