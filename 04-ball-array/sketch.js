// ball object array

let ballArray = []; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);

  for (let ball of ballArray) {
    //move
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius > width){
      ball.x = -ball.radius;
    }
    if (ball.x + ball.radius < 0 ){
      ball.x = width + ball.radius;
    }
    if (ball.y - ball.radius > height){
      ball.y = -ball.radius;
    }
    if (ball.y + ball.radius < 0 ){
      ball.y = height + ball.radius;
    }
    

  
  
    fill(ball.r, ball.g, ball.b);
    //display
    circle(ball.x, ball.y, ball.radius * 2);
  }
}
function mousePressed() {
  spaweBall(mouseX, mouseY);
}

function spaweBall(_x, _y) {
  let theBall = {
    x: _x,
    y: _y,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40),
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255),
  };
  ballArray.push(theBall);
}
