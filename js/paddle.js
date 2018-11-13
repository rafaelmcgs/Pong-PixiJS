// JavaScript Document
function Paddle (gameManager_, ai_){
	PIXI.Graphics.call(this);
	
	this.gameManager = gameManager_;
	this.AI = ai_;
	this.difficulty = "";
	
	
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