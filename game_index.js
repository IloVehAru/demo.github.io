var stage;
var button1;
var scence1;
var level;
var color = ["#FF4040","#7EC0EE","#FFFF00","#CC6600","#EEAD0E","#EE82EE","#B23AEE","#00FF7F","#008B45"];
var color_margin=["#008f78","#dc0062","#008449"];

function init(){ //初始化基本部件
	stage = new createjs.Stage("gameCanvas");
	stage.enableMouseOver();
	var backgroud = new createjs.Shape();
	backgroud.graphics.beginFill(color_margin[Math.floor(Math.random()*3)]).drawRoundRect(0,0,300,500,10);
	backgroud.graphics.beginFill("#ebebeb").drawRoundRect(10,20,280,460,10);
	stage.addChild(backgroud);
	initScence1();
	stage.update();
}

function initScence1(){  //初始化第一界面

	scence1 = new createjs.Container();
	stage.addChild(scence1);
	// var title_str=["WHICH","COLOR","IS","MOST"];
	var title_1=new Array();
	var title_2=new Array();
	var title_3=new Array();
	var title_4=new Array();
	// for(var i=0;i<title_str.length;i++){
	// 	title[i]=new createjs.Text(title_str[i],"70px impact",color[i]);
	// 	title[i].regX=title[i].getBounds().width/2;
	// 	title[i].y=20+i*75;
	// 	title[i].x=150;
	// 	scence1.addChild(title[i]);
	// }
	var title_str=["WHICH","COLOR","IS   ","MOST?"];
	var icon=new createjs.Shape();
	scence1.addChild(icon);
	for(var i=0;i<5;i++){icon.graphics.beginFill(color[Math.floor(Math.random()*5)]).drawRoundRect(15+55*i,40,50,50,5);
	title_1[i]=new createjs.Text(title_str[0].charAt(i),"50px impact","#FFFFFF");scence1.addChild(title_1[i]);
	title_1[i].regX=title_1[i].getBounds().width/2;title_1[i].x=40+55*i,title_1[i].y=35;}

	for(var i=0;i<5;i++){icon.graphics.beginFill(color[Math.floor(Math.random()*5)]).drawRoundRect(15+55*i,110,50,50,5);
	title_2[i]=new createjs.Text(title_str[1].charAt(i),"50px impact","#FFFFFF");scence1.addChild(title_2[i]);
	title_2[i].regX=title_2[i].getBounds().width/2;title_2[i].x=40+55*i,title_2[i].y=105;}

	for(var i=0;i<5;i++){icon.graphics.beginFill(color[Math.floor(Math.random()*5)]).drawRoundRect(15+55*i,180,50,50,5);
	title_3[i]=new createjs.Text(title_str[2].charAt(i),"50px impact","#FFFFFF");scence1.addChild(title_3[i]);
	title_3[i].regX=title_3[i].getBounds().width/2;title_3[i].x=40+55*i,title_3[i].y=175;}

	for(var i=0;i<5;i++){icon.graphics.beginFill(color[Math.floor(Math.random()*5)]).drawRoundRect(15+55*i,250,50,50,5);
	title_4[i]=new createjs.Text(title_str[3].charAt(i),"50px impact","#FFFFFF");scence1.addChild(title_4[i]);
	title_4[i].regX=title_4[i].getBounds().width/2;title_4[i].x=40+55*i,title_4[i].y=245;}

	
	//初始化按钮1
	button1 = new createjs.Shape();
	button1.graphics.beginFill("#EB0000").drawRoundRect(0,0,70,70,10);
	button1.x = 150;button1.y = 400;button1.regX = 35;button1.regY = 35;

	button1.graphics.beginFill("#FFFFFF").moveTo(18,15).lineTo(18,55).lineTo(55,35).closePath();

	button1.addEventListener("mouseover",inter);
	button1.addEventListener("mouseout",inter);
	scence1.addChild(button1);


	button1.on("click",start,null,true);

	function start(){
		
		initLevelSelector();
		stage.removeChild(scence1);
		stage.update();
	}

	stage.update();
}


