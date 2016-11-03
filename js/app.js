var level1Markers={

};
var level2Markers={

};
/* global ctx */
//Blocks (level1Blocks & level2Blocks) add obsticales and limit area where cannot go.
//Below is set of function to make assigning of blocks easier.
//If "undefined" is passed, the prototype value will be added.
//This solution was provided by jad-panda on my question on stackoverflow.com
//http://stackoverflow.com/questions/31154686/objects-within-object-and-assigning-prototype

function Block(left, right, up, down) {
    this.left = left || -1000;
    this.right = right || 1000;
    this.up = up || -1000;
    this.down = down || 1000;
}

function Levelblocks() {
    // this.blocks = {};
    this.blocks = [];
}

Levelblocks.prototype.addBlock = function(left, right, up, down) {
    // var numOfBlocks = Object.keys(this.blocks).length + 1;
    // this.blocks['block' + numOfBlocks] = new Block(left, right, up, down);
    this.blocks.push(new Block(left, right, up, down));
};

var level1Blocks = new Levelblocks();

//left
level1Blocks.addBlock(undefined, -10, undefined, undefined);

//right
level1Blocks.addBlock(535, undefined, undefined, undefined);

//up
level1Blocks.addBlock(undefined, undefined, undefined, -40);

//down
level1Blocks.addBlock(undefined, undefined, 545, undefined);

//house
level1Blocks.addBlock(232, undefined, 230, 504);

//left wall
level1Blocks.addBlock(undefined, 80, 410, 504);

//right wall and a tree
level1Blocks.addBlock(140, undefined, 318, 504);

//another tree
level1Blocks.addBlock(undefined, 65, 142, 226);

//river south
level1Blocks.addBlock(undefined, 380, 60, 142);

//river north
level1Blocks.addBlock(43, undefined, undefined, -23);


var level2Blocks = new Levelblocks();

//left
level2Blocks.addBlock(undefined, -10, undefined, undefined);

//right
level2Blocks.addBlock(535, undefined, undefined, undefined);

//up
level2Blocks.addBlock(undefined, undefined, undefined, -3);

//down
level2Blocks.addBlock(undefined, undefined, 505, undefined);

// //block5
// level2Blocks.addBlock(-10, undefined, 373, 420);

// //block6
// level2Blocks.addBlock(173, 230, undefined, undefined);

// //block7
// level2Blocks.addBlock(-10, 132, undefined, 344);

// //block8
// level2Blocks.addBlock(-10, undefined, 206, undefined);

// //block9
// level2Blocks.addBlock(undefined, 230, undefined, undefined);

// //block10
// level2Blocks.addBlock(173, 230, undefined, undefined);

// //block11
// level2Blocks.addBlock(undefined, 230, undefined, undefined);

// //block12
// level2Blocks.addBlock(-10, undefined, -35, 111);

// //block13
// level2Blocks.addBlock(undefined, undefined, -35, undefined);

// //block14
// level2Blocks.addBlock(undefined, undefined, -35, 20);

// //block15
// level2Blocks.addBlock(undefined, 515, -35, undefined);

// //block16
// level2Blocks.addBlock(465, 515, undefined, undefined);

// //block17
// level2Blocks.addBlock(undefined, 515, undefined, 265);

// //block18
// level2Blocks.addBlock(371, undefined, 206, 265);

//Game object is reponsible of keeping track of game progress and status.
var Game=function() {
    this.gameRun=false;
    this.paused=false;
    this.gameOver=false;
    this.endGame=false;
    this.finishedGame=false;
    this.displayMessage=true;
};

//gameReset being called whenever game should be start from the beginning.
Game.prototype.gameReset = function(){
    player.reset();
    stars.forEach( function(star) {
        star.status="onground";
        star.renderStatus="yes";
    });
    selectors.forEach( function(selector) {
        selector.status="onground";
        selector.renderStatus="yes";
    });
    princess.state="onground";
};

//handleInput for reacting space click button - restarting game, pausing
Game.prototype.handleInput = function(key){
    if(key==="spacebar"&&this.gameRun===false){
        this.gameRun=true;
        this.endGame=false;
        this.finishedGame=false;
        this.displayMessage=true;
        startMessageTime();
        this.gameReset();
    }else if(key==="spacebar"&&this.paused===true){
        this.paused=false;
    }else if(key==="spacebar"&&this.paused===false&&!this.gameOver){
        this.paused=true;
    }else if(key==="spacebar"&&this.gameOver===true){
        this.gameOver=false;
        this.gameReset();
    }
};

