var theGame = function(game){}

theGame.prototype = {

    preload: function() {

        //chargement des images
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

    },

//création de l'environnement sur la map
    create: function() {
        var tabBox =[];

        //Configuration de la physique
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

        //Score de la partie
        text1 = game.add.text(670, 40, "South Park : 0 Pokemon : 0", { font: "21px Arial", fill: "#FFFFFF" });
        text1.stroke = "#333333";
        text1.strokeThickness = 5;
        //  Apply the shadow to the Stroke only
        //text1.setShadow(2, 2, "#333333", 2, true, false);

        //Élements fixes du décor
        var biblio = new Phaser.Physics.Box2D.Body(this.game, null, 915, 400, 100);
        biblio.setPolygon([-40, -120, -40, 200, 80, 200, 80, -120 ]);

        var etagere1 = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
        etagere1.setRectangle(45, 10, 0, 0, 0);

        var etagere2 = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
        etagere2.setRectangle(45, 10, 0, 130, 0);

        var ventilo = new Phaser.Physics.Box2D.Body(this.game, null, 320, 250, 100);
        ventilo.setRectangle(183, 5, 176, -72, 0);

        /*var bordure = new Phaser.Physics.Box2D.Body(this.game, null, 315, 250, 100);
         bordure.setRectangle(90, 50, 0, 0, 0);*/


        //Boîtes de tri

        var boxPokemon = game.add.sprite(550, 610, 'boxPokemon');
        game.physics.box2d.enable(boxPokemon);
        boxPokemon.body.fixedRotation = true;
        boxPokemon.body.static = true;
        tabBox.push(boxPokemon);

        var boxSouthPark = game.add.sprite(220, 610, 'boxSouthPark');
        game.physics.box2d.enable(boxSouthPark);
        boxSouthPark.body.fixedRotation = true;
        boxSouthPark.body.static = true;
        tabBox.push(boxSouthPark);



        tabBox.forEach(function(value) {

            value.visible = false;
            game.time.events.add(0, this.showPicture, this, value,tabBox,0);

        });


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

        //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        // Set up handlers for mouse events
        game.input.onDown.add(mouseDragStart, this);
        game.input.addMoveCallback(mouseDragMove, this);
        game.input.onUp.add(mouseDragEnd, this);

    },

    mouseDragStart: function() {

        game.physics.box2d.mouseDragStart(game.input.mousePointer);
        mouseDown=true;
    },

    mouseDragMove: function() {

        game.physics.box2d.mouseDragMove(game.input.mousePointer);

    },

    mouseDragEnd: function() {

        game.physics.box2d.mouseDragEnd();

        mouseDown=false;
    },

    boxCallback: function(body1, body2, fixture1, fixture2, begin) {

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




    },

    inTheBox: function(item) {
        item.text = "South Park : " + south + " Pokemon : "+poke;

    },


    showPicture: function(box, tabBox,index) {


        console.log(tabBox[index].key);
        tabBox[index].x=100;
        console.log(tabBox[index].x);
        tabBox[index].visible = false;


        index++;
        if(index==tabBox.length){
            index=0;
        }
        tabBox[index].visible =true;
        game.time.events.add(2000, this.showPicture, this, box, tabBox,index);

    },



    gofull: function() {

        if (game.scale.isFullScreen)
        {
            game.scale.stopFullScreen();
        }
        else
        {
            game.scale.startFullScreen(true);
        }

    },

    render: function() {

        game.debug.box2dWorld();

    }
}