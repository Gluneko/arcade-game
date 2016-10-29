// Enemies our player must avoid
var Enemy = function(row,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=202;
    this.y=row*83-23;
    this.speed=speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>505){
        this.x=-101;
    }
    this.x+=this.speed*100*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player=function() {
    this.sprite = 'images/char-boy.png';
    this.x=202;
    this.y=5*83-40;
}

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var rect1=this;
    allEnemies.forEach(function(rect2){
        if (rect1.x + 27 < rect2.x + 101 &&
       rect1.x + 27+56 > rect2.x &&
       rect1.y + 63 < rect2.y +78+ 66 &&
       76 + rect1.y + 63 > rect2.y +66) {
        // collision detected!
        rect1.x=202;
        rect1.y=5*83-40;
        console.log('yeah');
    }
    else{
        // console.log('np');
    }
    // console.log(this.x);
    // console.log(rect2.y);
    });


};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
        if(this.x>=101){
            this.x-=101;// move left
        }
            break;
        case 'right':
        if(this.x<=303){
            this.x+=101;// move right
        }
            break;
        case 'up':
        if(this.y>=126){
            this.y-=83;// move up
        }
            break;
        case 'down':
            if(this.y<=292){
                this.y+=83;// move right
            }
            break;
        default:
            // statements_def
            break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[new Enemy(1,1),new Enemy(2,2),new Enemy(3,1)];
var player=new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
