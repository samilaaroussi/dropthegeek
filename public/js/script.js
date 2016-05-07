/**
 * Created by dimitrimical on 07/05/2016.
 */
var Dragging = new Kiwi.State('Dragging');

Dragging.preload = function () {
    this.game.stage.height = 350;
    this.addImage('ramen', 'assets/static/ramen.png');
    this.addImage('soja', 'assets/static/Soy_sauce.png');
}

Dragging.create = function () {
    //Text
    var text = new Kiwi.GameObjects.Textfield(this, 'Passe ton Master Chef !', this.game.stage.width / 2, 10, '#000', 12);
    text.textAlign = 'center';
    this.addChild(text);

    //Create the ramen. Enable the input component by passing true.
    this.ramen = new Kiwi.GameObjects.Sprite(this, this.textures.ramen, 10, 10, true);
    this.addChild(this.ramen);

    //Create the soy-sauce.
    this.soja = new Kiwi.GameObjects.Sprite(this, this.textures.soja, 400, 120, true);
    this.addChild(this.soja);

    /**
     * When you want a sprite to be draggable you have to enable the drag on that element.
     **/
    this.ramen.input.enableDrag();

    /**
     * Parameter One - OPTIONAL - Snap the sprite to the center. - Default to false
     * Parameter Two - OPTIONAL - Distance between gridpoints in which the sprite should snap to.
     **/
    //this.soja.input.enableDrag(true, 25);
    this.soja.input.enableDrag();
}


//Create's a new Kiwi.Game.
/*
 * Param One - DOMID - String - ID of a DOMElement that the game will reside in.
 * Param Two - GameName - String - Name that the game will be given.
 * Param Three - State - Object - The state that is to be loaded by default.
 * Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
 */
if (typeof  gameOptions == "undefined")  gameOptions = {};

var game = new Kiwi.Game('GameContainer', 'KiwiExample', Dragging, gameOptions);