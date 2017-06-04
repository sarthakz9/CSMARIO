//global variables
//objects in canvas & frames
var Mario,stage1,stage1_1,stage1_2,stage1_3,stage1_4,stage1_5,W,H;
//var skyimg,darkskyimg,sunimg,gateimg,guardimg,dudeimg,bubbleimg;
var Marioimg,stage1img,stage1_1img,stage1_2img,stage1_3img,stage1_4img,stage1_5img;
var frame;
var monster,monstersheet,monsterimg,monstercopy1,monstercopy2,Block,Blocksheet,Blockimg,Blockcopy1,Blockcopy2;
var Mariowidth,currentstage=1,formstate=false,jumpflag=false,moveLeft=false,moveRight=false,baseflag=0,upflag=false,rightpositionflag,ylower,yupper,absoluteY,grav=0.5,yVel=0;
var gatelink=1;stagelink=-1,exiting=false;
var timecounter=0,savex,savey;
var KEYCODE_LEFT = 37, KEYCODE_RIGHT = 39, KEYCODE_UP = 38, KEYCODE_DOWN = 40, KEYCODE_SPACE=32;
// initialise loaders for each frame, work on loading meter
function checkOrientation()
{
	if(window.matchMedia("(orientation: portrait)").matches) {
		alert("Please switch to Landscape Mode");
	}
}
$(window).on("orientationchange",function(){
  if(window.orientation == 0) // Portrait
  {
	  checkOrientation();
  }
  else // Landscape
  {
	  window.location.reload(false);
  }
});

function togglecontrol()
{
	if(document.onkeydown==null||document.onkeyup==null)
	{
		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;
	}
	else {
		document.onkeydown = null;
		document.onkeyup = null;
	}
}

function init() {
	checkOrientation();
	frame = new createjs.Stage("intro1");
	window.addEventListener("resize", resize);

	 W = window.innerWidth;
   	 H = window.innerHeight-(window.innerHeight*0.1);

	//positionFrame();
     // loading every graphic before hand
	manifest = [
	{src: "../resources/World1.png", id: "WORLD_1"},
	{src:"../resources/bg5.png",id:"WORLD_1_1"},
     {src: "../resources/MarioBg.png", id: "WORLD_1_2"},
	{src:"../resources/bg6.png",id:"WORLD_1_3"},
	{src:"../resources/q.png",id:"WORLD_1_4"},
	{src:"../resources/bbgg1.png",id:"Blocks"},
	{src: "../resources/stage5.png", id: "WORLD_1_5"},
	{src:"../resources/MarioClimb.png",id:"Mario"},
	{src:"../resources/enemy.png",id:"Enemy"}
	];
     loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);
	togglecontrol(1);
	//createjs.Ticker.interval=1000; //in ms
}

//initialise each frame
function handleComplete() {
     initFrameElements();
	changeStage(0);
	createjs.Ticker.addEventListener("tick", gameloop);
}

