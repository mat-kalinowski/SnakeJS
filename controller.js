class Controller{

  constructor( model){
    this.model = model;
  }

  gameLoop;
  state = "menu";

  setView(view){
    this.view = view;
  }

  startGame(){
    view.drawMenu();
  }

  moveSnake(ev){
    if(state == "play"){
      switch(e.keyCode){
        case 37:
            if(model.getDirection()!="RIGHT")
              model.setDirection("LEFT");
            break;
        case 38:
            if(model.getDirection()!="DOWN")
              model.setDirection("UP");
            break;
        case 39:
            if(model.getDirection()!="LEFT")
              model.setDirection("RIGHT");
            break;
        case 40:
            if(model.getDirection()!="UP")
              model.setDirection("DOWN");
            break;
      }
    }
  }

  menuChoose(ev){
    var buttonX = view.canvas.width / 2 - view.buttonWidth / 2;

    if(state == "menu"){
      menuChoose(ev.clientX);
    }

    else if(state == "end"){
      menuChoose(ev.clientY);
    }
  }

  endChoose(x,y){

  }

  menuChoose(x,y){
    if(x >= view.canvas.width / 2 - view.buttonWidth / 2 && x =< view.canvas.width / 2 - view.buttonWidth / 2 ){

      if(y >= canvas.height / 2 - view.buttonHeight + 10 && y =< canvas.height / 2 + 10){
        state = "play";
        view.generateFood();
        view.refreshSnake(model.boxes,model.foodX,model.foodY);
      }
    }
  }

  gameTurn(){
    model.setUpNewPositions();
    model.addNewTail();
    if(model.endIfFail()){endGame()};
    gameLoop = window.requestAnimationFrame(function(){view.refreshScreen(model.boxes, model.foodX, model.foodY, model.score);});
  }

  endGame(){
    state = "end";
    windwo.cancelAnimationFrame(gameLoop);
    view.drawEndScreen();
  }
}
