/**
 * Created by dimitrimical on 07/05/2016.
 */
var Dragging = new Kiwi.State('Play');

Dragging.preload = function () {
    this.game.stage.height = 250;
    this.addImage('kitchen', 'assets/static/kitchen2.jpg');
    this.addImage('wok', 'assets/static/wok.png');
    this.addImage('ramen', 'assets/static/ramen.png');
    this.addImage('soja', 'assets/static/Soy_sauce.png');
}

Dragging.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Passe ton Master Chef !', this.game.stage.width / 2, 16, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //wallpaper
    this.kitchen = new Kiwi.GameObjects.Sprite(this, this.textures.kitchen, 0, 0);
    this.addChild(this.kitchen);

    //Create the wok. Enable the input component by passing true.
    this.wok = new Kiwi.GameObjects.Sprite(this, this.textures.wok, 400, 300, true);
    this.addChild(this.wok);

    //Create the ramen. Enable the input component by passing true.
    this.ramen = new Kiwi.GameObjects.Sprite(this, this.textures.ramen, 10, 10, true);
    this.addChild(this.ramen);

    //Create the soy-sauce.
    this.soja = new Kiwi.GameObjects.Sprite(this, this.textures.soja, 800, 300, true);
    this.addChild(this.soja);

    /**
     * When you want a sprite to be draggable you have to enable the drag on that element.
     **/
    this.ramen.input.enableDrag();
    /* this.ramen.input.onDragStarted.add( this.startedDrag, this );
     this.ramen.input.onDragStopped.add( this.stoppedDrag, this );*/

    this.soja.input.enableDrag()
    /* this.ramen.input.onDragStarted.add( this.startedDrag, this );
     this.ramen.input.onDragStopped.add( this.stoppedDrag, this );*/


    /**
     * Parameter One - OPTIONAL - Snap the sprite to the center. - Default to false
     * Parameter Two - OPTIONAL - Distance between gridpoints in which the sprite should snap to.
     **/
    //this.soja.input.enableDrag(true, 25);
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