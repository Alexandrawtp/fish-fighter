const canvasHeight = 680;
const canvasWidth = 1430;
const fishHeight = 70;
const fishWidth = 120;
const sharkHeight = 100;
const sharkWidth = 250;
let playerLives = 4;
let healthBar = 50;
let healthBarColor = 'green';
let gameOverScreen = document.getElementById('game-over');

const game = new Game(canvasHeight, canvasWidth, fishWidth, fishHeight, sharkWidth, sharkHeight);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const startBtn = document.querySelector('#start');

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

function drawLevel() {
    ctx.font = '35px Serif';
    ctx.fillStyle = 'aquamarine';
    ctx.fillText(`Level : ${game.level}`, 10, 50);
    let domLevel = document.querySelector('h2 span');
    domLevel.innerHTML = game.level;
}


function drawHealthBar(){
    if (game.playerLives > 2) {
        healthBarColor = 'green';
    } else if (game.playerLives <= 1) {
        healthBarColor = 'red';
    } else {
        healthBarColor = 'orange';
    }
    ctx.fillStyle = healthBarColor;
    ctx.fillRect(20, 600, healthBar * game.playerLives, 20);
}

function updateCanvas() {
    clearCanvas();
    drawLevel();
    drawFish();
    drawSharks();
    drawHealthBar();
}

function startGame() {
    canvas.style.display = 'block';
    startBtn.style.display = 'none';
    game.start(updateCanvas, endGame);
}

function endGame() {
    canvas.style.display = 'none';
    gameOverScreen.style.display = 'flex'
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


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

window.addEventListener('load', () => {
    let coolWater = new sound('sounds/cool-water.mp3');
    //coolWater.play();
    gameOverScreen.style.display = 'none';
    startBtn.addEventListener('click', () => {
        startGame()
    })
});


//sound (alvaro)
// let splashScreenMusic = new Audio();
// splashScreenMusic.src = "music..mp3"
// splashScreenMusic.play()
// endGame.volume = 0.05;