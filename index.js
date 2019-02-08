function setUpGame(){
  var canvas = document.getElementById("myCanvas");
  var model = new Model(30,canvas.width,canvas.height);
  var controller = new Controller( model);
  var view = new View(controller);
  controller.setView(view);

  controller.startGame();
}
