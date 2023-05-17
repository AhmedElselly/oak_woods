let groundImage;
let charImage;
let player;
let tiles = [];
let collisionsMap = [];
let boundaries = [];

let keys = {
  d: false,
  a: false,
  space: false,
};

let pressedKey = "";

for (let i = 0; i < collisions.length; i += 30) {
  collisionsMap.push(collisions.slice(i, i + 30));
}

function preload() {
  groundImage = loadImage("assets/levels/level1.png");
  charImage = loadImage("assets/character/char_blue.png");
}


function rectangularCollision(rec1, rec2) {
  return (
    rec1.pos.x + rec1.w >= rec2.pos.x &&
    rec1.pos.x <= rec2.pos.x + rec1.w &&
    rec1.pos.y <= rec2.pos.y + rec1.h &&
    rec1.pos.y + rec1.h >= rec2.pos.y
  );
}

function collided(rect1, rect2) {
  return collideRectRect(
    rect1.pos.x,
    rect1.pos.y,
    rect1.w,
    rect1.h,
    rect2.pos.x,
    rect2.pos.y,
    rect2.w,
    rect2.h
  );
}

function detectCollisions(rect1, rect2) {
  return (
    rect1.pos.x < rect2.pos.x + rect2.w &&
    rect1.pos.x + rect1.w > rect2.pos.x &&
    rect1.pos.y < rect2.pos.y + rect2.h &&
    rect1.pos.y + rect1.h + rect1.vel.y > rect2.pos.y
  )
}

function keyPressed() {
  keys[key] = true;
  if (key === " ") {
    player.jump();
  } else {
    pressedKey = key;
  }
}

function keyReleased() {
  keys[key] = false;
  pressedKey = "";
  player.applyForce();
  if(key === 'd' || key === 'a') {
    player.stop()
  }
}

function setup() {
  createCanvas(720, 480);
  collisionsMap.forEach((row, i) => {
    row.forEach((source, j) => {
      if (source === 316) {
        boundaries.push(new Boundary(j * 24, i * 24));
      }
    });
  });
  player = new Player();
}

function draw() {
  background(15);
  image(groundImage, 0, 0);
  for (let boundary of boundaries) {
    if (detectCollisions(player, boundary)) {
      player.edge(boundary);
    } 
    boundary.draw();
  }
  player.movement(pressedKey);

  player.getState();
  player.gravity();
  player.draw(charImage);
}
