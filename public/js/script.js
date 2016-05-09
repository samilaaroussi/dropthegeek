/**
 * Created by dimitrimical on 07/05/2016.
 */
var Dragging = new Kiwi.State('Play');

Dragging.preload = function () {
    this.game.stage.height = 480;
    this.addImage('room', 'assets/static/room.png');
    this.addImage('pikachu', 'assets/static/pikachu.png');
    this.addImage('superman', 'assets/static/superman.png');
    this.addImage('bloc', 'assets/static/bloc.png');
}

Dragging.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Passe ton Master Chef !', this.game.stage.width / 2, 16, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Background
    this.room = new Kiwi.GameObjects.Sprite(this, this.textures.room, 0, 0);
    this.addChild(this.room);

    //Create the pikachu. Enable the input component by passing true.
    this.pikachu = new Kiwi.GameObjects.Sprite(this, this.textures.pikachu, 660, 162, true);
    this.addChild(this.pikachu);

    //Create the superman. Enable the input component by passing true.
    this.superman = new Kiwi.GameObjects.Sprite(this, this.textures.superman, 10, 10, true);
    this.addChild(this.superman);

    //Create a Mario Bros block
    this.bloc = new Kiwi.GameObjects.Sprite(this, this.textures.bloc, 400, 300, true);
    this.addChild(this.bloc);

    /**
     * When you want a sprite to be draggable you have to enable the drag on that element.
     **/

    this.pikachu.input.enableDrag();
    /* this.superman.input.onDragStarted.add( this.startedDrag, this );
     this.superman.input.onDragStopped.add( this.stoppedDrag, this );*/

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
    width: 1024,
    height: 643
}
if (typeof  gameOptions == "undefined")  gameOptions = {};


var game = new Kiwi.Game('GameContainer', 'KiwiExample', Dragging, gameOptions);