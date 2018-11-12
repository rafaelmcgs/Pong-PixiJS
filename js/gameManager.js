// JavaScript Document

function GameManager (){
	PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
	
	
	///////////////////
	//Html and PixiJS//
	///////////////////
	this.mainDiv = document.getElementById("mainDiv");
	this.canvas = document.createElement( 'canvas' );
	this.stage = new PIXI.Container();
	this.renderer; //will be initialized later
	
	
	/////////////////
	//Game Elements//
	/////////////////
	this.titleText = new Title();
	this.buttons = {
		start: new Button(this, "Start", this.openLevelMenu, "center"),
		level1: new Button(this, "Normal", this.selectLevel1, "left"),
		level2: new Button(this, "Impossible", this.selectLevel2, "right"),
		restart: new Button(this, "Play Again", this.startMatch, "left"),
		change: new Button(this, "Change Mode", this.openLevelMenu, "right")
	};
	this.score = new Score();
	this.playerPaddle = new Paddle(this, false);
	this.playerAi = new Paddle(this, true);
	this.ball = new Ball(this);
	
	/////////////////
	//Game Settings//
	/////////////////
	this.playing = false;
	this.gameSize = {
		width:0, 
		height:0,
		scale:0 //dynamic value
	};
	this.orientation = "landscape"; // {portrait|landscape}
	
	
	
	/////////////
	//Game Load//
	/////////////
	this.loader = PIXI.loader;
	this.loader.add("sound-hit", "sounds/hit.ogg");
	this.loader.load(this.init.bind(this));
}
GameManager.prototype.init = function(){
	
	this.mainDiv.className = "game";	
	this.mainDiv.appendChild(this.canvas);
		
	
	this.renderer = new PIXI.WebGLRenderer(
			window.innerWidth,
			window.innerHeight,
			{view:this.canvas,
			antialias:true,
			forceFXAA:true,
			powerPreference : 'high-performance'}
	);
	
	window.addEventListener('resize', this.resize.bind(this));
	requestAnimationFrame(this.update.bind(this));
	
	this.addElementToStage(this.titleText);
	this.addElementToStage(this.buttons.start);
	this.titleText.setText("Pong Game");
	
	
	this.resize();
};
GameManager.prototype.update = function(){
	
	this.renderer.render(this.stage);
	requestAnimationFrame(this.update.bind(this));
	
	if(this.playing){
		this.ball.update();
		this.playerAi.update();
	}
	
};
GameManager.prototype.resize = function(){
	this.renderer.resize(window.innerWidth,window.innerHeight);
	
	
	this.titleText.resize();
	this.buttons.start.resize();
	this.buttons.level1.resize();
	this.buttons.level2.resize();
	this.buttons.restart.resize();
	this.buttons.change.resize();
	this.score.resize();
	this.playerPaddle.resize();
	this.playerAi.resize();
	this.ball.resize();
	
	//define orientation
	if(window.innerHeight > window.innerWidth){
	   this.orientation = "portrait";
	}else{
	   this.orientation = "landscape";
		
	}
};

GameManager.prototype.addElementToStage = function(element){
	this.stage.addChild(element);
};

/////////////////////
//Buttons Functions//
/////////////////////
GameManager.prototype.openLevelMenu = function(){
	this.playing = false;
	this.stage.removeChildren();
	this.addElementToStage(this.titleText);
	this.addElementToStage(this.buttons.level1);
	this.addElementToStage(this.buttons.level2);
	this.titleText.setText("Choose Level");
};
GameManager.prototype.selectLevel1 = function(){
	
};
GameManager.prototype.selectLevel2 = function(){
	
};
GameManager.prototype.startMatch = function(){
	
};
GameManager.prototype.startRound = function(){
	
};


