class Fighter extends Circle
{
    constructor(id, maxHits)
    {

        let x = Math.random() * WIDTH;
        let y = Math.random() * HEIGHT;
        
        super(x, y, 0);
        
        //Key variables;
        //Radius related;
        this.randomRadius = 20;
        this.baseRadius = 10;
        this.maxRadius = this.randomRadius + this.baseRadius;
        this.radius = Math.random() * this.randomRadius + this.baseRadius;
        
        //Shooting related;
        this.maxHits = maxHits;
        this.hitsTaken = 0;
        this.gun = new Gun();
        this.alive = true;
        
        //Aiming related;
        this.facingAngle = Math.random() * Math.PI;
        this.focusRange = .5;
        
        //Rendering;
        this.lineSize = 300;
        this.id = id;
    }
    
    // Set of actions:
    //  * Shoot
    //  * Move(-1 to 1 (x), -1 to 1(y))
    //  * Focus(-1(in) to 1(out))
    //  * Look(-1(left) to 1(right))
    shoot()
    {
        if (!this.alive) return;
        var angle = this.activeAngle(Math.random() * this.rangeAngle - Math.random() * this.rangeAngle);
        this.gun.shoot(this.x, this.y, angle);
    }

    move(x, y)
    {
        if (!this.alive) return;
        var newx = this.x + x * 5;
        var newy = this.y + y * 5;

        if (newx > 0 && newx < WIDTH) this.x = newx;
        if (newy > 0 && newy < HEIGHT) this.y = newy;
    }

    focus(amount)
    {
        if (!this.alive) return;
        var newfocus = this.focusRange + amount / 20;

        if (newfocus >= 1) this.focusRange = 1;
        else if (newfocus <= 0) this.focusRange = 0;
        else this.focusRange = newfocus;
    }

    look(amount)
    {
        if (!this.alive) return;
        var newFA = this.facingAngle + amount / 20;

        if (newFA <= Math.PI * 2 && newFA > 0)
            this.facingAngle = newFA;
    }

    getHit()
    {
        if (!this.alive) return;
        this.hitsTaken += 1;
        if (this.hitsTaken > this.maxHits) this.alive = false;
        //Todo: debug hit logic;
        console.log("OUCH " + this.id);
    }

    update()
    {
        this.gun.update();
    }

    render()
    {
        fill(this.hitsTaken * 255 / this.maxHits, 255 - this.hitsTaken * 255 / this.maxHits, 0);
        super.render();

        this.gun.render();

        stroke(0);

        line(this.x, this.y, this.x + this.cartesianSightX(-this.rangeAngle), this.y - this.cartesianSightY(-this.rangeAngle));
        line(this.x, this.y, this.x + this.cartesianSightX(this.rangeAngle), this.y - this.cartesianSightY(this.rangeAngle));
        stroke(0, 255, 0);
        line(this.x, this.y, this.x + this.cartesianSightX(), this.y - this.cartesianSightY());

        stroke(0);
    }

    activeAngle(value)
    {
        var range = value || 0;
        var angle = this.facingAngle + range;
        return angle;
    }

    cartesianSightX(value)
    {
        var range = value || 0;
        return this.lineSize * Math.cos(this.activeAngle(range));
    }

    cartesianSightY(value)
    {
        var range = value || 0;
        return this.lineSize * Math.sin(this.activeAngle(range));
    }

    get rangeAngle()
    {
        return Math.PI / 2 * (this.focusRange);
    }
}