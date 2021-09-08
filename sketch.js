var background1,back2,spike,plat1,plat1img,plat2,plat3,plat4,back1,laser,ball,ball1,next;
var ground1,ground2,invisible;
var obstacle, obstacleImage, obstacleGroup;
var objects, objectsImage,objectsGroup;
var groundd;

var PLAY = 1;
var END = 0;
gameState = PLAY;
var score = 0;
var GamOver;
function preload(){
  spike = loadImage("unnamed.png");
  plat1img = loadImage("plat1.png");
  plat2 = loadImage("2.png");
  plat3 = loadImage("3.png");
  plat4 = loadImage("4.png");
  background1 = loadImage("5.jpg");
  laser = loadImage("laser1.png");
  ball = loadImage("player.png");
  next = loadImage("next.png");
  objectsImage = loadImage("star.png");
  obstacleImage = loadImage("unnamed.png")


}
function setup() {
  createCanvas(900,650);
  
groundd = createSprite(450,300);

back2 = createSprite(400,250);
back2.addImage(background1);
back2.velocityX = -7;
back2.scale=1.09;
invisible = createSprite(450,640,900,20);
invisible.visible = true;

ball1 = createSprite(45,620);
ball1.addImage(ball);
ball1.scale = 0.4;
//ball1.debug=true;
ball1.setCollider("circle",0,0,60)
 
obstacleGroup = new Group();
  objectsGroup = new Group();
  plat1Group = new Group();
}

function draw() {
  background("red");  
  if(gameState===PLAY){
  if(back2.x<0){
    back2.x=back2.width/2;
  }
  ball1.collide(invisible);
if(keyDown("UP_ARROW")){
  ball1.velocityY= -6;
}
if (objectsGroup.isTouching(ball1)){
  objectsGroup.destroyEach ();
  score = score + 2;
}
if (obstacleGroup.isTouching(ball1)){
  obstacleGroup.destroyEach ();
  score = score - 2;
}
if(plat1Group.isTouching(ball1)){
  ball1.velocityY=0;
}

ball1.velocityY=ball1.velocityY+0.5
    spawnObstacles()
    spawnObjects()
  drawSprites();

  if(score < 0){
    obstacleGroup.destroyEach ();
    objectsGroup.destroyEach ();
    ball1.velocityY= 0;
    objects.velocityX = 0;
    obstacle.velocityX = 0;
    back2.velocityX = -0;
    
    plat1.velocityX=0;
    gameState=END;

  }
}
if(gameState===END){
  textSize(50);
  fill("blue");
  text("Game Over", 450,325);
}
 
  textSize(20);
  fill("green");
  text("Score: "+ score, 380,50);
}

function spawnObjects(){
  if (frameCount%200===0){
    plat1 = createSprite(1000,250,50,50);
    plat1.addImage(plat1img);
    plat1.y = Math.round (random(100,850));
    plat1.scale=0.5
    plat1.velocityX=-7;
    plat1.lifetime =800;
      objects = createSprite (1000,plat1.y-55,10,20);
      objects.addImage (objectsImage);
      objects.scale = 0.5;
     
      objects.lifetime = 800;
      objects.velocityX = -7;
      objectsGroup.add (objects) ;  
      plat1Group.add(plat1);   
      
    }
  }
  function spawnObstacles(){
    if (frameCount%100===0){
        obstacle = createSprite (1000,605,10,10);
        obstacle.addImage (obstacleImage);
        obstacle.x = Math.round(random(1000,3000));
        obstacle.scale = 0.2;
        obstacle.lifetime = 800;
        obstacle.velocityX = -7;
        obstacleGroup.add (obstacle);
        
    }
  }