//Timeout fuction called only on beginning of game (or after complition)
//to display "call for help" in rescuing the princess
var startMessageTime=function(){
    setTimeout(messageStart,5000);
};

var messageStart=function(){
    newGame.displayMessage=false;
};

//Star object can be collected and adds to the lifecount so player can be survive
//touching the enemy
var Star=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/Star.png';
    this.width=40;
    this.height=40;
    this.status="onground";
    this.renderStatus="yes";
};

Star.prototype.update = function(){
    this.checkStatus();
};

//checkStatus checks if star was picked, if yes it adds one to lifeCount
// and prevent further display of object.
Star.prototype.checkStatus = function(){
    if(this.status==="picked"&&this.renderStatus==="yes"){
        player.lifeCount+=1;
        this.renderStatus="no";
    }
};
Star.prototype.render = function(){
    if(this.renderStatus==="yes"){
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    }
};

//LifeCounter appears on top of screen and shows how many lives player
//has for use.
var LifeCounter=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/Heart.png';
};

LifeCounter.prototype.render = function(){
    ctx.font = "50px Luckiest Guy";
    ctx.fillStyle = "white";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillText(player.lifeCount, this.x +110, this.y + 130);
    ctx.strokeText(player.lifeCount, this.x + 110, this.y + 130);
};

//Princess is the npc which player is looking for, it can be picked and carried.
//However it will be dropped on collision with enemy even if player has lives left
var Princess=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/char-princess-girl.png';
    this.width=20;
    this.height=50;
    this.status="onground";
    this.renderStatus="yes";
};

Princess.prototype.update = function(){
    this.checkStatus();
};

Princess.prototype.checkStatus = function(){
    if(this.status==="picked"){
        player.rescueStatus=1;
        this.renderStatus="no";
    } else if (this.status==="onground"){
        player.rescueStatus=0;
        this.renderStatus="yes";
    }
};

