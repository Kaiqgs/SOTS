class RandomController
{

    constructor(arena)
    {

        this.noises = []

        for (let i = 0; i < arena.entities.length; ++i)
        {
            var noiseval = Math.random() * 5000;
            this.noises.push(
            {
                x: noiseval,
                y: noiseval,
                other: noiseval
            });
        }

    }

    act(arena)
    {

        for (let i = 0; i < arena.entities.length; ++i)
        {
            this.noises[i].x
            arena.entities[i].move(noise(this.noises[i].x, this.noises[i].y) * 2 - 1, noise(this.noises[i].x, this.noises[i].y) * 2 - 1);
            var noises = noise(this.noises[i].other) * 2 - 1;
            arena.entities[i].focus(noises);
            arena.entities[i].look(noises);

            if (Math.random() > .95)
                arena.entities[i].shoot();

            this.noises[i].x += Math.random() * .05;
            this.noises[i].y += Math.random() * .05;
            this.noises[i].other += Math.random() * .05;
        }
    }
}