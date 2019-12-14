// define general constants
const
  canvas = document.getElementById('canvasArea'),
  container = document.getElementById('main-container'),
  score = document.getElementById('score'),
  ctx = canvas.getContext('2d'),
  windowGeneralWidth = document.documentElement.clientWidth,
  windowGeneralHeight = document.documentElement.clientHeight,
  squareSize = 10,
  objectsPerLength = 15

// Canvas default size, remove blur and make vision clear
// canvas.width = 1000;
// canvas.height = 500;
canvas.width = windowGeneralWidth;
canvas.height = windowGeneralHeight * 0.95;

// define general variables
let
  currentDirection = "",
  snakeLength = 1,
  appleRandom_x = null,
  appleRandom_y = null,
  objectsArray = [
    { x: Math.floor(canvas.width / 2), y: Math.floor(canvas.height / 2) }
  ],
  apples = [],
  cooldown = false,
  step = 3,
  intervalPeriod = 10;
  intervalPeriodChanged = false;


function main() {

  function loop() {

    // Redndering of general black area
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, windowGeneralWidth, windowGeneralHeight);

    // coords of the first object in snake
    let coords_x = objectsArray[objectsArray.length - 1].x;
    let coords_y = objectsArray[objectsArray.length - 1].y;

    // checking direction and apply needed changed for a new pushed object
    if (currentDirection === "left") objectsArray.push({ x: coords_x - step, y: coords_y });
    if (currentDirection === "up") objectsArray.push({ x: coords_x, y: coords_y - step });
    if (currentDirection === "right") objectsArray.push({ x: coords_x + step, y: coords_y });
    if (currentDirection === "down") objectsArray.push({ x: coords_x, y: coords_y + step });

    // if snake go through the zone she could be visible on another one part
    if (coords_x > canvas.width) objectsArray[objectsArray.length - 1].x = 0;
    if (coords_x < 0) objectsArray[objectsArray.length - 1].x = canvas.width;
    if (coords_y > canvas.height) objectsArray[objectsArray.length - 1].y = 0;
    if (coords_y < 0) objectsArray[objectsArray.length - 1].y = canvas.height;

    // Rendering of all snake objects to be visible
    objectsArray.forEach(element => {
      ctx.fillStyle = "lime";
      ctx.fillRect(element.x, element.y, squareSize, squareSize);
    })

    // If max length of snake is maximum then delete first element so please for new pushs could be free
    if (objectsArray.length === snakeLength * objectsPerLength) {
      objectsArray.shift();
    }

    // if 0 apples, then push for a new apple, generate random place
    if (apples.length === 0) {
      appleRandom_x = Math.floor(Math.random() * canvas.width);
      appleRandom_y = Math.floor(Math.random() * canvas.height);

      applePosition = appleInZone({ x: appleRandom_x, y: appleRandom_y });
      appleInZone(applePosition);

      apples.push(applePosition);
    }

    // add apple to the screen
    ctx.fillStyle = "red";
    ctx.fillRect(apples[0].x, apples[0].y, squareSize, squareSize);

    // let apple_texture = document.getElementById('apple_texture');
    // console.log(apple_texture);
    // ctx.drawImage(apple_texture, apples[0].x, apples[0].y, 10, 10);

    // Checking if snake touched an apple
    if (
      (objectsArray[objectsArray.length - 1].x - apples[0].x < 10 && objectsArray[objectsArray.length - 1].x - apples[0].x > -10) &&
      (objectsArray[objectsArray.length - 1].y - apples[0].y < 10 && objectsArray[objectsArray.length - 1].y - apples[0].y > -10)) {
      ++snakeLength;
      if (intervalPeriod != 1) {
        intervalPeriod -= 0.15;
      }
      intervalPeriodChanged = true;
      apples.length = 0;
      updateScore(snakeLength);
    }

    // Checking if snake touch himself, in this case game over
    for (let i = 0; i < objectsArray.length; i++) {
      if (i === objectsArray.length - 1) { continue; }
      if (
        (objectsArray[objectsArray.length - 1].x - objectsArray[i].x < step && objectsArray[objectsArray.length - 1].x - objectsArray[i].x > -step) &&
        (objectsArray[objectsArray.length - 1].y - objectsArray[i].y < step && objectsArray[objectsArray.length - 1].y - objectsArray[i].y > -step)
      ) {
        gameOver();
      }
    }

    // console.log('-------------------------------------------------------------')
    // console.log("X of snake head: " + objectsArray[objectsArray.length-1].x);
    // console.log("X of the second element: " + objectsArray[objectsArray.length-2].x);
    // console.log("Y of the head: " + objectsArray[objectsArray.length-1].y);
    // console.log("Y of the second element: " + objectsArray[objectsArray.length-2].y);


    if (intervalPeriodChanged) {
      clearInterval(mainInterval);
      mainInterval = setInterval(loop, intervalPeriod);
    }
    // clearInterval(mainInterval);

  }

  var mainInterval = setInterval(loop, intervalPeriod);

}

function appleInZone(applePosition) {
  if (applePosition.x < 30) { applePosition.x = 30 }
  if (applePosition.x > canvas.width - squareSize) { applePosition.x = canvas.width - 30 }
  if (applePosition.y < 30) { applePosition.y = 30 }
  if (applePosition.y > canvas.height - squareSize) { applePosition.y = canvas.height - 30 };

  return applePosition;
}

function gameOver() {
  objectsArray = [
    { x: Math.floor(canvas.width / 2), y: Math.floor(canvas.height / 2) }
  ]
  currentDirection = "";
  snakeLength = 1;
  apples.length = 0;
  appleRandom_x = null;
  appleRandom_y = null;
  intervalPeriod = 10;
  updateScore(0);
  alert('GAME OVER');
}

function updateScore(count) {
  score.querySelector('span').innerHTML = count;
}

// Keydown listener / function, change current direction of the snake
document.addEventListener('keydown', () => {

  if (cooldown === false) {

    if ((event.keyCode === 37 || event.keyCode === 65) && (currentDirection != "right" && currentDirection != "left")) {
      currentDirection = "left";
      keyCooldown();
    }
    if ((event.keyCode === 38 || event.keyCode === 87) && (currentDirection != "up" && currentDirection != "down")) {
      currentDirection = "up";
      keyCooldown();
    }
    if ((event.keyCode === 39 || event.keyCode === 68) && (currentDirection != "right" && currentDirection != "left")) {
      currentDirection = "right";
      keyCooldown();
    }
    if ((event.keyCode === 40 || event.keyCode === 83) && (currentDirection != "down" && currentDirection != "up")) {
      currentDirection = "down";
      keyCooldown();
    }

  }

})

function keyCooldown() {
  if (cooldown === false) {
    cooldown = true;
    setTimeout(() => { cooldown = false }, 10);
  }
}

main();