var game = new Phaser.Game(720, 480, Phaser.CANVAS, 'GameContainer', { preload: preload, create: create , render: render});
var nameObjects=[];

function preload() {

    game.load.image('room', 'assets/static/room.png');
    game.load.image('carton', 'assets/static/carton.png');


    var dir = "assets/";
    var fileextension = ".png";
    $.ajax({
        //va chercher les images 'browsable' (grace au plugin npm serve-index)
        url: dir,
        success: function (data) {
            //liste les images png
            $(data).find("a:contains(" + fileextension + ")").each(function (index,value) {
                var filename = this.href.replace(".png","").replace(window.location.host + "/assets/", "").replace("http://", "");
                //load les images
                game.load.image(filename,'assets/objects/' + filename + '.png');
                //console.log("file" + filename);
                nameObjects.push(filename);
            });
        }
    });

}

function create() {


    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.setBoundsToWorld();
    game.physics.box2d.gravity.y = 500;
    var room = game.add.sprite(0, 0, 'room');
    room.smoothed = false;

    var biblio = new Phaser.Physics.Box2D.Body(this.game, null, 670, 300, 100);
    biblio.setPolygon([-40, -100, -40, 150, 40, 150, 40, -100 ]);

    var carton = game.add.sprite(350, 420, 'carton');
    game.physics.box2d.enable(carton);
    carton.body.fixedRotation = true;
    carton.body.static = true;

    // on cree chaque object  !
    $.each(nameObjects, function( index, value ) {
        var object =  game.add.sprite(Math.floor((Math.random() * game.width) ), Math.floor((Math.random() * game.height) ), value);

        //lissage fullscreen mais aliasing ...
        //object.smoothed = false;

        game.physics.box2d.enable(object);
        object.body.angle = 30;
    });



    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

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



function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

function render() {

   // game.debug.box2dWorld();

}