class Bullet extends Circle
{
    constructor(x, y, angle)
    {
        var theta = angle || 0;

        super(x, y, 3);

        this.x_ = x;
        this.y_ = y;

        this.r = 0;
        this.theta = theta;
    }

    isTouching(entity)
    {
        return this.dist(entity) < entity.radius + this.radius;
    }

    dist(entity)
    {
        return Math.abs(entity.x - this.x) + Math.abs(entity.y - this.y);
    }


    update()
    {
        this.x = this.x_ + this.r * Math.cos(this.theta);
        this.y = this.y_ - this.r * Math.sin(this.theta);

        this.r += 5;
        return this.x > WIDTH || this.y > HEIGHT || this.y < 0 || this.x < 0;
    }
}