function changeStage(stageno)
{
	frame.removeAllChildren();
	setanimation(Mario,"stand",Mario.currentAnimation);
	stagelink=-1;upflag=false;
	if(stageno!=-1)
		currentstage=stageno;
	var stageobj;
	moveLeft=false;moveRight=false;
	if(currentstage==0)
	{
		stageobj=stage1;
		baseflag=1;
		ylower=changeWH(0,199)-H/6;
     	yupper=changeWH(0,71)-H/6;
		Mario.x=changeWH(1,225);
		exiting=false;
		stagelink=-1;
	}
	else if(currentstage==1)
     {
		stagelink=0;
		stageobj=stage1_1;
		monster.x=changeWH(1,120.75);
		monster.y=changeWH(0,182);
		monstercopy1=monster.clone();
		monstercopy1.x=changeWH(1,245.5);
		monstercopy1.y=changeWH(0,182);
		monstercopy2=monster.clone();
		monstercopy2.x=changeWH(1,370.75);
		monstercopy2.y=changeWH(0,182);
		frame.addChildAt(monster,2);
		frame.addChildAt(monstercopy1,3);
		frame.addChildAt(monstercopy2,4);
		Mario.x=changeWH(1,34);

	}
	else if(currentstage==2)
     {
		stagelink=0;
		stageobj=stage1_2;
		baseflag=0;
		ylower=changeWH(0,199)-H/6;
     	yupper=changeWH(0,135)-H/6;
		Mario.x=changeWH(1,34);
	}
	else if(currentstage==3)
     {
		stagelink=0;
		stageobj=stage1_3;
		baseflag=0;
		ylower=changeWH(0,199)-H/6;
     	yupper=changeWH(0,135)-H/6;
		Mario.x=changeWH(1,34);
	}
	else if(currentstage==4)
     {
		stagelink=0;
		stageobj=stage1_4;
		baseflag=0;
		ylower=changeWH(0,199)-H/6;
     	yupper=changeWH(0,135)-H/6;
		Mario.x=changeWH(1,34);
	}
	else if(currentstage==5)
	{
		stagelink=0;
		stageobj=stage1_5;
		baseflag=0;
		ylower=changeWH(0,200)-H/6;
     	yupper=changeWH(0,145)-H/6;
     	Mario.x=changeWH(1,34);
		// set other variables

	}
	var absoluteY=(baseflag==0)?ylower:yupper;
	Mario.y=absoluteY;
	frame.addChild(stageobj,Mario);
	if(currentstage==4){
		Block.x=changeWH(1,104.75);
		Block.y=changeWH(0,70);
		Blockcopy1=Block.clone();
		Blockcopy1.x=changeWH(1,217.5);
		Blockcopy1.y=changeWH(0,70);
		Blockcopy2=Block.clone();
		Blockcopy2.x=changeWH(1,338.75);
		Blockcopy2.y=changeWH(0,70);
		frame.addChildAt(Block,2);
		frame.addChildAt(Blockcopy1,3);
		frame.addChildAt(Blockcopy2,4);
	}
	if(currentstage==1){

		monster.x=changeWH(1,120.75);
		monster.y=changeWH(0,182);
		monstercopy1=monster.clone();
		monstercopy1.x=changeWH(1,245.5);
		monstercopy1.y=changeWH(0,182);
		monstercopy2=monster.clone();
		monstercopy2.x=changeWH(1,370.75);
		monstercopy2.y=changeWH(0,182);
		frame.addChildAt(monster,2);
		frame.addChildAt(monstercopy1,3);
		frame.addChildAt(monstercopy2,4);
	}
     resize();
	frame.update(event);


}

