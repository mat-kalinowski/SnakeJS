
/**
* File with Snake class- class containing whole functionality of the game, with methods to start and end current party
* Instances of box are representing each segment of a snake,
* it's x and y coordinates and directions in which it will move in next two moves.
*/

var foodX=0;
var foodY=0;
var gameLoop;
var boxes = [];
var isStopped = 0;
var score = 0;


class Box {
  constructor(x, y,direction, nextDir){
    this.x = x;
    this.y = y;
    this.direction = direction;

    if(nextDir==undefined){
      this.nextDir = direction;
    }
  }
}

class Snake{

  constructor(canvas, ctx, boxSize){
    this.canvas = canvas;
    this.ctx = ctx;
    this.boxSize = boxSize;
  }

  startGame(){

    this.generateFood();
    boxes[0] = new Box(0,0,"DOWN");

    var _this = this;
    gameLoop = setInterval(function(){_this.gameTurn()},100);
  }

  gameTurn(){
    ctx.clearRect(boxes[boxes.length-1].x,boxes[boxes.length-1].y,this.boxSize,this.boxSize);
    this.setUpNewPositions();
    this.addNewTail();
    this.endIfFail();

    if(!isStopped){
      ctx.fillStyle="#000000";
      
      for(let i=0; i < boxes.length; i++)
        ctx.fillRect(boxes[i].x,boxes[i].y,this.boxSize-2,this.boxSize-2);

      ctx.clearRect(0,0,100,25);
      ctx.font = " bold 15px Arial";
      ctx.fillStyle = "green";
      ctx.fillText("SCORE: " + score, 10, 20);
    }

  }

  setUpNewPositions(){

    for(let i=1; i < boxes.length; i++)
      boxes[i].direction = boxes[i].nextDir;

    for(let i=0; i < boxes.length-1; i++)
      boxes[i+1].nextDir = boxes[i].direction;

    for(let i=0; i < boxes.length; i++){
      switch(boxes[i].direction){
        case "UP":
            if(boxes[i].y==0){
              boxes[i].y = canvas.height;
              break;
            }
            boxes[i].y-=this.boxSize;
            break;
        case "DOWN":
            if(boxes[i].y==canvas.height){
              boxes[i].y = 0;
              break;
            }
            boxes[i].y+=this.boxSize;
            break;
        case "RIGHT":
            if(boxes[i].x==canvas.width){
              boxes[i].x = 0;
              break;
            }
            boxes[i].x+=this.boxSize;
            break;
        case "LEFT":
            if(boxes[i].x==0){
              boxes[i].x = canvas.width;
              break;
            }
            boxes[i].x-=this.boxSize;
            break;
      }
    }
  }

  endIfFail(){
    for(let i = 1; i < boxes.length; i++){
      if(boxes[i].x==boxes[0].x && boxes[i].y == boxes[0].y){
        isStopped=1;
        this.endGame();
      }
    }
  }

  addNewTail(){

    if(boxes[0].x == foodX && boxes[0].y == foodY){
      ctx.clearRect(foodX,foodY,this.boxSize,this.boxSize);
      score += 50;
      let tail = boxes[boxes.length-1];
      switch(tail.direction){
        case "UP":
            boxes[boxes.length]=new Box(tail.x,tail.y+this.boxSize,tail.direction);
            break;
        case "DOWN":
            boxes[boxes.length]=new Box(tail.x,tail.y-this.boxSize,tail.direction);
            break;
        case "RIGHT":
            boxes[boxes.length]=new Box(tail.x-this.boxSize,tail.y,tail.direction);
            break;
        case "LEFT":
            boxes[boxes.length]=new Box(tail.x+this.boxSize,tail.y,tail.direction);
            break;
        }
      this.generateFood();
     }
  }

  setState(state){
    boxes[0].direction = state;
  }

  getState(){
    return boxes[0].direction;
  }

  generateFood(){
    do {
      var maxWidth = Math.floor(canvas.width / this.boxSize);
      var maxHeight = Math.floor(canvas.height / this.boxSize);
      foodX = Math.floor((Math.random() * maxWidth))*this.boxSize;
      foodY = Math.floor((Math.random() * maxHeight))*this.boxSize;
    } while(foodY < 25 && foodX <100);

    console.log(foodX + " " + foodY);

    ctx.fillStyle="#AA0000";
    ctx.fillRect(foodX,foodY,this.boxSize-2,this.boxSize-2);
  }

  endGame(){
    this.boxes = [];
    clearInterval(gameLoop);
    drawEndScreen();

  }
}
