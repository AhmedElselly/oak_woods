class Boundary {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.w = 26;
    this.h = 26;
  }

  draw() {
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}
