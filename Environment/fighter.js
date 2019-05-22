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
        this.PI2 = Math.PI * 2

        //Shooting related;
        this.maxHits = maxHits;
        this.hitsTaken = 0;
        this.alive = true;
        
        //Aiming related;
        this.facingAngle = Math.random() * Math.PI;
        this.focusRange = .5;
        
        //Rendering;
        this.baseLineSize = 100;
        this.id = id;
    }
    
    get lineSize(){
        return this.baseLineSize// * this.facingAngle * 2;
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
        globalGun.trigger(this.x, this.y, this.id, angle);
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
        this.facingAngle += amount / 5;
        
        if(this.facingAngle > this.PI2)
            this.facingAngle = this.PI2 - this.facingAngle;
        else if(this.facingAngle < 0)
            this.facingAngle = this.PI2 + this.facingAngle;
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
        if(globalGun.hits(this))this.getHit();
    }

    render()
    {
        fill(this.hitsTaken * 255 / this.maxHits, 255 - this.hitsTaken * 255 / this.maxHits, 0);
        super.render();

        stroke(0);

        line(this.x, this.y, this.x + this.cartesianSightX(-this.rangeAngle), this.y - this.cartesianSightY(-this.rangeAngle));
        line(this.x, this.y, this.x + this.cartesianSightX(this.rangeAngle), this.y - this.cartesianSightY(this.rangeAngle));
        stroke(0, 255, 0);
        line(this.x, this.y, this.x + this.cartesianSightX(), this.y - this.cartesianSightY());

        stroke(0);
    }


    sees(ent){
        //TODO: Solve: detect if player sees or not other player;
        let minx = this.x + this.cartesianSightX(-this.rangeAngle) + this.cartesianSightX();
        let maxx = this.x + this.cartesianSightX(this.rangeAngle) + this.cartesianSightX();
        let miny = this.y - this.cartesianSightY(-this.rangeAngle) - this.cartesianSightY();
        let maxy = this.y - this.cartesianSightY(this.rangeAngle) - this.cartesianSightY();

        // 500,0 
        // 500, 900 // > 500

        // 900, 400
        // 0, 400
        line(minx, miny, maxx, maxy);
        return (ent.x > minx && ent.x < maxx) && (ent.y > miny && ent.y > maxy) ;
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