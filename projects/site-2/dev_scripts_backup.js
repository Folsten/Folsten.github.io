// function main() {

//   setInterval(() => {

//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, windowGeneralWidth, windowGeneralHeight);

//     let coords_x = objectsArray[objectsArray.length - 1].x;
//     let coords_y = objectsArray[objectsArray.length - 1].y;

//     if (currentDirection === "left") {
//       objectsArray.push({ x: coords_x - step, y: coords_y });

//       // coords_x = objectsArray[objectsArray.length - 1].x;
//       // coords_y = objectsArray[objectsArray.length - 1].y;
//       objectsArray.forEach(element => {
//         ctx.fillStyle="lime";
//         ctx.fillRect(element.x, element.y, squareSize, squareSize);
//       })

//       // ctx.fillStyle = "lime";
//       // ctx.fillRect(coords_x, coords_y, squareSize, squareSize);
//     }

//     if (currentDirection === "up") {
//       objectsArray.push({ x: coords_x, y: coords_y - step });

//       coords_x = objectsArray[objectsArray.length - 1].x;
//       coords_y = objectsArray[objectsArray.length - 1].y;

//       ctx.fillStyle = "lime";
//       ctx.fillRect(coords_x, coords_y, squareSize, squareSize);
//     }

//     if (currentDirection === "right") {
//       objectsArray.push({ x: coords_x + step, y: coords_y });

//       coords_x = objectsArray[objectsArray.length - 1].x;
//       coords_y = objectsArray[objectsArray.length - 1].y;

//       ctx.fillStyle = "lime";
//       ctx.fillRect(coords_x, coords_y, squareSize, squareSize);
//     }

//     if (currentDirection === "down") {
//       objectsArray.push({ x: coords_x, y: coords_y + step });

//       coords_x = objectsArray[objectsArray.length - 1].x;
//       coords_y = objectsArray[objectsArray.length - 1].y;

//       ctx.fillStyle = "lime";
//       ctx.fillRect(coords_x, coords_y, squareSize, squareSize);
//     }

//     console.log(objectsArray);

//     if (objectsArray.length === snakeLength * objectsPerLength) {
//       let erase_coords = objectsArray.shift();
//       ctx.fillStyle = "black";
//       ctx.fillRect(erase_coords.x - 1, erase_coords.y - 1, squareSize + 1, squareSize + 1);
//     }

//   }, 10);

// }