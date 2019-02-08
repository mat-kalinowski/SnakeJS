/**
* @author: Mateusz Kalinowski, github.com/mat-kalinowski
*
* Simple snake game written in pure JS with some user friendly interface
*/

var snake;
var logo;
var playButton;
var state;

function addCanvas(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown",moveRect);
  //canvas.addEventListener("mousemove", checkPos);
  canvas.addEventListener("click", menuRedirect);
  drawMenu();


}

function menuRedirect(e){
  if(e.clientX >playX && e.clientX < playX + playButton.width){
    if(e.clientY > playY && e.clientY < playY + playButton.height && state=="menu"){
      state ="play";
      clearApp();
      snake = new Snake(canvas, ctx, 20);
      snake.startGame();

    }
  }
}

function moveRect(e){
  switch(e.keyCode){
    case 37:
        if(snake.getState()!="RIGHT")
          snake.setState("LEFT");
        break;
    case 38:
        if(snake.getState()!="DOWN")
          snake.setState("UP");
        break;
    case 39:
        if(snake.getState()!="LEFT")
          snake.setState("RIGHT");
        break;
    case 40:
        if(snake.getState()!="UP")
          snake.setState("DOWN");
        break;
  }
}

function drawEndScreen(){
  clearApp();
  var img = new Image();

  img.onload = function(){ ctx.drawImage(img, canvas.width / 2 - img.width / 2,canvas.height / 2 - img.height - 25); };
  img.src = "graphics/end.png";

  ctx.font = " bold 20px Arial";
  ctx.fillStyle = "#a20000";
  ctx.textAlign = "center";
  ctx.fillText("Your score: " + score, canvas.width/2, canvas.height/2);
}

function clearApp(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function drawMenu(){
  state = "menu";
  clearApp();
  logo = new Image();
  logo.onload = function(){ ctx.drawImage(logo, canvas.width / 2 - logo.width / 2,canvas.height / 2 - logo.height - 50)};
  logo.src = "graphics/logo2.png";

  playButton = new Image();
  playButton.onload = function(){ ctx.drawImage(playButton, canvas.width / 2 - playButton.width / 2,canvas.height / 2 - playButton.height+10);};
  playButton.src = "graphics/play.png";
  playX= canvas.width / 2 - playButton.width / 2;
  playY= canvas.height / 2 - playButton.height+10;

  var scoresButton = new Image();
  scoresButton.onload = function(){ ctx.drawImage(scoresButton, canvas.width / 2 - scoresButton.width / 2,canvas.height / 2+15);};
  scoresButton.src = "graphics/scores.png";

  var speedButton = new Image();
  speedButton.onload = function(){ ctx.drawImage(speedButton, canvas.width / 2 - speedButton.width / 2,canvas.height / 2 + 20 + speedButton.height);};
  speedButton.src = "graphics/speed.png";
}
