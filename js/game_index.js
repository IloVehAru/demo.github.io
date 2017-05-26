var stage;
var button1;
var scence1;
var level;
var color = ["#FF4040","#7EC0EE","#FFFF00","#CC6600","#EEAD0E","#EE82EE","#B23AEE","#00FF7F","#008B45"];
var color_shadow=["#ec3d3d","#76b2db","#e3e305","#ac5600","#d29a0f","#d475d4","#a538db","#00e170","#005e2f"];
var color_margin=["#008f78","#dc0062","#008449"];

var gameend=false;

function init(){ //初始化基本部件

	createjs.Sound.initializeDefaultPlugins();
	//createjs.Sound.registerSound("./sound1.wav","sound");

	var assetPath="./asset/";
	var sound=[
		{id:"sound",src:"sound1.wav"},
		{id:"fail",src:"fail.wav"},
		{id:"right",src:"right.wav"},
		{id:"wrong",src:"wrong.wav"},
		{id:"end",src:"end.wav"}
	];

	createjs.Sound.registerSounds(sound,assetPath);

	stage = new createjs.Stage("gameCanvas");
	stage.enableMouseOver();
	var backgroud = new createjs.Shape();
	backgroud.graphics.beginFill(color_margin[Math.floor(Math.random()*3)]).drawRoundRect(0,0,1200,2000,40);
	backgroud.graphics.beginFill("#c9c9c9").drawRoundRect(40,90,1120,1850,40);
	backgroud.graphics.beginFill("#FFFFFF").drawRoundRect(40,60,1120,1850,40);
	stage.addChild(backgroud);

	initScence1();
	stage.update();
}

