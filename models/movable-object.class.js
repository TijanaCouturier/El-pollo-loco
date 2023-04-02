class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    active = true;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 200; //120
        }
    }


    isColliding(mo, q) {
        return (this.x + this.height >= mo.x) &&
            (this.y + this.width >= mo.y) &&
            this.x <= mo.x + mo.height - 20 &&
            (this.y <= mo.y + mo.width - q);
    }


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;

        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;

        return timepassed < 1.5;
    }


    isDead() {
        return this.energy == 0;
    }


    dead() {
        this.energy = 0;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }


    inactive() {
        this.active = false;
    }

}