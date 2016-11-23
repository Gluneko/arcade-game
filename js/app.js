/* global ctx */
/**
 * @description Add obsticales and limit area where cannot go
 * @constructor
 * @param {number} left - The left boundary of the block
 * @param {number} right - The right boundary of the block
 * @param {number} up - The upper boundary of the block
 * @param {number} down - The lower boundary of the block
 */
function Block(left, right, up, down) {
    //Below is to make assigning of blocks easier.
    //If "undefined" is passed, the prototype value will be added.
    this.left = left || -1000;
    this.right = right || 1000;
    this.up = up || -1000;
    this.down = down || 1000;
}

function Levelblocks() {
    this.blocks = [];
}

Levelblocks.prototype.addBlock = function(left, right, up, down) {
    this.blocks.push(new Block(left, right, up, down));
};

var level1Blocks = new Levelblocks();

//left of the map
level1Blocks.addBlock(undefined, -15, undefined, undefined);

//right of the map
level1Blocks.addBlock(540, undefined, undefined, undefined);

//top of the map
level1Blocks.addBlock(undefined, undefined, undefined, -40);

//bottom of the map
level1Blocks.addBlock(undefined, undefined, 545, undefined);

//house
level1Blocks.addBlock(237, undefined, 230, 504);

//left wall
level1Blocks.addBlock(undefined, 80, 410, 504);

//right wall and a tree
level1Blocks.addBlock(145, undefined, 318, 504);

//another tree
level1Blocks.addBlock(undefined, 65, 142, 226);

//river south
level1Blocks.addBlock(undefined, 274, 60, 142);

//river north
level1Blocks.addBlock(43, undefined, undefined, -23);


var level2Blocks = new Levelblocks();

//left
level2Blocks.addBlock(undefined, -15, undefined, undefined);

//right
level2Blocks.addBlock(540, undefined, undefined, undefined);

//top
level2Blocks.addBlock(undefined, undefined, undefined, -23);

//bottom
level2Blocks.addBlock(undefined, undefined, 545, undefined);

//river south
level2Blocks.addBlock(40, undefined, 475, undefined);

//river middle south
level2Blocks.addBlock(undefined, 275, 310, 392);

//ramp south
level2Blocks.addBlock(350, 370, 353, 392);

//stone bridge south
level2Blocks.addBlock(370, undefined, 398, 390);

//river middle
level2Blocks.addBlock(150, 270, 230, 310);

//river middle north and rock
level2Blocks.addBlock(52, 270, 65, 225);

//river middle east
level2Blocks.addBlock(352, undefined, 148, 225);

/**
 * @description Reponsible of keeping track of game progress and status
 * @constructor
 */
var Game = function() {
    this.gameRun = false;
    this.paused = false;
    this.gameOver = false;
    this.endGame = false;
    this.finishedGame = false;
    this.displayMessage = true;
};

/**
 * @description Being called whenever game should be start from the beginning.
 */
Game.prototype.gameReset = function() {
    player.reset();
    stars.forEach(function(star) {
        star.status = 'onground';
        star.renderStatus = 'yes';
    });
    selectors.forEach(function(selector) {
        selector.status = 'onground';
        selector.renderStatus = 'yes';
    });
    princess.status = 'onground';
    princess.renderStatus = 'yes';
};

/**
 * @description React space click button - restarting game, pausing
 */
Game.prototype.handleInput = function(key) {
    if (key === 'spacebar' && this.gameRun === false) {
        this.gameRun = true;
        this.endGame = false;
        this.finishedGame = false;
        this.displayMessage = true;
        startMessageTime();
        this.gameReset();
    } else if (key === 'spacebar' && this.paused === true) {
        this.paused = false;
    } else if (key === 'spacebar' && this.paused === false && !this.gameOver) {
        this.paused = true;
    } else if (key === 'spacebar' && this.gameOver === true) {
        this.gameOver = false;
        this.gameReset();
    }
};

/**
 * @description Timeout function called only on beginning of game (or after complition)
 * to display "call for help" in rescuing the princess
 */
var startMessageTime = function() {
    setTimeout(messageStart, 3000);
};

var messageStart = function() {
    newGame.displayMessage = false;
};

/**
 * @description Superclass of all the following classes
 * @constructor
 */
