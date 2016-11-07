/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When the player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available.
 */
var level1 = function() {
    /* Transfer point */
    ctx.drawImage(Resources.get('images/Ramp South.png'), 0, -30);
    for (var col = 1; col < 6; col++) {
        drawWater(col * 101, -30);
    }
    /* First row */
    for (col = 0; col < 6; col++) {
        ctx.drawImage(Resources.get('images/stone-block.png'), col * 101, 33);
    }
    /*Second Row */
    for (col = 0; col < 3; col++) {
        drawWater(col * 101, 125);
    }
    for (col = 3; col < 6; col++) {
        ctx.drawImage(Resources.get('images/Dirt Block.png'), col * 101, 116);
    }
    /*Third Row */
    for (col = 0; col < 6; col++) {
        ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, 199);
    }
    for (col = 3; col < 6; col++) {
        ctx.drawImage(Resources.get('images/Shadow North.png'), col * 101, 283);
    }
    ctx.drawImage(Resources.get('images/Shadow South West.png'), 205, 205);
    /*House*/
    ctx.drawImage(Resources.get('images/Roof North West.png'), 3 * 101, 240);
    ctx.drawImage(Resources.get('images/Roof North.png'), 4 * 101, 240);
    ctx.drawImage(Resources.get('images/Roof North East.png'), 5 * 101, 240);
    ctx.drawImage(Resources.get('images/Wood Block.png'), 3 * 101, 460);
    ctx.drawImage(Resources.get('images/Wood Block.png'), 5 * 101, 460);
    ctx.drawImage(Resources.get('images/Window Tall.png'), 3 * 101, 420);
    ctx.drawImage(Resources.get('images/Door Tall Closed.png'), 4 * 101, 470);
    ctx.drawImage(Resources.get('images/Window Tall.png'), 5 * 101, 420);
    ctx.drawImage(Resources.get('images/Wood Block.png'), 4 * 101, 365);
    ctx.drawImage(Resources.get('images/Roof South West.png'), 3 * 101, 320);
    ctx.drawImage(Resources.get('images/Roof South.png'), 4 * 101, 320);
    ctx.drawImage(Resources.get('images/Roof South East.png'), 5 * 101, 320);

    for (col = 3; col < 6; col++) {
        ctx.drawImage(Resources.get('images/Shadow South.png'), col * 101, 400);
    }
    /*Grass blocks which are near the house*/
    for (col = 0; col < 3; col++) {
        ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, 282);
        ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, 365);
        ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, 448);
    }

    ctx.drawImage(Resources.get('images/Shadow West.png'), 205, 283);
    ctx.drawImage(Resources.get('images/Shadow West.png'), 205, 363);
    ctx.drawImage(Resources.get('images/Shadow West.png'), 205, 444);
    ctx.drawImage(Resources.get('images/Shadow North.png'), 0 * 101, 467);
    ctx.drawImage(Resources.get('images/Shadow North.png'), 2 * 101, 467);
    ctx.drawImage(Resources.get('images/Wall Block.png'), 0 * 101, 465);
    ctx.drawImage(Resources.get('images/Ramp North.png'), 1 * 101, 487);
    ctx.drawImage(Resources.get('images/Wall Block.png'), 2 * 101, 465);

    for (col = 0; col < 6; col++) {
        ctx.drawImage(Resources.get('images/stone-block.png'), col * 101, 572);
    }

    /*Trees*/
    ctx.drawImage(Resources.get('images/Tree Ugly.png'), 0, 175);
    ctx.drawImage(Resources.get('images/Tree Short.png'), 204, 345);

};

