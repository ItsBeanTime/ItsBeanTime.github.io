// connected nodes

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //draw lines first
  for (let node of nodes){
    node.update();
    node.connectTo(nodes);
  }
  //draw circle on top of lines
  for (let node of nodes){
    node.display();
  }
}

function mousePressed(){
  let somePoint = new movingPoint(mouseX, mouseY);
  nodes.push(somePoint);
}

class movingPoint {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.color = color(random(255),random(255),random(255));
    this.speed = 5;
    this.deltaTime = 0.05;
    this.reach = 200;
  }

  display(){
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  update(){
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeBasedOnMouse();
    stroke(this.color);
  }

  adjustSizeBasedOnMouse(){
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseDistance < this.reach){
      let theSize = map(mouseDistance, 0, this.reach, 50, 15);
      this.radius = theSize;
    }
    else {
      this.radius = 15;
    }
  }

  connectTo(nodesArray){
    for (let otherNode of nodesArray){
      if (this !== otherNode){
        let distanceAppart = dist(this.x, this.y, otherNode.x, otherNode.y);
        if (distanceAppart < this.reach){
          line(this.x,this.y,otherNode.x,otherNode.y);
        }        
      }

    }
  }

  wrapAroundScreen(){
    if (this.x < 0){
      this.x += width;
    }
    if (this.x > width){
      this.x -= width;
    }
    if (this.y < 0){
      this.y += height;
    }
    if (this.y > height){
      this.y -= height;
    }
  }

  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    //scale from 0-1 to movement speed
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    //move point
    this.x += dx;
    this.y += dy;

    // move on time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
}