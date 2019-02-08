class Model{

  static boxes = [];
  static score = 0;
  static foodX;
  static foodY;

  constructor( boxsize, boardWidth, boardHeight ){
    this.boxsize = boxsize;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;

    boxes[0] = new Box(0,0,"DOWN");
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
              boxes[i].y = this.boardHeight;
              break;
            }
            boxes[i].y-=this.boxsize;
            break;
        case "DOWN":
            if(boxes[i].y==this.boardHeight){
              boxes[i].y = 0;
              break;
            }
            boxes[i].y+=this.boxsize;
            break;
        case "RIGHT":
            if(boxes[i].x==this.boardWidth){
              boxes[i].x = 0;
              break;
            }
            boxes[i].x+=this.boxsize;
            break;
        case "LEFT":
            if(boxes[i].x==0){
              boxes[i].x = this.boardWidth;
              break;
            }
            boxes[i].x-=this.boxsize;
            break;
      }
    }
  }

  endIfFail(){
    for(let i = 1; i < boxes.length; i++)
      if(boxes[i].x==boxes[0].x && boxes[i].y == boxes[0].y){
        return true;

    return false;
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

  setDirection(direction){
    boxes[0].direction = direction;
  }

  getDirection(direction){
    return boxes[0].direction;
  }

}

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
