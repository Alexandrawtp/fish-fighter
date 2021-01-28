const canvasHeight = 680;
const canvasWidth = 1430;
const fishHeight = 70;
const fishWidth = 120;
const sharkHeight = 100;
const sharkWidth = 250;
const shellHeight = 50;
const shellWidth = 50;
let playerLives = 4;
let healthBar = 40;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('#start');
const screen1 = document.querySelector('#screen1');
const tryAgainBtn = document.getElementById('try-again');
let gameOverScreen = document.getElementById('game-over');
gameOverScreen.style.display = 'none';

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
    const fishImg = document.createElement('img');
    fishImg.src = 'images/fish.png';
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
    shellImg.src = 'images/shell1.png';
    for (let shell of game.shells) {
        ctx.drawImage(shellImg, shell.x, shell.y, shellWidth, shellHeight);
    }
}

function drawShellsCounter() {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'aquamarine';
    ctx.fillText(`Shells : ${game.shellCounter}`, 10, 100);
}

function drawLevel() {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'aquamarine';
    ctx.fillText(`Level : ${game.level}`, 10, 50);
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
    ctx.fillRect(20, 600, healthBar * game.playerLives, 20);
}

function endGame() {
    canvas.style.display = 'none'; 
    gameOverScreen.style.display = 'flex'
    tryAgainBtn.addEventListener('click', () => {
        begin();
    })
}


document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            game.movePlayerUp();
            break;
        case 'ArrowDown':
            game.movePlayerDown();
            break;
        case 'ArrowLeft':
            game.movePlayerLeft();
            break;
        case 'ArrowRight':
            game.movePlayerRight();
            break;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.keyCode == '32' && game.shellCounter >= 2) {
        game.shellCounter -= 2;
        game.sendFishes();
    }
})


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.volume = 0.2;
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
