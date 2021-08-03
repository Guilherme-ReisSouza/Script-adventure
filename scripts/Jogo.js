const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let control = false

ball = new Image()
ball.src = "../ball.png"

playerI = new Image()
playerI.src = "../player.png"

brick1 = new Image()
brick1.src = "../brick1.png"

brick2 = new Image()
brick2.src = "../brick2.png"

brick3 = new Image()
brick3.src = "../brick3.png"

brick4 = new Image()
brick4.src = "../brick4.png"

wall2 = new Image()
wall2.src = "../wall2.png"

fundo = new Image()
fundo.src = "./background.png"

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const mapa = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ['B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','W2'],
    ['B2','B3','B4','B1','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B1','B3'],
    ['B3','B4','W2','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','W2','B1'],
    ['B4','W2','B1','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B1','B4'],
    ['W2','B1','B2','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B3','B2'],
    ['B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B2','B3','B4','W2','B1','B4','W2'],

];

shuffle(mapa[8])
shuffle(mapa[9])
shuffle(mapa[10])
shuffle(mapa[11])
shuffle(mapa[12])
shuffle(mapa[13])
shuffle(mapa[8], mapa[9], mapa[10], mapa[11], mapa[12], mapa[13])

const mapaDasImagens = {

    'B1': "orange",
    'B2':"red",
    'B3': "yellow",
    'B4':"blue",
    "W2": "green",
};

const blocoLarg = 16;
const blocoAlt = 16;

const muroTile = 16;
const blocos = [];

let pontos = 0;

let vida = 3

for (let x = 0; x < mapa.length; x++) {

    for (let y = 0; y< mapa[x].length; y++) {

        const imgRender = mapa[x][y];

        blocos.push(
            {

            x: muroTile + blocoLarg  * y,
            y: muroTile + blocoAlt  * x,
            color: mapaDasImagens[imgRender],
            width: blocoLarg,
            height:blocoAlt,
        });
    }
}

const player = {

    x:canvas.width / 2 - blocoLarg / 2,
    y: 432,
    width: 48,
    height: 16,
    dx: 0
};

const bolinha = {

    x:130,
    y:260,
    width: 16,
    height: 16,
    speed:2,
    dx:0,
    dy:0,
};

function colisao(obj1, obj2) {

    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y;
}

