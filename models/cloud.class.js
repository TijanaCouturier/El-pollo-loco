class Cloud extends MovableObject {
    y = 10;
    width = 280;
    height = 650;
    speed = 0.15;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 200 + Math.random() * (720 * 9);
        this.animate();
    }


    /**
     * cloud animation
     */
    animate() {
        this.moveLeft();
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}