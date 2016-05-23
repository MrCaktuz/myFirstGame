/* My first game
 *
 * /sim.js - sim main class
 *
 * coded by Mucht
 */

( function() {

    "use strict";

    var Simon;

    // Game Manager

    Simon = function( oApp ) {
        var game = this,
            timeOut,
            timeStep = 0,
            gameStarted = true,
            aDefaultPattern = [ "one", "three", "two", "four" ],
            aGamePattern = [ "one", "three", "two", "four" ],
            nTimeLapsArrayPattern = 500,
            nTimeLapsColor = 50,
            sPatternValue,
            aMyPattern = [];

        this.app = oApp;

        this.time = {
            "start": null,
            "currentColor": null,
            "current": null
        };

        this.app.getClickPosition = function() {
            game.app.canvas.addEventListener( "click", game.app.registerMyPattern.bind( this ) );
        };

        this.app.registerMyPattern = function( oEvent ) {
            this.clickPosition = {
                "x": oEvent.offsetX,
                "y": oEvent.offsetY
            };
            // console.log(this.clickPosition);

            if ( this.clickPosition.x > 50 && this.clickPosition.x < 225 && this.clickPosition.y > 50 && this.clickPosition.y < 225 ) {
                aMyPattern.push( "yellow" );
                // console.log("yellow click !");

            } else if ( this.clickPosition.x > 275 && this.clickPosition.x < 450 && this.clickPosition.y > 50 && this.clickPosition.y < 225 ) {
                aMyPattern.push( "blue" );
                // console.log("blue click !");

            } else if ( this.clickPosition.x > 50 && this.clickPosition.x < 225 && this.clickPosition.y > 275 && this.clickPosition.y < 450 ) {
                aMyPattern.push( "red" );
                // console.log("red click !");

            } else {
                aMyPattern.push( "green" );
                // console.log("green click !");
            }
            // console.log(aMyPattern);

        };

        // Draw background function
        this.app.bcg = {
            "draw": function() {
                var oContext = oApp.context;

                oContext.fillStyle = "#CECECE";
                oContext.fillRect( 0, 0, game.app.width, game.app.height );
            }
        };

        // Draw square one function
        this.app.buttonOne = {
            "draw": function( strokeColor ) {
                var oContext = oApp.context;

                oContext.fillStyle = "yellow";
                oContext.strokeStyle = strokeColor;
                oContext.lineWidth = "10";

                oContext.beginPath();
                oContext.moveTo( 225, 50 );
                oContext.lineTo( 225, 225 );
                oContext.lineTo( 50, 225 );
                oContext.arc( 225, 225, 175, Math.PI, Math.PI / -2 + 0.028 );

                oContext.fill();
                oContext.stroke();
            }
        };

        // Draw square two function
        this.app.buttonTwo = {
            "draw": function( strokeColor ) {
                var oContext = oApp.context;

                oContext.fillStyle = "blue";
                oContext.strokeStyle = strokeColor;
                oContext.lineWidth = "10";

                oContext.beginPath();
                oContext.moveTo( 275, 50 );
                oContext.lineTo( 275, 225 );
                oContext.lineTo( 450, 225 );
                oContext.arc( 275, 225, 175, 0, Math.PI / -2 - 0.028, true );

                oContext.fill();
                oContext.stroke();
            }
        };

        // Draw square Three function
        this.app.buttonThree = {
            "draw": function( strokeColor ) {
                var oContext = oApp.context;

                oContext.fillStyle = "green";
                oContext.strokeStyle = strokeColor;
                oContext.lineWidth = "10";

                oContext.beginPath();
                oContext.moveTo( 275, 450 );
                oContext.lineTo( 275, 275 );
                oContext.lineTo( 450, 275 );
                oContext.arc( 275, 275, 175, 2 * Math.PI, 3 * Math.PI / -2 + 0.028 );

                oContext.fill();
                oContext.stroke();
            }
        };

        // Draw square four function
        this.app.buttonFour = {
            "draw": function( strokeColor ) {
                var oContext = oApp.context;

                oContext.fillStyle = "red";
                oContext.strokeStyle = strokeColor;
                oContext.lineWidth = "10";

                oContext.beginPath();
                oContext.moveTo( 225, 450 );
                oContext.lineTo( 225, 275 );
                oContext.lineTo( 50, 275 );
                oContext.arc( 225, 275, 175,  Math.PI, 2 * Math.PI + Math.PI / 2 - 0.028, true );

                oContext.fill();
                oContext.stroke();
            }
        };

        this.app.buttons = [ this.app.buttonOne, this.app.buttonTwo, this.app.buttonThree, this.app.buttonFour ];

// Setup a random pattern
        this.pattern = {
            "add": function() {
                // Random pick a integer between 1 and 4
                var randomNbr = Math.floor((Math.random() * 4) + 1);
                aGamePattern.push( aDefaultPattern[randomNbr-1] ); // prend la valeur dans le tableau par défaut et l'ajoute au game pattern.
            }
        };

// setup the game (draw all)
        this.gameSetup = function() {
            // draw: background
            game.app.bcg.draw();
            // draw button one
            game.app.buttonOne.draw( "#000" );
            // draw button two
            game.app.buttonTwo.draw( "#000" );
            // draw button three
            game.app.buttonThree.draw( "#000" );
            // draw button four
            game.app.buttonFour.draw( "#000" );

        }

// Setup the pattern display
        this.patternDisplay = function() {
            game.time.currentColor = Date.now();
            var timeSpent = game.time.currentColor - game.time.start;
            switch (sPatternValue) {
                case "one":
                    if ( timeSpent > nTimeLapsColor / 2 ) {
                        // console.log("One White");
                        game.app.buttonOne.draw( "#FFF" );
                    } else {
                        // console.log("One Black");
                        game.app.buttonOne.draw( "#000" );
                    }

                    break;
                case "two":
                    if (  timeSpent > nTimeLapsColor / 2 ) {
                        // console.log("Two White");
                        game.app.buttonTwo.draw( "#FFF" );
                    } else {
                        // console.log("Two Black");
                        game.app.buttonTwo.draw( "#000" );
                    }

                    break;
                case "three":
                    if (  timeSpent > nTimeLapsColor / 2 ) {
                        // console.log("Three White");
                        game.app.buttonThree.draw( "#FFF" );
                    } else {
                        // console.log("Three Black");
                        game.app.buttonThree.draw( "#000" );
                    }

                    break;
                case "four":
                    if (  timeSpent > nTimeLapsColor / 2 ) {
                        // console.log("Four White");
                        game.app.buttonFour.draw( "#FFF" );
                    } else {
                        // console.log("Four Black");
                        game.app.buttonFour.draw( "#000" );
                    }

                    break;
                default:
                    console.log( "Error in aGamePattern !" );
            };
        }

// Setup Animation loop
        this.showPattern = function() {

            game.time.current = Date.now();
            this.animationRequestID = window.requestAnimationFrame( this.showPattern.bind( this ) );
            // console.log( aGamePattern[ ( new Date() ).getSeconds() % 4  ] );

            // draw: clear
            this.app.context.clearRect( 0, 0, this.app.width, this.app.height );
            // Draw all
            game.gameSetup();
            sPatternValue = aGamePattern[ timeStep ];
            game.patternDisplay();

            if ( game.time.current - game.time.start > nTimeLapsArrayPattern ) {
                timeStep++;
                game.time.start = Date.now();

                // console.log( aGamePattern[ timeStep ] );
                // console.log( "Current => " + game.time.current );
                // console.log( "Start => " + game.time.start );
                // console.log( "CurrentColor => " + game.time.currentColor );

                if ( timeStep > aGamePattern.length - 1 ) {
                    window.cancelAnimationFrame( this.animationRequestID );
                    this.animationRequestID = null;
                    // draw: clear
                    this.app.context.clearRect( 0, 0, this.app.width, this.app.height );
                    // Draw all
                    game.gameSetup();
                    //timeStep = 0;
                    //console.log("cleaned!");
                    // game.app.gameStarted = false;
                }
                // game.patternDisplay();
            };

            // console.log( game.time.current );
            // console.log( game.time.start );

        };

        // Call the right function if the game started or not.
        if ( !gameStarted ) {
            game.gameSetup();
        } else {
            game.time.start = Date.now();
            game.showPattern();
        }

    }; // end Function Simon

     window.Simon = Simon;

 } )();

// ================= use this later ===============
