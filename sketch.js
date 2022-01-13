var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost= createSprite(300,1,5,5);
  ghost.addImage("ghost", ghostImg);
  ghost.scale=0.3;

    doorsGroup=new Group();
   climbersGroup=new Group();
    invisibleBlockGroup=new Group();
}

function draw() {
  background(200);
 
  
  if (gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    ghost.velocityY=ghost.velocityY+0.8;

    if (keyDown("space")){
      ghost.velocityY= -5;
     }

    if (keyDown('right_arrow')){
      ghost.x= ghost.x+2;

    }
    if (keyDown('left_arrow')){
      ghost.x= ghost.x-2;

    }
    criarObstaculos();

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
  drawSprites();}
   
  if (gameState==="end"){
    background ("black");
    
    stroke("yellow");
     fill("yellow"); 
     textSize(30); 
     text("Fim de Jogo", 230,250);
  }
 
 

 
 
 
    
}


function criarObstaculos(){

 if(frameCount%240===0){
   
  var door= createSprite(300,-20);
   door.addImage("porta",doorImg);
   door.lifetime=610
  
   var climber= createSprite(300,10);
    climber.addImage("grade", climberImg);
    climber.lifetime=610
  
    var invisibleBlock= createSprite(300,15);
    invisibleBlock.lifetime=610
  door.velocityY=1
  climber.velocityY=1
  invisibleBlock.velocityY=1
  
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
  
  ghost.depth=door.depth;
  ghost.depth=+1;
 
// a porta só pode aparecer no eixo X nessa area da torre
 door.x=Math.round(random(120,400));
 
 
  door.x=climber.x;
  door.x=invisibleBlock.x;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
}






}

