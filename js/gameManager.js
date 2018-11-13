// JavaScript Document

function GameManager (){
	PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
	
	/**
	 *Game Settings
	 */
	//This boolean determines if the game is running
	this.playing = false;
	
	//Variable useful to create and scale the elements of the match
	this.gameSize = {
		width:1920, 
		height:1080,
		scale:0 //dynamic value
	};	
	
	//Very important to define the paddle movement
	this.orientation = "landscape"; // {portrait|landscape}
	
	
	/**
	 *Html and PixiJS
	 */
	this.mainDiv = document.getElementById("mainDiv");
	
	//The canvas element will be created with this script
	this.canvas = document.createElement( 'canvas' );
	
	//The root game container
	this.stage = new PIXI.Container();
	
	this.renderer; //will be initialized later
	
	
	/**
	 *Game Elements
	 */
	this.titleText = new Title();
	
	this.buttons = {
		start: new Button(this, "Start", this.openLevelMenu, "center"),
		level1: new Button(this, "Normal", this.selectLevel1, "left"),
		level2: new Button(this, "Impossible", this.selectLevel2, "right"),
		restart: new Button(this, "Play Again", this.startMatch, "left"),
		change: new Button(this, "Change Mode", this.openLevelMenu, "right")
	};
	
	//I created this container to make the game easier to be responsive
	this.pongGameContainer = new PIXI.Container(); 
	
	//Pong game elements
	this.score = new Score(this);	
	this.paddlePlayer = new Paddle(this, false);	
	this.paddleAI = new Paddle(this, true);	
	this.ball = new Ball(this);	
	this.field = new Field(this);
	
	//Add elements to the pongGameContainer
	this.pongGameContainer.addChild(this.field);
	this.pongGameContainer.addChild(this.paddlePlayer);
	this.pongGameContainer.addChild(this.paddleAI);
	this.pongGameContainer.addChild(this.ball);
	this.pongGameContainer.addChild(this.score);	
	
	
	/**
	 *Game Load
	 */
	this.loader = PIXI.loader;
	
	//This sound will be played when the ball hit something
	this.loader.add("sound-hit", "sounds/hit.ogg");
	
	//Setup the callback function to loader when it is completed
	this.loader.load(this.init.bind(this));
}
GameManager.prototype.init = function(){
	//Changing the main div class name will destroy the css loader
	this.mainDiv.className = "game";
	
	//Add the canvas to the document
	this.mainDiv.appendChild(this.canvas);		
	
	//Initialize the renderer 
	this.renderer = new PIXI.WebGLRenderer(
			window.innerWidth,
			window.innerHeight,
			{view:this.canvas,
			antialias:true,
			forceFXAA:true,
			powerPreference : 'high-performance'}
	);
	
	//Resize is very important in html5 responsive games	
	window.addEventListener('resize', this.resize.bind(this));
	
	//Add animation to the renderer
	requestAnimationFrame(this.update.bind(this));
	
	/**
	 *Add First scene elements 
	 */	
	this.addElementToStage(this.titleText);
	this.addElementToStage(this.buttons.start);
	this.titleText.setText("Pong Game");
	
	//First resize call
	this.resize();
};
GameManager.prototype.update = function(){
	if(this.playing){
		this.ball.update();
		this.playerAi.update();
	}
	
	this.renderer.render(this.stage);
	requestAnimationFrame(this.update.bind(this));
	
};
GameManager.prototype.resize = function(){
	this.renderer.resize(window.innerWidth,window.innerHeight);
	
	/**
	 *Resize title and buttons
	 */
	this.titleText.resize();
	this.buttons.start.resize();
	this.buttons.level1.resize();
	this.buttons.level2.resize();
	this.buttons.restart.resize();
	this.buttons.change.resize();
	
	//Define orientation
	var maxContainerDimensions = {
		width: 0,
		height: 0
	};
	if(window.innerHeight > window.innerWidth){
		this.orientation = "portrait";
		/*
		 *If the container orientation is landscape and screen is portrait
		 *the maximum dimensions must be inverted
		 */
		maxContainerDimensions.width = window.innerHeight;
		maxContainerDimensions.height = window.innerWidth;
		
	}else{
		this.orientation = "landscape";
		maxContainerDimensions.width = window.innerWidth;
		maxContainerDimensions.height = window.innerHeight;		
	}	
	
	//Resize the pongGameContainer
	var tempScale = {
		x: maxContainerDimensions.width / this.gameSize.width,
		y: maxContainerDimensions.height / this.gameSize.height
	};
	//The scales must be the same, choosing the lower value
	if(tempScale.x < tempScale.y){
	   tempScale.y = tempScale.x;
	}else{
	   tempScale.x = tempScale.y;	   
	}
	//Finally the scale is assigned to the element and saved to future
	this.gameSize.scale = tempScale.x;
	this.pongGameContainer.scale.x = tempScale.x;
	this.pongGameContainer.scale.y = tempScale.x;
	
	//Reposition the pongGameContainer
	this.pongGameContainer.x = (window.innerWidth - (this.gameSize.width * tempScale.x))/2;
	this.pongGameContainer.y = (window.innerHeight - (this.gameSize.height * tempScale.x))/2;
	
};

GameManager.prototype.addElementToStage = function(element){
	this.stage.addChild(element);
};

/////////////////////
//Buttons Functions//
/////////////////////
GameManager.prototype.openLevelMenu = function(){
	//Clear stage
	this.stage.removeChildren();
	
	//Add elements
	this.addElementToStage(this.titleText);
	this.addElementToStage(this.buttons.level1);
	this.addElementToStage(this.buttons.level2);
	
	//Set title text
	this.titleText.setText("Choose Level");
};
GameManager.prototype.selectLevel1 = function(){
	//Clear stage
	this.stage.removeChildren();
	
	this.paddleAI.setDifficulty("normal");
	this.startMatch();
};
GameManager.prototype.selectLevel2 = function(){
	//Clear stage
	this.stage.removeChildren();
	
	this.paddleAI.setDifficulty("impossible");	
	this.startMatch();
};
GameManager.prototype.startMatch = function(){
	this.addElementToStage(this.pongGameContainer);
};
GameManager.prototype.startRound = function(){
	
};

GameManager.prototype.getGameSize = function(){
	return this.gameSize;
};
GameManager.prototype.getPaddlePlayer = function(){
	return this.paddlePlayer;
};
GameManager.prototype.getPaddleAI = function(){
	return this.paddleAI;
};


