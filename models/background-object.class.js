class BackgroundObject extends MovableObject {

    x = 0;
    y = 0;
    width = 480;
    height = 720;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}