Princess.prototype.render = function(){
    if(this.renderStatus==="yes"){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

//Selectors are transfer points showing the way for the player, each selector has unique
//events therefore their checkStatus functions are not defined in prototype.
var Selector=function (x,y) {
    this.x=x;
    this.y=y;
    this.sprite = 'images/Selector2.png';
    this.width=80;
    this.height=50;
    this.status="onground";
    this.renderStatus="yes";
};

Selector.prototype.checkStatus=function(){};

Selector.prototype.render=function () {
    if(this.renderStatus==="yes"){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Selector.prototype.update = function(){
    this.checkStatus();
};

//Object selectors being created now, so unique checkStatus can be assinged.
var level1Selector = new Selector(0, 20);
var level1Selector2 = new Selector(405, 495);
var level2Selector = new Selector(505, 480);

//level1Selector shows at the beginning and once touched changes level1 to level2
//it will appear again only if player drops the princess in level 1 so it possible
//to return to level2
level1Selector.checkStatus=function () {
    if(this.status==="picked"&&this.renderStatus==="yes"){
        player.level="level2";
        player.x=0;
        player.y=500;
        this.renderStatus="no";
    }else if(player.rescueStatus===0&&player.level==="level1"){
        this.renderStatus="yes";
        this.status="onground";
    }
};

//level1Selector2 shows when player comes back to level1 with the princess
//Once player gets to it, endGame is being changed to true, which starts
//animation + endMessageTime is being called which after 5 sec. displays
//end message and stops animation after 15 sec.
level1Selector2.checkStatus=function () {
    if(player.rescueStatus===1){
        this.renderStatus="yes";
        if(this.status==="picked"){
            newGame.endGame=true;
            endMessageTime();
        }
    }else if(player.rescueStatus===0){
        this.renderStatus="no";
        this.status="onground";
    }
};

//level2Selector shows in level2 when player picks up the princess,
//once player gets to it, the level2 will change to level1.
level2Selector.checkStatus=function() {
    if(player.rescueStatus===0){
        this.renderStatus="no";
        this.status="onground";
    } else if (player.rescueStatus===1&&player.level==="level2"){
        this.renderStatus==="yes";
        if(this.status==="picked"){
            player.level="level1";
            player.x=0;
            player.y=-30;
            this.renderStatus="no";
        }
    }
};

var endMessageTime=function () {
    setTimeout(function () {
        newGame.endGame=false;
        newGame.finishedGame=true;
        newGame.gameRun=false;
    },15000);
};


// Enemies our player must avoid
var Enemy = function(x1,x2,y,rate) {
    this.x=x1;
    this.y=y;
    this.rate=rate;
    this.direction='right';
    this.x1=x1;
    this.x2=x2;
    this.sprite = 'images/enemy-bug.png';
    this.width = 70;
    this.height = 30;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.location();
    this.picUpdate();
    this.move(dt);
};

//Enemy location checks if the object got to the end of it's path limited by
// x1 or x2 and then changes its direction
Enemy.prototype.location = function(argument){
    if(this.x+8>this.x2){
        this.direction='left';
    }else if(this.x<this.x1){
        this.direction='right';
    }
};

//Image changes based on direction.
Enemy.prototype.picUpdate = function() {
    if(this.direction==="right"){
        this.sprite = 'images/enemy-bug.png';
    } else if (this.direction === "left") {
        this.sprite = 'images/enemy-bug-left.png';
    }
};

//Base on direction status, enemy moves this way.
Enemy.prototype.move = function(dt){
    if(this.direction==="left") {
        this.x-=dt*this.rate;
    }else if(this.direction==="right"){
        this.x+=dt*this.rate;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player object storing various game details.
var Player=function() {
    this.x=0;
    this.y=505;
    this.sprite = 'images/char-boy.png';
    this.state='stand';
    this.location='block1';
    this.width=20;
    this.height=40;
    this.lifeCount=0;
    this.rescueStatus=0;
    this.immortal=0;
    this.level='level1';
    this.levelMarkers=level1Markers;
    this.levelBlocks=level1Blocks;
};

//Update function called from Engine()
Player.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.move(dt);
    // this.checkLocation();
    this.picUpdate();
    this.levelCheck();
};

// levelCheck checks on which level player currently is, assigning correct
//blocks, and level markers. Additionally assigns list of items and enemies for display.
//level is being stored Player object and is being changed on touching a selector
Player.prototype.levelCheck=function(){
    if(this.level==='level1'){
        this.levelMarkers=level1Markers;
        this.levelBlocks=level1Blocks;
        allEnemies=allEnemies1;
        items=items1;
    }else if(this.level==='level2'){
        this.levelMarkers=level2Markers;
        this.levelBlocks=level2Blocks;
        allEnemies=allEnemies2;
        items=items2;
    }
};

//checkLocation bases on canvas position, assigns curent block, so player stays on the map
Player.prototype.checkLocation=function () {
    // for (var each in this.levelMarkers) {
    //     if ( this.levelMarkers.hasOwnProperty(each) && this.x > this.levelMarkers[each].x1 &&
    //         this.x < this.levelMarkers[each].x2 &&this.y > this.levelMarkers[each].y1 &&
    //         this.y < this.levelMarkers[each].y2) {
    //         this.location = each;
    //         break;
    //     }
    // }
    // this.levelBlocks.blocks.forEach( function(block) {
    //     if(this.x>block.left&&this.x<block.right&&this.y>block.up&&this.y<block.down){
    //         this.location='location1';
    //         // break;
    //     }
    // });
    // console.log(this.location);
    // for(var i=1;i<=this.levelBlocks.blocks.length;i++){
    //     var block=this.levelBlocks.blocks['block'+i];
    //     if(this.x>block.left&&this.x<block.right&&this.y>block.up&&this.y<block.down){
    //         this.location='block'+i;
    //         console.log(this.location);
    //     }
    // }
    // console.log(this.x);
    // console.log(this.y);
    // for (var each in this.levelBlocks.blocks) {
    //     if ( this.levelBlocks.blocks.hasOwnProperty(each) && this.x > this.levelBlocks.blocks[each].left &&
    //         this.x < this.levelBlocks.blocks[each].right &&this.y > this.levelBlocks.blocks[each].up &&
    //         this.y < this.levelBlocks.blocks[each].down) {
    //         this.location = each;
    //         break;
    //     }
    // }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput based on which key/button was pressed, assigned correct status
//which will be executed in Player.prototype.move for smooth animation.
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.state='move_left';
            break;
        case 'right':
            this.state='move_right';
            break;
        case 'up':
            this.state='move_up';
            break;
        case 'down':
            this.state='move_down';
            break;
        case 'stand':
            this.state='stand';
            break;
    }
};

//As long as status in "move..." player will move in certain location
//unless position will not within currently assigned blocks.
Player.prototype.move=function (dt) {
    // console.log(this.state);
    // console.log(this.levelBlocks.blocks[this.location].left);
    // console.log(this.levelBlocks.blocks[this.location].right);
    // console.log(this.levelBlocks.blocks[this.location].down);
    // console.log(this.levelBlocks.blocks[this.location].up);

    // if(this.state==='move_left' &&
    //  this.x-3>this.levelBlocks.blocks[this.location].left) {
    //     this.x-=dt*180;
    // }
    // if(this.state==='move_right' &&
    //  this.x+3<this.levelBlocks.blocks[this.location].right) {
    //     this.x+=dt*180;
    // }
    // if(this.state==='move_down' &&
    //  this.y+3<this.levelBlocks.blocks[this.location].down) {
    //     this.y+=dt*180;
    // }
    // if(this.state==='move_up' &&
    //  this.y-3>this.levelBlocks.blocks[this.location].up) {
    //     this.y-=dt*180;
    // }
    // console.log(this.x);
    // console.log(this.y);
    var x0=this.x,y0=this.y;
    if(this.state==='move_left') {
        this.x-=dt*180;
    }
    if(this.state==='move_right') {
        this.x+=dt*180;
    }
    if(this.state==='move_down') {
        this.y+=dt*180;
    }
    if(this.state==='move_up') {
        this.y-=dt*180;
    }
    for(var i=0;i<this.levelBlocks.blocks.length;i++){
            // console.log(this.levelBlocks.blocks[i].up);
        if(this.x<this.levelBlocks.blocks[i].right&&this.x+this.width>this.levelBlocks.blocks[i].left&&
           this.y<this.levelBlocks.blocks[i].down&&this.y+this.height>this.levelBlocks.blocks[i].up){
            this.x=x0;
            this.y=y0;
            // console.log('yes');
            break;
            // console.log(this.levelBlocks.blocks[i].left);
            // console.log(this.levelBlocks.blocks[i].right);
            // console.log(this.levelBlocks.blocks[i].up);
            // console.log(this.levelBlocks.blocks[i].down);
        }else{
            // console.log('no');
        }
    }
};

//picUpdate changes picture of the player base on the event
//when key is picked or after the touch of the bug - for few seconds player is
//immortal after the touch and then character is pink.
Player.prototype.picUpdate=function() {
    if(this.immortal>(Date.now()/1000)){
        this.sprite='images/char-pink-girl-immortal.png';
    }else{
        if(princess.status==="picked") {
            this.sprite = 'images/char-pink-girl-holding.png';
        } else if (princess.status === "onground") {
            this.sprite = 'images/char-boy.png';
        }
    }
};

//Player reset fuction, to put life count on zero and move player to start location.
Player.prototype.reset=function(){
    this.lifeCount=0;
    this.rescueStatus=0;
    this.x=0;
    this.y=505;
    this.level='level1';
};

//Colision check is inside Engine(), this function is being called if collision
//happened, and it checks if there is life left - if not starts gameOver status
//which freezes the game.
Player.prototype.collision = function(){
    if(this.lifeCount===0){
        newGame.gameOver=true;
    }else if(this.lifeCount>0){
        this.immortal=Date.now()/1000+2;
        this.lifeCount-=1;
        princess.status="onground";
        this.rescueStatus=0;
    }
};

//keydown addEventListener for moving a player on the map
// and pressing space for pause/restart game
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        32: 'spacebar',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(e.keyCode===32){
        newGame.handleInput(allowedKeys[e.keyCode]);
    }else{
        player.handleInput(allowedKeys[e.keyCode]);
    }
    if(e.keyCode in allowedKeys){
        e.preventDefault();
    }
});

//keyup event so player stops once key is no longer pressed.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'stand',
        38: 'stand',
        39: 'stand',
        40: 'stand'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//Creating enemies for level1

var enemy11 = new Enemy(-10,140,345,160);
var enemy12 = new Enemy(65,515,175,180);
var enemy13 = new Enemy(91,515,13,220);

//Enemies being grouped in two list so they can changed, base on the level
var allEnemies1=[];
var allEnemies2=[];
// var allEnemies1=[enemy11,enemy12,enemy13];
var allEnemies=[];

//Other items
var star2 = new Star(5, 325);
var star1 = new Star(505, 100);
var princess = new Princess(391, 250);
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