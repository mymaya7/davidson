
function snake()
{
	 this.headXpos = 0;	
	 this.headYpos = 0;

	 this.Yspeed = 0;
	 this.Xspeed = 0;
     this.joints = [];
	 this.joints[0] = new joint();
	 this.joints[1] = new joint();
	
	this.checkEdges= function()
	{
	var retVal=false;
	// כדי שיחזור מצד שני אם מגיע לשוליים
		if(this.headXpos>=width)
		{
		  this.joints[0].Xpos=0;
		  retVal=true;
		}
		if(	this.headXpos<0)
		{
		  this.joints[0].Xpos=width-Scl;
		  retVal=true;
		}
		  
		if(	this.headYpos>=height)
		{
		  this.joints[0].Ypos=0+Scl;
		  retVal=true;
		}
		if(this.headYpos<0)
		{
		  this.joints[0].Ypos=height;
		  retVal=true;
		}
	 return retVal;	
	}
	
	this.isSelfTouch= function()
	{
	 for(var i=this.joints.length-2 ; i > 0  ; i--)
	 {
	   if( this.joints[0].Xpos==this.joints[i].Xpos && this.joints[0].Ypos==this.joints[i].Ypos)
		return true;
	 }
	 return false;
	}
	
	 this.updateDirection = function(x,y)
    { 
      this.Xspeed=x; // ההתקדמות שלו בציר האיקס היא המיקום הקודם ועוד המהירות, אם יש, בציר האיקס
	  this.Yspeed=y;

    }
	
	 this.updateLocation = function()
    { 
	
	 
	  for(var i=this.joints.length-1 ; i > 0  ; i--)
	  {
		this.joints[i].updateJointLocation(this.joints[i-1].Xpos,this.joints[i-1].Ypos);
	  }

	  this.joints[0].updateJointLocation(this.joints[0].Xpos+this.Xspeed,this.joints[0].Ypos+this.Yspeed);
	  
      this.headXpos = this.joints[0].Xpos;	
	  this.headYpos = this.joints[0].Ypos;

    }
	this.drawSnake = function()
	{
	 // ציור הסנייק
			
	   for(var i=0 ; i < this.joints.length-1 ; i++)
	  {
	    if(i==0)
			fill(0,255,0);
		else
            fill(255);		
		this.joints[i].drawJoint();
	  }
	}
	
	this.addJoint = function(x,y)
	{
	  this.joints[this.joints.length] = new joint();
	  this.joints[this.joints.length-1].updateJointLocation(this.joints[this.joints.length-2].Xpos,this.joints[this.joints.length-2].Ypos);
	  this.joints[0].updateJointLocation(x,y);
	  this.headXpos = x;
      this.headYpos = y;
	  console.log(this.joints.length);
	}
 
}

function joint()
{
  this.Ypos = 0;
  this.Xpos = 0;
  
  	this.drawJoint = function(x,y)
	{
	 // ציור הסנייק
		      	
		rect(  this.Xpos, this.Ypos,Scl,Scl);
	}
	
	 this.updateJointLocation = function(x,y)
    { 
      this.Xpos=x; // ההתקדמות שלו בציר האיקס היא המיקום הקודם ועוד המהירות, אם יש, בציר האיקס
	  this.Ypos=y;

    }
  
}