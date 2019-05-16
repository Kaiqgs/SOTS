class Gun
{

    constructor()
    {
        this.bullets = [];
    }

    shoot(x, y, angle)
    {
        this.bullets.push(new Bullet(x, y, angle));
    }

    update()
    {
        //If bullet should die: remove it from array;
        for (let i = 0; i < this.bullets.length; ++i)
            if (this.bullets[i].update())
                this.bullets.splice(i, 1);
    }

    render()
    {
        for (let i = 0; i < this.bullets.length; ++i)
            this.bullets[i].render();
    }

    hits(entity)
    {
        for (let i = 0; i < this.bullets.length; ++i)
            if (this.bullets[i].isTouching(entity))
            {
                this.bullets.splice(i, 1);
                return true;
            }

        return false;
    }

    getClosestBullets(entity, n)
    {
        let closestBullets = this.bullets.sort((a, b) => a.dist(entity) - b.dist(entity)).slice(0, n);
        
        while (closestBullets.length < n) closestBullets.push(new Bullet(0, 0, 0));

        return closestBullets;
    }
}