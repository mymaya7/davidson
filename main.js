

var Xfood;
var Yfood;
var Xspeed=0;
var Yspeed=0;
var Scl=40; // היחידה הבסיסית, היא משבצת באורך ורוחב של המשתנה
var Len=20;

var mySnake;
var FPSspeed=5;

// פונקציה סטאפ שקוראת פעם אחת
function setup() 
{
 gameover();
}


function gameover()
{
	createCanvas(Scl*Len, Scl*Len); // המשטח בגודל של מספר המשבצות למשל 20 כפול גודל משבצת
	background(170); //הצבע של הרקע
	FPSspeed=5;
	Yspeed = 0;
    Xspeed = 0;
	frameRate(FPSspeed);  //מספר הפריימים בשנייה
	updateFood();
	mySnake = new snake();
}
//הפונקציה נקראת על ידי המערכת באופן רציף כלומר פעם אחר פעם (לולאה אין סופית) והיא המנוע של התוכנית.


//################################################################################################################
function draw()
 {
    background(255,204,204); //נצבע את המשטח כל פעם מחדש(כל מה שהיה לפני נמחק)
 	  drawGrid();
	  
	mySnake.updateLocation();
	
	
	mySnake.drawSnake();
	if( mySnake.isSelfTouch() || mySnake.checkEdges())
	{
		gameover();
	}
	drawFood();
    if(cheakEat())
	{
      mySnake.addJoint(Xfood,Yfood);

	  updateFood(Xfood,Yfood);
	  console.log('eat!!!');
	 }
	
}
//################################################################################################################




//********************************************************************

// פונקציה שנקראת אוטומטית כל פעם שנלחץ מקש על המקלדת
function keyPressed(){
// מאפסים את מהירויות הכיוונים כדי שנישאר רק עם הלחיצה האחרונה
// Yspeed = 0;
// Xspeed = 0;

  if(keyCode === DOWN_ARROW){
    if(Yspeed != -Scl)
		Yspeed=Scl;
	Xspeed=0;	
  }else if(keyCode === UP_ARROW){
    if(Yspeed != Scl)
		Yspeed=-Scl;
	Xspeed=0;	
  }else if(keyCode === LEFT_ARROW){
    if(Xspeed != Scl)
		Xspeed=-Scl;
	Yspeed=0;	
  }else if(keyCode === RIGHT_ARROW){
    if(Xspeed != -Scl)
		Xspeed=Scl;
	Yspeed=0;	
  }
   else if(keyCode === 107){ //add (+)
    FPSspeed++;
	 console.log('update speed !!!' , FPSspeed);
	 frameRate(FPSspeed);
  }
     else if(keyCode === 109){ // subtract (-)
     FPSspeed--;
	 console.log('update speed !!!' , FPSspeed);
	 frameRate(FPSspeed);
  }
  mySnake.updateDirection(Xspeed,Yspeed);
}


// פונקציה שנקראת אוטומטית כל פעם שנלחץ מקש על המקלדת
function touchStarted(){
// מאפסים את מהירויות הכיוונים כדי שנישאר רק עם הלחיצה האחרונה
// Yspeed = 0;
// Xspeed = 0;

  if(mouseY/Scl > height/Scl - 5){
    if(Yspeed != -Scl)
		Yspeed=Scl;
	Xspeed=0;	
  }else if(mouseY/Scl  < 5){
    if(Yspeed != Scl)
		Yspeed=-Scl;
	Xspeed=0;	
  }else if(mouseX/Scl  <  5 ){
    if(Xspeed != Scl)
		Xspeed=-Scl;
	Yspeed=0;	
  }else if(mouseX/Scl  > width/Scl - 5 ){
    if(Xspeed != -Scl)
		Xspeed=Scl;
	Yspeed=0;	
  }
   
  mySnake.updateDirection(Xspeed,Yspeed);
}

function drawGrid()
{
// נצייר את המשבצות
	 stroke(200,200,200); // צבע הקווים 
	for( i =0 ; i < width ; i+=Scl) //
		line(i,0,i,height); // הקו מתחיל ב( אי, 0) ונגמר בתחתית המשטח בקפיצות של משבצת 
	for( i =0 ; i < height ; i+=Scl)
		line(0,i,width,i); // הקו מתחיל ב( אי, 0) ונגמר בקצה השמאלי של המשטח בקפיצות של משבצת
}


function drawFood()
{
// ציור הפיתיון
	fill(68)
    rect(Xfood,Yfood,Scl,Scl);
}
function cheakEat()
{
// אם הסנייק אוכל את הפיתיון אז בחירות מיקום חדש לפיתיון
	return(Xfood==mySnake.headXpos && Yfood==mySnake.headYpos)
}
function updateFood()
{
		Xfood=int(random(0,width/Scl))*Scl;
		Yfood=int(random(0,height/Scl))*Scl;
		
}









