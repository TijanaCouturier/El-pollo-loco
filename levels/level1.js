let level1;


/**
 * all game elements and their position in the game
 */
function initLevel() {
    let enemies = [];
    let smallEnemies = [];
    let endboss = [];
    let coins = [];
    let bottles = [];
    let clouds = [];
    let background = [];


    /**
     * all enemies
     */
    for (i = 0; i < 10; i++) {
        enemies.push(new Chicken());
    }


    /**
     * endboss
     */
    endboss.push(new Endboss());


    /**
     * all smallEnemies
     */
    for (i = 0; i < 10; i++) {
        smallEnemies.push(new ChickenSmall());
    }


    /**
     * all coins and their position in the game
     */
    coins.push(new Coin(360, 230)),
        coins.push(new Coin(400, 170)),
        coins.push(new Coin(450, 110)),
        coins.push(new Coin(500, 170)),
        coins.push(new Coin(550, 230)),
        coins.push(new Coin(1300, 100)),
        coins.push(new Coin(1700, 50)),
        coins.push(new Coin(1800, 50)),
        coins.push(new Coin(1900, 50)),
        coins.push(new Coin(2000, 50)),
        coins.push(new Coin(2925, 105)),
        coins.push(new Coin(2925, 20)),
        coins.push(new Coin(3025, 20)),
        coins.push(new Coin(3025, 105)),
        coins.push(new Coin(4000, 100)),
        coins.push(new Coin(4000, 150)),
        coins.push(new Coin(4000, 200))


    /**
     * all bottles and their position in the game
     */
    bottles.push(new Bottle(1, 300, 360)),
        bottles.push(new Bottle(2, 500, 360)),
        bottles.push(new Bottle(0, 1000, 100)),
        bottles.push(new Bottle(0, 1000, 155)),
        bottles.push(new Bottle(0, 1000, 215)),
        bottles.push(new Bottle(0, 1050, 100)),
        bottles.push(new Bottle(0, 1050, 155)),
        bottles.push(new Bottle(0, 1050, 215)),
        bottles.push(new Bottle(1, 1600, 360)),
        bottles.push(new Bottle(2, 2000, 360)),
        bottles.push(new Bottle(0, 3500, 100)),
        bottles.push(new Bottle(0, 3500, 155)),
        bottles.push(new Bottle(0, 3500, 215)),
        bottles.push(new Bottle(0, 3550, 100)),
        bottles.push(new Bottle(0, 3550, 155)),
        bottles.push(new Bottle(0, 3550, 215)),
        bottles.push(new Bottle(1, 4000, 360)),
        bottles.push(new Bottle(2, 4200, 360)),
        bottles.push(new Bottle(0, 5000, 100)),
        bottles.push(new Bottle(0, 5000, 155)),
        bottles.push(new Bottle(0, 5000, 215)),
        bottles.push(new Bottle(0, 5050, 100)),
        bottles.push(new Bottle(0, 5050, 155)),
        bottles.push(new Bottle(0, 5050, 215)),
        bottles.push(new Bottle(1, 4500, 360)),
        bottles.push(new Bottle(2, 4600, 360)),
        bottles.push(new Bottle(1, 3800, 360)),
        bottles.push(new Bottle(2, 800, 360))


    /**
     * all clouds in the game
     */
    for (i = 0; i < 10; i++) {
        clouds.push(new Cloud(720 * i));
    }


    /**
     * all backgrounds and their position in the game
     */
    for (let i = 0; i < 10; i = i + 2) {
        background.push(new BackgroundObject('img/5_background/layers/air.png', 719 * i));
        background.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * i));
        background.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * i));
        background.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * i));
        background.push(new BackgroundObject('img/5_background/layers/air.png', 719 * i + 719));
        background.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * i + 719));
        background.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * i + 719));
        background.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * i + 719));
    }

    /**
     * all elements in the game
     */
    level1 = new Level(enemies, smallEnemies, endboss, coins, bottles, clouds, background);
}