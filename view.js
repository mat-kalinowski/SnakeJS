class View{

  static canvas = document.getElementById("myCanvas");
  static ctx = canvas.getContext("2D");
  static buttonWidth;
  static buttonHeight;

  constructor(controller){
    this.controller = controller;
    document.addEventListener("keydown",controller.moveSnake);
    canvas.addEventListener("click",controller.menuChoose);
  }

  moveUpTail(boxes){
    ctx.clearRect(boxes[boxes.length-1].x,boxes[boxes.length-1].y,this.boxSize,this.boxSize);
  }

  refreshSnake(boxes, foodX, foodY, score){
    ctx.fillStyle="#000000";
    for(let i=0; i < boxes.length; i++)
      ctx.fillRect(boxes[i].x,boxes[i].y,this.boxSize-2,this.boxSize-2);

    ctx.clearRect(0,0,100,25);
    ctx.font = " bold 15px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("SCORE: " + score, 10, 20);
    controller.gameTurn();
  }

  drawMenu(){
    var logo = new Image();
    logo.onload = function(){ ctx.drawImage(logo, canvas.width / 2 - logo.width / 2,canvas.height / 2 - logo.height - 50)};
    logo.src = "graphics/logo2.png";

    var playButton = new Image();
    playButton.onload = function(){ ctx.drawImage(playButton, canvas.width / 2 - playButton.width / 2,canvas.height / 2 - playButton.height+10);};
    playButton.src = "graphics/play.png";

    var scoresButton = new Image();
    scoresButton.onload = function(){ ctx.drawImage(scoresButton, canvas.width / 2 - scoresButton.width / 2,canvas.height / 2+15);};
    scoresButton.src = "graphics/scores.png";

    var speedButton = new Image();
    speedButton.onload = function(){ ctx.drawImage(speedButton, canvas.width / 2 - speedButton.width / 2,canvas.height / 2 + 20 + speedButton.height);};
    speedButton.src = "graphics/speed.png";
  }

  clearApp(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
  }

  drawEndScreen(score){
    var img = new Image();

    img.onload = function(){ ctx.drawImage(img, canvas.width / 2 - img.width / 2,canvas.height / 2 - img.height - 25); };
    img.src = "graphics/end.png";

    ctx.font = " bold 20px Arial";
    ctx.fillStyle = "#a20000";
    ctx.textAlign = "center";
    ctx.fillText("Your score: " + score, canvas.width/2, canvas.height/2);
  }
}
