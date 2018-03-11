// Enemies player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Once the bug has passed a certain point, then redraw on other side of screen - simulate roatation
    if (this.x > 500) {
        this.x = -100;
    }
};

// places enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//enemies with random speeds
var enemy1 = new Enemy(-100, 60, (Math.random() * 100));
var enemy2 = new Enemy(-100, 145, (Math.random() * 200));
var enemy3 = new Enemy(-100, 225, (Math.random() * 150));
var enemy4 = new Enemy(-100, 60, (Math.random() * 200));
var enemy5 = new Enemy(-100, 145, (Math.random() * 150));
var enemy6 = new Enemy(-100, 225, (Math.random() * 100));

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Player initil parameters - image, x and y, number of lives, score and a restart to position function. 
var Player = function(x, y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
    this.lives = 3;
    this.score = 0;
    this.start();
};

//Places the player image on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // drawBox(this.x + 10, this.y + 61, 85, 80, "blue");
};

//Place player back on the bottom row
Player.prototype.start = function() {
    this.x = 200;
    this.y = 390;

    //Checks players count of lives, and resets the game when player is out of lives.
    $('#livesCount').text("Lives: " + this.lives);    
    if (this.lives === 0) {
        resetValues();
    };
    //
    $('#scoreCount').text("Score: " + this.score);
    if (this.score > 49) {
        gameState = 'pause';
        $(document).ready($("#endModal").modal('show'));
        newGameListener();
        document.getElementById("finalScore").innerHTML = "Your Final Score is " + this.score;
    };
};

//Parameters for resetting score, lives, and start location when using the restart button.
Player.prototype.restart = function() {
    this.x = 200;
    this.y = 390;
    player.score = 0;
    player.lives = 3;
    //$('#scoreBar').text(score);
    $('#scoreBar').text("Score: " + player.score);
    $('#livesCount').text("Lives: " + player.lives);
    gameState = "run";
};

//Parameters for resetting score, lives, and start location when player is out of lives.
function resetValues() {
    this.x = 200;
    this.y = 390;
    player.score = 0;
    player.lives = 3;
    //$('#scoreBar').text(score);
    $('#scoreBar').text("Score: " + player.score);
    $('#livesCount').text("Lives: " + player.lives);
};

//Adds score when player reaches water.
Player.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);
    if (this.y === -10) {
        this.start();
        this.score = this.score + 10;
        $('#scoreBar').text("Score: " + this.score);
    }
};

//Listener for the button click on restart
function newGameListener() {
    restartButton.addEventListener('click', Player.prototype.restart);
};

//Keystrokes used in the game, movement, pause and restart (found in forums)
Player.prototype.handleInput = function(keyStroke) {
    switch (keyStroke) {
        case "left":
            //console.log(this.sprite);
            if (this.x > 0) {
                this.x = this.x - 50;
                //console.log(this.x)
            }
            break;
        case "right":
            if (this.x < 400) {
                this.x += 50;
                //console.log(this.x)
            }
            break;
        case "up":
            if (this.y > -10) {
                this.y -= 50;
                //console.log(this.y)
            }
            break;
        case "down":
            if (this.y < 440) {
                this.y += 50;
                //console.log(this.y)
            }
            break;
        case "pause":
            gameState = 'pause';
            console.log("Pressed Pause")
            break;
        case "restart":
            gameState = 'run';
            break;
    }
};

// Place the player object in a variable called player
var player = new Player();

//function to check collisons, subtracts player live, and returns player to start when collision occurs. 
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (enemy.x < player.x + 80 && enemy.x + 80 > player.x && enemy.y < player.y + 60 && enemy.y + 60 > player.y) {
            player.lives = player.lives - 1;
            player.start();
        }
    })
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        82: 'restart',
        80: 'pause'
    };
//console.log(allowedKeys[e.keyCode]);
player.handleInput(allowedKeys[e.keyCode]);
});