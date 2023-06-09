class Endboss extends MovableObject {

    height = 300;
    width = 300;
    y = 140;
    energy = 100;
    contact = false;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_ANGRY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',

    ];


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 720 * 9 + 200;
        this.animate();
    }


    /**
     *  EndbossWalk true
     */
    EndbossWalk() {
        this.contact = true;
    }


    /**
     *  Endboss is hurt
     */
    EndbossHurt() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 410);
        setTimeout(() => {
            clearInterval(interval);
        }, 1000);
    }


    /**
     *  Endboss is dead
     */
    EndbossKill() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 1000);
        setInterval(() => {
            gameOver();
        }, 2000);
    }


    /**
     *  Endboss move left
     */
    EndbossMoveLeft() {
        setInterval(() => {
            if (!this.EndbossIsDead()) {
                this.moveLeft();
            }
        }, 50);
    }


    /**
     *  is Endboss dead: is energy = 0? 
     */
    EndbossIsDead() {
        return this.energy == 0;
    }


    /**
     *  Endboss animation. If Endboss not dead - move to charackter 
     */
    animate() {
        setInterval(() => {
            if (this.isHit == false) {
                this.playAnimation(this.IMAGES_ANGRY);
            }
            if (this.contact == true && !this.EndbossIsDead()) {
                this.playAnimation(this.IMAGES_WALKING);
                this.EndbossMoveLeft();
            }
        }, 200);
    }
}