var stage;
var button1;
var button2;
var scence1;
var scence2;
var level;
var score;

function init(){ //初始化基本部件
	stage = new createjs.Stage("game");
	stage.enableMouseOver();
	var backgroud = new createjs.Shape();
	backgroud.graphics.beginFill("#a9a9a9").drawRoundRect(0,0,300,500,10);
	backgroud.graphics.beginFill("#ffffff").drawRoundRect(5,5,290,490,10);
	stage.addChild(backgroud);
	initScence1();
	stage.update();
}

function initScence1(){  //初始化第一界面
	scence1 = new createjs.Container();
	stage.addChild(scence1);
	//backgroud.graphics.beginFill("#7F0000").drawRect(15,15,270,470);
	//初始化按钮1
	button1 = new createjs.Shape();
	button1.graphics.beginFill("#EB0000").drawRoundRect(0,0,70,70,10);
	button1.x = 150;button1.y = 350;button1.regX = 35;button1.regY = 35;

	button1.graphics.beginFill("#FFFFFF").moveTo(18,15).lineTo(18,55).lineTo(55,35).closePath();

	button1.addEventListener("mouseover",inter);
	button1.addEventListener("mouseout",inter);
	scence1.addChild(button1);


	button1.on("click",start,null,true);

	function start(){
		//initScence2();	
		initLevel();
		stage.removeChild(scence1);
		console.log("start");
		//stage.removeChild(scence1);
		stage.update();
	}
	//初始化level


	//初始化上端显示
	
	createjs.Ticker.addEventListener("tick",redraw);
	createjs.Ticker.interval = 1000;

	var backgroud2 = new createjs.Shape();
	scence1.addChild(backgroud2);
	var color = ["#FF0C0C","#FFB10C","#DFFF0C","#a9a9a9","#0CE6FF","#FF250C","#a9a9a9"];

	redraw();

	function redraw(){
		backgroud2.graphics.clear();
		for(i=0;i<5;i++){
			for(j=0;j<4;j++){
				backgroud2.graphics.beginFill(color[Math.floor(Math.random()*7)]).drawRoundRect(30+i*50,30+j*50,40,40,5);
			}
		}
		stage.update();
	}
	stage.update();
}

function initScence2(){  //初始化第二界面

	var num = 0; 
	scence2 = new createjs.Container();
	//createjs.Ticker.addEventListener("tick",tick);
	//创建背景
	var backgroud = new createjs.Shape();
	//backgroud.graphics.beginFill("#ffffff").drawRoundRect(5,5,290,490,10);
	//backgroud.graphics.beginFill("#000000").drawRoundRect(13,65,274,365,5);
	scence2.addChild(backgroud);
	var s = new createjs.Shape();
	scence2.addChild(s);
	var map = new Array();	
	var count = [0,0,0,0];
	var color = ["#FF4040","#7EC0EE","#FFFF00","#CC6600"];	
	for(var k=0;k<7;k++){
		map[k]=new Array();
	}
	initGame();
	//创建游戏窗口
	function initGame(){
		for(var i=0;i<7;i++){
			for(var j=0;j<5;j++){
				map[i][j]=Math.floor(Math.random()*4);
				s.graphics.beginFill(color[map[i][j]]).drawRoundRect(17+j*50,70+i*50,40,40,5);	

				switch(map[i][j]){
					case 0:count[0]+=1;break;
					case 1:count[1]+=1;break;
					case 2:count[2]+=1;break;
					case 3:count[3]+=1;break;
				}			
			}
		}
	}
	//返回按钮
	var back = new createjs.Shape();
	back.graphics.beginFill("red").drawRoundRect(20,10,40,40,5);
	scence2.addChild(back);
	back.on("click",exit,null,true);
	function exit(){
		initScence1();
		stage.removeChild(scence2);
		stage.update();
	}
	//创建按键
	var button = new Array();
	for(var i=0;i<4;i++){
		button[i] = new createjs.Shape();
		button[i].graphics.beginFill(color[i]).drawRoundRect(50+50*i,443,40,40,10);
		scence2.addChild(button[i]);
	}
	button[0].addEventListener("click",ans0);
	button[1].addEventListener("click",ans1);
	button[2].addEventListener("click",ans2);
	button[3].addEventListener("click",ans3);




	
	function ans0(){if(count[0]== Math.max.apply(null, count)){console.log("you are right!");right();}else{wrong();console.log("you are wrong!");}}
	function ans1(){if(count[1]== Math.max.apply(null, count)){console.log("you are right!");right();}else{wrong();console.log("you are wrong!");}}
	function ans2(){if(count[2]== Math.max.apply(null, count)){console.log("you are right!");right();}else{wrong();console.log("you are wrong!");}}
	function ans3(){if(count[3]== Math.max.apply(null, count)){console.log("you are right!");right();}else{wrong();console.log("you are wrong!");}}

	function right(){
		if(num < 1){
			s.graphics.clear();
			count = [0,0,0,0];
			initGame();
			stage.update();
			num++;}
		else{final();}}
	function wrong(){}
	function final(){


		var regame = new createjs.Shape();
		regame.graphics.beginFill("#FFFFFF").drawRoundRect(75,175,150,150,10);
		regame.shadow = new createjs.Shadow('#000',0,0,16);
		scence2.addChild(regame);
		

		var finalbutton = new createjs.Shape();
		finalbutton.graphics.beginFill("#000000").drawRoundRect(120,245,60,60,10);
		scence2.addChild(finalbutton);
		stage.update();
	}
	stage.addChild(scence2);
	stage.update();
}

function inter(event){
	//console.log("21312321");
	event.target.scaleX = (event.type == "mouseover") ? 1.2 : 1;
	event.target.scaleY = (event.type == "mouseover") ? 1.2 : 1;
	stage.update();
}


function initLevel(){
	level = new createjs.Container();
	stage.addChild(level);

	var button = new Array();
	for(var i=0;i<3;i++){
		button[i]=new Array();
	}

	for(var j=0;j<3;j++){
		for(var i=0;i<3;i++){
			button[i][j] = new createjs.Shape();
			button[i][j].graphics.beginFill("red").drawRoundRect(0,0,60,60,10);
			button[i][j].x = 70+80*i;
			button[i][j].y = 150+j*75;
			button[i][j].regX = 30;
			button[i][j].regY = 30;
			button[i][j].on("mouseover",inter);
			button[i][j].on("mouseout",inter);
			button[i][j].on("click",cut);
			level.addChild(button[i][j]);
		}
	}

	var ret = new createjs.Shape();
	ret.graphics.beginFill("red").drawRoundRect(120,400,60,60,10);
	ret.on("click",bac);

	level.addChild(ret);

	stage.update();

	function bac(){
		stage.removeChild(level);
		initScence1();

	}

	function cut(i,j){
		switch(i*10+j){
			case 0:console.log("1");break;
			case 10:console.log("2");break;
			case 20:console.log("3");break;
			case 1:console.log("4");break;
			case 11:console.log("5");break;
			case 21:console.log("6");break;
		}
	}
}