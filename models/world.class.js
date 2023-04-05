class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    liveBar = new LiveBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    hit_counter_endboss = 0;
    bottle_counter = 0;
    coin_counter = 0;
    throwableObjects = [];
    chicken_sound = new Audio('audio/chicken.mp3');
    endbossDead_sound = new Audio('audio/endbossDead.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bot.mp3');
    bottleThrow_sound = new Audio('audio/bottleThrow.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); //canvas draw
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    };


    run() {
        setInterval(() => {
            this.allCollisions();
        }, 5);
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsSmallEnemie();
        }, 5);
        setInterval(() => {
            this.checkThrowObjects();
        }, 100);
        setInterval(() => {
            this.checkCharacterIsNearToEndboss();
        }, 150)
    }


    allCollisions() {
        this.checkBottleHit();
        this.checkBottleSmallEnemie();
        this.checkCollisionBottleAndEndboss();
        this.checkCollisionsWithEndboss();
        this.collectBottles();
        this.collectCoins();
    }


    collectCoins() {
        level1.coins.forEach((coin) => {
            if (this.character.isColliding(coin, 90)) {
                this.coin_counter++;
                level1.coins.splice(level1.coins.findIndex(a => a == coin), 1)
                this.coinBar.setPercentage(this.coin_counter / 18 * 100);
                if (!isMusicOf) {
                    this.coin_sound.play();
                }
            }
        });
    }


    collectBottles() {
        level1.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle, 80)) {
                this.bottle_counter++;
                level1.bottles.splice(level1.bottles.findIndex(a => a == bottle), 1)
                this.bottleBar.setPercentage((this.bottle_counter / 28) * 100);
                if (!isMusicOf) {
                    this.bottle_sound.play();
                }
            }
        });
    }


    checkBottleHit() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle, 0)) {
                    bottle.clean();
                    enemy.dead();
                    if (!isMusicOf) {
                        this.chicken_sound.play();
                    }
                }
            });
        });
    }


    checkBottleSmallEnemie() {
        this.throwableObjects.forEach((bottle) => {
            this.level.smallEnemies.forEach((smallEnemy) => {
                if (smallEnemy.isColliding(bottle, 0)) {
                    bottle.clean();
                    smallEnemy.dead();
                    if (!isMusicOf) {
                        this.chicken_sound.play();
                    }
                }
            });
        });
    }


    checkCollisionBottleAndEndboss() {
        try {
            this.chackEndboss();
        } catch (e) {
            if (e !== 'Break') throw e
        }
    }


    chackEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.active && endboss.isColliding(bottle, 0)) {
                    bottle.clean();
                    endboss.EndbossHurt();
                    if (!isMusicOf) {
                        this.endbossDead_sound.play();
                    }
                    if (endboss.isDead()) {
                        endboss.EndbossKill();
                    }
                    bottle.inactive();
                    throw 'Break';
                }
            });
        });
    }


    checkCharacterIsNearToEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.x > 720 * 8) {
                endboss.EndbossWalk();
            }
            if (endboss.x < this.character.x) {
                this.character.dead();
                gameOver();
            }
        });

    }


    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss, 0)) {
                this.character.hit();
                this.liveBar.setPercentage(this.character.energy);
            }
        });
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.bottle_counter > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 10);
            this.throwableObjects.push(bottle);
            this.bottle_counter--;
            this.bottleBar.setPercentage(this.bottle_counter / 5 * 100);
            this.checkBottleHit();
            this.character.idle = 0;
            if (!isMusicOf) {
                this.bottleThrow_sound.play();
            }
        }
    }


    checkCollisions() {
        level1.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy, 80) && this.character.isAboveGround()) {
                if (!isMusicOf) {
                    this.chicken_sound.play();
                }
                enemy.dead();
            } else if (this.character.isColliding(enemy, 80) && !enemy.isDead() && !this.character.isHurt()) {
                this.character.hit();
                this.liveBar.setPercentage(this.character.energy);
            }
        });
    }


    checkCollisionsSmallEnemie() {
        level1.smallEnemies.forEach((smallEnemy) => {
            if (this.character.isColliding(smallEnemy, 80) && this.character.isAboveGround()) {
                if (!isMusicOf) {
                    this.chicken_sound.play();
                }
                smallEnemy.dead();
            } else if (this.character.isColliding(smallEnemy, 80) && !smallEnemy.isDead() && !this.character.isHurt()) {
                this.character.hit();
                this.liveBar.setPercentage(this.character.energy);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.allObjects();
        this.ctx.translate(-this.camera_x, 0);

        //Space for fixed Objects
        this.fixedObjects();
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    allObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }


    fixedObjects() {
        this.addToMap(this.liveBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.height, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}