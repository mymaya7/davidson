
מגרילים מספר בין 0 למספר המשבצות ומכפילים בגודל כל משבצת וזה מיקום הפיתיון בציר האיקס
מאפסים את מהירויות הכיוונים כדי שנישאר רק עם הלחיצה האחרונה
הפונקציה נקראת על ידי המערכת באופן רציף כלומר פעם אחר פעם (לולאה אין סופית) והיא המנוע של התוכנית.
הקו מתחיל ב( אי, 0) ונגמר בתחתית המשטח בקפיצות של משבצת 
הקו מתחיל ב( אי, 0) ונגמר בקצה השמאלי של המשטח בקפיצות של משבצת



var Ypos = 0;
var Xpos = 0;
var Yspeed = 0;
var Xspeed = 0;
var Xfood;
var Yfood;
var Scl=40; // היחידה הבסיסית, היא משבצת באורך ורוחב של המשתנה
var speed=Scl;

// פונקציה סטאפ שקוראת פעם אחת
function setup() 
{
 createCanvas(Scl*20, Scl*20); // המשטח בגודל של מספר המשבצות למשל 20 כפול גודל משבצת
 background(170); //הצבע של הרקע
 frameRate(8);  //מספר הפריימים בשנייה
 Xfood=int(random(0,width/Scl))*Scl; //מגרילים מספר בין 0 למספר המשבצות ומכפילים בגודל כל משבצת וזה מיקום הפיתיון בציר האיקס
 Yfood=int(random(0,height/Scl))*Scl;

}

// פונקציה שנקראת אוטומטית כל פעם שנלחץ מקש על המקלדת
function keyPressed(){
// מאפסים את מהירויות הכיוונים כדי שנישאר רק עם הלחיצה האחרונה
 Yspeed = 0;
 Xspeed = 0;

  if(keyCode === DOWN_ARROW){
    Yspeed=speed;
  }else if(keyCode === UP_ARROW){
   Yspeed=-speed;
  }else if(keyCode === LEFT_ARROW){
   Xspeed=-speed;
  }else if(keyCode === RIGHT_ARROW){
   Xspeed=speed;
  }
}
//הפונקציה נקראת על ידי המערכת באופן רציף כלומר פעם אחר פעם (לולאה אין סופית) והיא המנוע של התוכנית.
function draw()
 {
    background(255,204,204); //נצבע את המשטח כל פעם מחדש(כל מה שהיה לפני נמחק)
 	 // נצייר את המשבצות
	 stroke(225,102,255); // צבע הקווים 
	for( i =0 ; i < width ; i+=Scl) //
		line(i,0,i,height); // הקו מתחיל ב( אי, 0) ונגמר בתחתית המשטח בקפיצות של משבצת 
	for( i =0 ; i < height ; i+=Scl)
		line(0,i,width,i); // הקו מתחיל ב( אי, 0) ונגמר בקצה השמאלי של המשטח בקפיצות של משבצת
	
	
	 
	
	Xpos=Xpos+Xspeed; // ההתקדמות שלו בציר האיקס היא המיקום הקודם ועוד המהירות, אם יש, בציר האיקס
	Ypos=Ypos+Yspeed;
	
	// כדי שיחזור מצד שני אם מגיע לשוליים
	if(Xpos>=width)
	  Xpos=0;
	if(Xpos<0)
	  Xpos=width-Scl;
	  
	if(Ypos>=height)
	  Ypos=0+Scl;
	if(Ypos<0)
	  Ypos=height;
	  // ציור הסנייק
	fill(255);		
    rect(Xpos,Ypos,Scl,Scl);
    // ציור הפיתיון
	fill(68)
    rect(Xfood,Yfood,Scl,Scl);
	// אם הסנייק אוכל את הפיתיון אז בחירות מיקום חדש לפיתיון
	if(Xfood==Xpos && Yfood==Ypos)
	{
		Xfood=int(random(0,width/Scl))*Scl;
		Yfood=int(random(0,height/Scl))*Scl;
		
	}
 
 
}  