function initFrameElements()
{
     //=======================================WORLD_1==================================
     stage1img=loader.getResult("WORLD_1");
     stage1 = new createjs.Shape();
     stage1.graphics.beginBitmapFill(stage1img).drawRect(0, 0, W, H);

	//======================================WORLD1_1=======================================
	stage1_1img=loader.getResult("WORLD_1_1");
     stage1_1 = new createjs.Shape();
     stage1_1.graphics.beginBitmapFill(stage1_1img).drawRect(0, 0, W, H);

	//=======================================WORLD_1_2==================================
     stage1_2img=loader.getResult("WORLD_1_2");
     stage1_2 = new createjs.Shape();
     stage1_2.graphics.beginBitmapFill(stage1_2img).drawRect(0, 0, W, H);

	//======================================WORLD_1_3=======================================
	stage1_3img=loader.getResult("WORLD_1_3");
     stage1_3 = new createjs.Shape();
     stage1_3.graphics.beginBitmapFill(stage1_3img).drawRect(0, 0, W, H);

	//======================================WORLD_1_4=======================================
	stage1_4img=loader.getResult("WORLD_1_4");
     stage1_4 = new createjs.Shape();
     stage1_4.graphics.beginBitmapFill(stage1_4img).drawRect(0, 0, W, H);

     //=======================================WORLD_1_5==================================
     stage1_5img=loader.getResult("WORLD_1_5");
     stage1_5 = new createjs.Shape();
     stage1_5.graphics.beginBitmapFill(stage1_5img).drawRect(0, 0, W, H);

	//======================================Mario=======================================

     Marioimg=loader.getResult("Mario");
     var marioSheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [Marioimg],
     frames: {width:16.9, height:32, count:9, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
     "stand":[0,0,"stand"],
     "runf": [1, 3,"runf",0.2],
	"jump":[5,5,"jump"],
	"dug":[6,6,"dug"],
	"climb":[7,8,"climb",0.5]
     // "runb":{
	// 	frames:[6,5,4,3,2,1,0],
	// 	next:"runb",
	// 	speed:0.2
	// }
     }
     });
	Mario = new createjs.Sprite(marioSheet, "stand");

	//==============================BLOCKS==============================================
	Blockimg=loader.getResult("Blocks");
     var Blocksheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [Blockimg],
     frames: {width:48, height:16, count:2, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
     "before":[0,0,"before"],
     "after": [1, 1,"before",0.1],

     }
     });
	Block = new createjs.Sprite(Blocksheet, "before");
	//Block.x=-Block.getBounds().width;

	//==================================Enemy=============================================
	monsterimg=loader.getResult("Enemy");
     var monstersheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [monsterimg],
     frames: {width:16, height:19, count:2, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
     "before":[0,0,"before"],
     "after": [1, 1,"before",1],

     }
     });
	monster= new createjs.Sprite(monstersheet, "before");


}

function scaleElements(stage)
{
     if(stage==0)
	{
          stage1.x=0;
          stage1.y=0;
          stage1.scaleX=W/stage1img.width;
          stage1.scaleY=(H)/stage1img.height;
     }
	if(stage==1)
	{
		stage1_1.x=0;
		stage1_1.y=0;
		stage1_1.scaleX=W/stage1_1img.width;
		stage1_1.scaleY=(H)/stage1_1img.height;
		//equal in every frame
		monster.scaleX=W/(17*monster.getBounds().width);
		monster.scaleY=H/(12*monster.getBounds().height);
		monstercopy1.scaleX=W/(17*monstercopy1.getBounds().width);
		monstercopy1.scaleY=H/(12*monstercopy1.getBounds().height);
		monstercopy2.scaleX=W/(17*monstercopy2.getBounds().width);
		monstercopy2.scaleY=H/(12*monstercopy2.getBounds().height);
	}
	//================================================================
	if(stage==2)
	{
          stage1_2.x=0;
          stage1_2.y=0;
          stage1_2.scaleX=W/stage1_2img.width;
          stage1_2.scaleY=(H)/stage1_2img.height;
     }
	if(stage==3)
	{
		stage1_3.x=0;
          stage1_3.y=0;
          stage1_3.scaleX=W/stage1_3img.width;
      	stage1_3.scaleY=(H)/stage1_3img.height;
	}
	if(stage==4)
	{
		stage1_4.x=0;
		stage1_4.y=0;
		stage1_4.scaleX=W/stage1_4img.width;
		stage1_4.scaleY=(H)/stage1_4img.height;
		//equal in every frame
		Block.scaleX=W/(10*Block.getBounds().width);
		Block.scaleY=H/(12*Block.getBounds().height);
		Blockcopy1.scaleX=W/(10*Blockcopy1.getBounds().width);
		Blockcopy1.scaleY=H/(12*Blockcopy1.getBounds().height);
		Blockcopy2.scaleX=W/(10*Blockcopy2.getBounds().width);
		Blockcopy2.scaleY=H/(12*Blockcopy2.getBounds().height);
	}
     if(stage==5)
	{
          stage1_5.x=0;
          stage1_5.y=0;
          stage1_5.scaleX=W/stage1_5img.width;
          stage1_5.scaleY=(H)/stage1_5img.height;
     }
	//================================================================
	Mariowidth=Mario.getBounds().width; //equal in every frame
	Mario.scaleX=W/(14*Mario.getBounds().width);
	Mario.scaleY=H/(6*Mario.getBounds().height)
}