function initScence1(){  //初始化第一界面
	
	scence1 = new createjs.Container();
	stage.addChild(scence1);
	var shadow=new createjs.Shape();
	scence1.addChild(shadow);
	

	var title=new Array();
	for(var i=0;i<5;i++){
		title[i]=new Array();
	}
	var title_str=["WHICH","COLOR","IS   ","MOST ","    ?"];
	var icon=new createjs.Shape();
	scence1.addChild(icon);


	for(var j=0;j<5;j++){
		for(var i=0;i<5;i++){
			var k=Math.floor(Math.random()*5);
			title[j][i]=new createjs.Text(title_str[j].charAt(i),"bold 160px FANTASY","#FFFFFF");
			shadow.graphics.beginFill(color_shadow[k]).drawRoundRect(120+200*i,220+220*j,160,160,20);
			if(title[j][i].text==" "){
				icon.graphics.beginFill(color[k]).drawRoundRect(120+200*i,210+220*j,160,160,20);
			}
			else{
				icon.graphics.beginFill(color[k]).drawRoundRect(120+200*i,190+220*j,160,160,20);
			}
			
			title[j][i].regX=title[j][i].getBounds().width/2;
			title[j][i].x=200+200*i;
			title[j][i].y=175+220*j;
			scence1.addChild(title[j][i]);
		}
	}


	
	//初始化按钮1
	button1 = new createjs.Shape();
	shadow.graphics.beginFill("#c90000").drawRoundRect(460,1500,280,280,40);
	button1.graphics.beginFill("#EB0000").drawRoundRect(0,0,280,280,40);
	button1.x = 600;button1.y = 1600;button1.regX = 140;button1.regY = 140;

	button1.graphics.beginFill("#FFFFFF").moveTo(72,60).lineTo(72,220).lineTo(220,140).closePath();

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
	var shadow=new createjs.Shape();
	levelSelector.addChild(shadow);
	var button = new Array();
	for(var i=0;i<3;i++){
		button[i]=new Array();
	}

	var k=0;var g=0;
	for(var j=0;j<3;j++){
		for(var i=0;i<3;i++){
			button[i][j] = new createjs.Shape();
			shadow.graphics.beginFill(color_shadow[3*j+i]).drawRoundRect(160+320*i,520+j*300,240,240,40);
			button[i][j].graphics.beginFill(color[3*j+i]).drawRoundRect(0,0,240,240,40);
			button[i][j].x = 280+320*i;
			button[i][j].y = 600+j*300;
			button[i][j].regX = 120;
			button[i][j].regY = 120;
			button[i][j].on("mouseover",inter);
			button[i][j].on("mouseout",inter);	
			button[i][j].on("click",cut,null,false,{k:i,g:j});
			levelSelector.addChild(button[i][j]);
	
		}
	}

	shadow.graphics.beginFill("#c90000").drawRoundRect(500,1530,200,200,40);

	var levelbackbutton = new createjs.Shape();
	levelbackbutton.graphics.beginFill("red").drawRoundRect(0,0,200,200,40);
	levelbackbutton.graphics.beginFill("#FFFFFF").moveTo(48,100).lineTo(140,48).lineTo(140,152).closePath();
	levelbackbutton.x=600;levelbackbutton.y=1600;levelbackbutton.regX=levelbackbutton.regY=100;
	levelbackbutton.on("click",bac);
	levelbackbutton.on("mouseout",inter2);
	levelbackbutton.on("mouseover",inter2);

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

	var level = new createjs.Container();
	stage.addChild(level);
	var score=10006;
	var color_count;
	var mostColor;
	var round=1;
	var gamescence;
	var shadow=new createjs.Shape();
	shadow.graphics.beginFill("#cecece").drawRoundRect(120,80,960,100,20);
	level.addChild(shadow);
	var score_title=new createjs.Text("","bold 80px FANTASY","#FFFFFF");
	var round_title=new createjs.Text("","bold 80px FANTASY","#FFFFFF");
	round_title.x=700;round_title.y=80;
	score_title.x=200;score_title.y=80;
	
	level.addChild(round_title);
	level.addChild(score_title);
	var block = new Array();
	for(var i=0;i<7;i++){block[i]=new Array()}
	var backButton = new createjs.Shape();
	level.addChild(backButton);


	createjs.Ticker.addEventListener("tick",score_count);
	createjs.Ticker.setInterval(10);

	shadow.graphics.beginFill("#ce0000").drawRoundRect(540,1720,120,120,20);
	backButton.x=600;backButton.y=1750;backButton.regX=backButton.regY=60;
	backButton.graphics.beginFill("#FF0000").drawRoundRect(0,0,120,120,20);
	backButton.on("click",function backFunction(){if(gameend==false){stage.removeChild(level);createjs.Ticker.removeAllEventListeners("tick");initLevelSelector();}},null,true);
	backButton.on("mouseover",inter2);backButton.on("mouseout",inter2);
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
				//shadow.graphics.beginFill(color_shadow[k]).drawRoundRect(120+j*200,230+i*200,160,160,20);
				block[i][j]=new createjs.Shape();
				gamescence.addChild(block[i][j]);
				block[i][j].graphics.beginFill(color[k]).drawRoundRect(0,0,160,160,20);
				block[i][j].x=200+j*200;block[i][j].y=320+i*200;
				block[i][j].regX=block[i][j].regY=80;
				block[i][j].on("mouseover",scale);
				block[i][j].on("mouseout",scale);	
				block[i][j].on("click",ans,null,false,{count:k});
				color_count[k]++;

			
			}
		}
		mostColor=Math.max.apply(null,color_count);
	}

	function ans(event,data){
		if(gameend==false){
			if(color_count[data.count]==mostColor){right();}
			else{if(score<1000){createjs.Sound.play("fail");score="FAIL";gameover()}else{score-=1000;createjs.Sound.play("wrong")};}
		}
	}

	function right(){
		if(round<10){createjs.Sound.play("right");round++;level.removeChild(gamescence);initgamescence();stage.update()}
		else{createjs.Sound.play("end");gameover();}
	}

	function score_count(event){
		if(score>0){
		score--;
		score_title.text="SCORE : "+score;
		round_title.text="ROUND : "+round;
		}
		else{createjs.Sound.play("fail");;gameover();}
		stage.update();
	}
	function gameover(){
		gameend=true;
		var over=new createjs.Shape();
		var final_score=new createjs.Text(score,"bold 200px FANTASY","#ff4040");
		var final_button=new createjs.Shape();
		level.addChild(over);
		level.addChild(final_score);
		level.addChild(final_button);

		over.graphics.beginFill("#cecece").drawRoundRect(280,680,640,640,40);
		over.graphics.beginFill("#FFFFFF").drawRoundRect(300,700,600,600,40);
		over.graphics.beginFill("#ce0000").drawRoundRect(475,1000,250,250,40);
		final_button.graphics.beginFill("#FF4040").drawRoundRect(475,970,250,250,40);
		final_button.on("click",function backFunction(){stage.removeChild(level);createjs.Ticker.removeAllEventListeners("tick");initLevelSelector();},null,true);
		final_button.on("mouseout",inter);
		final_button.on("mouseover",inter);

		final_score.regX=final_score.getBounds().width/2;
		final_score.x=600;final_score.y=700;
		stage.update();
		createjs.Ticker.removeAllEventListeners("tick");}


}

function inter(event){
	// event.target.scaleX = (event.type == "mouseover") ? 1.2 : 1;
	// event.target.scaleY = (event.type == "mouseover") ? 1.2 : 1;
	if(event.type=="mouseover"){
		event.target.y+=30;
		createjs.Sound.play("sound");
	}
	else if(event.type=="mouseout"){
		event.target.y-=30;
	}
	
	stage.update();
}
function inter2(event){
	// event.target.scaleX = (event.type == "mouseover") ? 1.2 : 1;
	// event.target.scaleY = (event.type == "mouseover") ? 1.2 : 1;
	if(event.type=="mouseover"){
		createjs.Sound.play("sound");
		event.target.y+=20;
	}
	else if(event.type=="mouseout"){
		event.target.y-=20;
	}
	
	stage.update();
}


function scale(event){
	event.target.scaleX = (event.type == "mouseover") ? 1.2 : 1;
	event.target.scaleY = (event.type == "mouseover") ? 1.2 : 1;
	stage.update();
}