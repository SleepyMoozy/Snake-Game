//board
//We use var to store variables - blockSize means how big a block is etc
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake Head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//Food
var foodX;
var foodY;

var gameOver






//Functions are designed to perform a particular task, like a formula
//that you can easily access again and again
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);// waits for a key up, then calls the function changeDirection
    //update();
    setInterval(update, 1000/10);//1000 miliseconds
}

function update() {
    if (gameOver) {
        if (score > highScore) {
            highScore = score;
        }
        alert("Game over! Your score: " + score + ". High score: " + highScore + ".");
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i> 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);
    context.fillText("High Score: " + highScore, 10, 40);

    //game over conditions - || = or
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
    gameOver = true;
    alert("Game over, damn you suck cuz.");
    }

    for (let i = 0; i< snakeBody.length; i++)
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Really?? Cant even dodge yourself... 😂");
        }

}


function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1)/*(if the up arrow key then...)*/{
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

//Random food placement function - Works by finding a random 
//number b/w 0,1 (math.random) then multiplying by col or rows (in this
//case 20) so to get a number between 1-10. Math.floor removes the .9999 from 19
//then it is multiplied by block size 
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function reloadPage() {
    location.reload();
}