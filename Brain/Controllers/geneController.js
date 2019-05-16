class GeneController
{
    constructor(arena)
    {
        this.arena = arena;
        this.brains = []
        for (let i = 0; i < this.arena.entities.length; ++i)
            this.brains.push(new GeneBrain());
    }

    act()
    {
        
    }
}