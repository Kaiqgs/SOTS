
let globalGun = new Gun();

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
        
        globalGun.update();
        for (let i = 0; i < this.entities.length; ++i)
            this.entities[i].update();
    }


    render()
    {
        globalGun.render();
        for (let i = 0; i < this.nEntities; ++i)
            if(i == 0)this.entities[0].render()
            else if(this.entities[0].sees(this.entities[i]))this.entities[i].render();
    }

    getCloseBullets()
    {
        if (i == index) continue;
    }
}