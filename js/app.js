// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=Math.random()*1010-505;
    this.y=row*83-23;
    this.speed=1+Math.round(Math.random());
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>505){
        this.x=Math.random()*505-1010;
        this.speed=1+Math.round(Math.random());
    }
    this.x+=this.speed*300*dt;
    var rect1=player;
    var rect2=this;
    //dectect collsion between enemy and player
        if (rect1.x + 18 +10< rect2.x + 99 &&
       rect1.x + 18+67 -20> rect2.x &&
       rect1.y + 63 +28< rect2.y +78+ 66 &&
       -28+77 + rect1.y + 63 > rect2.y +78) {
        // collision detected!
        player.reset(false);
    }
    // console.log(this.x);
    // console.log(rect2.y);
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
    this.hpPic=
    this.x=202;
    this.y=5*83-27;
    this.hp=3;
    this.score=0;
}

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.



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
        if(this.y>56){
            this.y-=83;// move up
        }else{
            this.reset(true);// The player reaches the water so move the player back to the initial location
        }
            break;
        case 'down':
            if(this.y<=305){
                this.y+=83;// move right
            }
            break;
        default:
            // statements_def
            break;
    }
}

Player.prototype.reset=function(win){
    if(win){
        this.score+=100;
    }else{
        this.hp-=1;
        if(this.hp==0){
            console.log('you lose');
        }
    }
    this.x=202;
    this.y=5*83-27;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[new Enemy(1),new Enemy(1),new Enemy(2),new Enemy(2),new Enemy(3),new Enemy(3)];
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
