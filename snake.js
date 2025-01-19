//Board (Game space)
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake Head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//Snake Speed
var velocityX = 0;
var velocityY = 0;

//Snake's Body
var snakeBody = [];

//Food (Points)
var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //This command is used to draw the board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  // update();
  setInterval(update, 1000 / 10); // Game is constantly redrawing the board by 100 milliseconds
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  // The snake's velocity is moving 1 pixel each 100 millisecond which makes it very tedious to move around
  {
    /*snakeX += velocityX;
        snakeY += velocityY; */
  }

  //To fix the speed, the velocity would need to be multiplied by the block size (which is one unit/square)
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //Game Over Conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize - 1 ||
    snakeY < 0 ||
    snakeY > rows * blockSize - 1
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
