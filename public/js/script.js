var game = new Phaser.Game(720, 480, Phaser.CANVAS, 'GameContainer', { preload: preload, create: create , render: render});

function preload() {

    game.load.image('carton', 'assets/static/carton.png');
    game.load.image('bloc', 'assets/static/bloc.png');
    game.load.image('pikachu', 'assets/static/pikachu.png');
    game.load.image('superman', 'assets/static/superman.png');
    game.load.image('room', 'assets/static/room.png');

}

function create() {

    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.setBoundsToWorld();
    game.physics.box2d.gravity.y = 500;
    game.add.sprite(0, 0, 'room');

    // Dynamic boxes
    /*for (var i = 0; i < 5; i++)
    {
        var blockSprite = game.add.sprite(150 + i * 125, 300 - i * 50, 'block');
        game.physics.box2d.enable(blockSprite);
        blockSprite.body.angle = 30;
    }*/
    var biblio = new Phaser.Physics.Box2D.Body(this.game, null, 670, 300, 100);
    biblio.setPolygon([-40, -100, -40, 150, 40, 150, 40, -100 ]);
    var carton = game.add.physicsGroup(Phaser.Physics.BOX2D);
    carton.create(350, 420, 'carton').body.static = true;
    var bloc =  game.add.sprite(100, 96, 'bloc');
    game.physics.box2d.enable(bloc);
    bloc.body.angle = 30;
    var pikachu =  game.add.sprite(100, 96, 'pikachu');
    game.physics.box2d.enable(pikachu);
    pikachu.body.angle = 30;
    var superman =  game.add.sprite(100, 96, 'superman');
    game.physics.box2d.enable(superman);
    superman.body.angle = 30;



    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);


}

function mouseDragStart() {

    game.physics.box2d.mouseDragStart(game.input.mousePointer);

}

function mouseDragMove() {

    game.physics.box2d.mouseDragMove(game.input.mousePointer);

}

function mouseDragEnd() {

    game.physics.box2d.mouseDragEnd();

}

function render() {

   // game.debug.box2dWorld();

}