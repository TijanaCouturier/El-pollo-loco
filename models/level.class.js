class Level {
    enemies;
    smallEnemies;
    endboss;
    coins;
    bottles;
    clouds;
    backgroundObjects;
    level_end_x = 720 * 9;
    world;


    constructor(enemies, smallEnemies, endboss, coins, bottles, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.smallEnemies = smallEnemies;
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}