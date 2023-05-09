class GenerateImage {
  constructor(sx, sy, sw, sh, dx, dy, dw, dh) {
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw;
    this.dh = dh;
  }

  draw(img) {
    image(
      img,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.dx,
      this.dy,
      this.dw,
      this.dh
    );
  }
}
