var PLAY=1;
var END=0;
var gameState=PLAY;



var monkey , monkey_running , monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var background ;
var backgroundImage;
var invisibleLand;
var bananaGroup;
var obstacleGroup;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backgroundImage=loadImage("background.jpg");
}



function setup() {
 createCanvas(600,600);
  
  

  
background=createSprite(0,0,20,30);
background.addImage(backgroundImage);
background.scale=4;
  
  
monkey=createSprite(300,300,20,30);
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.2;
  
invisibleLand=createSprite(300,400,10,20);
invisibleLand.visible=false;
  
  
bananaGroup=createGroup();
obstacleGroup=createGroup();

score=0;
survivalTime=0;
}


function draw() {


  
  
background.velocityX=-3;

  
  if(obstacleGroup.isTouching(monkey)) {
 gameState=END; 
  text("game Over",300,300);
}
  
  
if(background.x<0) {
background.x=background.width/2;
}

if (gameState===PLAY) {
 if (keyDown("space")&&monkey.y>=80) {
 monkey.velocityY=-12; 
  
} 
  
  if(monkey.isTouching(bananaGroup)){
 bananaGroup.destroyEach();
  score=score+1;
}
 survivalTime=survivalTime+Math.round(getFrameRate()/60);
  
  spawnbanana();
spawnObstacle(); 
}else if(gameState===END) {
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);
  


background.velocityX=0;
  
  
obstacleGroup.setVelocityEach(0);
bananaGroup.setVelocityEach(0);
}


  

  
  
  
  
  

  
monkey.velocityY=monkey.velocityY+0.8; 
  
  
monkey.collide(invisibleLand);

drawSprites();
  
  textSize(20); 
fill("blue");
stroke("blue");
text("Survival Time : "+survivalTime,50,50);
  
textSize(18);
fill("Black");
stroke("black");
text("score = "+score,510,50);
}

function spawnbanana() {
  if(frameCount % 100===0) {
  var banana=createSprite(550,140,40,10)
  banana.y=Math.round(random(80,120));
  banana.addImage(bananaImage);
  banana.scale=0.21;
  banana.velocityX=-3;
    
  banana.lifetime=150;
   bananaGroup.add(banana);
  }
  
 
  
}

function spawnObstacle() {
if (frameCount % 100===0) {
  var obstacle=createSprite(540,540,10,40); 
  obstacle.y=Math.round(random(400,380));
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale=0.2;
  obstacle.velocityX=-3;
  obstacle.lifetime=150;
  obstacleGroup.add(obstacle);
}
}


