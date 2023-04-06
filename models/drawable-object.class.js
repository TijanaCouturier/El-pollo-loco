class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    IMAGES_CLEAN = [];


    /**
     * loads the image
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * draws all canvas elements with a try/catch statement
     * @param {canvas 2d context} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
        } catch (e) {}
    }


    /**
     * loads array of image
     * @param {array} arr 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            img.style = 'tranform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }


    /**
     * animation of the images
     */
    playAnimationA(images) {
        let i = this.currentImage % images.length;
        this.img.src = images[i];
        this.currentImage++;
    }
}