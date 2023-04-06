class ThrowableObject extends MovableObject {
    test = 12;

    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_CLEAN = ['img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        ''
    ];


    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
    }


    /**
     * throw bottle with rotation
     */
    throw () {
        this.speedY = 17;
        this.applyGravityB();
        setInterval(() => this.x += this.test, 25);
        setInterval(() => this.playAnimation(this.IMAGES_ROTATION), 50);
    }


    /**
     * the bottle will splash when hitting enemies or endbos
     */
    clean() {
        this.active = false;
        this.speedY = 0;
        this.acceleration = 0;
        this.test = 0;

        setInterval(() => this.playAnimationA(this.IMAGES_CLEAN), 50);
    }
}