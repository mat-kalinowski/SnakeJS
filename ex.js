var boxSize = 20;
var boxes = [];
var foodX;
var foodY;
var enumDir = {up:"UP" , down:"DOWN" , left:"LEFT" , right:"RIGHT"}
var canvas;
var ctx;
var curr=0;
var gameLoop;

class Box {
  constructor(x, y, size,direction){
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
  }
}

function generateFood(){
  var maxWidth = Math.floor(canvas.width / boxSize);
  var maxHeight = Math.floor(canvas.height / boxSize);
  foodX = Math.floor((Math.random() * maxWidth))*boxSize;
  foodY = Math.floor((Math.random() * maxHeight))*boxSize;

  ctx.fillStyle="#AA0000";
  ctx.fillRect(foodX,foodY,boxSize,boxSize);
}

function addCanvas(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown",moveRect);
  generateFood();
  boxes[0] = new Box(0,0,boxSize,"DOWN","DOWN");

  gameLoop = setInterval(function(){
    for(let i=1; i < boxes.length; i++){
      boxes[i].direction = boxes[i].nextDir;
    }
    for(let i=0; i < boxes.length-1; i++){
      boxes[i+1].nextDir=boxes[i].direction;
    }
    ctx.clearRect(boxes[boxes.length-1].x,boxes[boxes.length-1].y,boxSize,boxSize);

    for(let i=0; i < boxes.length; i++){
      switch(boxes[i].direction){
        case enumDir.up:
            boxes[i].y-=boxSize;
            break;
        case enumDir.down:
            boxes[i].y+=boxSize;
            break;
        case enumDir.right:
            boxes[i].x+=boxSize;
            break;
        case enumDir.left:
            boxes[i].x-=boxSize;
            break;
      }
    }

    if(boxes[0].x == foodX && boxes[0].y == foodY){
      var lastBox = boxes[boxes.length-1];
      switch(lastBox.direction){
        case enumDir.up:
            boxes[boxes.length]=new Box(lastBox.x,lastBox.y+boxSize,boxSize,lastBox.direction);
            break;
        case enumDir.down:
            boxes[boxes.length]=new Box(lastBox.x,lastBox.y-boxSize,boxSize,lastBox.direction);
            break;
        case enumDir.right:
            boxes[boxes.length]=new Box(lastBox.x-boxSize,lastBox.y,boxSize,lastBox.direction);
            break;
        case enumDir.left:
            boxes[boxes.length]=new Box(boxes[boxes.length-1].x+boxSize,boxes[boxes.length-1].y,boxSize,boxes[boxes.length-1].direction);
            break;
      }
      generateFood();

    }
    ctx.fillStyle="#000000";

    for(let i=0; i < boxes.length; i++){
      ctx.fillRect(boxes[i].x,boxes[i].y,boxSize,boxSize);
    }
  },100);
}

function moveRect(e){
  switch(e.keyCode){
    case 37:
        boxes[0].direction="LEFT";
        break;
    case 38:
        boxes[0].direction="UP";
        break;
    case 39:
        boxes[0].direction="RIGHT";
        break;
    case 40:
        boxes[0].direction="DOWN";
        break;
  }
}

function gameOver(){

}
