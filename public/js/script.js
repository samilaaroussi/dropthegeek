var game = new Phaser.Game(1000, 667, Phaser.CANVAS, 'GameContainer', { preload: preload, create: create , render: render});
var nameObjects=[];
var mouseDown = false;
var text1;
var south = 0;
var poke = 0;
var trash = 0;


function preload() {

    game.load.image('room', 'assets/static/room.png');
    game.load.image('boxPokemon', 'assets/static/boxPokemon.png');
    game.load.image('boxSouthPark', 'assets/static/boxSouthPark.png');
    game.load.image('boxMarvel', 'assets/static/boxMarvel.png');
    game.load.image('trash', 'assets/static/trash.png');

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
    game.physics.box2d.gravity.y = 800;
    var room = game.add.sprite(0, 0, 'room');
    room.smoothed = false;

    // Stretch to fill
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    //game.input.onUp.add(gofull, this);

    text1 = game.add.text(570, 100, "South Park : 0 Pokemon : 0 Pas Geek : 0", { font: "21px Arial", fill: "#FFFFFF" });
    text1.stroke = "#333333";
    text1.strokeThickness = 5;

    var biblio = new Phaser.Physics.Box2D.Body(this.game, null, 915, 400, 100);
    biblio.setPolygon([-40, -120, -40, 200, 80, 200, 80, -120 ]);

    var etagere1 = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
    etagere1.setRectangle(45, 10, 0, 0, 0);

    var etagere2 = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
    etagere2.setRectangle(45, 10, 0, 130, 0);

    var ventilo = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
    ventilo.setRectangle(183, 5, 176, -72, 0);

    var boxPokemon = game.add.sprite(550, 610, 'boxPokemon');
    game.physics.box2d.enable(boxPokemon);
    boxPokemon.body.fixedRotation = true;
    boxPokemon.body.static = true;

    var boxSouthPark = game.add.sprite(220, 610, 'boxSouthPark');
    game.physics.box2d.enable(boxSouthPark);
    boxSouthPark.body.fixedRotation = true;
    boxSouthPark.body.static = true;

    var boxMarvel = game.add.sprite(400, 610, 'boxMarvel');
    game.physics.box2d.enable(boxMarvel);
    boxMarvel.body.fixedRotation = true;
    boxMarvel.body.static = true;

    var trash = game.add.sprite(80, 610, 'trash');
    game.physics.box2d.enable(trash);
    trash.body.fixedRotation = true;
    trash.body.static = true;

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
    trash.body.setCategoryContactCallback(2,boxCallback,this);

    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

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
    if(body1.sprite.key=="trash"){
        console.log("zoinzoin");
        if (mouseDown){

                trash++;
                inTheBox(text1);
                body2.sprite.destroy();

        }

    }

    // body1 is the ship because it's the body that owns the callback
    // body2 is the body it impacted with, in this case the health
    // fixture1 is the fixture of body1 that was touched
    // fixture2 is the fixture of body2 that was touched

    // Only pick up health when not at full health




}

function inTheBox(item) {

    item.text = "South Park : " + south + " Pokemon : " + poke + " Pas Geek : "+ trash;

}

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(true);
    }

}

function render() {

   //game.debug.box2dWorld();

}