/**
 * Created by sami on 06/06/16.
 */
var boot = function(game){
    console.log("%cStarting my awesome game", "color:white; background:red");
};

boot.prototype = {
    preload: function(){
        this.game.load.image("loading","assets/loading.jpg");
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.game.state.start("Preload");
    }
}