function loop() {

    requestAnimationFrame(loop);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // move paddle by it's velocity
   player.x += player.dx;

    // prevent paddle from going through walls
    if (player.x < muroTile) {
        player.x = muroTile
    }
    else if (player.x + player.width > canvas.width - muroTile) {
        player.x = canvas.width - muroTile - player.width;
    }

    // move ball by it's velocity
    bolinha.x += bolinha.dx;
    bolinha.y += bolinha.dy;

    // prevent ball from going through walls by changing its velocity
    // left & right walls
    if (bolinha.x < muroTile) {
        bolinha.x = muroTile;
        bolinha.dx *= -1;
    }
    else if (bolinha.x + bolinha.width > canvas.width - muroTile) {
        bolinha.x = canvas.width - muroTile - bolinha.width;
        bolinha.dx *= -1;

    }
    // top wall
    if (bolinha.y < 112) {
       bolinha.y = 112;
        bolinha.dy *= -1;

    }

    // reset ball if it goes below the screen
    if (bolinha.y > canvas.height) {
       bolinha.x = 130;
        bolinha.y = 260;
       bolinha.dx = 0;
       bolinha.dy = 0;
       vida -= 1;
    }

    if (vida === 0) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pontos = 0;
        ctx.fillStyle = "black";
        ctx.font = "40px IBM Plex Serif bold";
        ctx.fillText("VOCE PERDEU", 120, 300);
        ctx.font = "20px IBM Plex Serif bold";
        ctx.fillText("APERTE F5 P/ REINICIAR", 48, 350);
    }
    if (pontos === 1680) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "40px IBM Plex Serif bold";
        ctx.fillText("VOCE GANHOU", 120, 300);
        ctx.font = "20px IBM Plex Serif bold";
        ctx.fillText("APERTE F5 P/ REINICIAR", 48, 350);
    }

    // check to see if ball collides with paddle. if they do change y velocity
    if (colisao(bolinha, player)) {
        bolinha.dy *= -1;

        // move ball above the paddle otherwise the collision will happen again
        // in the next frame
        bolinha.y = player.y - bolinha.height;
    }

    // check to see if ball collides with a brick. if it does, remove the brick
    // and change the ball velocity based on the side the brick was hit on
    for (let i = 0; i < blocos.length; i++) {
        const brick = blocos[i];

        if (colisao(bolinha, brick)) {
            // remove brick from the bricks array
            blocos.splice(i, 1);
            pontos += 10


            // ball is above or below the brick, change y velocity
            // account for the balls speed since it will be inside the brick when it
            // collides
            if (bolinha.y + bolinha.height - bolinha.speed <= brick.y ||
                bolinha.y >= brick.y + brick.height - bolinha.speed) {
                bolinha.dy *= -1;

            }
            // ball is on either side of the brick, change x velocity
            else {
                bolinha.dx *= -1;
            }

            break;
        }
    }


        // draw ball if it's moving
        if (bolinha.dx || bolinha.dy) {
            ctx.drawImage(ball, bolinha.x, bolinha.y, bolinha.width, bolinha.height);
        }

        // draw bricks
        blocos.forEach(function (brick) {

            if (brick.color === "orange") {

                ctx.drawImage(brick1, brick.x, brick.y, brick.width, brick.height)
            } else if (brick.color === "red") {

                ctx.drawImage(brick2, brick.x, brick.y, brick.width, brick.height)
            } else if (brick.color === "yellow") {

                ctx.drawImage(brick3, brick.x, brick.y, brick.width, brick.height)
            } else if (brick.color === "blue") {

                ctx.drawImage(brick4, brick.x, brick.y, brick.width, brick.height)
            } else if (brick.color === "green") {

                ctx.drawImage(wall2, brick.x, brick.y, brick.width, brick.height)
            } else {

                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });


    ctx.fillStyle = "black";
    ctx.font = "20px IBM Plex Serif bold";
    ctx.fillText( pontos, 59, 55)

    ctx.fillStyle = "black";
    ctx.font = "20px IBM Plex Serif bold";
    ctx.fillText( vida, 395, 55);

    // draw paddle

    ctx.drawImage(playerI, player.x, player.y, player.width, player.height);

}

function controle() {

    // listen to keyboard events to move the paddle

    if (control === true) {

        document.addEventListener('keydown', function (e) {
            // left arrow key
            if (e.which === 37) {
                player.dx = -3;
            }
            // right arrow key
            else if (e.which === 39) {
                player.dx = 3;
            }

            // space key
            // if they ball is not moving, we can launch the ball using the space key. ball
            // will move towards the bottom right to start
            if (bolinha.dx === 0 && bolinha.dy === 0 && e.which === 32) {
                bolinha.dx = 2;
                bolinha.dy = 2;
            }
        });

        // listen to keyboard events to stop the paddle if key is released
        document.addEventListener('keyup', function (e) {
            if (e.which === 37 || e.which === 39) {
                player.dx = 0;
            }
        });
    }
    else if (control === false){

        document.addEventListener('keydown', function (e) {
            // left arrow key
            if (e.which === 37) {
                player.dx = 0;
            }
            // right arrow key
            else if (e.which === 39) {
                player.dx = 0;
            }

            // space key
            // if they ball is not moving, we can launch the ball using the space key. ball
            // will move towards the bottom right to start
            if (bolinha.dx === 0 && bolinha.dy === 0 && e.which === 32) {
                bolinha.dx = 0;
                bolinha.dy = 0;
            }
        });

        // listen to keyboard events to stop the paddle if key is released
        document.addEventListener('keyup', function (e) {
            if (e.which === 37 || e.which === 39) {
                player.dx = 0;
            }
        });
    }
}
requestAnimationFrame(loop);

function startGame() {

    control = true
    controle();

    window.addEventListener("keydown", function(e) {

        if([32, 37, 38, 39, 40].indexOf(e.key) > -1) {
            e.preventDefault();
        }
    }, false);
}