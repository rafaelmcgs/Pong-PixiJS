// JavaScript Document
function Ball (gameManager_){
	PIXI.Graphics.call(this);
	  
	this.gameManager = gameManager_;
	
	var gameDimensions = this.gameManager.getGameSize();
	//Draw the paddle
	this.beginFill(0xffffff);
	this.lineStyle(0, 0xffffff, 1,0);
	this.drawCircle(0, 0, gameDimensions.width * 0.02);
	
	this.paddles = {
		left: this.gameManager.getPaddlePlayer(),
		right: this.gameManager.getPaddleAI()
	}
	
	this.goToCenterPosition("left");
}

Ball.prototype = Object.create(PIXI.Graphics.prototype);
Ball.prototype.update = function(){
	
};

Ball.prototype.goToCenterPosition = function(side){
	var paddleBounds;
	var ballBounds = this.getLocalBounds();
	if(side == "left"){
		paddleBounds = this.paddles.left.getLocalBounds();
		this.x = this.paddles.left.x + paddleBounds.width - ballBounds.x;
	}else{
		paddleBounds = this.paddles.right.getLocalBounds();
		this.x = this.paddles.right.x + ballBounds.x;		
	}
	
	this.y = this.paddles.left.y + paddleBounds.height/2;
	
};