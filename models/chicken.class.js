class Chicken extends MovableObject {
    y = 350;
    width = 80;
    height = 90;
    currentImage = 0;
    energy = 100;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * (720 * 9);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    /**
     *  chicken is dead
     */
    dead() {
        super.dead();
    }


    /**
     *  chicken animation
     * if chickene dead, dead image is shown
     * if chicken is not dead then image walking is shown
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}