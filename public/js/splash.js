/**
 * Created by sami on 06/06/16.
 */
splash.prototype = {

    loadScripts: function () {
    },

    loadBgm: function () {
    },

    loadImages: function () {
    },

    loadFonts: function () {
    },

    // The preload function then will call all of the previously defined functions:
    preload: function () {
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },
}