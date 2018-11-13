// JavaScript Document
function Paddle (gameManager_, ai_){
	PIXI.Graphics.call(this);
	
	this.gameManager = gameManager_;
	this.AI = ai_;
	this.difficulty = "";
	
	//Variable to save pointer position when pointerdown
	this.movementStartPoint = {
		x:0,
		y:0
	};
	
	
	var gameDimensions = this.gameManager.getGameSize();
	//Draw the paddle
	this.beginFill(0xffffff);
	this.lineStyle(0, 0xffffff, 1,0);
	this.drawRect(0, 0, gameDimensions.width * 0.02, gameDimensions.height * 0.2);
	
	this.goToCenterPosition();
	
}
Paddle.prototype = Object.create(PIXI.Graphics.prototype);
Paddle.prototype.update = function(){
	if(!this.AI){ return;}
	
};

Paddle.prototype.goToCenterPosition = function(){
	var gameDimensions = this.gameManager.getGameSize();
	
	this.y = gameDimensions.height * 0.8 / 2;
	
	if(this.AI){
		//Right position
		this.x = gameDimensions.width * 0.93; // 1 - paddle width - 0.05
	}else{
		//Left position
		this.x = gameDimensions.width * 0.05;	
	}
};

Paddle.prototype.setDifficulty = function(level){
	this.difficulty = level;
};

Paddle.prototype.saveMovementStartPoint = function(){
	//I will keep the x coordinate because in future I can improve the game
	this.movementStartPoint.x = this.x;
	this.movementStartPoint.y = this.y;
};
Paddle.prototype.insertMovement = function(movement){
	var newPosition = {
		x: this.movementStartPoint.x - movement.x,
		y:this.movementStartPoint.y - movement.y
	};
	
	var gameDimensions = this.gameManager.getGameSize();
	var paddleBounds = this. getLocalBounds();
	
	//Limit the position
	if(newPosition.y < 0){
		newPosition.y = 0;
	}else if(newPosition.y + paddleBounds.height  > gameDimensions.height){
		newPosition.y = gameDimensions.height - paddleBounds.height;	 
	}
	
	this.y = newPosition.y;
};

Paddle.prototype.getWidth = function(){
	var bounds = this.getLocalBounds();
	return bounds.width;
	
};
Paddle.prototype.getHeight = function(){
	var bounds = this.getLocalBounds();
	return bounds.height;
	
};

