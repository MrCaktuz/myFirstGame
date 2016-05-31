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
            gamePatternStart = 3,
            timeStep         = 0,
            gameStarted      = false,
            gameReady        = false,
            gameStatus       = 0,
            gameScore        = 0,
            aDefaultPattern  = [ "Yellow", "Blue", "Green", "Red" ],
            aGamePattern     = [],
            aMyPattern       = [],
            nTimeLapsArrayPattern = 500,
            nTimeLapsColor   = 50,
            sPatternValue;

        this.app = oApp;

        this.time = {
            "start": null,
            "currentColor": null,
            "current": null
        };

        this.app.setClickListener = function( callback ){

            if( !this.preventSetListener ){
                this.preventSetListener = 1;
                game.app.canvas.addEventListener( "mousedown", game.app.registerMyPattern.bind( this ), false );
                game.app.canvas.addEventListener( "mouseup", function(){

                    game.gameDraw();
                    game.checkMyPattern();

                    if( gameStatus != 0 ){
                        game.gameCheck();
                        return;
                    }
                }, false );
            }
        }


        this.app.registerMyPattern = function( oEvent ) { // ici oEvent = mousedown
            // console.log(oEvent);
            this.clickPosition = {
                "x": oEvent.offsetX,
                "y": oEvent.offsetY
            };
            // console.log(this.clickPosition);

            if ( this.clickPosition.x > 15 && this.clickPosition.x < 90 && this.clickPosition.y > 15 && this.clickPosition.y < 90 ) {
               game.gameInit();
               console.log("play again !");

           } else if ( this.clickPosition.x > 50 && this.clickPosition.x < 225 && this.clickPosition.y > 50 && this.clickPosition.y < 225 ) {
                aMyPattern.push( "Yellow" );
                game.app.buttonOne.draw( "#FFF" );
                console.log("yellow clicked !");

            } else if ( this.clickPosition.x > 275 && this.clickPosition.x < 450 && this.clickPosition.y > 50 && this.clickPosition.y < 225 ) {
                aMyPattern.push( "Blue" );
                game.app.buttonTwo.draw( "#FFF" );
                console.log("blue clicked !");

            } else if ( this.clickPosition.x > 275 && this.clickPosition.x < 450 && this.clickPosition.y > 275 && this.clickPosition.y < 450 ) {
                aMyPattern.push( "Green" );
                game.app.buttonThree.draw( "#FFF" );
                console.log("green clicked !");

            } else if ( this.clickPosition.x > 50 && this.clickPosition.x < 225 && this.clickPosition.y > 275 && this.clickPosition.y < 450 ) {
                aMyPattern.push( "Red" );
                game.app.buttonFour.draw( "#FFF" );
                console.log("red clicked !");
            } else {
                aMyPattern.push( "Fail" );
                console.log("Miss clicked !");
            }
            console.log(aMyPattern);

        };

        // Check here if aMyPattern is the same than aGamePattern
        this.checkMyPattern = function() {
            var nMyPatternLength = aMyPattern.length - 1;

            if ( aGamePattern[ nMyPatternLength ] != aMyPattern[ nMyPatternLength ] ){
                aMyPattern = [];
                gameStatus = -1; // -1 => failed
            } else if (aGamePattern.length == aMyPattern.length) {
                aMyPattern = [];
                gameStatus = 1; // 1 => succeed
                gameScore ++;
            } else {
                gameScore ++;
            }
            console.log("Your current score is : " + gameScore);
        }

        // Draw background function
        this.app.bcg = {
            "draw": function() {
                var oContext = oApp.context;

                oContext.fillStyle = "#CECECE";
                oContext.fillRect( 0, 0, game.app.width, game.app.height );
            }
        };

        // draw the image for the play again button.
        this.app.drawImage = function() {
            var oImage = new Image(),
                oContext = this.context;

            oImage.addEventListener( "load", function() {
                oContext.drawImage( this, 15, 15 );
            } );

            oImage.src = "./resources/again.png";
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

        // Draw starting screen
        this.app.startScreen = {
            "draw": function() {
                var oContext = oApp.context;

                oContext.fillStyle = "rgba( 255, 255, 255, 0.95 )";
                oContext.fillRect( 0, 0, game.app.width, game.app.height );
                oContext.fillStyle = "#000";
                oContext.font = "100 24px Helvetica, Sans-serif";
                oContext.fillText( "Click to start the game Bro !", 110, 260 );
            }
        }

        // Draw game over screen
        this.app.overScreen = {
            "draw": function() {
                var oContext = oApp.context;

                oContext.fillStyle = "rgba( 255, 255, 255, 0.95 )";
                oContext.fillRect( 0, 0, game.app.width, game.app.height );
                oContext.fillStyle = "#000";
                oContext.font = "100 24px Helvetica, Sans-serif";
                oContext.fillText( "Click the button to play again !", 115, 60 );
                oContext.font = "100 50px Helvetica, Sans-serif";
                oContext.fillText( "Game Over!", 120, 230 );
                oContext.fillText( "Your Score : " + gameScore, 90, 305 );
            }
        }

        // Setup a random pattern
        this.gamePattern = {
            "init": function( patternLength ) {
                for (var i = 0; i < patternLength; i++) {
                    game.gamePattern.add();
                }
            },
            "add": function() {
                // Random pick a integer between 1 and 4
                var randomNbr = Math.floor((Math.random() * 4) + 1);
                aGamePattern.push( aDefaultPattern[randomNbr-1] ); // prend la valeur dans le tableau par défaut et l'ajoute au game pattern.
            }
        };

        // setup the game (draw all)
        this.gameDraw = function() {
            // draw: background
            game.app.bcg.draw();
            // draw : replay button
            game.app.drawImage();
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
                case "Yellow":
                    if ( timeSpent > nTimeLapsColor / 2 ) {
                        // console.log("One White");
                        game.app.buttonOne.draw( "#FFF" );
                    } else {
                        // console.log("One Black");
                        game.app.buttonOne.draw( "#000" );
                    }

                    break;
                case "Blue":
                    if (  timeSpent > nTimeLapsColor / 2 ) {
                        // console.log("Two White");
                        game.app.buttonTwo.draw( "#FFF" );
                    } else {
                        // console.log("Two Black");
                        game.app.buttonTwo.draw( "#000" );
                    }

                    break;
                case "Green":
                    if (  timeSpent > nTimeLapsColor / 2 ) {
                        // console.log("Three White");
                        game.app.buttonThree.draw( "#FFF" );
                    } else {
                        // console.log("Three Black");
                        game.app.buttonThree.draw( "#000" );
                    }

                    break;
                case "Red":
                    if (  timeSpent > nTimeLapsColor / 2 ) {
                        // console.log("Four White");
                        game.app.buttonFour.draw( "#FFF" );
                    } else {
                        // console.log("Four Black");
                        game.app.buttonFour.draw( "#000" );
                    }

                    break;
                default:
                    // console.log( "Error in aGamePattern ! " + sPatternValue);
            };
        }

        // Setup Animation loop
        this.showPattern = function(callback) {

            this.animationRequestID = window.requestAnimationFrame( this.showPattern.bind( this ) );
            game.time.current = Date.now();

            this.app.context.clearRect( 0, 0, this.app.width, this.app.height ); // draw: clear
            game.gameDraw(); // Draw all

            sPatternValue = aGamePattern[ timeStep ];
            game.patternDisplay();

            if ( game.time.current - game.time.start > nTimeLapsArrayPattern) {

                timeStep++;
                game.time.start = Date.now();

                if ( timeStep > aGamePattern.length - 1 ) {
                    window.cancelAnimationFrame( this.animationRequestID ); // J'arrête l'animation ici pour pouvoir reproduire le pattern moi meme.
                    this.app.context.clearRect( 0, 0, this.app.width, this.app.height ); // draw: clear
                    game.gameDraw(); // Draw all
                }
            }
        };

        this.gamePlay = function() {

            timeStep = 0;
            gameStatus = 0
            // get a starting pattern
            game.time.start = Date.now();
            game.showPattern();
            console.log("Pattern to repeat : " + aGamePattern);
            // console.log(gameStatus);

        }

        this.gameCheck = function(){

            if(gameStatus == 1){
                game.gamePattern.add();
                game.gamePlay();
            } else {
                window.cancelAnimationFrame( this.animationRequestID );
                game.gameOver();
            }

        }

        // over game function
        this.gameOver = function() {
            game.app.overScreen.draw();
            gameStatus = -1;
            gameScore = 0;
        }

        // main game function (call all the others)
        this.gameInit = function() {
            aGamePattern = [];
            game.gameDraw();
            game.gamePattern.init( gamePatternStart );
            game.app.setClickListener( game.gameCheck() );
            game.gamePlay();
        };

        this.gameInit();
    }; // end Function Simon

     window.Simon = Simon;

 } )();