var level2 = function() {
    for (col = 0; col < 6; col++) {
        drawWater(col * 101, -30);
    }
    /*First Row */
    for (col = 0; col < 6; col++) {
        ctx.drawImage(Resources.get('images/Dirt Block.png'), col * 101, 33);
    }
    /*Second Row */
    for (col = 0; col < 6; col++) {
        ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, 116);
    }
    ctx.drawImage(Resources.get('images/Rock.png'), 1 * 101, 81);
    ctx.drawImage(Resources.get('images/Rock.png'), 2 * 101, 81);
    /*Third Row */
    for (col = 1; col < 3; col++) {
        drawWater(col * 101, 199);
    }
    ctx.drawImage(Resources.get('images/Wall Block.png'), 3 * 101, 199);

    for (col = 4; col < 6; col++) {
        drawWater(col * 101, 199);
    }
    ctx.drawImage(Resources.get('images/Wall Block.png'), 0, 199);
    /*Fourth Row */
    for (col = 0; col < 2; col++) {
        ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, 282);
    }
    for (col = 3; col < 6; col++) {
        ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, 282);
    }
    drawWater(202, 282);
    /*Fifth Row */
    for (col = 3; col < 6; col++) {
        ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, 365);
    }
    ctx.drawImage(Resources.get('images/Ramp North.png'), 3 * 101, 362);
    for (col = 0; col < 3; col++) {
        drawWater(col * 101, 365);
    }
    /*Sixth Row */
    for (col = 4; col < 6; col++) {
        ctx.drawImage(Resources.get('images/Shadow South.png'), col * 101, 403);
    }
    for (col = 0; col < 6; col++) {
        ctx.drawImage(Resources.get('images/stone-block.png'), col * 101, 448);
    }
    /*Seventh Row */
    for (col = 1; col < 6; col++) {
        drawWater(col * 101, 540);
    }
    ctx.drawImage(Resources.get('images/Ramp South.png'), 0, 521);
};
/**
 * @description If we are drawing water, we will shift the transparency slightly
 */
function drawWater(x, y) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.drawImage(Resources.get('images/water-block.png'), x, y);
    ctx.restore();
}

/* Predefine the variables we'll be using within this scope,
 * create the canvas element, grab the 2D context for that canvas
 * set the canvas elements height/width and add it to the DOM.
 */
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime;

canvas.width = 606;
canvas.height = 650;

