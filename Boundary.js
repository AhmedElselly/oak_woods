class Boundary {
  constructor(x, y) {
    this.w = 26;
    this.h = 26;
    this.body = Bodies.rectangle(x, y, this.w, this.h, {isStatic: true});
    this.pos = this.body.position;
  }

  draw() {
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}
