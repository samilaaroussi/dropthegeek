var game = new Phaser.Game(1000, 667, Phaser.CANVAS, 'GameContainer', { preload: preload, create: create , render: render});
var nameObjects=[];
var mouseDown = false;
var text1;
var south = 0;
var poke = 0;


function preload() {

    game.load.image('room', 'assets/static/room.png');
    game.load.image('boxPokemon', 'assets/static/boxPokemon.png');
    game.load.image('boxSouthPark', 'assets/static/boxSouthPark.png');

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


    text1 = game.add.text(20, 120, "South Park : 0 Pokemon : 0", { font: "34px Arial Black", fill: "#FF0000" });
    text1.stroke = "#800000";
    text1.strokeThickness = 10;
    //  Apply the shadow to the Stroke only
    text1.setShadow(2, 2, "#333333", 2, true, false);

    var biblio = new Phaser.Physics.Box2D.Body(this.game, null, 915, 400, 100);
    biblio.setPolygon([-40, -120, -40, 200, 80, 200, 80, -120 ]);

    var bordure1 = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
    bordure1.setRectangle(45, 20, 0, 0, 0);

    /*var bordure = new Phaser.Physics.Box2D.Body(this.game, null, 315, 250, 100);
    bordure.setRectangle(90, 50, 0, 0, 0);*/


    var boxPokemon = game.add.sprite(550, 610, 'boxPokemon');
    game.physics.box2d.enable(boxPokemon);
    boxPokemon.body.fixedRotation = true;
    boxPokemon.body.static = true;


    var boxSouthPark = game.add.sprite(220, 610, 'boxSouthPark');
    game.physics.box2d.enable(boxSouthPark);
    boxSouthPark.body.fixedRotation = true;
    boxSouthPark.body.static = true;

    var obj = game.add.group();
    obj.enableBody = true;
    obj.physicsBodyType = Phaser.Physics.BOX2D;

    // on cree chaque object  !
    $.each(nameObjects, function( index, value ) {

        var object = obj.create(Math.floor((Math.random() * game.width) ), Math.floor((Math.random() * game.height) ), value);
        object.body.setCollisionCategory(2);

    });

    boxPokemon.body.setCategoryContactCallback(2,boxCallback,this);
    boxSouthPark.body.setCategoryContactCallback(2,boxCallback,this);

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);


}

function mouseDragStart() {

    game.physics.box2d.mouseDragStart(game.input.mousePointer);
    mouseDown=true;
}

function mouseDragMove() {

    game.physics.box2d.mouseDragMove(game.input.mousePointer);

}

function mouseDragEnd() {

    game.physics.box2d.mouseDragEnd();

    mouseDown=false;
}

function boxCallback(body1, body2, fixture1, fixture2, begin) {

    // This callback is also called for EndContact events, which we are not interested in.
    if (!begin)
    {
        return;
    }

    if(body1.sprite.key=="boxPokemon"){
        if(body2.sprite.key.includes("pokemon")){
            if (mouseDown){
                poke++;
                inTheBox(text1);
                body2.sprite.destroy();
            }
        }
    }

    if(body1.sprite.key=="boxSouthPark"){
        if(body2.sprite.key.includes("south")){
            if (mouseDown){
                south++;
                inTheBox(text1);
                body2.sprite.destroy();
            }
        }
    }

    // body1 is the ship because it's the body that owns the callback
    // body2 is the body it impacted with, in this case the health
    // fixture1 is the fixture of body1 that was touched
    // fixture2 is the fixture of body2 that was touched

    // Only pick up health when not at full health




}

function inTheBox(item) {
    item.text = "South Park : " + south + " Pokemon : "+poke;

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

   game.debug.box2dWorld();

}