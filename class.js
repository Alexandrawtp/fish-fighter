const playerSpeed = 1.2;

class Game {
    constructor(canvasHeight, canvasWidth, fishWidth, fishHeight, sharkWidth, sharkHeight, shellWidth, shellHeight) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.fishWidth = fishWidth;
        this.fishHeight = fishHeight;
        this.shellWidth = shellWidth;
        this.shellHeight = shellHeight;
        this.sharkWidth = sharkWidth;
        this.sharkHeight = sharkHeight;
        this.createPlayer();
        this.enemies = [];
        this.shells = [];
        this.shellCounter = 0;
        this.enemyInterval = null; //dès niv 2, interval de 3000ms - (200 x level)
        this.playerLives = playerLives;
        this.deadPlayer = false;
    }

    start(drawCallback, endCallback) {
        this.enemies.push(new Enemy(this)); //first shark
        this.shells.push(new Shell(this));
        this.timer = setInterval(() => { //check if there is a collision
            this.fight();
            this.grab();
            requestAnimationFrame(drawCallback);
        }, 10);
        this.setLevel(1);
        this.increaseLevel();
        this.endCallback = endCallback;
    }

    createPlayer() {
        this.playerX = 0;
        this.playerY = canvasHeight / 2;
    }

    movePlayerUp() {
        this.playerY = Math.max(this.playerY - playerSpeed, 0);
    }

    movePlayerDown() {
        this.playerY = Math.min(this.playerY + playerSpeed, this.canvasHeight - this.fishHeight);
    }

    movePlayerLeft() {
        this.playerX = Math.max(this.playerX - playerSpeed, 0);
    }

    movePlayerRight() {
        console.log(this.canvasWidth, this.fishWidth)
        this.playerX = Math.min(this.playerX + playerSpeed, this.canvasWidth - this.fishWidth);
        console.log(this.playerX)

    }

    createEnemy(enemiesDelay) {
        if (this.enemyInterval) {
            clearInterval(this.enemyInterval);
        }
        this.enemyInterval = setInterval(() => { //nouvel ennemi toutes les x sec
            this.enemies.push(new Enemy(this));
        }, enemiesDelay);
    }

    createShell(shellsDelay) {
        if (this.shellInterval) {
            clearInterval(this.shellInterval);
        }
        this.shellInterval = setInterval(() => {
            this.shells.push(new Shell(this));
        }, shellsDelay);
    }

    end() {
        clearInterval(this.timer);
        this.endCallback();
    }

    increaseLevel() {
        this.levelTimer = setInterval(() => {
            this.setLevel(this.level + 1);
        }, 10000);
    }

    setLevel(level) {
        this.level = level;
        this.enemiesDelay = 700; //frequence d'arrivée des requins au niveau 1
        this.shellsDelay = 1000;
        if (this.level <= 9) {
            this.createEnemy(1200 - 100 * level); //frequence d'arrivee des requins dès niveau 2 (augmente)
            this.createShell(5000 + 100 * level);
        }
    }

    fight() {
        let aliveEnemies = this.enemies.filter(enemy => enemy.isAlive == true)
        if (this.playerLives == 0) {
            this.playerY += 10;
            if (this.playerY >= canvasHeight) {
                this.end();
            }
        }
        for (let enemy of aliveEnemies) {
            if (this.playerX < enemy.x + this.sharkWidth &&
                this.playerX + this.fishWidth > enemy.x &&
                this.playerY < enemy.y + this.sharkHeight &&
                this.playerY + this.fishHeight > enemy.y) {
                enemy.isAlive = false;
                if (this.playerLives > 0) {
                    this.playerLives--;
                }
            }
        }
        for (let enemy of aliveEnemies) {
            if (this.greenFishX < enemy.x + this.sharkWidth &&
                this.greenFishX + 70 > enemy.x &&
                this.greenFishY < enemy.y + this.sharkHeight &&
                this.greenFishY + this.canvasHeight / 2 > enemy.y) {
                enemy.isAlive = false;
            }
        }
    }

    grab() {
        for (let i = 0; i < this.shells.length; i++) {
            if (this.playerX < this.shells[i].x + this.shellWidth &&
                this.playerX + this.fishWidth > this.shells[i].x &&
                this.playerY < this.shells[i].y + this.shellHeight &&
                this.playerY + this.fishHeight > this.shells[i].y) {
                this.shellCounter++;
                this.shells.splice(i, 1);
            }
        }
    }

    sendFishes() {
        this.greenFishX = 0;
        this.greenFishY = canvasHeight / 4;
        this.yellowFishX = 0;
        this.yellowFishY = 3 * canvasHeight / 4;
        this.timerSmallFishes = setInterval(() => {
            this.greenFishX += 15;
            this.yellowFishX += 15;
            this.fight();
        }, 30);
    }

}

class Enemy {
    constructor(game) {
        this.game = game;
        this.isAlive = true;
        this.x = this.game.canvasWidth; //shark coordonnées  
        this.y = Math.floor(Math.random() * this.game.canvasHeight - sharkHeight)
        this.timer = setInterval(() => {
            if (this.isAlive) {
                this.x -= 7; //speed of sharks
            } else {
                this.y += 10;
            }
        }, 30);
    }

}

class Shell {
    constructor(game) {
        this.game = game;
        this.isGrab = false;
        this.x = Math.floor(Math.random() * this.game.canvasWidth - shellWidth);
        this.y = Math.floor(Math.random() * this.game.canvasHeight - shellHeight);
        this.timerShell = setInterval(() => {
            if (this.isGrab) {
                shellCounter++;
            }
        }, 30);
    }
}