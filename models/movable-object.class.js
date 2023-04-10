class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    active = true;


    /**
     * apply gravitiy on elements for the y-axis
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * apply gravitiy on Endboss for the y-axis
     */
    applyGravityB() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 27);
    }


    /**
     * returns object back to the ground or let them fall out of game
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 200;
        }
    }


    /**
     * checks if two objects are colliding together
     */
    isColliding(mo, q) {

        return (this.x + this.height - 50 >= mo.x) &&
            (this.y + this.width >= mo.y) &&
            this.x <= mo.x + mo.height - 20 &&
            (this.y <= mo.y + mo.width - q);
    }


    /**
     * If the character/chicken or small chicken has been damaged
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * When was the last time on element was damaged?
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;

        return timepassed < 1.5;
    }


    /**
     * function when an element is dead
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * function when an element is dead
     */
    dead() {
        this.energy = 0;
    }


    /**
     * animation of the images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * function for move right  
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * function for move left  
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * function for jump  
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * function when an element is not active
     */
    inactive() {
        this.active = false;
        isMusicOf = true;
    }
}