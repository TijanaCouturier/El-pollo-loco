class ThrowableObject extends MovableObject {

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
        this.clean();
    }


    throw () {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => this.x += 12, 25);
        setInterval(() => this.playAnimation(this.IMAGES_ROTATION), 50);
    }


    clean() {
        var refreshIntervalId = setInterval(() => {
            if (this.currentImage < this.IMAGES_CLEAN.length)
                this.playAnimationA(this.IMAGES_CLEAN);
            else {
                clearInterval(refreshIntervalId);
            }
        }, 10);
    }
}