var Character = function(x, y, sprite, width, height, status, renderStatus) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.width = width;
    this.height = height;
    this.status = status;
    this.renderStatus = renderStatus;
};

Character.prototype.update = function() {
    this.checkStatus();
};

Character.prototype.render = function() {
    if (this.renderStatus === 'yes') {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Character.prototype.checkStatus = function() {

};

/**
 * @description Star object can be collected and adds to the lifecount so player can be survive
 * touching the enemy
 * @constructor
 */
var Star = function(x, y) {
    Character.call(this, x, y, 'images/Star.png', 40, 40, 'onground', 'yes');
};

// Subclass of character uses inheritance
Star.prototype = Object.create(Character.prototype);
Star.prototype.constructor = Star;

/**
 * @description Checks if star was picked, if yes it adds one to lifeCount
 * and prevent further display of object
 */
Star.prototype.checkStatus = function() {
    if (this.status === 'picked' && this.renderStatus === 'yes') {
        player.lifeCount += 1;
        this.renderStatus = 'no';
    }
};

/**
 * @description Appears on top of screen and shows how many lives player has for use
 * @constructor
 */
var LifeCounter = function(x, y) {
    Character.call(this, x, y, 'images/Heart.png');
};

LifeCounter.prototype = Object.create(Character.prototype);
LifeCounter.prototype.constructor = LifeCounter;

LifeCounter.prototype.render = function() {
    ctx.font = '50px Luckiest Guy';
    ctx.fillStyle = 'white';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillText(player.lifeCount, this.x + 110, this.y + 130);
    ctx.strokeText(player.lifeCount, this.x + 110, this.y + 130);
};

/**
 * @description The npc which player is looking for, it can be picked and carried.
 * However it will be dropped on collision with enemy even if player has lives left
 * @constructor
 */
var Princess = function(x, y) {
    Character.call(this, x, y, 'images/char-princess-girl.png', 20, 50, 'onground', 'yes');
};

Princess.prototype = Object.create(Character.prototype);
Princess.prototype.constructor = Princess;

Princess.prototype.checkStatus = function() {
    if (this.status === 'picked') {
        player.rescueStatus = 1;
        this.renderStatus = 'no';
    } else if (this.status === 'onground') {
        player.rescueStatus = 0;
        this.renderStatus = 'yes';
    }
};

/**
 * @description Transfer points showing the way for the player, each selector has unique
 * events therefore their checkStatus functions are not defined in prototype
 * @constructor
 */
var Selector = function(x, y) {
    Character.call(this, x, y, 'images/Selector.png', 80, 50, 'onground', 'yes');
};

Selector.prototype = Object.create(Character.prototype);
Selector.prototype.constructor = Selector;

//Object selectors being created now, so unique checkStatus can be assigned.
var level1Selector = new Selector(0, -70);
var level1Selector2 = new Selector(101, 475);
var level2Selector = new Selector(0, 470);

/**
 * @description level1Selector shows at the beginning and once touched changes level1 to level2
 * it will appear again only if player drops the princess in level 1 so it possible
 * to return to level2
 */
level1Selector.checkStatus = function() {
    if (this.status === 'picked' && this.renderStatus === 'yes') {
        player.level = 'level2';
        player.x = 0;
        player.y = 500;
        this.renderStatus = 'no';
    } else if (player.rescueStatus === 0 && player.level === 'level1') {
        this.renderStatus = 'yes';
        this.status = 'onground';
    }
};

/**
 * @description level1Selector2 shows when player comes back to level1 with the princess
 * Once player gets to it, endGame is being changed to true, which starts
 * animation + endMessageTime is being called which after 5 sec. Displaying
 * end message and stops animation after 15 sec
 */
level1Selector2.checkStatus = function() {
    if (player.rescueStatus === 1) {
        this.renderStatus = 'yes';
        if (this.status === 'picked') {
            newGame.endGame = true;
            endMessageTime();
        }
    } else if (player.rescueStatus === 0) {
        this.renderStatus = 'no';
        this.status = 'onground';
    }
};

/**
 * @description level2Selector shows in level2 when player picks up the princess,
 * once player gets to it, the level2 will change to level1.
 */
level2Selector.checkStatus = function() {
    if (player.rescueStatus === 0) {
        this.renderStatus = 'no';
        this.status = 'onground';
    } else if (player.rescueStatus === 1 && player.level === 'level2') {
        this.renderStatus = 'yes';
        if (this.status === 'picked') {
            player.level = 'level1';
            player.x = 0;
            player.y = -30;
            this.renderStatus = 'no';
        }
    }
};

var endMessageTime = function() {
    setTimeout(function() {
        newGame.endGame = false;
        newGame.finishedGame = true;
        newGame.gameRun = false;
    }, 15000);
};

/**
 * @description Enemies our player must avoid
 * @constructor
 * @param {number} x1 - The left boundary of the bug moving
 * @param {number} x2 - The right boundary of the bug moving
 * @param {number} y - The y position of the bug
 * @param {number} rate - The speed of the bug moving
 */
var Enemy = function(x1, x2, y, rate) {
    Character.call(this, x1 + 20, y, 'images/enemy-bug.png', 70, 30);
    this.rate = rate;
    this.direction = 'right';
    this.x1 = x1;
    this.x2 = x2;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * @description Update the enemy's position, required method for game
 * @param {number} dt - A time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    this.location();
    this.picUpdate();
    this.move(dt);
};

/**
 * @description Checks if the object got to the end of it's path limited by
 * x1 or x2 and then changes its direction
 */
Enemy.prototype.location = function(argument) {
    if (this.x > this.x2) {
        this.direction = 'left';
    } else if (this.x - 8 < this.x1) {
        this.direction = 'right';
    }
};

/**
 * @description Image changes based on direction
 */
Enemy.prototype.picUpdate = function() {
    if (this.direction === 'right') {
        this.sprite = 'images/enemy-bug.png';
    } else if (this.direction === 'left') {
        this.sprite = 'images/enemy-bug-left.png';
    }
};

/**
 * @description Base on direction status, enemy moves this way
 */
Enemy.prototype.move = function(dt) {
    if (this.direction === 'left') {
        this.x -= dt * this.rate;
    } else if (this.direction === 'right') {
        this.x += dt * this.rate;
    }
};

/**
 * @description Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Player object storing various game details
 * @constructor
 */
var Player = function() {
    Character.call(this, 505, 505, 'images/char-boy.png', 20, 40);
    this.state = 'stand';
    this.location = 'block1';
    this.lifeCount = 3;
    this.rescueStatus = 0;
    this.immortal = 0;
    this.level = 'level1';
    this.levelBlocks = level1Blocks;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

/**
 * @description Update function called from Engine()
 * @param {number} dt - A time delta between ticks
 */
Player.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.move(dt);
    this.picUpdate();
    this.levelCheck();
};

/**
 * @description Checks on which level player currently is, assigning correct
 * blocks. Additionally assigns list of items and enemies for display.
 * level stores in Player object and changes on touching a selector
 */
Player.prototype.levelCheck = function() {
    if (this.level === 'level1') {
        this.levelBlocks = level1Blocks;
        allEnemies = allEnemies1;
        items = items1;
    } else if (this.level === 'level2') {
        this.levelBlocks = level2Blocks;
        allEnemies = allEnemies2;
        items = items2;
    }
};

/**
 * @description Draw the player on the screen, required method for game
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Based on which key/button was pressed, assigned correct status
 * which will be executed in Player.prototype.move for smooth animation.
 * @param {number} key - the key/button which was pressed
 */
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.state = 'move_left';
            break;
        case 'right':
            this.state = 'move_right';
            break;
        case 'up':
            this.state = 'move_up';
            break;
        case 'down':
            this.state = 'move_down';
            break;
        case 'stand':
            this.state = 'stand';
            break;
    }
};

