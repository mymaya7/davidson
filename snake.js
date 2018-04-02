
function snake()
{
	 this.headXpos = 0;	
	 this.headYpos = 0;

	 this.Yspeed = 0;
	 this.Xspeed = 0;
     this.joints = [];
	 this.joints[0] = new joint();
	 this.joints[1] = new joint();
/////////////////////////////////////////////////////////////////////	
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
/////////////////////////////////////////////////////////////////////	
	this.isSelfTouch= function()
	{
	 for(var i=this.joints.length-2 ; i > 0  ; i--)
	 {
	   if( this.joints[0].Xpos==this.joints[i].Xpos && this.joints[0].Ypos==this.joints[i].Ypos)
		return true;
	 }
	 return false;
	}
/////////////////////////////////////////////////////////////////////	
	this.isPartOfSnake= function(x,y)
	{
	 for(var i=this.joints.length-2 ; i >=0  ; i--)
	 {
	   if( this.joints[i].Xpos==x && this.joints[i].Ypos==y)
		return true;
	 }
	 return false;
	}
	
	 this.updateDirection = function(x,y)
    { 
      this.Xspeed=x; // ההתקדמות שלו בציר האיקס היא המיקום הקודם ועוד המהירות, אם יש, בציר האיקס
	  this.Yspeed=y;

    }
	
/////////////////////////////////////////////////////////////////////
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
    
/////////////////////////////////////////////////////////////////////
	
	 this.drawSnake = function()
	{
	 // ציור הסנייק
			
	   for(var i=0 ; i < this.joints.length-1 ; i++)
	  {
	    if(i==0)
			fill(200,80,10);
		else
            fill(178);		
		this.joints[i].drawJoint();
	  }
	}
	
/////////////////////////////////////////////////////////////////////
	
	this.addJoint = function(x,y)
	{
	  this.joints[this.joints.length] = new joint();
	  this.joints[this.joints.length-1].updateJointLocation(this.joints[this.joints.length-2].Xpos,this.joints[this.joints.length-2].Ypos);
	  this.joints[0].updateJointLocation(x,y);
	  this.headXpos = x;
      this.headYpos = y;
	  console.log('eat!!! ', this.joints.length);
	}
	
/////////////////////////////////////////////////////////////////////
	
	this.calcNextMove = function(Xfood,Yfood)
	{
		//console.log('calcNextMove ', Xfood , Xfood);
		var x=0,y=0;
		if(this.headXpos>Xfood)
		{
			if(this.Xspeed!=1)
				x=-1;
		}
		else if(this.headXpos<Xfood)
		{
			if(this.Xspeed!=-1)
				x=1;
		}
		
		if(x==0)
		{
			if(this.headYpos>Yfood)
			{
				if(this.Yspeed!=1)
					y=-1;
			}
			else if(this.headYpos<Yfood)
			{
				if(this.Yspeed!=-1)
					y=1;
			}
		}
		if(x==0 && y==0)
		{
			if (this.Xspeed!=0)
				y=1;
			else if (this.Yspeed!=0)
				x=1;
		}
		if(!this.isPartOfSnake(this.headXpos+x*Scl,this.headYpos+y*Scl))
		   this.updateDirection(x*Scl,y*Scl);
		else
		{
		    if(((this.isPartOfSnake(this.headXpos+1*Scl,this.headYpos)) || (this.headXpos+Scl>=width))
				&&((this.isPartOfSnake(this.headXpos-1*Scl,this.headYpos)) || (this.headXpos-Scl<0))
					&&((this.isPartOfSnake(this.headXpos,this.headYpos+1*Scl)) || (this.headYpos+Scl>=height))
						&&((this.isPartOfSnake(this.headXpos,this.headYpos-1*Scl)) || (this.headYpos-Scl<0)) )
			{ // dead end we are going to die :(
			    x=1;
			    this.updateDirection(x*Scl,y*Scl);
			}
			else
			{
				
				var tmpx,tmpy;
				
				tmpx=int(random(0,width/Scl))*Scl;
				tmpy=int(random(0,height/Scl))*Scl;
				
				while(mySnake.isPartOfSnake(tmpx,tmpy))
				{
				  tmpx=int(random(0,width/Scl))*Scl;
				  tmpy=int(random(0,height/Scl))*Scl;
				}
				//console.log('recall calcNextMove ' ,tmpx , tmpy);
				this.calcNextMove(tmpx,tmpy);	
			}					
		}
			
			
			
	}
}
	

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
function joint()
{
  this.Ypos = 0;
  this.Xpos = 0;
/////////////////////////////////////////////////////////////////////  
  	this.drawJoint = function(x,y)
	{
	 // ציור הסנייק
		      	
		rect(  this.Xpos, this.Ypos,Scl,Scl);
	}
/////////////////////////////////////////////////////////////////////	
	 this.updateJointLocation = function(x,y)
    { 
      this.Xpos=x; // ההתקדמות שלו בציר האיקס היא המיקום הקודם ועוד המהירות, אם יש, בציר האיקס
	  this.Ypos=y;
    }
}