function jump()
{

	// createjs.Tween.get(Mario, {loop: false})
	//     .to({y: orgy-200}, 300, createjs.Ease.getPowInOut(4));
	grav=5;
	yVel = -(50);

}
function godown()
{
	togglecontrol();
	savex=Mario.x;savey=Mario.y;
	createjs.Tween.get(Mario, {loop: false})
	     .to({alpha: 0,y: savey+H/6}, 1000, createjs.Ease.getPowInOut(2));
	//createjs.Ticker.removeEventListener("tick", gameloop);

	setTimeout (openform, 1200);
}
function processX()
{
	var x=absoluteX(Mario.x);
	var a=W/3,b=2*W/3
	if(x<a)
		return 1;
	else if(x>a&&x<b)
		return 2;
	else
		return 3;
}
function openform()
{
	// open a form no. formlink via nodal and come back to same place
	formstate=true;
	 call1(3*(currentstage-1)+processX());
	// alert("hey bro");
}
function goup()
{
	// not to be called ,unles godown has been called previously.
	//will be called after form has been closed
	createjs.Tween.get(Mario, {loop: false})
	     .to({alpha: 0,x:savex ,y: savey+H/6}, 1, createjs.Ease.getPowInOut(2))
		.to({alpha: 1,x:savex ,y: savey-H/6}, 1000 , createjs.Ease.getPowInOut(2));
	setTimeout(togglecontrol,1050);
}

function goin()
{
	//you have to open up in a new stage, x denotes stage number
		changeStage(stagelink);

}

function right(){

	var x=absoluteX(Mario.x),f=0;
	if(x<changeWH(1,170)&&x>changeWH(1,90) && (f=1))
	setanimation(Block,"after",Block.currentanimation);
	else if(x<changeWH(1,275)&&x>changeWH(1,200) && (f=1))
		setanimation(Blockcopy1,"after",Blockcopy1.currentanimation);
	else if(x<changeWH(1,400)&&x>changeWH(1,310) && (f=1))
		setanimation(Blockcopy2,"after",Blockcopy2.currentanimation);
	if(f==1)
	{
	setTimeout(openform,500);
	togglecontrol();moveLeft=false;moveRight=false;setanimation(Mario,"stand",Mario.currentAnimation);
	}
}

function handleKeyDown(e) {
    switch (e.keyCode) {
        case KEYCODE_SPACE:
        case 87:  // W
		   if(!jumpflag)
		   {
		 	   jumpflag=true;
			   setanimation(Mario,"jump",Mario.currentAnimation);
			   jump();//jump(Mario.y);
			   if(rightpositionflag&&currentstage==4){
			   	//alert("ddsd");
			   	setTimeout(right,300);
			   }
		    }
             break;
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = true;
		  setanimation(Mario,"runf",Mario.currentAnimation);
		  //Mario.gotoAndPlay("runf");
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = true;
		  setanimation(Mario,"runf",Mario.currentAnimation);
		  //Mario.gotoAndPlay("runf");
            break;
	  case KEYCODE_DOWN:
       case 83:  // S
	  	if(!moveRight && !moveLeft)
	  		setanimation(Mario,"dug",Mario.currentAnimation);
	  	 if(baseflag==1 && jumpflag==false)
		 {
	           moveDown = true;
			 godown();
	 	}
		  //Mario.gotoAndPlay("runf");
           break;
	 case KEYCODE_UP:
	  	 if(upflag)
		 {
		 	upflag = false;
		 	if(currentstage==5&&baseflag==1&&!jumpflag)
			 {
              		climbq();
			 }
			else if(currentstage!=5)
	        	{
		 		createjs.Tween.get(Mario, {loop: false})
		     	.to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
				if(currentstage==0)
				 {
					 createjs.Tween.get(Mario, {loop: false})
	 				.to({alpha: 1}, 1000, createjs.Ease.getPowInOut(2));
					 setTimeout(goin, 500);

				 }
				 else {
				 	setTimeout(openform,500);
				 }
			}
		}
		  //Mario.gotoAndPlay("runf");
          break;
    }

}


