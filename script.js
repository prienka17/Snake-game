const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;               // Size of each grid cell
const canvasSize = 400;            // Canvas is 400x400
const totalCells = canvasSize / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = getRandomFood();
let score = 0;

// Game loop
function gameLoop() {
  update();
  if (checkCollision()) {
    alert("Game Over! Final Score: " + score);
    resetGame();
    return;
  }

  draw();
}

function update() {
  const head = { ...snake[0] };

  // Move head in direction
  head.x += direction.x;
  head.y += direction.y;

  snake.unshift(head); // Add new head

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = getRandomFood();
  } else {
    snake.pop(); // Remove tail if no food eaten
  }
}

function draw() {
  // Clear canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  ctx.fillStyle = "#0f0";
  for (let segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function checkCollision() {
  const [head, ...body] = snake;

  // Wall collision
  if (
    head.x < 0 || head.x >= totalCells ||
    head.y < 0 || head.y >= totalCells
  ) return true;

  // Self collision
  for (let segment of body) {
    if (segment.x === head.x && segment.y === head.y) return true;
  }

  return false;
}

function getRandomFood() {
  let position;
  while (true) {
    position = {
      x: Math.floor(Math.random() * totalCells),
      y: Math.floor(Math.random() * totalCells)
    };
    // Make sure it's not on the snake
    if (!snake.some(s => s.x === position.x && s.y === position.y)) break;
  }
  return position;
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = getRandomFood();
  score = 0;
  document.getElementById("score").innerText = "Score: 0";
}

// Handle arrow key input
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Start game loop
setInterval(gameLoop, 150);
