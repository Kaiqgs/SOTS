var arena;
var controller;

function setup()
{
    createCanvas(WIDTH, HEIGHT);
    arena = new Arena(3);
    controller = new RandomController(arena);
}

function draw()
{
    background(220);
    arena.update();
    arena.render();
    controller.act(arena);
}