function handleKeyUp(e) {
    switch (e.keyCode) {
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = false;
		  setanimation(Mario,"stand",Mario.currentAnimation);
		  if(moveRight)
		  	setanimation(Mario,"runf",Mario.currentAnimation);
            //Mario.gotoAndPlay("stand");
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = false;
		  setanimation(Mario,"stand",Mario.currentAnimation);
		  if(moveLeft)
		  	setanimation(Mario,"runf",Mario.currentAnimation);
		  //Mario.gotoAndPlay("stand");
            break;
	  case KEYCODE_DOWN:
	  case 83:  // S
	     setanimation(Mario,"stand",Mario.currentAnimation);


    }
}

function climbq()
 {
	 // remember to turn gravity on.....................................................................................................
	togglecontrol();moveLeft=false;moveRight=false;
	if(Mario.scaleX<0)
	{
		Mario.scaleX *= -1;
		Mario.x -= W/15;
	}
	setanimation(Mario,"runf",Mario.currentAnimation);
	grav=0;
	if(Mario.scaleX>0)
		   x=Mario.x;
	   else
		   x=Mario.x-(W/15);
	if(x>changeWH(1,65)-(W/15)&&x<changeWH(1,146))
	  {
	    createjs.Tween.get(Mario,{loop:false})
	    .to({x:changeWH(1,70)},300,createjs.Ease.getPowInOut(2))
	    .to({y:-200},1000,createjs.Ease.getPowInOut(2));
	  }
	  else if(x>changeWH(1,224)-(W/15)&&x<changeWH(1,304))
	  {
	    createjs.Tween.get(Mario,{loop:false}).to({x:changeWH(1,230)},300,createjs.Ease.getPowInOut(2)).
	    to({y:-200},1000,createjs.Ease.getPowInOut(2));
	  }
	  else if(x>changeWH(1,381)-(W/15)&&x<changeWH(1,461))
	  {
	    createjs.Tween.get(Mario,{loop:false}).to({x:changeWH(1,385)},300,createjs.Ease.getPowInOut(2)).
	    to({y:-200},1000,createjs.Ease.getPowInOut(2));
	  }
	  setTimeout(extra1,300);
	  setTimeout(openform,1300);
}

function extra1()
{
	setanimation(Mario,"climb",Mario.currentAnimation);
}


function changeWH(a,b)
{
     if(a==1)
          return b*(W/515);
     return b*(H/223);
}

function formClosed()
{
	formstate=false;
	if(currentstage==2)
	{
		goup();
		return;
	}
	if(currentstage==3)
	{
		createjs.Tween.get(Mario, {loop: false})
	    .to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	}
	if(currentstage==5)
	{
		grav=5;jumpflag=false;
		setanimation(Mario,"stand",Mario.currentAnimation);
		Mario.y=absoluteY;
	}
	if(document.onkeydown==null||document.onkeyup==null)
		togglecontrol();
}

