var game = new Phaser.Game(1000, 667, Phaser.CANVAS, 'GameContainer', { preload: preload, create: create , render: render});
var nameObjects=[];
var mouseDown = false;
var text1;
var south = 0;
var poke = 0;
var mario = 0;
var trash = 0;
var trashText = 0;
var marioText = 0;
var marvelText = 0;
var southText = 0;
var pokemonText = 0;
var counter = 0;

function preload() {

    game.load.image('room', 'assets/static/room.png');
    game.load.image('boxPokemon', 'assets/static/boxPokemon.png');
    game.load.image('boxSouthPark', 'assets/static/boxSouthPark.png');
    game.load.image('boxMarvel', 'assets/static/boxMarvel.png');
    game.load.image('boxMario', 'assets/static/boxMario.png');
    game.load.image('trash', 'assets/static/trash.png');
    game.load.audio('tetris', ['assets/audio/tetris.mp3', 'assets/audio/tetris.ogg']);
    game.load.audio('dbd', ['assets/audio/dbd.mp3', 'assets/audio/dbd.ogg']);
    game.load.image('menu', 'assets/button.png', 270, 180);


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

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    music = game.add.audio('tetris');

    music.play();
    music.volume = 0.2;

    var param = sessionStorage.getItem("param");
    var obj = JSON.parse(param);
    console.log("param: " + obj);

    param();

    if(obj["t"] != 0) {
        trashText = game.add.text(25, 640, " 0", { font: "21px Arial", fill: "#FFFFFF" });
        trashText.stroke = "#333333";
        trashText.strokeThickness = 5;

        var trash = game.add.sprite(40, 605, 'trash');
        game.physics.box2d.enable(trash);
        trash.body.fixedRotation = true;
        trash.body.static = true;
    }

    if(obj["p"] != 0) {
        pokemonText = game.add.text(590, 640, "0", {font: "21px Arial", fill: "#FFFFFF"});
        pokemonText.stroke = "#333333";
        pokemonText.strokeThickness = 5;

        var boxPokemon = game.add.sprite(600, 610, 'boxPokemon');
        game.physics.box2d.enable(boxPokemon);
        boxPokemon.body.fixedRotation = true;
        boxPokemon.body.static = true;
    }

    if(obj["s"] != 0) {
        southText = game.add.text(190, 640, "0", {font: "21px Arial", fill: "#FFFFFF"});
        southText.stroke = "#333333";
        southText.strokeThickness = 5;

        var boxSouthPark = game.add.sprite(200, 610, 'boxSouthPark');
        game.physics.box2d.enable(boxSouthPark);
        boxSouthPark.body.fixedRotation = true;
        boxSouthPark.body.static = true;
    }

    if(obj["m"] != 0) {
        marioText = game.add.text(790, 640, "0", {font: "21px Arial", fill: "#FFFFFF"});
        marioText.stroke = "#333333";
        marioText.strokeThickness = 5;

        var boxMario = game.add.sprite(800, 610, 'boxMario');
        game.physics.box2d.enable(boxMario);
        boxMario.body.fixedRotation = true;
        boxMario.body.static = true;
    }

    if(obj["marvel"] != 0) {
        marvelText = game.add.text(390, 640, "0", {font: "21px Arial", fill: "#FFFFFF"});
        marvelText.stroke = "#333333";
        marvelText.strokeThickness = 5;

        var boxMarvel = game.add.sprite(400, 610, 'boxMarvel');
        game.physics.box2d.enable(boxMarvel);
        boxMarvel.body.fixedRotation = true;
        boxMarvel.body.static = true;
    }

    time = game.add.text(game.width-200, 110, "Temps : " + counter, { font: "21px Arial", fill: "#FFFFFF" });
    time.stroke = "#333333";
    time.strokeThickness = 5;

    var biblio = new Phaser.Physics.Box2D.Body(this.game, null, 915, 400, 100);
    biblio.setRectangle([40, 20, 0, 0, 0]);

    var etagere1 = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
    etagere1.setRectangle(45, 10, 0, 0, 0);

    var etagere2 = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
    etagere2.setRectangle(45, 10, 0, 130, 0);

    var ventilo = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
    ventilo.setRectangle(183, 5, 176, -72, 0);

    var obj = game.add.group();
    obj.enableBody = true;
    obj.physicsBodyType = Phaser.Physics.BOX2D;

    // on cree chaque object  !
    $.each(nameObjects, function( index, value ) {

        var object = obj.create(Math.floor((Math.random() * game.width-100) ), 10, value);
        object.body.setCollisionCategory(2);

    });

    boxPokemon.body.setCategoryContactCallback(2,boxCallback,this);
    boxSouthPark.body.setCategoryContactCallback(2,boxCallback,this);
    trash.body.setCategoryContactCallback(2,boxCallback,this);
    boxMario.body.setCategoryContactCallback(2,boxCallback,this);


    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    //timer
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);


    // Create a label to use as a button
    var w = game.width;
    var h = game.height;

    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.7);
    bar.drawRect(0, 0, w, 40);
    pause_label = game.add.text(w - 100, 10, 'Menu', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    var bar2;
    pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;

        bar2 = game.add.graphics();
        bar2.beginFill(0x000000, 0.7);
        bar2.drawRect(0,0, game.width, game.height);

        // Then add the menu
        menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = game.add.text(w/2, h-150, 'Cliquez en dehors du menu pour continuer', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    function unpause(event){
        // Only act if paused
        if(game.paused){
            // Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                y1 = h/2 - 180/2, y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                if(choise<3){
                    choise ="fullsreen";
                    gofull();

                }else{
                    choise = "quit";
                    storage();
                    document.location.href="index.html";

                }

            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();
                bar2.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    };

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
                inTheBox(pokemonText,poke);

                var i = nameObjects.indexOf(body2.sprite.key);
                if(i != -1) {
                    nameObjects.splice(i, 1);
                }
                body2.sprite.destroy();

            }
        }
    }

    if(body1.sprite.key=="boxSouthPark"){

        if(body2.sprite.key.includes("south")){

            if (mouseDown){

                south++;
                inTheBox(southText,south);
                var i = nameObjects.indexOf(body2.sprite.key);
                if(i != -1) {
                    nameObjects.splice(i, 1);
                }
                body2.sprite.destroy();

            }
        }
    }
    if(body1.sprite.key=="boxMario"){
        if(body2.sprite.key.includes("mario")){

            if (mouseDown){

                mario++;
                inTheBox(marioText,mario);
                var i = nameObjects.indexOf(body2.sprite.key);
                if(i != -1) {
                    nameObjects.splice(i, 1);
                }
                body2.sprite.destroy();

            }
        }
    }
    if(body1.sprite.key=="trash"){
        if (mouseDown){

            trash++;
            inTheBox(trashText,trash);
            var i = nameObjects.indexOf(body2.sprite.key);
            if(i != -1) {
                nameObjects.splice(i, 1);
            }
            body2.sprite.destroy();

        }

    }

    //Fin de la partie
    if(nameObjects.length==0){
        var fin = game.add.graphics();
        fin.beginFill(0x000000, 0.7);
        fin.drawRect(0,0, w, h);
        storage();
    }

 

}
function storage() {
    //stock le storage en session storage
    console.log("south: " + south + " pokemon: " + poke + " mario: " + mario + " trash: " + trash + " counter: " + counter);
    var data =
    {
        "southpark": south,
        "pokemon": poke,
        "mario": mario,
        "trash": trash,
        "counter": counter
    }

    if(sessionStorage.getItem("profil") === null) {
        var json = JSON.stringify(data);
        sessionStorage.setItem("profil",json);
    }

    else {
        var jsonobj = sessionStorage.getItem("profil");
        var obj = JSON.parse(jsonobj);

        if (obj['counter'] < counter) {
            var json = JSON.stringify(data);
            sessionStorage.setItem("profil",json);
        }

        else {
        }

    }




    //pour recuperer en session
    // var obj = JSON.parse(sessionStorage.profil);
}

function inTheBox(item,value) {

    item.text = value;

}


function updateCounter() {

    counter++;

    time.setText('Temps : ' + counter);

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