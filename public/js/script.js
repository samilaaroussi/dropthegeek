/**
 * Created by dimitrimical on 07/05/2016.
 */
var Dragging = new Kiwi.State('Play');

//pour charger toutes les sprites
Dragging.preload = function () {
    this.game.chipmunkDebug.init();
    this.game.stage.resize(720, 480);
    // Initalises the debug overlay
    this.game.chipmunk.defaultSpace.gravityX = 100;
    this.game.chipmunk.defaultSpace.gravityY = 100;
    this.addImage('room', 'assets/static/room.png');
    this.addImage('pikachu', 'assets/static/pikachu.png');
    this.addImage('superman', 'assets/static/superman.png');
    this.addImage('bloc', 'assets/static/bloc.png');
    this.addImage('carton', 'assets/static/carton.png');
}

//création et placement de tous les sprites
Dragging.create = function () {

    // Create a new Kiwi.Group.
    this.oeuvres = new Kiwi.Group( this );
    // Create a new Kiwi.Group.
    this.menugroup = new Kiwi.Group( this );

    // Add the group to the state.
    this.addChild( this.oeuvres );

    //Background
    this.room = new Kiwi.GameObjects.Sprite(this, this.textures.room, 0, 0);
    this.oeuvres.addChild( this.room );

    //Create a Cardboard
    this.carton = new Kiwi.GameObjects.Sprite(this, this.textures.carton, 240, 375, true);
    this.addChild(this.carton);
    this.oeuvres.addChild( this.carton);


    //Create the pikachu. Enable the input component by passing true.
    this.pikachu = new Kiwi.GameObjects.Sprite(this, this.textures.pikachu, 660, 162, true);
    this.oeuvres.addChild( this.pikachu );

    //Create the superman. Enable the input component by passing true.
    this.superman = new Kiwi.GameObjects.Sprite(this, this.textures.superman, 10, 14, true);
    this.oeuvres.addChild( this.superman );

    //Create a Mario Bros block
    this.bloc = new Kiwi.GameObjects.Sprite(this, this.textures.bloc, 400, 300, true);
    this.oeuvres.addChild( this.bloc );

    this.oeuvres.visible = true;

    /*this.menuWidth = 100;

    // Adds a menu widget to the defaultHUD of the game.
    this.myButton1 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Jouer', this.menuWidth, 0 );
    this.myButton1.style.color = 'white';
    this.myButton1.style.display = 'block';
    this.myButton1.style.boxSizing = 'border-box';
    this.myButton1.style.width = (this.menuWidth * 2).toString() + 'px';
    this.myButton1.style.textAlign = 'center';
    this.myButton1.style.cursor = 'pointer';
    this.myButton1.style.padding = '0.5em 1em';
    this.myButton1.style.backgroundColor = '#9c0';

    this.myButton2 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Mon profil', this.menuWidth, 50 );
    this.myButton2.style.color = 'white';
    this.myButton2.style.display = 'block';
    this.myButton2.style.boxSizing = 'border-box';
    this.myButton2.style.width = (this.menuWidth * 2).toString() + 'px';
    this.myButton2.style.textAlign = 'center';
    this.myButton2.style.cursor = 'pointer';
    this.myButton2.style.padding = '0.5em 1em';
    this.myButton2.style.backgroundColor = '#c09';

    this.myButton3 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Center', this.menuWidth, 100 );
    this.myButton3.style.color = 'white';
    this.myButton3.style.display = 'block';
    this.myButton3.style.boxSizing = 'border-box';
    this.myButton3.style.width = (this.menuWidth * 2).toString() + 'px';
    this.myButton3.style.textAlign = 'center';
    this.myButton3.style.cursor = 'pointer';
    this.myButton3.style.padding = '0.5em 1em';
    this.myButton3.style.backgroundColor = '#09c';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, 240, 150 );
    this.menu.addMenuItem( this.myButton1 );
    this.menu.addMenuItem( this.myButton2 );
    this.menu.addMenuItem( this.myButton3 );
    this.game.huds.defaultHUD.addWidget( this.menu );

    this.menu.getMenuItem(0).input.onDown.add( this.leftButton, this );
    this.menu.getMenuItem(1).input.onDown.add( this.rightButton, this );*/


    /**
     * When you want a sprite to be draggable you have to enable the drag on that element.
     **/

    this.pikachu.input.enableDrag();
    this.superman.input.onDragStarted.add( this.startedDrag, this );
    this.superman.input.onDragStopped.add( this.stoppedDrag, this );

    this.superman.input.enableDrag();
    /* this.superman.input.onDragStarted.add( this.startedDrag, this );
     this.superman.input.onDragStopped.add( this.stoppedDrag, this );*/

    this.bloc.input.enableDrag()
    /* this.superman.input.onDragStarted.add( this.startedDrag, this );
     this.superman.input.onDragStopped.add( this.stoppedDrag, this );*/


    /**
     * Parameter One - OPTIONAL - Snap the sprite to the center. - Default to false
     * Parameter Two - OPTIONAL - Distance between gridpoints in which the sprite should snap to.
     **/
    //this.bloc.input.enableDrag(true, 25);

}

Dragging.leftButton = function () {
    this.game.menu.hideHUD();
    this.game.huds.defaultHUD.addWidget( this.menu );
    this.oeuvres.visible = !this.oeuvres.visible;
}

Dragging.rightButton = function () {
    this.menu.x += 10;
}

Dragging.startedDrag = function () {
    // this.player.animation.play( 'run' )
    alert("debut du drag");
}

Dragging.stoppedDrag = function () {
    alert("fin du drag");
}

//Create's a new Kiwi.Game.
/*
 * Param One - DOMID - String - ID of a DOMElement that the game will reside in.
 * Param Two - GameName - String - Name that the game will be given.
 * Param Three - State - Object - The state that is to be loaded by default.
 * Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
 */
//Initialise the Kiwi Game.
var gameOptions = {
    renderer: Kiwi.RENDERER_WEBGL,
    width: 720,
    height: 480,
    plugins: ['ChipmunkPhysics', 'ChipmunkPhysicsDebug']

}
if (typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('GameContainer', 'KiwiExample', Dragging, gameOptions);