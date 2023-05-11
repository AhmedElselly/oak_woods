const { Engine, World, Bodies, Collision } = Matter;
let engine, world;
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

function setup() {
  createCanvas(720, 480);
  engine = Engine.create();
  world = engine.world;
  collisionsMap.forEach((row, i) => {
    row.forEach((source, j) => {
      if (source === 316) {
        boundaries.push(new Boundary(j * 24, i * 24));
      }
    });
  });
  player = new Player();
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

function keyPressed() {
  keys[key] = true;
  if (key === " ") {
    pressedKey = "space";
  } else {
    pressedKey = key;
  }
}

function keyReleased() {
  keys[key] = false;
  pressedKey = "";
  // player.applyForce()
}

function draw() {
  background(15);
  image(groundImage, 0, 0);
  for (let boundary of boundaries) {
    if (rectangularCollision(player, boundary)) {
      // player.stop();
      console.log('collided')
    }
    boundary.draw();
  }
  Engine.update(engine);
  player.movement(pressedKey);
  player.getState();
  // player.applyForce();
  // player.checkJump(boundaries[1]);
  player.draw(charImage);
}
