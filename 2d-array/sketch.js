// 2D arrays assignment
// Ben Hoover
// 3/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Constants
const CELL_SIZE = 64;

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
  rows = Math.floor(height);
  cols = Math.floor(width);
  grid = [[],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [2,2,2,2,2,0,2,2,2,2],
    [2,2,2,2,2,1,2,1,2,2],



  ];

  image(backgroundImg, 0, 0, width, height - CELL_SIZE * 3);

}

function draw(){
  for (let i = 0; i < CELL_SIZE * 35; i += CELL_SIZE * 3){
    image(groundImg, i, height - CELL_SIZE * 3.5, CELL_SIZE * 3.5, CELL_SIZE * 3.5);
  }
  spawnSpike();
}

function spawnSpike(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === 0){
        image(spikeImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === 1){
        image(blockImg, x * CELL_SIZE, y * CELL_SIZE , CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

