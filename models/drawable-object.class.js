class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    IMAGES_CLEAN = [];


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
        } catch (e) {
            // console.warn('Error loading image', e);
            // console.log('Could not load image,', this.img);
        }
    }



    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            img.style = 'tranform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }


    playAnimationA(images) {
        let i = this.currentImage % images.length;
        this.img.src = images[i];
        this.currentImage++;
    }
}