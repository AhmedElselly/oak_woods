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

function detectCollisions(player, boundary) {
  return (
    player.pos.y + player.h < boundary.pos.y &&
    player.pos.y + player.h + player.vel.y >= boundary.pos.y && 
    player.pos.x + player.w >= boundary.pos.x 
  )
}

function keyPressed() {
  console.log(key);
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
}

function setup() {
  createCanvas(720, 480);
  collisionsMap.forEach((row, i) => {
    row.forEach((source, j) => {
      if (source === 316) {
        boundaries.push(new Boundary(j * 24, i * 24 + 1));
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
      player.stop();
    } 
    console.log(player.gravity)
    // if(notCollided(player, boundary)) {
    //   player.applyForce()
    // }
    boundary.draw();
  }
  player.movement(pressedKey);

  player.getState();
  player.applyForce();
  // player.checkJump(boundaries[1]);
  player.draw(charImage);
}
