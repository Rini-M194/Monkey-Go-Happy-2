var monkey, monkeyRunning;

var bananaImage;
var obstacleImage;
var jungle, jungleImage;
var ground;

var obstacleGroup;
var bananaGroup;

var gameOver;
var score = 0;

function preload() {
  jungleImage = loadImage("jungle.jpg");
  
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png"); 
}

function setup() {
  createCanvas(800, 400);
  
  ground = createSprite(400, 325, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2; 
  ground.visible = false;
  
  jungle = createSprite(0, 0, 800, 400);
  jungle.addImage(jungleImage);
  jungle.x = jungle.width/2;
  jungle.velocityX = -4;
  jungle.scale = 2
  
  monkey = createSprite(100, 300);
  monkey.addAnimation("Running", monkeyRunning);
  monkey.scale = 0.125;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if(jungle.x < 0) {
    jungle.x = jungle.width/2;
  }
  
  if(obstacleGroup.isTouching(monkey)) { 
    monkey.scale = monkey.scale - 0.05
    obstacleGroup.destroyEach();
    score = score - 2;
  }
  
  if(bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score + 2;

    switch(score) {
      case 10: monkey.scale = 0.15;
      break;
      case 20: monkey.scale = 0.2;
      break;
      case 30: monkey.scale = 0.25;
      break;
      case 40: monkey.scale = 0.3;
      break;
      case 50: monkey.scale = 0.35;
      break;       
      case 60: monkey.scale = 0.4;
      break;
      case 70: monkey.scale = 0.45;
      break;       
      case 80: monkey.scale = 0.5;
      break;        
      default: break;
    }
  }
  
  if(keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -10;
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  spawnBananas();
  spawnObstacles();

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 50, 50)
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var rock = createSprite(800, 315);
    rock.velocityX = -4;
    rock.addImage(obstacleImage);
   
    rock.scale = 0.15;
    rock.lifetime = 300;

    obstacleGroup.add(rock);
  }
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 140);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.05;

    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    bananaGroup.add(banana);
  }
}