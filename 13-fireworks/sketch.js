// fireworks oop demo

class Particle {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(-5,5);
    this.dy = random(-5, 5);
    this.radius = 3;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }
  display(){
    noStroke();
    fill(this.r,this.g,this.b, this.opacity);
    circle(this.x, this.y, this.radius*2);
  }
  update(){
    //move
    this.x += this.dx;
    this.y += this.dy;

    //fade over time
    this.opacity -= 5;
  }
}

let theFireworks = [];

const NUMBER_OF_PARTICLES_PER_CLICK = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let firework of theFireworks) {
    firework.update();
    firework.display();
  }
}

function mousePressed(){
  for (let i = 0; i < NUMBER_OF_PARTICLES_PER_CLICK; i++){
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework); 
  }
}
