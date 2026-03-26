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
let thePlayer = {
  x: 0,
  y: 0,  
};


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
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  image(backgroundImg, 0, 0, width, height);
  image(blockImg, 0, height - CELL_SIZE * 4, CELL_SIZE, CELL_SIZE);
  image(groundImg, 0, height - CELL_SIZE * 2, CELL_SIZE * 2, CELL_SIZE * 2);
}

function draw(){

}