/**
 * @description As long as status in "move..." player will move in certain location
 * unless position will not within currently assigned blocks.
 * @param {number} dt - A time delta between ticks
 */
Player.prototype.move = function(dt) {
    var x0 = this.x,
        y0 = this.y;
    if (this.state === 'move_left') {
        this.x -= dt * 360;
    }
    if (this.state === 'move_right') {
        this.x += dt * 360;
    }
    if (this.state === 'move_down') {
        this.y += dt * 360;
    }
    if (this.state === 'move_up') {
        this.y -= dt * 360;
    }
    for (var i = 0; i < this.levelBlocks.blocks.length; i++) {
        if (this.x < this.levelBlocks.blocks[i].right && this.x + this.width > this.levelBlocks.blocks[i].left &&
            this.y < this.levelBlocks.blocks[i].down && this.y + this.height > this.levelBlocks.blocks[i].up) {
            this.x = x0;
            this.y = y0;
            break;
        }
    }
};

/**
 * @description Changes picture of the player base on the event
 * when princess is carried or after the touch of the bug - for few seconds player is
 * immortal after the touch and then character is blue.
 */
Player.prototype.picUpdate = function() {
    if (this.immortal > (Date.now() / 1000)) {
        this.sprite = 'images/char-boy-immortal.png';
    } else {
        if (princess.status === 'picked') {
            this.sprite = 'images/char-boy-carrying.png';
        } else if (princess.status === 'onground') {
            this.sprite = 'images/char-boy.png';
        }
    }
};