function play0(event)
{
	//WORLD0
	var a=changeWH(1,86),b=changeWH(1,33),c=changeWH(1,70),d=changeWH(1,241),e=changeWH(1,273),w=W/15;
     var x,y=Mario.y;
	if(Mario.scaleX>0)
		x=Mario.x;
	else
		x=Mario.x-W/15;
     baseflag=0;
     if(x>d-w && x<e)
	     if(y<=yupper)
	          baseflag=1;
	     else
	          baseflag=0;
	if(((x<a-w) || ( x>a+b && x<a+b+c-w) || (x>a+2*b+c && x<a+2*b+2*c-w) || (x>a+3*b+2*c && x<a+3*b+3*c-w) || (x>a+4*b+3*c)) && baseflag==0 && !jumpflag)
	{
		//set stagelink and upflag=true
		stagelink=parseInt(x/(W/5))+1;
		upflag=true;
	}
	else
	{
		upflag=false;
		stagelink=-1;
	}
     //setanimation(dudeobj,"runf",dudeobj.currentAnimation);
}
function play1(event)
{
	//WORLD1_5
	var a=changeWH(1,120),b=changeWH(1,245),c=changeWH(1,370),w=W/15;
	var x,y=Mario.y,found=false;
	x=absoluteX(Mario.x);
	baseflag=0;
    if(!jumpflag)
    {
	    if(x>a-W/15 && x<a+W/17 && (found=true))
		setanimation(monster,"after",monster.currentanimation);
		else if(x>b-W/15 && x<b+W/17 && (found=true))
			setanimation(monstercopy1,"after",monstercopy1.currentanimation);
		else if(x>c-W/15 && x<c+W/17 && (found=true))
			setanimation(monstercopy2,"after",monstercopy2.currentanimation);
		else
		{setanimation(monstercopy2,"before",monstercopy2.currentanimation);
		setanimation(monstercopy1,"before",monstercopy2.currentanimation);
		setanimation(monster,"before",monstercopy2.currentanimation);
		}
	}

	if(found && !formstate)
	{
		togglecontrol();moveLeft=false;moveRight=false;setanimation(Mario,"stand",Mario.currentAnimation);
		openform();
		if(Mario.scaleX>0)
		createjs.Tween.get(Mario, {loop: false})
		.to({x: Mario.x+2*W/15}, 500, createjs.Ease.getPowInOut(2));
		else
		createjs.Tween.get(Mario, {loop: false})
		.to({x: Mario.x-2*W/15}, 500, createjs.Ease.getPowInOut(2));
	}


}

function play2(event)
{
     var a=changeWH(1,114),b=changeWH(1,33),c=changeWH(1,96),w=W/15;
     var x,y=Mario.y;
	if(Mario.scaleX>0)
		x=Mario.x;
	else
		x=Mario.x-W/15;
     baseflag=0;
     if((x>a-w && x<a+b) || ( x>a+b+c-w && x<a+2*b+c) || (x>a+2*b+2*c-w && x<a+3*b+2*c))
          if(y<=yupper)
               baseflag=1;
          else
               baseflag=0;
     //setanimation(dudeobj,"runf",dudeobj.currentAnimation);
}

function play3(event)
{
	//WORLD1_3
	var a=changeWH(1,82),b=changeWH(1,80),c=changeWH(1,64),w=W/15;
     var x,y=Mario.y;
	x=absoluteX(Mario.x);
     baseflag=0;

	if(((x<a-w) || ( x>a+(b/2)-w && x<a+(b/2)+w) || (x>a+((3*b)/2)+c-w && x<a+((3*b)/2)+c+w) || (x>a+((5*b)/2)+2*c-w && x<a+((5*b)/2)+2*c+w) || (x>a+4*b+3*c)) && baseflag==0 && !jumpflag)
	{
		upflag=true;
	}
	else
	{
		upflag=false;
	}
}

