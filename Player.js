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
    this.speed = 5;
    this.length = 6;
    this.charFrame = 0;
    this.staggerFrame = 5;
    this.acc = 0.8;
    this.mass = 5;
    this.force = createVector(0, 0);
    this.speed = 0.5;
    this.vel = createVector(0, 0);

    
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
    this.vel.set(0, 0);
    this.g = 0;
  }

  edge(boundary) {
    console.log(this.pos.y > boundary.pos.y)
    // if (boundary) {
      // if (this.pos.y > boundary.pos.y) {
        this.pos.y = boundary.pos.y - boundary.h * 2;
      // }
    // }
  }

  applyForce(f) {
    this.pos.add(f);
  }

  gravity() {
    this.force.set(0, this.mass * this.acc);
    this.vel.add(this.force);
    this.applyForce(this.force);
  }

  jump() {
    this.vel.y -= 40;
  }

  movement(key) {
    if (key === "d") {
      this.pos.x += this.speed;
    }
    if (key === "a") {
      this.pos.x -= this.speed;
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
    console.log({ pos: this.pos.y });
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
