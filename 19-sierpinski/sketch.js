// Sierpinski triangle demo

let initialTriangle = [
  {x:1000, y:50},
  {x:100, y:920},
  {x:1800, y:920}
];

let theDepth = 0;
let theColors = ["red", "blue", "cyan", "yellow", "pink", "black", "lightgreen", "purple", "grey"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  sierpinski(initialTriangle, theDepth);
}

function draw() {
  
}

function mousePressed(){
  if (theDepth < 8){
    theDepth++;
    background("white");
    sierpinski(initialTriangle, theDepth);
  }
}

function sierpinski(points, depth){
  fill(theColors[depth]);
  triangle(points[0].x, points[0].y,
    points[1].x, points[1].y,
    points[2].x, points[2].y,
  );

  //base case
  if (depth > 0){
    //top triangle
    sierpinski([points[0],
      midPoint(points[0], points[1]),
      midPoint(points[0], points[2])],
    depth - 1);
    //bottom right triangle
    sierpinski([points[2],
      midPoint(points[1], points[2]),
      midPoint(points[0], points[2])],
    depth - 1);
    //bottom left
    sierpinski([points[1],
      midPoint(points[0], points[1]),
      midPoint(points[1], points[2])],
    depth - 1);
  };
}

function midPoint(point1, point2){
  let midX = (point1.x + point2.x) / 2;
  let midY = (point1.y + point2.y) / 2;
  return{x: midX, y:midY};
}


