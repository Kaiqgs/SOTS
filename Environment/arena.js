class Arena
{
    constructor(nEntities)
    {
        this.nEntities = nEntities;
        this.entities = [];
        this.arenaEncoded = [];
        this.encodeArena = false;
        this.maxHits = 10;

        for (let i = 0; i < nEntities; ++i)
            this.entities.push(
                new Fighter(i, this.maxHits)
            );
    }



    update()
    {
        this.arenaEncoded = [];

        for (let i = 0; i < this.entities.length; ++i)
        {
            this.entities[i].update();
            this.checkHit(i);

            if (this.encodeArena)
            {
                // TODO: finish encoding bullets + else;
                let basicEncode = [
                    this.entities[0].x / WIDTH,
                    this.entities[0].y / HEIGHT,
                    this.entities[0].y / HEIGHT,
                    this.entities[0].radius / this.entities[0].maxRadius,
                    this.entities[0].focusRange,
                    this.entities[0].facingAngle / (2 * Math.PI),
                    this.entities[0].hitsTaken / this.maxHits
                ]

                let bulletsEncode = [];

                var closeBullets = this.entities[0].gun.getClosestBullets(this.entities[0], 3);

            }
        }



        //this.arenaEncoded.concat
    }


    render()
    {
        for (let i = 0; i < this.nEntities; ++i)
            this.entities[i].render();
    }

    getCloseBullets()
    {
        if (i == index) continue;
    }

    checkHit(index)
    {
        for (let i = 0; i < this.entities.length; ++i)
        {
            if (i == index) continue;

            if (this.entities[i].gun.hits(this.entities[index]))
                this.entities[index].getHit();
        }
    }

}