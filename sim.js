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
            aPattern = [ "one", "three", "two", "four", "one" ],
            nTimeLapsArrayPattern = 2000,
            nTimeLapsColor = 1000,
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
                var randomNbr = Math.random();

                if ( randomNbr < 0.25 ) {
                    return aPattern.push("one");
                } else if ( randomNbr > 0.25 && randomNbr < 0.5 ) {
                    return aPattern.push("two");
                } else if ( randomNbr > 0.5 && randomNbr < 0.75 ) {
                    return aPattern.push("three");
                } else {
                    return aPattern.push("four");
                }
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
            switch (sPatternValue) {
                case "one":
                    if (  game.time.currentColor - game.time.start > nTimeLapsColor ) {
                        console.log("One White");
                        // game.app.buttonOne.draw( "#FFF" );
                    }
                    if ( game.time.currentColor - game.time.start > nTimeLapsColor ) {
                        console.log("One Black");
                        // game.app.buttonOne.draw( "#000" );
                    }

                    break;
                case "two":
                    if (  game.time.currentColor - game.time.start > nTimeLapsColor ) {
                        console.log("Two White");
                        // game.app.buttonTwo.draw( "#FFF" );
                    }
                    if ( game.time.currentColor - game.time.start > nTimeLapsColor ) {
                        console.log("Two Black");
                        // game.app.buttonTwo.draw( "#000" );
                    }

                    break;
                case "three":
                    if (  game.time.currentColor - game.time.start > nTimeLapsColor ) {
                        console.log("Three White");
                        // game.app.buttonThree.draw( "#FFF" );
                    }
                    if ( game.time.currentColor - game.time.start > nTimeLapsColor ) {
                        console.log("Three Black");
                        // game.app.buttonThree.draw( "#000" );
                    }

                    break;
                case "four":
                    if (  game.time.currentColor - game.time.start > nTimeLapsColor ) {
                        console.log("Four White");
                        // game.app.buttonFour.draw( "#FFF" );
                    }
                    if ( game.time.currentColor - game.time.start > nTimeLapsColor ) {
                        console.log("Four Black");
                        // game.app.buttonFour.draw( "#000" );
                    }

                    break;
                default:
                    console.log( "Error in aPattern !" );
            };
        }

// Setup Animation loop
        this.showPattern = function() {

            game.time.current = Date.now();
            this.animationRequestID = window.requestAnimationFrame( this.showPattern.bind( this ) );
            // console.log( aPattern[ ( new Date() ).getSeconds() % 4  ] );

            // draw: clear
            this.app.context.clearRect( 0, 0, this.app.width, this.app.height );
            // Draw all
            game.gameSetup();

            if ( game.time.current - game.time.start > nTimeLapsArrayPattern ) {
                sPatternValue = aPattern[ timeStep ];
                console.log( aPattern[ timeStep ] );
                timeStep++;

                game.patternDisplay();
                console.log( "Current => " + game.time.current );
                console.log( "Start => " + game.time.start );
                console.log( "CurrentColor => " + game.time.currentColor );

                if ( timeStep > aPattern.length - 1 ) {
                    window.cancelAnimationFrame( this.animationRequestID );
                    // draw: clear
                    this.app.context.clearRect( 0, 0, this.app.width, this.app.height );
                    // Draw all
                    game.gameSetup();
                    timeStep = 0;
                    console.log("cleaned!");
                }
                // game.patternDisplay();
                game.time.start = Date.now();
            };

            game.app.gameStarted = false;

            return game.app.gameStarted;
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
