// define general constants
const
  canvas = document.getElementById('canvasArea'),
  container = document.getElementById('main-container'),
  score = document.getElementById('score'),
  ctx = canvas.getContext('2d'),
  windowGeneralWidth = document.documentElement.clientWidth,
  windowGeneralHeight = document.documentElement.clientHeight,
  squareSize = 10,
  step = 1,
  objectsPerLength = 20

// Canvas default size, remove blur and make vision clear
canvas.width = 1000;
canvas.height = 500;

// define general let
let
  currentDirection = "",
  snakeLength = 5,
  appleRandom_x = null,
  appleRandom_y = null,
  objectsArray = [
    { x: Math.floor(canvas.width/2), y: Math.floor(canvas.height /2) }
  ],
  apples = []


function main() {

  setInterval(() => {

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
      ctx.fillStyle="lime";
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

      // fix the possible bug so apple could respawn super close to the end of the map
      appleRandom_x = appleRandom_x < 30 ? 30 : appleRandom_x;
      appleRandom_x = appleRandom_x > canvas.width ? canvas.width - 30 : appleRandom_x;
      appleRandom_y = appleRandom_y < 30 ? 30 : appleRandom_y;
      appleRandom_y = appleRandom_y > canvas.height ? canvas.height - 30 : appleRandom_y;

      apples.push({x: appleRandom_x, y: appleRandom_y});
    }

    // add apple to the screen
    ctx.fillStyle="red";
    ctx.fillRect(apples[0].x, apples[0].y, squareSize, squareSize);

    // Checking if snake touched an apple
    if (
      (objectsArray[objectsArray.length - 1].x - apples[0].x < 10 && objectsArray[objectsArray.length - 1].x - apples[0].x > -10) &&
      (objectsArray[objectsArray.length - 1].y - apples[0].y < 10 && objectsArray[objectsArray.length - 1].y - apples[0].y > -10) ) 
    {
      ++snakeLength;
      apples.length = 0;
      updateScore(snakeLength);
    }

    for (let i = 0; i < objectsArray.length; i++) {
      if (i === objectsArray.length-1) {continue;}
      if (
        (objectsArray[objectsArray.length - 1].x - objectsArray[i].x < step && objectsArray[objectsArray.length - 1].x - objectsArray[i].x > -step) &&
        (objectsArray[objectsArray.length - 1].y - objectsArray[i].y < step && objectsArray[objectsArray.length - 1].y - objectsArray[i].y > -step)
         )
      {
        gameOver();
      }
    }

    // console.log('-------------------------------------------------------------')
    // console.log("X of snake head: " + objectsArray[objectsArray.length-1].x);
    // console.log("X of the second element: " + objectsArray[objectsArray.length-2].x);
    // console.log("Y of the head: " + objectsArray[objectsArray.length-1].y);
    // console.log("Y of the second element: " + objectsArray[objectsArray.length-2].y);


  }, 1);

}

function checkDirection() {
  
}

function gameOver() {
  objectsArray = [
    { x: Math.floor(canvas.width/2), y: Math.floor(canvas.height /2) }
  ]
  currentDirection = "";
  snakeLength = 5;
  apples.length = 0;
  appleRandom_x = null;
  appleRandom_y = null;
  updateScore(5);
  alert('GAME OVER');
}

function updateScore(count) {
  score.querySelector('span').innerHTML = count;
}

// Keydown listener / function, change current direction of the snake
document.addEventListener('keydown', () => {

  console.log("EVENT KEY CODE - " + event.keyCode);

  if (event.keyCode === 32) {
    // gamePause();
  }

  if ((event.keyCode === 37 || event.keyCode === 65) && (currentDirection != "right" && currentDirection != "left")) {
    currentDirection = "left";
    // console.log("left");
  }
  if ((event.keyCode === 38 || event.keyCode === 87) && (currentDirection != "up" && currentDirection != "down")) {
    currentDirection = "up";
    // console.log("up");
  }
  if ((event.keyCode === 39 || event.keyCode === 68) && (currentDirection != "right" && currentDirection != "left")) {
    currentDirection = "right";
    // console.log("right");
  }
  if ((event.keyCode === 40 || event.keyCode === 83) && (currentDirection != "down" && currentDirection != "up")) {
    currentDirection = "down";
    // console.log("down");
  }

})

main();