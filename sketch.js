let eyeTracking = true;

const EYE_RX = 11, EYE_RY = 10;   
const IRIS_RX = 9, IRIS_RY = 9;   
const PUPIL_RX = 4, PUPIL_RY = 4; 

// centers the character
const CHAR_OFFSET_X = -200;
const CHAR_OFFSET_Y = -173;

const BOX_SIZE = 320;
const BOX_RADIUS = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(255);

  // box
  const bx = width / 2 - BOX_SIZE / 2;
  const by = height / 2 - BOX_SIZE / 2;
  noStroke();
  fill(232, 240, 250);
  rect(bx, by, BOX_SIZE, BOX_SIZE, BOX_RADIUS);

  // keep everything inside the box
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.roundRect(bx, by, BOX_SIZE, BOX_SIZE, BOX_RADIUS);
  drawingContext.clip();

  drawZzz();

  push();
  translate(width / 2, height / 2);
  translate(CHAR_OFFSET_X, CHAR_OFFSET_Y);

  drawCharacter();
  pop();

  drawingContext.restore();

  // outline goes on top so it doesn't get cut off
  noFill();
  stroke(60);
  strokeWeight(4);
  rect(bx, by, BOX_SIZE, BOX_SIZE, BOX_RADIUS);

  const b = getButtonRect();
  drawToggleButton(b.x + b.w / 2, b.y + b.h / 2);
}

function drawZzz() {
  push();
  translate(width / 2, height / 2);

  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  // x, y, size, opacity
  const zs = [
    { x: 104, y: -30,  size: 16, a: 140, ch: "z" },
    { x: 122, y: -62,  size: 24, a: 175, ch: "z" },
    { x: 132, y: -102, size: 34, a: 210, ch: "Z" },
  ];

  for (const z of zs) {
    push();
    translate(z.x, z.y);
    rotate(radians(-10));
    fill(110, 135, 185, z.a);
    textSize(z.size);
    text(z.ch, 0, 0);
    pop();
  }

  textStyle(NORMAL);
  pop();
}

function drawBody() {
  strokeJoin(ROUND);
  strokeCap(ROUND);

  const NAVY = color(28, 42, 92);
  const NAVY_LINE = color(14, 22, 52);
  const SKIN = color(238, 212, 135);
  const SILVER = color(185, 192, 205);

  // neck
  stroke(60);
  strokeWeight(3);
  fill(SKIN);
  rect(184, 262, 32, 46, 6);

  // shirt
  stroke(NAVY_LINE);
  strokeWeight(3);
  fill(NAVY);
  rect(95, 300, 210, 140, 70, 70, 0, 0);

  // collar
  rect(176, 292, 48, 18, 9);

  // necklace
  noFill();
  stroke(SILVER);
  strokeWeight(2);
  beginShape();
  vertex(176.5, 299);
  vertex(200, 336);
  vertex(223.5, 299);
  endShape();
}

function drawCharacter() {
  strokeJoin(ROUND);
  strokeCap(ROUND);

  // back hair
  stroke(60);
  strokeWeight(3);
  fill(15);
  rect(120, 68, 160, 244, 70, 70, 25, 25);

  drawBody();

  // face
  noStroke();
  fill(250, 226, 150);
  ellipse(200, 200, 130, 150);

  // eyes
  for (const x of [168, 232]) {
    noStroke();
    fill(240, 150, 40);
    arc(x, 195, 26, 10, PI, TWO_PI, CHORD);

    // only show the bottom half of the eye
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.ellipse(x, 196, 11, 10, 0, 0, PI);
    drawingContext.clip();

    let off = eyeTracking ? getIrisOffset(x, 196) : { x: 0, y: 0 };

    fill(120, 65, 30);
    ellipse(x + off.x, 196 + off.y, IRIS_RX * 2, IRIS_RY * 2);

    fill(20);
    ellipse(x + off.x, 196 + off.y, PUPIL_RX * 2, PUPIL_RY * 2);

    drawingContext.restore();

    // eyelid
    stroke(30);
    strokeWeight(3);
    line(x - 12, 196, x + 12, 196);

    // under eye
    noFill();
    strokeWeight(2);
    arc(x, 196, 22, 20, 0.15, PI - 0.15);
  }

  // brows
  stroke(30);
  strokeWeight(4);
  line(150, 165, 185, 172);
  line(250, 165, 215, 172);

  // nose
  strokeWeight(2.5);
  line(200, 205, 196, 225);
  line(196, 225, 204, 226);

  // mouth
  noFill();
  stroke(30);
  strokeWeight(3);
  line(180, 242, 220, 242);

  // front hair
  stroke(60);
  strokeWeight(3);
  fill(15);

  beginShape(); // left
  vertex(200, 66);
  vertex(138, 88);
  vertex(122, 192);
  vertex(124, 310);
  vertex(152, 310);
  vertex(154, 192);
  vertex(172, 150);
  vertex(200, 118);
  endShape(CLOSE);

  beginShape(); // right
  vertex(200, 66);
  vertex(262, 88);
  vertex(278, 192);
  vertex(276, 310);
  vertex(248, 310);
  vertex(246, 192);
  vertex(228, 150);
  vertex(200, 118);
  endShape(CLOSE);

  drawGlasses();
}

function getIrisOffset(eyeX, eyeY) {
  let localMouseX = mouseX - (width / 2) - CHAR_OFFSET_X;
  let localMouseY = mouseY - (height / 2) - CHAR_OFFSET_Y;

  const maxDx = EYE_RX - IRIS_RX;
  const maxDy = EYE_RY - IRIS_RY;

  let dx = localMouseX - eyeX;
  let dy = localMouseY - eyeY;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return { x: 0, y: 0 };

  let ux = dx / dist;
  let uy = dy / dist;

  let ox = ux * maxDx;
  let oy = uy * maxDy;

  if (oy > 0) oy *= 2.5; // look down more

  return { x: ox, y: oy };
}

function drawGlasses() {
  noFill();
  stroke(40);
  strokeWeight(2.5);

  rect(150, 186, 36, 26, 9); // left
  rect(214, 186, 36, 26, 9); // right
  line(186, 199, 214, 199);
  line(150, 194, 132, 196);
  line(250, 194, 268, 196);
}

function getButtonRect() {
  const cx = width / 2;
  const cy = height / 2 - BOX_SIZE / 2 - 30;
  return { x: cx - 50, y: cy - 14, w: 100, h: 28 };
}

function drawToggleButton(cx, cy) {
  const b = getButtonRect();
  let hover = mouseX > b.x && mouseX < b.x + b.w &&
              mouseY > b.y && mouseY < b.y + b.h;

  noStroke();
  fill(eyeTracking ? (hover ? color(90, 210, 90) : color(80, 190, 80))
                   : (hover ? color(220, 90, 90) : color(200, 80, 80)));
  rect(b.x, b.y, b.w, b.h, 6);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(eyeTracking ? "Eyes: ON" : "Eyes: OFF", cx, cy + 1);
  textStyle(NORMAL);
}

function mousePressed() {
  const b = getButtonRect();

  if (mouseX > b.x && mouseX < b.x + b.w &&
      mouseY > b.y && mouseY < b.y + b.h) {
    eyeTracking = !eyeTracking;
    redraw();
  }
}

function mouseMoved() {
  if (eyeTracking) redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}