var Engine = (function() {
    $("#canvas").append(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required since game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         * in case of game pause, game over or end game no updates will run.
         */
        if (newGame.gameRun === true && !newGame.paused && !newGame.gameOver &&
            !newGame.endGame) {
            update(dt, now);
            render(now);
        }

        //displaying call for help at the beginning of the game
        if (newGame.gameRun === true && newGame.displayMessage === true) {
            textDrawer("Oooops...My little princess is lost!", canvas.width / 2, canvas.height / 2 + 100);
            textDrawer("Help me find her in the forest!", canvas.width / 2, canvas.height / 2 + 140);
        }

        //if the endGame is true runs the end animation
        if (newGame.endGame === true) {
            renderEndGame();
        }

        //after few seconds status changes and end message appears
        if (newGame.finishedGame === true) {
            ctx.globalAlpha = 1;
            textDrawer("YOU MADE IT!", canvas.width / 2, canvas.height / 2);
            textDrawer("Press SPACE to start again!", canvas.width / 2, canvas.height / 2 + 40);
        }
        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        window.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data.
     */
    function update(dt, now) {
        updateEntities(dt);
        checkCollisions(now);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        player.update(dt);
        items.forEach(function(item) {
            item.update();
        });
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
    }

    //Check collisions, if player touches an enemy or an object.
    //If enemy, function call player.colLision which will deduce life or change status
    //to game over.
    function checkCollisions(now) {
        if (player.immortal < now / 1000) {
            allEnemies.forEach(function(enemy) {
                if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
                    player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
                    console.log('yes');
                    player.collision();
                }
            });
        }
        items.forEach(function(item) {
            if (player.x < item.x + item.width && player.x + player.width > item.x &&
                player.y < item.y + item.height && player.y + player.height > item.y) {
                item.status = "picked";
            }
        });
    }
    /* This function initially draws the "game level", it will then call
     * the renderEntities function. This function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        if (player.level === "level1") {
            level1();
        } else if (player.level === "level2") {
            level2();
        }
        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions defined
     * on the enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
        items.forEach(function(item) {
            item.render();
        });
        lifeCounter.render();
    }

    //textDrawer is used to display text messages on canvas
    function textDrawer(text, x, y) {
        ctx.font = "28px Luckiest Guy";
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = "white";
        ctx.fillText(text, x, y);
    }

    //reset is used to display message when game is paused or when it is game over
    function reset() {
        if (!newGame.gameRun && !newGame.finishedGame || newGame.paused === true) {
            textDrawer("Press SPACE to start", canvas.width / 2, canvas.height / 2);
        }

        //game over changes background to greyscale and displayes text
        if (newGame.gameOver === true) {
            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < imgData.data.length; i += 4) {
                var red = imgData.data[i];
                var green = imgData.data[i + 1];
                var blue = imgData.data[i + 2];
                var grey = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
                imgData.data[i] = grey;
                imgData.data[i + 1] = grey;
                imgData.data[i + 2] = grey;
            }
            ctx.putImageData(imgData, 0, 0);
            textDrawer("GAME OVER!", canvas.width / 2, canvas.height / 2);
            textDrawer("Press SPACE to start again!", canvas.width / 2, (canvas.height / 2) + 40);
        }

        window.requestAnimationFrame(reset);
    }

    //initParticles and all functions below are responsible for final animation, when
    //player finishes the game. Below idea comes from blog run by Rachel Smith
    //http://codepen.io/rachsmith/blog/hack-physics-and-javascript-1
    //"A super simple and super fun example - let’s make a particle fountain!"
    //Instead of drawing squares I used Star.png

    initParticles();
    var particles = [];
    var gravity = 0.04;

    function initParticles() {
        for (var i = 0; i < 100; i++) {
            setTimeout(createParticle, 20 * i, i);
        }
    }

    function createParticle() {
        // initial position in middle of canvas
        var x = canvas.width / 2;
        var y = canvas.height / 2 - 150;
        // randomize the vx and vy a little - but we still want them flying 'up' and 'out'
        var vx = -2 + Math.random() * 4;
        var vy = Math.random() * -3;
        // randomize size and opacity a little & pick a color from our color palette
        var opacity = 0.5 + Math.random() * 0.5;
        var p = new Particle(x, y, vx, vy, opacity);
        particles.push(p);
    }

    function Particle(x, y, vx, vy, opacity) {
        function reset() {
            x = canvas.width * 0.5;
            y = canvas.height * 0.5 - 150;
            opacity = 0.5 + Math.random() * 0.5;
            vx = -2 + Math.random() * 4;
            vy = Math.random() * -3;
        }
        this.update = function() {
            // if a particle has faded to nothing we can reset it to the starting position
            if (opacity - 0.005 > 0) opacity -= 0.005;
            else reset();
            // add gravity to vy
            vy += gravity;
            x += vx;
            y += vy;
        };

        this.draw = function() {
            ctx.globalAlpha = opacity;
            ctx.drawImage(Resources.get('images/Heart.png'), x, y);
        };
    }

    function renderEndGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
    }
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/char-boy.png',
        'images/char-princess-girl.png',
        'images/Ramp South.png',
        'images/Ramp East.png',
        'images/Ramp North.png',
        'images/Dirt Block.png',
        'images/Ramp West.png',
        'images/Rock.png',
        'images/Wall Block.png',
        'images/enemy-bug-left.png',
        'images/enemy-bug.png',
        'images/Heart.png',
        'images/Key.png',
        'images/char-boy-carrying.png',
        'images/char-boy-immortal.png',
        'images/Roof North East.png',
        'images/Roof North West.png',
        'images/Roof South East.png',
        'images/Roof South West.png',
        'images/Roof South.png',
        'images/Window Tall.png',
        'images/Door Tall Closed.png',
        'images/Roof North.png',
        'images/Wood Block.png',
        'images/Shadow North.png',
        'images/Shadow West.png',
        'images/Shadow South West.png',
        'images/Tree Short.png',
        'images/Tree Ugly.png',
        'images/Selector.png',
        'images/Selector2.png',
        'images/Shadow South.png',
        'images/Star.png'
    ]);
    Resources.onReady(init);

});

//Jquery controls for displaying canvas
$("#play").click(function() {
    Engine();
    $("#play").hide();
    $("#show").show();
    $(".menu").css("margin-top", 0);
});

//Jquery controls for displaying control buttons
//Including changing adding css so if controls are hidden canvas is in the middle
$("#show").click(function() {
    $(".control").toggle("slow", function() {
        cssChanger();
    });
});

var cssChanger = function() {
    if ($(".control").css("display") !== "none") {
        $(".game").css("float", "left");
        $(".game").css("width", "60%");
    } else if ($(".control").css("display") === "none") {
        $(".game").css("float", "none");
        $(".game").css("width", "100%");
    }
};

$("#ins").click(function() {
    $("#ins-list").slideToggle("slow");
});