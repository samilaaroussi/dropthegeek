//Our custom physics gameobject.
var PhysicsGO = function(state, textureName, x, y, config) {


    Kiwi.GameObjects.StaticImage.call(this, state, state.textures[textureName], x, y);

    this.physics = this.components.add( new Kiwi.Plugins.ChipmunkPhysics.Component( this, config ) );

}

Kiwi.extend( PhysicsGO, Kiwi.GameObjects.StaticImage );


var State = new Kiwi.State('GameState');

//Large Preload to load all of the assets in. Would definately be better to use a texture atlas.
State.preload = function() {

    this.addImage('room', 'assets/static/room.png');
    this.addImage('pikachu', 'assets/static/pikachu.png');
    this.addImage('superman', 'assets/static/superman.png');
    this.addImage('bloc', 'assets/static/bloc.png');
    this.addImage('carton', 'assets/static/carton.png');
}


State.create = function() {

    this.room = new Kiwi.GameObjects.Sprite(this, this.textures.room, 0, 0);
    this.addChild( this.room );

    this.toggleDebug();

    //Create the kiwi 
    this.createKiwi();



    //TODO: Sexier way to add?
    this.space = this.game.chipmunk.space;


    this.floor =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
        body: this.space.staticBody,
        start: {
            x: 0,
            y: this.game.stage.height
        },
        end: {
            x: this.game.stage.width,
            y: this.game.stage.height
        },
        elasticity: 0.8,
        friction: 1
    });
    this.space.addShape( this.floor );


    this.leftWall =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
        body: this.space.staticBody,
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: this.game.stage.height
        },
        elasticity: 0.8,
        friction: 1
    });
    this.space.addShape( this.leftWall );


    this.rightWall =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
        body: this.space.staticBody,
        start: {
            x: this.game.stage.width,
            y: 0
        },
        end: {
            x: this.game.stage.width,
            y: this.game.stage.height
        },
        elasticity: 0.8,
        friction: 1
    });
    this.space.addShape( this.rightWall )




    var self = this;
    //The box which the user needs to click in to apply gravity
    var clickBox = new Kiwi.Geom.Rectangle(
        100,
        50,
        this.game.stage.width - 150,
        this.game.stage.height - 100);

    //Mouse event to enable gravity when the user releases the mouse within the boundaries of the screen.
    //This event will fire before the 'onUp' event below (due to use setting its priority level higher)
    // So we can then not enable gravity if the user is dragging an item.
    this.game.input.onUp.add( function( x, y ) {

        if( !this.mouseJoint && clickBox.contains(x, y) ) {
            self.space.gravityY = 400;
        }

    }, this, 2 );

    //Add mouse events for press/release. 
    //These control the dragging of shapes.
    this.game.input.onUp.add( this.released, this, 1 );
    this.game.input.onDown.add( this.pressed, this );

    //Variables used to control the dragging of shapes. 
    this.mouseJoint = null;
    this.mousePointVector = { x: 0, y: 0 };

    //We don't want the body we use for the mouse to be affected by gravity,
    // so we will not add it to space.
    this.mouseBody = new Kiwi.Plugins.ChipmunkPhysics.Body( {
        i: Infinity,
        mass: Infinity
    } );
}

//Fired when the mouse is released.
//Updates the mouse vector position and removes the mouseJoint if it exists.
State.released = function(x,y) {
    this.updateMouseVector();
    if( this.mouseJoint ) {
        this.space.removeConstraint(this.mouseJoint);
        this.mouseJoint = null;
    }
};

//Fired when the mouse is pressed.
State.pressed = function(x,y) {
    //Updates the mouse vector position
    this.updateMouseVector();

    //Query space to see if a shape exists at the location of the mouse
    var shape = this.space.pointQueryFirst( this.mousePointVector, -1 );

    //If one does 
    if(shape) {
        //Get the shapes body
        var body = shape.body;

        //Calculate the difference between the mouse position and the bodies centeral point.
        //We will use this for the anchor position of the pivot joint.
        var sp = body.world2Local( this.mousePointVector );

        //Create the pivot joint.
        this.mouseJoint = new Kiwi.Plugins.ChipmunkPhysics.Joints.Pivot({
            bodyA: this.mouseBody,
            bodyB: body,
            anchorB: sp,
            maxForce: 50000
        });
        //Start the simulation.
        this.space.addConstraint( this.mouseJoint );
    }
};

//Updates the mouse point vector to the position of the mouse
State.updateMouseVector = function() {
    this.mousePointVector.x = this.game.input.mouse.cursor.point.x;
    this.mousePointVector.y = this.game.input.mouse.cursor.point.y;
};


//Executed each frame.
State.update = function() {
    Kiwi.State.prototype.update.call( this );

    //Update mouse vector
    this.updateMouseVector();

    //Set the bodies position to the mouse point vector
    this.mouseBody.x = this.mousePointVector.x;
    this.mouseBody.y = this.mousePointVector.y;

};


//Create the kiwijs gameobjects. 
State.createKiwi = function() {

    // Note: With Polygons you have to make sure that they are convex not concave.
    // Also whilst creating make sure to create them in an anti-clockwise direction

    var x = 390;
    var y = 270;

    //Kiwi JS
    this.createObj('pikachu', x, y, {
        type: 'poly',
        body: {
            verts: [20, -20, -20, -20, -20, 24, 20, 24]
        }
    });
    this.createObj('superman', x + 44, y, {
        type: 'poly',
        body: {
            verts: [5, -20, -5, -20, -5, 24, 5, 24]
        }
    });
    this.createObj('bloc', x + 63, y, {
        type: 'poly',
        body: {
            verts: [28, -20, -28, -20, -18, 24, 18, 24]
        }
    });
    this.createObj('carton', x + 122, y, {
        type: 'poly',
        body: {
            verts: [5, -20, -5, -20, -5, 24, 5, 24]
        }
    });


}

// Handles the needed steps to create a singular physics gameobject 
// and attach it to the game.
State.createObj = function(texture, x, y, config) {

    config.shape = config.shape || {};

    //Set the elasticity of the objects
    config.shape.elasticity = 0.8;
    config.shape.friction = 0.5;


    var obj = new PhysicsGO(this, texture, x, y, config);
    this.addChild(obj);
}

//Handles toggling the debug overlay on top of the game.
State.toggleDebug = function() {

    //Initialise the physics debugger
    this.game.chipmunkDebug.init();

    //Hide the debug canvas by default
    this.game.stage.toggleDebugCanvas();

    //Create a hud button and add it.
    var button = new Kiwi.HUD.Widget.Button( this.game, 'Toggle Debug', 5, 5 );
    button.class = 'toggle-debug';
    this.game.huds.defaultHUD.addWidget( button );

    //When pressed execute the toggleDebugCanvas method on the stage.
    button.input.onUp.add( this.game.stage.toggleDebugCanvas, this.game.stage );

};


var gameoptions = {
    width: 720,
    height: 480,
    plugins: ['ChipmunkPhysics', 'ChipmunkPhysicsDebug']
};


var game = new Kiwi.Game('GameContainer', 'KiwimunkPhysics', State, gameoptions);