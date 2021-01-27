const playerSpeed = 30;

class Game {
    constructor(canvasHeight, canvasWidth, fishWidth, fishHeight, sharkWidth, sharkHeight) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.fishWidth = fishWidth;
        this.fishHeight = fishHeight;
        this.sharkWidth = sharkWidth;
        this.sharkHeight = sharkHeight;
        this.createPlayer();
        this.enemies = [];
        this.enemyInterval = null; //dès niv 2, interval de 3000ms - (200 x level)
        this.playerLives = playerLives;
        this.deadPlayer = false;
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
    start(drawCallback, endCallback) {
        this.endCallback = endCallback
        this.setLevel(1);
        this.enemies.push(new Enemy(this)); //first shark
        this.timer = setInterval(() => {
            this.fight();
            requestAnimationFrame(drawCallback);
        }, 10);
        this.increaseLevel();
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
        if (this.level <= 9) {
            this.createEnemy(2000 - 100 * level); //frequence d'arrivee des requins dès niveau 2 (augmente)
        }
    }
    fight() {
        let aliveEnemies = this.enemies.filter(enemy => enemy.isAlive == true)
        //console.log(aliveEnemies.length);
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
                //console.log(`fish lives = ${this.playerLives}`);
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
            if (this.isAlive){
                this.x -= 7; //speed of sharks
            } else {
                this.y += 10;
            }
        }, 30);
    }

}