/**
 * @description Put life count on zero and move player to start location
 */
Player.prototype.reset = function() {
    this.lifeCount = 3;
    this.rescueStatus = 0;
    this.x = 505;
    this.y = 505;
    this.level = 'level1';
};

/**
 * @description Colision check is inside Engine(), this function is being called if
 * collision happened, and it checks if there is life left - if not starts gameOver status
 * which freezes the game.
 */
Player.prototype.collision = function() {
    if (this.lifeCount === 0) {
        newGame.gameOver = true;
    } else if (this.lifeCount > 0) {
        this.immortal = Date.now() / 1000 + 2;
        this.lifeCount -= 1;
        princess.status = 'onground';
        this.rescueStatus = 0;
    }
};

/**
 * @description Keydown addEventListener for moving a player on the map
 * and pressing space for pause/restart game
 */
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        32: 'spacebar',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (e.keyCode === 32) {
        newGame.handleInput(allowedKeys[e.keyCode]);
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
    if (e.keyCode in allowedKeys) {
        e.preventDefault();
    }
});

/**
 * @description Keyup event so player stops once key is no longer pressed.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'stand',
        38: 'stand',
        39: 'stand',
        40: 'stand'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//Jquery controls for on screen control buttons, adjusted also for touch devices.
//once buttons are pressed their css is being changed too
$(document).on('mouseup touchend', '#up, #left, #right, #down', function() {
    player.handleInput('stand');
    $('#up, #left , #right, #down').css('background', '#86d3e3');
});

$(document).on('mousedown touchstart', '#up', function() {
    player.handleInput('up');
    $('#up').css('background', '#acd7e0');
});

$(document).on('mousedown touchstart', '#left', function() {
    player.handleInput('left');
    $('#left').css('background', '#acd7e0');
});

$(document).on('mousedown touchstart', '#right', function() {
    player.handleInput('right');
    $('#right').css('background', '#acd7e0');
});

$(document).on('mousedown touchstart', '#down', function() {
    player.handleInput('down');
    $('#down').css('background', '#acd7e0');
});

$('#space').click(function() {
    newGame.handleInput('spacebar');
});

//Creating enemies for level1
var enemy11 = new Enemy(-10, 140, 345, 100);
var enemy12 = new Enemy(65, 515, 175, 120);
var enemy13 = new Enemy(91, 515, 13, 140);

//Creating enemies for level2
var enemy21 = new Enemy(-10, 515, 428, 140);
var enemy22 = new Enemy(293, 515, 262, 160);
var enemy23 = new Enemy(-10, 515, 13, 180);

//Enemies being grouped in two list so they can changed, base on the level
var allEnemies2 = [enemy21, enemy22, enemy23];
var allEnemies1 = [enemy11, enemy12, enemy13];
var allEnemies = [];

//Other items
var star2 = new Star(505, 355);
var star1 = new Star(505, 100);
var princess = new Princess(101, 250);
var player = new Player();

//Items being grouped in list for game resart
var stars = [star2, star1];
var selectors = [level1Selector, level1Selector2, level2Selector];

//Items being grouped for level changes
var items2 = [star2, princess, level2Selector];
var items1 = [star1, level1Selector, level1Selector2];
var items = [];

var lifeCounter = new LifeCounter(470, -60);

var newGame = new Game();