function play4(event)
{
	//WORLD1_4
	var a=changeWH(1,104.75),b=changeWH(1,217.5),c=changeWH(1,338.75),w=W/15;
    var x,y=Mario.y;
    x=absoluteX(Mario.x);
    baseflag=0;

    if(((x<0) || ( x>a-w && x<a+w) || (x>b-w && x<b+w) || (x>c-w && x<c+w) || (x>a+4*b+3*c)) && baseflag==0 && !jumpflag)
    {
	    rightpositionflag=true;
    }
    else
    {
	    rightpositionflag=false;
    }
}
function play5(event)
{
     var a=changeWH(1,65),b=changeWH(1,78),c=changeWH(1,78),w=W/15;
     var x,y=Mario.y;
	if(Mario.scaleX>0)
		x=Mario.x;
	else
		x=Mario.x-(W/15);
     baseflag=0;
	if((x>a-w && x<a+b) || ( x>a+b+c-w && x<a+(2*b)+c) || (x>a+2*b+2*c-w && x<a+3*b+2*c))
    {
 	   if(y<=yupper)
        {
            baseflag=1;
            upflag=true;
        }
         else
          {
	 	   baseflag=0;
              upflag=false;
          }
	}

      else
        upflag=false;

     //setanimation(dudeobj,"runf",dudeobj.currentAnimation);
}
function gravity()
{
     if(Mario.y<absoluteY||jumpflag)
     {
		jumpflag=true;
		yVel += grav;
  	   Mario.y += yVel;
  	   if (Mario.y > absoluteY)
  	   {
		   if(moveLeft||moveRight)
		   	setanimation(Mario,"runf",Mario.currentAnimation);
		   else if(Mario.currentAnimation!="climb")
	      	setanimation(Mario,"stand",Mario.currentAnimation);
		 Mario.y = absoluteY;
  		 yVel = 0;
  		 jumpflag = false;
  	   }
     }

}


function setanimation(obj,set,old)
{
	if(set!=old)
	{
		obj.gotoAndPlay(set);
	}
}

function positionFrame()
{
	var x=(window.innerHeight-H)/2;
	document.getElementById("mymain_container").style.top = x+"px";
	document.getElementById("intro1").width = W;
	document.getElementById("intro1").height = H;

	scaleElements(currentstage);
	frame.update(event);
}

//resize event
function resize() {

    W = window.innerWidth/parseFloat($("body").css("font-size"));
    W*=15;
    H = window.innerHeight-(window.innerHeight*0.1);
    positionFrame();
    //alert("coming "+W+" "+H+" "+window.innerWidth+" "+$(window).width());

}
function absoluteX(mariox)
{
	var x;
	if(Mario.scaleX>0)
		x=Mario.x;
	else
		x=Mario.x-(W/15);
	return x;
}
function initiateExit()
{
	togglecontrol();
	createjs.Tween.get(Mario, {loop: false})
	.to({alpha: 0,x: -W/15}, 1000, createjs.Ease.getPowInOut(2))
	.to({y:changeWH(0,71),x:changeWH(1,230)}, 1, createjs.Ease.getPowInOut(2))
	.to({alpha:1,y:changeWH(0,71)-2*H/6}, 1000, createjs.Ease.getPowInOut(2));
	setTimeout(goin,1000);
	setTimeout(togglecontrol,2000);
}

function gameloop(event)
{
	if(currentstage==0)
		play0(event);
     else if(currentstage==1)
          play1(event);
		else if(currentstage==2)
			play2(event);
			else if(currentstage==3)
				play3(event);
				else if(currentstage==4)
					play4(event);
					else if(currentstage==5)
						play5(event);
	absoluteY=baseflag==0?ylower:yupper;
	if (moveLeft)
	{
	  //setanimation(Mario,"runf",Mario.currentAnimation);
	  Mario.x -= 10;
	  if(Mario.scaleX>0)
	  {
		  Mario.scaleX *= -1;
		  Mario.x +=W/15;
	  }
    }
    else if (moveRight)
    {
	    //setanimation(Mario,"runf",Mario.currentAnimation);
		  Mario.x += 10;
		  if(Mario.scaleX<0)
		  {
			  Mario.scaleX *= -1;
			  Mario.x -= W/15;
		  }
    }
     x=absoluteX(Mario.x);
	if(x<changeWH(1,32) && baseflag==0 && !jumpflag && !exiting && currentstage!=0)
	{
		exiting=true;
		initiateExit();
	}
     gravity();
     frame.update(event);
}
