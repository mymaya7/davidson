var autoMode=false;
var isRunning=false;
var Xfood;
var Yfood;
var Xspeed=0;
var Yspeed=0;
var Scl=40; // היחידה הבסיסית, היא משבצת באורך ורוחב של המשתנה
var Len=20;

var mySnake;
var FPSspeed=5;
var second =0;
var startGameSecond = 0;
// פונקציה סטאפ שקוראת פעם אחת
function setup() 
{
 createCanvas(Scl*Len, Scl*Len); // המשטח בגודל של מספר המשבצות למשל 20 כפול גודל משבצת
 newgame();
}


function newgame()
{

	FPSspeed=5;
	if(autoMode)
	{		
	  FPSspeed=20;
    }
	Yspeed = 0;
    Xspeed = 0;
	frameRate(FPSspeed);  //מספר הפריימים בשנייה
	mySnake = new snake();
	updateFood();
	startGameSecond = millis()/1000;
	isRunning=true;
}
//הפונקציה נקראת על ידי המערכת באופן רציף כלומר פעם אחר פעם (לולאה אין סופית) והיא המנוע של התוכנית.


//################################################################################################################
function draw()
 {
    background(255,204,204); //נצבע את המשטח כל פעם מחדש(כל מה שהיה לפני נמחק)
 	drawGrid();
	  
 	if(autoMode)	
 		mySnake.calcNextMove(Xfood,Yfood);
	
 	mySnake.updateLocation();
 	
	mySnake.drawSnake();
	
	drawFood();
	
	if( mySnake.isSelfTouch() || mySnake.checkEdges())
	{
		var currLen = mySnake.joints.length-1;
		textSize(52);
		fill(100, 102, 153);
		textAlign(CENTER);
	    text(' GameOver ' + second.toFixed(0) + 'Sec \n Total Length is ' + currLen, width/2, height/2);
		//createAudio('assets/doorbell.mp3');
		isRunning=false;
		noLoop();
		return;
	}
	
    if(cheakEat())
	{
      mySnake.addJoint();

	  updateFood(Xfood,Yfood);
	 
	  //console.log('eat!!!');
	 }
    putText();
	
}
//################################################################################################################

function putText()
{
	second = millis()/1000-startGameSecond;
	var currLen = mySnake.joints.length-1;
	textSize(25);
	textAlign(LEFT);
	text(' Length ' + currLen , 45, 40 );
	text('\n Sec ' + second.toFixed(0) , 45, 40);
}
//********************************************************************

// פונקציה שנקראת אוטומטית כל פעם שנלחץ מקש על המקלדת
function keyPressed()
{
// מאפסים את מהירויות הכיוונים כדי שנישאר רק עם הלחיצה האחרונה
var x=0;
var y=0;
  
  if(isRunning==false)
  {
	newgame();  
    loop();
    return;
  }
  
  if(keyCode === DOWN_ARROW)
  {
	y=1;
  	x=0;		
  }
  else if(keyCode === UP_ARROW)
  {
    y=-1;
	x=0;		
  }
  else if(keyCode === LEFT_ARROW)
  {
    y=0;
	x=-1;	
  }
  else if(keyCode === RIGHT_ARROW)
  {
    y=0;
	x=1;	
  }
  else if(keyCode === 107)
  { //add (+)
    FPSspeed++;
	console.log('update speed !!!' , FPSspeed);
	frameRate(FPSspeed);
	return;
  }  
  else if(keyCode === 109)
  { // subtract (-)
    FPSspeed--;
	console.log('update speed !!!' , FPSspeed);
	frameRate(FPSspeed);
	return;
  }
  else if(keyCode === 65)// A = auto mode
  {
    FPSspeed=25;
    frameRate(FPSspeed);
    autoMode=true;
    return;
  }
   else if(keyCode === 32)// space = restart game
  {
//	newgame();  
//    loop();
//    return;
  }
   
  else if(keyCode === 77)// M = Manual mode
  {
    FPSspeed=5;
    frameRate(FPSspeed);
    autoMode=false;
    x=0;
    y=0;
  }
  else
	  return;
  
  nextMoveValue(x,y);
}

function touchEnded1() {
var x=0;
var y=0;
	
	
	var len =  touches.length;
	if(len<10)
	 return;
	 line(touches[0].x, touches[0].y, touches[len-1].x, touches[len-1].y);
	var deltax = touches[len-1].x - touches[0].x;
	var deltay = touches[len-1].y - touches[0].y;
	if( deltay > 0 && deltay > 10) // Down
	{
		y=1; x=0;
	}  
    if( deltay < 0 && deltay < -10) // Up
	{
		y=-1; x=0;
	}  
    if( deltax < 0 && deltax < -10) // Left
	{
		y=0; x=-1;
	}
    if( deltax > 0 && deltax > 10) // Right
	{
		y=0; x=1;
	} 
	
	if(x!=0 || y!=0)
		nextMoveValue(x,y);  	
}

// פונקציה שנקראת אוטומטית כל פעם שנלחץ מקש על המקלדת
function touchStarted(){
// מאפסים את מהירויות הכיוונים כדי שנישאר רק עם הלחיצה האחרונה
var x=0;
var y=0;

 if(isRunning==false)
  {
	newgame();  
    loop();
    return;
  }

  if( autoMode==true)
  {
	   FPSspeed=5;
       frameRate(FPSspeed);
	   autoMode=false;
  }
  
  if(mouseY/Scl > height/Scl - 5){ // down
    y=1;
	x=0;	
  }else if(mouseY/Scl  < 5){ //up
    y=-1;
	x=0;	
  }else if(mouseX/Scl  <  5 ){ //left
    y=0;
	x=-1;
  }else if(mouseX/Scl  > width/Scl - 5 ){ //right
    y=0;
	x=1;	
  }
   
  nextMoveValue(x,y);
}

function touchMoved() {
   FPSspeed=25;
    frameRate(FPSspeed);
    autoMode=true;
    return;
  }

// פונקציה שנקראת אוטומטית כל פעם שנלחץ מקש על המקלדת
function nextMoveValue(x,y){
// מאפסים את מהירויות הכיוונים כדי שנישאר רק עם הלחיצה האחרונה


  if(y ===  1){//DOWN
    if(Yspeed != -Scl)
		Yspeed=Scl;
	Xspeed=0;	
  }else if(y === -1){ //UP
    if(Yspeed != Scl)
		Yspeed=-Scl;
	Xspeed=0;	
  }else if(x === -1){// LEFT
    if(Xspeed != Scl)
		Xspeed=-Scl;
	Yspeed=0;	
  }else if(x === 1){ //RIGHT
    if(Xspeed != -Scl)
		Xspeed=Scl;
	Yspeed=0;	
  }else if(x==0 && y==0){
	Xspeed=0;
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
    var x,y;
		x=int(random(0,width/Scl))*Scl;
		y=int(random(0,height/Scl))*Scl;
		
		while(mySnake.isPartOfSnake(x,y))
		{
		  x=int(random(0,width/Scl))*Scl;
		  y=int(random(0,height/Scl))*Scl;
		}
		Xfood=x;
		Yfood=y;
		
}









