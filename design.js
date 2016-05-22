( function() {
    "use strict";

    var oApp,
    _isCanvasSupported;

    _isCanvasSupported = function( $canvasElt ) {
        return !!$canvasElt.getContext;
    };

    oApp = {
        "canvas": null,
        "context": null,
        "width": null,
        "height": null
    };

    oApp.setup = function() {

        this.canvas = document.querySelector( "#game" ); // on récupère la balise canvas dans la propriété de l'objet.
        if ( !_isCanvasSupported( this.canvas ) ) {
            return console.error( "Canvas isn't supported!" );
        }
        this.context = this.canvas.getContext( "2d" );

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        oApp.draw();
    };

    oApp.drawBackground = function() {
        var oContext = this.context;

        oContext.fillStyle = "grey";
        oContext.fillRect( 0, 0, this.width, this.height );
    };

    oApp.drawSquareOne = function() {
        var oContext = this.context;

        oContext.fillStyle = "yellow";
        oContext.fillRect( 50, 50, this.width / 2 - 75, this.height / 2 - 75 );

        // this.addEventListener( 'click', function() {
        //     console.log( 'clicked' );
        //     // var oContext = this.context;
        //     // oContext.fillStyle = "purple";
        //     // oContext.fillRect( 50, 50, this.width / 2 - 75, this.height / 2 - 75 );
        // } );
    };

    oApp.drawSquareTwo = function() {
        var oContext = this.context;

        oContext.fillStyle = "blue";
        oContext.fillRect( this.width / 2 + 25, 50, this.width / 2 - 75, this.height / 2 - 75 );
    };

    oApp.drawSquareThree = function() {
        var oContext = this.context;

        oContext.fillStyle = "green";
        oContext.fillRect( this.width / 2 + 25, this.height / 2 + 25, this.width / 2 - 75, this.height / 2 - 75 );
    };

    oApp.drawSquareFour = function() {
        var oContext = this.context;

        oContext.fillStyle = "red";
        oContext.fillRect( 50, this.height / 2 + 25, this.width / 2 - 75, this.height / 2 - 75 );
    };

    oApp.draw = function() {
        this.drawBackground();
        this.drawSquareOne();
        this.drawSquareTwo();
        this.drawSquareThree();
        this.drawSquareFour();
    };

    oApp.setup();

} )();
