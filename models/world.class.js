class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    throwTimeout = false;
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



    /**
     * creating the world
     */
    setWorld() {
        this.character.world = this;
    };



    /**
     * main function of all functions
     */
    run() {
        setInterval(() => {
            this.allElementCollisions();
        }, 5);
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsSmallEnemie();
        }, 5);
        setInterval(() => {
            this.checkThrowObjects();
        }, 1);
        setInterval(() => {
            this.checkCharacterIsNearToEndboss();
        }, 150)
    }


    /**
     * all collisons in game
     */
    allElementCollisions() {
        this.checkBottleHit();
        this.checkBottleSmallEnemie();
        this.checkCollisionBottleAndEndboss();
        this.checkCollisionsWithEndboss();
        this.collectBottles();
        this.collectCoins();
    }


    /**
     * collision between coins and character
     */
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


    /**
     * collision between bottle and character
     */
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


    /**
     *throw bottle - collision bottle and chicken/ small chicken and 
     *bottle with final boss
     */
    checkBottleHit() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle, 40)) {
                    bottle.clean();
                    setTimeout(() => {
                        this.throwableObjects.splice(this.throwableObjects.findIndex(a => a == bottle), 1)
                    }, 200);

                    setTimeout(() => {
                        this.checkDeads();
                    }, 1000);
                    enemy.dead();
                    if (!isMusicOf) {
                        this.chicken_sound.play();
                    }
                }
            });
        });
    }


    /**
     * chack collision between bottle and small chicken
     */
    checkBottleSmallEnemie() {
        this.throwableObjects.forEach((bottle) => {
            this.level.smallEnemies.forEach((smallEnemy) => {
                if (smallEnemy.isColliding(bottle, 40)) {
                    bottle.clean();
                    setTimeout(() => {
                        this.throwableObjects.splice(this.throwableObjects.findIndex(a => a == bottle), 1)
                    }, 200);

                    setTimeout(() => {
                        this.checkSmallDeads();
                    }, 1000);

                    smallEnemy.dead();
                    if (!isMusicOf) {
                        this.chicken_sound.play();
                    }
                }
            });
        });
    }


    /**
     * chack collision between bottle and endboss
     */
    checkCollisionBottleAndEndboss() {
        try {

            this.chackEndboss();
        } catch (e) {
            if (e !== 'Break') throw e
        }
    }


    /**
     * chack endboss collision with character
     */
    chackEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.active && endboss.isColliding(bottle, 200)) {
                    bottle.clean();
                    setTimeout(() => {
                        this.throwableObjects.splice(this.throwableObjects.findIndex(a => a == bottle), 1)
                    }, 200);
                    endboss.EndbossHurt();
                    if (!isMusicOf) {
                        this.endbossDead_sound.play();
                    }
                    if (endboss.isDead()) {
                        endboss.EndbossKill();
                        this.character.inactive();

                    }
                    bottle.inactive();
                    throw 'Break';
                }
            });
        });
    }


    /**
     * chack is character near to endboss
     */
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


    /**
     * chack collision character with endboss
     */
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss, 0)) {
                this.character.hit();
                this.liveBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * chack collision character with bottle
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottle_counter > 0 && !this.character.otherDirection && !this.throwTimeout) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 80);
            this.throwableObjects.push(bottle);
            this.bottle_counter--;
            this.bottleBar.setPercentage(this.bottle_counter / 5 * 100);
            this.checkBottleHit();
            this.character.idle = 0;
            this.throwTimeout = true;
            if (!isMusicOf) {
                this.bottleThrow_sound.play();
            }

            setTimeout(() => {
                this.throwTimeout = false;
            }, 750); // bottle throw timout
        }
    }


    /**
     * check if chicken dead
     */
    checkDeads() {
        level1.enemies.forEach((enemy) => {
            if (enemy.isDead()) {
                level1.enemies.splice(level1.enemies.findIndex(a => a == enemy), 1);
            }

        })
    }


    /**
     *  chack if small chicken dead
     */
    checkSmallDeads() {
        console.log("testSmallDeads");
        level1.smallEnemies.forEach((enemy) => {
            if (enemy.isDead()) {
                level1.smallEnemies.splice(level1.smallEnemies.findIndex(a => a == enemy), 1);
            }
        })
    }


    /**
     * check collision between chicken and character
     */
    checkCollisions() {
        level1.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy, 80) && this.character.isAboveGround() && this.character.speedY < 0) {
                if (!isMusicOf) {
                    this.chicken_sound.play();
                }
                enemy.dead();
                setTimeout(() => {
                    this.checkDeads();
                }, 1000);
            } else if (this.character.isColliding(enemy, 80) && !enemy.isDead() && !this.character.isHurt()) {
                this.character.hit();
                this.liveBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * check collision between small chicken and character
     */
    checkCollisionsSmallEnemie() {
        level1.smallEnemies.forEach((smallEnemy) => {
            if (this.character.isColliding(smallEnemy, 80) && this.character.isAboveGround() && this.character.speedY < 0) {
                if (!isMusicOf) {
                    this.chicken_sound.play();
                }
                smallEnemy.dead();
                setTimeout(() => {
                    this.checkSmallDeads();
                }, 1000);
            } else if (this.character.isColliding(smallEnemy, 80) && !smallEnemy.isDead() && !this.character.isHurt()) {
                this.character.hit();
                this.liveBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * draw all objects in world
     */
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


    /**
     * all objects in game
     */
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


    /**
     * all fixed objects
     */
    fixedObjects() {
        this.addToMap(this.liveBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
    }


    /**
     *  add objects to world
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * add flip image and back to flip image to world
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * flip image
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.height, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * back to flip image
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}