function initLevelSelector(){
	levelSelector = new createjs.Container();
	stage.addChild(levelSelector);

	var button = new Array();
	for(var i=0;i<3;i++){
		button[i]=new Array();
	}

	var k=0;var g=0;
	for(var j=0;j<3;j++){
		for(var i=0;i<3;i++){
			button[i][j] = new createjs.Shape();
			button[i][j].graphics.beginFill(color[3*j+i]).drawRoundRect(0,0,60,60,10);
			button[i][j].x = 70+80*i;
			button[i][j].y = 150+j*75;
			button[i][j].regX = 30;
			button[i][j].regY = 30;
			button[i][j].on("mouseover",inter);
			button[i][j].on("mouseout",inter);	
			button[i][j].on("click",cut,null,false,{k:i,g:j});
			levelSelector.addChild(button[i][j]);
		}
	}


	var levelbackbutton = new createjs.Shape();
	levelbackbutton.graphics.beginFill("red").drawRoundRect(0,0,50,50,10);
	levelbackbutton.graphics.beginFill("#FFFFFF").moveTo(12,25).lineTo(35,12).lineTo(35,38).closePath();
	levelbackbutton.x=150;levelbackbutton.y=400;levelbackbutton.regX=levelbackbutton.regY=25;
	levelbackbutton.on("click",bac);
	levelbackbutton.on("mouseout",inter);
	levelbackbutton.on("mouseover",inter);

	levelSelector.addChild(levelbackbutton);

	stage.update();

	function bac(){
		stage.removeChild(levelSelector);
		initScence1();
	}

	function cut(event,data){
		stage.removeChild(levelSelector);
		initLevel(data.k+1+3*data.g);
	}
}


function initLevel(level_count){

	var score=10000;
	var color_count;
	var mostColor;
	var round=1;
	var gamescence;
	var level = new createjs.Container();
	stage.addChild(level);

	var block = new Array();
	for(var i=0;i<7;i++){block[i]=new Array()}

	var backButton = new createjs.Shape();
	level.addChild(backButton);
	backButton.x=150;backButton.y=450;backButton.regX=backButton.regY=15;
	backButton.graphics.beginFill("#FF0000").drawRoundRect(0,0,30,30,5);
	backButton.on("click",function backFunction(){stage.removeChild(level);initLevelSelector();},null,true);
	backButton.on("mouseover",inter);backButton.on("mouseout",inter);
	initgamescence();
	stage.update();

	function initgamescence(){
		color_count = [0,0,0,0,0,0,0,0,0];
		mostColor = 0;
		gamescence = new createjs.Container();
		level.addChild(gamescence);	
		for(var i=0;i<7;i++){
			for(var j=0;j<5;j++){
				var k=Math.floor(Math.random()*(level_count));
				block[i][j]=new createjs.Shape();
				gamescence.addChild(block[i][j]);
				block[i][j].graphics.beginFill(color[k]).drawRoundRect(0,0,40,40,5);
				block[i][j].x=50+j*50;block[i][j].y=70+i*50;
				block[i][j].regX=block[i][j].regY=20;
				block[i][j].on("mouseover",inter);
				block[i][j].on("mouseout",inter);	
				block[i][j].on("click",ans,null,false,{count:k});
				color_count[k]++;
			}
		}
		mostColor=Math.max.apply(null,color_count);
	}

	function ans(event,data){
		console.log("this is",color[data.count],"count is",color_count[data.count]);
		if(color_count[data.count]==mostColor){console.log("this round is",round);right();}
		else{gameover();console.log("wrong");}
	}

	function right(){
		if(round<10){round++;level.removeChild(gamescence);initgamescence();stage.update()}
		else{console.log("game over")}
	}

	function gameover(){}


}

function inter(event){
	event.target.scaleX = (event.type == "mouseover") ? 1.2 : 1;
	event.target.scaleY = (event.type == "mouseover") ? 1.2 : 1;
	stage.update();
}