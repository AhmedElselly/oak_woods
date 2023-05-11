class Player {
  constructor() {
    this.spriteWidth = 50;
    this.spriteHeight = 50;
    this.w = this.spriteWidth;
    this.h = this.spriteHeight;
    this.x = 0;
    this.y = 0;
    this.pos = createVector(this.x + 100, this.y);
    this.minFrame = 0;
    this.maxFrame = 22;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0.2;
    this.length = 6;
    this.charFrame = 0;
    this.staggerFrame = 5;
    this.mass = 5;
    this.vel = createVector(0, 0);
    this.gravity = createVector(0, 0.8);
    this.g = 0.5;
    this.acc = createVector(0, 0);
    this.spriteAnimations = [];
    this.animationStates = [
      {
        name: "idle",
        frames: 7,
      },
      {
        name: "hit",
        frames: 7,
      },
      {
        name: "defend",
        frames: 6,
      },
    ];
  }

  getState() {
    this.animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      };

      for (let i = 0; i < state.frames; i++) {
        let positionX = i * this.spriteWidth;
        let positionY = i * this.spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
      }
      this.spriteAnimations[state.name] = frames;
    });
  }

  update() {
    let position =
      Math.floor(this.charFrame / this.staggerFrame) %
      this.spriteAnimations["idle"].loc.length;
    this.frameX = this.spriteWidth * position;
    this.frameY = this.spriteAnimations["idle"].loc.y;
    this.charFrame++;
  }

  stop() {
    this.gravity.set(0, 0);
    this.vel.set(0, 0);
  }

  applyForce() {
    // this.gravity.set(0, 0.8)
    let a = p5.Vector.div(this.gravity, this.mass);
    this.acc.add(a);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  grounded() {
    let diffHeight = height - this.pos.y;
    console.log({ diffHeight });
    return this.pos.y === height - this.h;
  }

  jump() {
    console.log(this.grounded());
    // if (this.grounded()) {
    this.vel.add(0, -8);
    this.gravity.set(0, 1);
    this.pos.add(this.vel);
    this.vel.add(this.gravity);
    this.pos.y = constrain(this.pos.y, 0, height - this.h);
    // }
  }

  movement(key) {
    // console.log(this.gravity)
    if (key === "d") {
      let speed = 0.5;
      let right = createVector(speed, 0);
      this.vel.add(right);
      this.pos.add(this.vel);
      // this.vel.set(0, 0)
    }
    if (key === "a") {
      let speed = 0.5;
      let left = createVector(-speed, 0);
      this.vel.add(left);
      this.pos.add(this.vel);
    }
  }

  checkJump(boundary) {
    if (this.pos.y < boundary.h + 230) {
      // this.stop()
      let up = createVector(0, 1);
      this.vel.add(up);
      this.pos.add(this.vel);
    }
  }

  draw(img) {
    image(
      img,
      this.pos.x,
      this.pos.y,
      this.w,
      this.h,
      this.frameX,
      this.spriteHeight * this.frameY,
      this.spriteWidth,
      this.spriteHeight
    );
  }
}
