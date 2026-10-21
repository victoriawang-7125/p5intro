function setup() {
  createCanvas(400, 400);
  clear(); 
  noLoop();
}

function draw() {
  clear();
  strokeJoin(ROUND);
  strokeCap(ROUND);

  // Back hair
  stroke(60);
  strokeWeight(3);
  fill(15);
  rect(120, 68, 160, 210, 70, 70, 25, 25);

  // Face
  noStroke();
  fill(250, 226, 150);
  ellipse(200, 200, 130, 150);

   // Eyes (unamused, half-lidded)
  for (const x of [168, 232]) {
    // Orange lid shadow above the lid line
    noStroke();
    fill(240, 150, 40);
    arc(x, 195, 26, 10, PI, TWO_PI, CHORD);

    // Iris (bottom half circle)
    fill(120, 65, 30);
    arc(x, 196, 22, 20, 0, PI, CHORD);

    // Pupil
    fill(20);
    arc(x, 196, 10, 11, 0, PI, CHORD);

    // Flat upper lid line
    stroke(30);
    strokeWeight(3);
    line(x - 12, 196, x + 12, 196);

    // Lower eye outline
    noFill();
    strokeWeight(2);
    arc(x, 196, 22, 20, 0.15, PI - 0.15);
  }

  // Brows
  stroke(30);
  strokeWeight(4);
  line(150, 165, 185, 172);
  line(250, 165, 215, 172);

  // Nose
  strokeWeight(2.5);
  line(200, 205, 196, 225);
  line(196, 225, 204, 226);

  // Mouth
  noFill();
  stroke(30);
  strokeWeight(3);
  line(180, 242, 220, 242);

  // Front hair
  stroke(60);
  strokeWeight(3);
  fill(15);

  beginShape(); // left
  vertex(200, 66);
  vertex(138, 88);
  vertex(122, 192);
  vertex(126, 270);
  vertex(150, 270);
  vertex(154, 192);
  vertex(172, 150);
  vertex(200, 118);
  endShape(CLOSE);

  beginShape(); // right
  vertex(200, 66);
  vertex(262, 88);
  vertex(278, 192);
  vertex(274, 270);
  vertex(250, 270);
  vertex(246, 192);
  vertex(228, 150);
  vertex(200, 118);
  endShape(CLOSE);

  drawGlasses();
}

function drawGlasses() {
  noFill();
  stroke(40);
  strokeWeight(2.5);

  // Lenses (frame only, no fill)
  rect(150, 186, 36, 26, 9); // left
  rect(214, 186, 36, 26, 9); // right

  // Bridge
  line(186, 199, 214, 199);

  // Temple arms heading back toward the ears
  line(150, 194, 132, 196);
  line(250, 194, 268, 196);
}

console.log(mouseX, mouseY) 



// let myColors=["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#008000", "#FFC0CB"];
// function setup() {
//   createCanvas(1000, 800);
// }

// function draw() {
// for(let i=0; i< 10; i++){
//     noFill()
//     strokeWeight(2)
//     stroke(random(myColors));
//     circle(random(width), random(height), random(30));
//   }
// }
  

// function mousePressed(){
//     background(0)
// }

// function doubleClicked() {
//   noLoop();
// }

//   background(220);
//   fill("blue")
//   console.log(mouseX, mouseY) 
//   ellipse(0,0,200,100)
//   rect(0,0,200,100)
//   circle(width/2, height/2,100)
//   circle(mouseX, mouseY, 150)
//   fill("goldenrod")
//   stroke("black")
//   strokeWeight(5)
//   triangle(100, 100, 200, 200, 300, 100)
