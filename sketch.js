//Create variables here
var dog,happyDog,database,foodS,foodStock,sitDog;

function preload()
{
  //load images here
  sitDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(250,250,50,50);
  dog.addImage("dog",sitDog);
  dog.scale = 0.3;

  //feed = createButton("Feed The Dog");
  //feed.positon(700,95);
  //feed.mousePressed(feedDog);

  //addFood=createButton("Add Food");
  //addFood.positon(800,95);
 // addFood.mousePressed(addFoods);

 
}


function draw() {  
background(46,139,87);
  drawSprites();
foodStock = database.ref('Food');
foodStock.on("value",readStock);

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed :"+ lastFed + "AM",350,30);
}

 if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  //add styles here
  fill("white");
textSize(12);
text("Note:Press UP_ARROW Key To Feed Drago Milk");
  
  }
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(happyDog);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function readStock(x){
  foodS = data.val();
}
function writeStock(x){
   if(x<=0){
     x=0
   }else{
    x=x-1;
   
   } 
   database.ref('/').update({
   Food:x
} )
}




