class Circle{
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  render()
  {
    circle(this.x, this.y, this.radius);
  }
}