// image demo

let guypointimg;

function preload(){
  guypointimg = loadImage("guypoint.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(guypointimg, mouseX, mouseY, guypointimg.width * 0.2, guypointimg.height * 0.2);
}
