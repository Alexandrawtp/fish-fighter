const playerSpeed = 30;

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
        this.playerY = Math.min(this.playerY + playerSpeed, this.canvasHeight - fishHeight);
    }

    movePlayerLeft() {
        this.playerX = Math.max(this.playerX - playerSpeed, 0);
    }

    movePlayerRight() {
        this.playerX = Math.min(this.playerX + playerSpeed, this.canvasWidth - fishWidth);
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
            console.log("new shell");
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
        this.enemiesDelay = 800; //frequence d'arrivée des requins au niveau 1
        this.shellsDelay = 1000;
        if (this.level <= 9) {
            this.createEnemy(2000 - 100 * level); //frequence d'arrivee des requins dès niveau 2 (augmente)
            this.createShell(8000 + 50 * level);
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
                console.log("collision");
                if (this.playerLives > 0) {
                    this.playerLives--;
                }
            }
        }
    }

    grab() {
        //console.log(this.shells[0].x)
        for (let shell of this.shells) {
            if (this.playerX < shell.x + this.shellWidth &&
                this.playerX + this.fishWidth > shell.x &&
                this.playerY < shell.y + this.shellHeight &&
                this.playerY + this.fishHeight > shell.y) {
                console.log("collision coquillage");
                if (shell.isGrab = true;)
            }
        }
    }
}

class Enemy {
    constructor(game) {
        this.game = game;
        this.isAlive = true;
        this.x = this.game.canvasWidth - 400; //shark coordonnées  
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