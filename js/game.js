let canvas;
let world;
let keyboard = new Keyboard();
music = new Audio('audio/music.mp3');
let isMusicOf = false;
let itsAlreadyExit = true;
let checked = true;
let isFullscreen = true;


function init() {
    canvas = document.getElementById('canvas');
}


function startGame() {
    initLevel();
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('startImg').classList.add('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('infoDescription').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start-btn').classList.add('d-none');
    document.getElementById('fullscreen-div').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    this.music.play();
    touchButtons();
}


function restart() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('startImg').classList.remove('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('infoDescription').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('start-btn').classList.remove('d-none');
    document.getElementById('fullscreen-div').classList.add('d-none');
    canvas = document.getElementById('canvas');
    this.music.pause();
    //  document.getElementById('showFullscreen').setAttribute('onclick', `javascript: closeFullscreen()`);
}


function gameOver() {
    setTimeout(() => {
        document.getElementById('start-btn').classList.add('d-none');
        document.getElementById('overlay').classList.add('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('gameOver').classList.remove('d-none');
        document.getElementById('fullscreen-div').classList.add('d-none');

        this.music.pause();
    }, 600);
}


function musicOf() {
    if (!isMusicOf) {
        this.music.pause();
        document.getElementById('btnMute1').src = 'img/mute-off.png';
        isMusicOf = true;
    } else {
        this.music.play();
        document.getElementById('btnMute1').src = 'img/speaker-on.png';
        isMusicOf = false;
    }
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});


function touchButtons() {
    this.buttonLeft();
    this.buttonRight();
    this.buttonJump();
    this.buttonThrow();
}


function buttonLeft() {
    document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (event) => {
        keyboard.LEFT = false;
    });
}


function buttonRight() {
    document.getElementById('btnRight').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (event) => {
        keyboard.RIGHT = false;
    });
}


function buttonJump() {
    document.getElementById('btnJump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (event) => {
        keyboard.SPACE = false;
    });
}


function buttonThrow() {
    document.getElementById('btnThrow').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (event) => {
        keyboard.D = false;
    });
}


/**
 * open fullscreen
 */
function fullscreen() {
    let startContainer = document.getElementById('startContainer');
    startContainer.requestFullscreen();

    document.getElementById('canvas').classList.add('canvasFullscreen');
    document.getElementById('gameOver').classList.remove('startContainer');
    document.getElementById('gameOver').classList.add('gameOverFullscreen');
    document.getElementById('go').classList.add('gameOverFullscreen');
    document.getElementById('gameOverImg').classList.add('gameOverFullscreen');
    document.getElementById('showFullscreen').setAttribute('onclick', `javascript: closeFullscreen()`);
    document.getElementById('overlay').classList.remove('d-none');
    fullscreenIcon();
}


function fullscreenIcon() {
    if (!isFullscreen) {
        document.getElementById('showFullscreen').src = 'img/fullscreen.png'
        document.getElementById('startContainer').classList.add('fullscreen');
    } else {
        document.getElementById('showFullscreen').src = 'img/exitFullscreeen.png'
    }
}


/**
 * close fullscreen
 */
function closeFullscreen() {
    document.exitFullscreen();
    document.getElementById('startContainer').classList.remove('fullscreen');
    document.getElementById('showFullscreen').setAttribute('onclick', `javascript: fullscreen()`);
    document.getElementById('showFullscreen').src = 'img/fullscreen.png'
}


function exitFullscreen() {
    if (document.exitFullscreen == null) {
        document.exitFullscreen();
    } else if (document.webkitRequestFullscreen) {
        document.webkitExitFullscreen();
    }
    itsAlreadyExit = false;
}