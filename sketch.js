var PLAY = 1;
var END = 0;
var GAIN = 1;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var backgroundImage;
var gameover,restart;

function preload(){
  
monkey_running =  loadAnimation("sprite_0.png","sprite_1.png",
  "sprite_2.png","sprite_3.png","sprite_4.png",
  "sprite_5.png","sprite_6.png",
  "sprite_7.png","sprite_8.png")
  
backgroundImage =loadImage("bg.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");  
gameoverImage =loadImage("game.png");
restartImage =loadImage("reset.png");
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-30);
  
  monkey =createSprite(80,400,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;

  ground =createSprite(400,463,displayWidth/0.1,displayHeight/100); 
  ground.velocityX=-4;
  ground.X=ground.width/2;
  
  gameOver = createSprite(displayWidth/2, displayHeight/15);
  gameOver.addImage(gameoverImage);
  gameOver.scale = 0.5;
  restart = createSprite(displayWidth/2.5, displayHeight/10);
  restart.addImage(restartImage);
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;

 FoodGroup=new Group()
 obstacleGroup=new Group() 

  score=0;

}


function draw() {
background("red");
fill("white")
textSize(20)
text("Score: "+ score,displayWidth/2,displayHeight/9);


if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*score/100);

  if(keyDown("space")&& monkey.y>= 200){
    monkey.velocityY=-10          
  
  monkey.velocityY=monkey.velocityY+0.10;
  
  }
  if(ground.x < 0){ 
    ground.x =ground.width/2;
  }
}

  if(World.frameCount%80===0){
    fruits()
  }
  if(World.frameCount%300===0){
   obstacles()
  } 
  
 if(monkey.isTouching(FoodGroup)) {
   score=score+1;
   FoodGroup.destroyEach();
 }
  if(obstacleGroup.isTouching(monkey)) {
    gameState = END;
  }
 if (score > 50){
   gameState === GAIN;
  }

 else if (gameState === END){
  gameover.visible = true;
  restart.visible = true;

   //set velcity of each game object to 0
   ground.velocityX = 0;
   monkey.velocityY = 0;
   obstaclesGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   
   //set lifetime of the game objects so that they are never destroyed
   obstaclesGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
   
   if(mousePressedOver(restart)) {
    reset();
  }

}
if(gameState === GAIN){

  textSize(25)
  text("you won the game, press restart button to play again",displayWidth/5, displayHeight/20)

  restart.visible = true;

    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)) {
      reset();
    }
}

  drawSprites();
}


function fruits(){
  banana=createSprite(600,Math.round(random(130,230)),20);
  banana.addImage(bananaImage);
  banana.scale=0.2;
  banana.velocityX=-2;
  FoodGroup.add(banana);
}
function obstacles(){
  obstacle=createSprite(300,Math.round(random(420,440)),20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  obstacle.velocityX=-2;
  obstacleGroup.add(obstacle);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  score = 0;
  
}
