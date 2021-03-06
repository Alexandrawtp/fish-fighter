const canvasHeight = 680;
const canvasWidth = 1130;
const fishHeight = 60;
const fishWidth = 100;
const sharkHeight = 100;
const sharkWidth = 250;
const shellHeight = 50;
const shellWidth = 50;
let playerLives = 4;
let healthBar = 40;
let healthBarColor = 'aquamarine';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('#start');
const screen1 = document.querySelector('#screen1');
const tryAgainBtn = document.getElementById('try-again');
let gameOverScreen = document.getElementById('game-over');
gameOverScreen.style.display = 'none';
const fishImg = document.createElement('img');
fishImg.src = 'images/fish.png';

const game = new Game(
    canvasHeight, canvasWidth,
    fishWidth, fishHeight,
    sharkWidth, sharkHeight,
    shellWidth, shellHeight
);

function startGame() {
    clearCanvas();
    screen1.style.display = 'none';
    canvas.style.display = 'block';
    game.start(updateCanvas, endGame);
}

function presentation() {
    ctx.fillText = (`Hey you! Could you help me to cross safely the ocean? You can controll me with your arrow's keyboard and if you achieve to collecte two shells, press the spacebar and see what's happening !`);
}

function updateCanvas() {
    clearCanvas();
    drawFish();
    drawSharks();
    drawShells();
    drawSmallFishes();
    drawShellsCounter();
    drawLevel();
    drawHealthBar();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawFish() {
    ctx.drawImage(fishImg, game.playerX, game.playerY, fishWidth, fishHeight);
}

function drawSharks() {
    const sharkImg = document.createElement('img');
    sharkImg.src = 'images/shark.png';
    for (let shark of game.enemies) {
        ctx.drawImage(sharkImg, shark.x, shark.y, sharkWidth, sharkHeight);
    }
}

function drawSmallFishes() {
    const greenFish = document.createElement('img');
    greenFish.src = 'images/greenfish.png';
    ctx.drawImage(greenFish, game.greenFishX, game.greenFishY, 50, 40);
    const yellowFish = document.createElement('img');
    yellowFish.src = 'images/yellowfish.png';
    ctx.drawImage(yellowFish, game.yellowFishX, game.yellowFishY, 50, 40);
}

function drawShells() {
    const shellImg = document.createElement('img');
    shellImg.src = 'images/shell.png';
    for (let shell of game.shells) {
        ctx.drawImage(shellImg, shell.x, shell.y, shellWidth, shellHeight);
    }
}

function drawShellsCounter() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'aquamarine';
    ctx.fillText(`Shells : ${game.shellCounter}`, 20, 100);
}

function drawLevel() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'aquamarine';
    ctx.fillText(`Level : ${game.level}`, 20, 50);
    let domLevel = document.querySelector('h2');
    domLevel.innerHTML = `Level ${game.level}`;
}

function drawHealthBar() {
    if (game.playerLives > 2) {
        healthBarColor = 'aquamarine';
    } else if (game.playerLives <= 1) {
        healthBarColor = 'red';
    } else {
        healthBarColor = 'orange';
    }
    ctx.fillStyle = healthBarColor;
    ctx.fillRect(60, 600, healthBar * game.playerLives, 15);
    ctx.drawImage(fishImg, 20, 595, 35, 25)
    ctx.strokeRect(60, 600, 160, 15);
}

function endGame() {
    canvas.style.display = 'none';
    gameOverScreen.style.display = 'flex'
    tryAgainBtn.addEventListener('click', () => {
        location.reload();
    })
}

// Keyboard commands

let keyUp = false;
let keyDown = false;
let keyRight = false;
let keyLeft = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        keyRight = true;
    } else if (e.keyCode == 37) {
        keyLeft = true;
    } else if (e.keyCode == 40) {
        keyDown = true;
    } else if (e.keyCode == 38) {
        keyUp = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        keyRight = false;
    } else if (e.keyCode == 37) {
        keyLeft = false;
    } else if (e.keyCode == 40) {
        keyDown = false;
    } else if (e.keyCode == 38) {
        keyUp = false;
    }
}

let timerPlayer = setInterval(() => { //checks if keypress
    if (keyUp) {
        game.movePlayerUp();
    }
    if (keyRight) {
        game.movePlayerRight();
    }
    if (keyDown) {
        game.movePlayerDown();
    }
    if (keyLeft) {
        game.movePlayerLeft();
    }
}, 5)

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 32 && game.shellCounter >= 2) {
        let smallFishesNoise = new Audio('sounds/smallFishes.wav');
        smallFishesNoise.play();
        smallFishesNoise.volume = 0.1;
        game.shellCounter -= 2;
        game.sendFishes();
    }
})

// sound options

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.volume = 0.1;
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

window.addEventListener('load', () => {
    let coolWater = new sound('sounds/cool-water.mp3');
    coolWater.play();
    canvas.style.display = 'none';
    startBtn.addEventListener('click', () => {
        startGame();
    })
});