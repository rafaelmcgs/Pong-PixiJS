// JavaScript Document
function Ball (gameManager_){
	PIXI.Graphics.call(this);
	  
	this.gameManager = gameManager_;
	
	this.isReleased = false;
	this.velocity = {
		x:0,
		y:0
	};
	
	
	var gameDimensions = this.gameManager.getGameSize();
	//Draw the paddle
	this.beginFill(0xffffff);
	this.lineStyle(0, 0xffffff, 1,0);
	this.drawCircle(0, 0, gameDimensions.width * 0.02);
	
	this.paddles = {
		left: this.gameManager.getPaddlePlayer(),
		right: this.gameManager.getPaddleAI()
	};
	
	this.goToCenterPosition("left");
}

Ball.prototype = Object.create(PIXI.Graphics.prototype);

Ball.prototype.update = function(){
	if(!this.isReleased){return;}
	
	
	var ballBounds = this.getLocalBounds();
	var gameDimensions = this.gameManager.getGameSize();
	
	//Check ball collision on top and bottom walls
	if(this.y + ballBounds.y < 0
	   || this.y + ballBounds.y + ballBounds.height > gameDimensions.height
	){
		this.velocity.y *= -1;
	}
	
	/**
	 *Check ball collision on gutters or paddles
	 */
	if(this.x + ballBounds.x < 0){
		//Check collision with left gutter
		this.gameManager.endRound("AI");
		
	}else if(this.x + ballBounds.x + ballBounds.width > gameDimensions.width){
		//Check collision with right gutter
		this.gameManager.endRound("player");
		
	}else if(
		this.x + ballBounds.x < this.paddles.left.x + this.paddles.left.getWidth()
		&& this.y > this.paddles.left.y
		&& this.y < this.paddles.left.y + this.paddles.left.getHeight()
	){
		//Check collision with left paddle
		this.velocity.x = Math.abs(this.velocity.x) * 1.01;
		this.velocity.y *= 1.01;
	   
	}else if(
		this.x + ballBounds.x + ballBounds.width > this.paddles.right.x
		&& this.y > this.paddles.right.y
		&& this.y < this.paddles.right.y + this.paddles.right.getHeight()
	){
		//Check collision with right paddle
		this.velocity.x = Math.abs(this.velocity.x) * -1.01;
		this.velocity.y *= 1.01;
	}
	
	
	//Insert movement
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	
};

Ball.prototype.goToCenterPosition = function(side){
	var paddleBounds;
	var ballBounds = this.getLocalBounds();
	if(side == "left"){
		paddleBounds = this.paddles.left.getLocalBounds();
		this.x = this.paddles.left.x + paddleBounds.width - ballBounds.x +2;
		
		//set velocity to left because when it released will kick on the paddle
		this.velocity.x = -15;
	}else{
		paddleBounds = this.paddles.right.getLocalBounds();
		this.x = this.paddles.right.x + ballBounds.x -2;	
		
		//set velocity to right because when it released will kick on the paddle
		this.velocity.x = 15;	
	}
	
	this.y = this.paddles.left.y + paddleBounds.height/2;
	//reset vertical velocity
	this.velocity.y = 15;
	
};

Ball.prototype.release = function(){
	this.isReleased = true;	
};

Ball.prototype.getVelocity = function(){
	return this.velocity;
};
