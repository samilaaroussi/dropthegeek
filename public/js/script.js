var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('carton', 'assets/static/carton.png');
    game.load.image('pikachu', 'assets/static/pikachu.png');
    game.load.image('superman', 'assets/static/superman.png');
}

'use strict';
function Menu() {}

Menu.prototype = {
    preload: function() {

    },
    create: function() {
        this.title = this.game.add.sprite(0, 0, 'menu');
    },
    update: function() {
        if(this.game.input.activePointer.justPressed()) {
            this.game.state.start('play');
        }
    }
};

module.exports = Menu;

function create() {

    //  This returns an array of all the image keys in the cache
    var images = game.cache.getKeys(Phaser.Cache.IMAGE);

    var test = game.add.group();

    var tempSprite = test.create(game.world.randomX, game.world.randomY, game.rnd.pick(images));
    tempSprite.inputEnabled = true;
    tempSprite.input.enableDrag(false, true);

    game.physics.enable( tempSprite, Phaser.Physics.ARCADE);

    tempSprite.body.collideWorldBounds = true;
    tempSprite.body.bounce.y = 0.8;

    //  Now let's create some random sprites and enable them all for drag and 'bring to top'
    for (var i = 0; i < 20; i++)
    {


    }

}

function render() {
    game.debug.inputInfo(32, 32);
}