class Character extends MovableObject {
    y = 49;
    x = 80;
    height = 130;
    width = 230;
    speed = 7;
    idle = 0;
    world;
    walking_sound = new Audio('audio/run.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    sleep_sound = new Audio('audio/sleep.mp3');
    checked = true;


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];



    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'

    ];


    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'

    ];


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }


    /**
     * character animation 
     * animation with keyboard and
     * chack is character dead, hurt, above ground and walk animation
     */
    animate() {
        this.animateKeyboard();

        setInterval(() => {
            if (this.isDead()) {
                this.characterDead();
            } else if (this.isHurt()) {
                this.characterIsHurt();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.walkAnimation();
            }
        }, 200);
    }


    /**
     * character animation
     * animation with keyboard
     */
    animateKeyboard() {
        setInterval(() => {
            if (!isMusicOf) {
                this.walking_sound.pause();
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.animateRight();
                this.sleep_sound.pause();
            }
            if (this.world.keyboard.LEFT && this.x > 50) {
                this.animateLeft();
                this.sleep_sound.pause();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.animateSpace();
                this.sleep_sound.pause();
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);
    }


    /**
     * character move right animation
     */
    animateRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!isMusicOf && this.active) {
            this.walking_sound.play();
        }
    }


    /**
     * character move left animation
     */
    animateLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if (!isMusicOf && this.active) {
            this.walking_sound.play();
        }
    }


    /**
     * character jump animation
     */
    animateSpace() {
        this.jump();
        if (!isMusicOf && this.active) {
            this.jump_sound.play();
        }
    }


    /**
     * character dead animation by game over
     */
    characterDead() {
        this.playAnimation(this.IMAGES_DEAD);
        gameOver();
    }


    /**
     * character is hurt - animation charater is hurt
     */
    characterIsHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (!isMusicOf) {
            this.hurt_sound.play();
        }
    }


    /**
     * walk animation for all game elements
     */
    walkAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idle = 0;
        } else if (this.idle < 25) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idle++;
        } else if (this.idle >= 25) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            if (!isMusicOf && this.active) {
                this.sleep_sound.play();
            }
            this.idle++;
        }
    }


    /**
     * jump speed for all game elements
     */
    jump() {
        this.speedY = 22;
        this.idle = 0;
    }
}