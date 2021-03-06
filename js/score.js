// JavaScript Document
function Score (gameManager){
	PIXI.Text.call(this);
	
	this.score = {
		player : 0,
		AI : 0
	};
	
	this.refreshText();
	this.style  = {
		fontSize:200,
		fontFamily:"Minecraft",
		fill:'#ffffff',
		strokeThickness:5
	}; 
	
	
	var gameDimensions = gameManager.getGameSize();
	var elementBounds;
	var sizeOK = false;
	//Loop til elementBounds fit in gameDimensions
	while(!sizeOK){
		elementBounds = this. getLocalBounds();
		if(
			elementBounds.width < gameDimensions.width * 0.3
		){
			sizeOK=true;
		}else{
		   this.style.fontSize -= 1;
		}
	}
	
	//Reposition element
	this.x = (gameDimensions.width - elementBounds.width)/2;
	this.y = 10;
	
}
Score.prototype = Object.create(PIXI.Text.prototype);

Score.prototype.refreshText = function(){
	this.text = "YOU "+this.score.player+" X "+this.score.AI+" BOT";
};

Score.prototype.resetScore = function(){
	this.score.player = 0;
	this.score.AI = 0;
	this.refreshText();
};

Score.prototype.givePoint = function(winner){
	this.score[winner] +=1;
	this.refreshText();
};

Score.prototype.checkMatchEnd = function(){
	
	if(this.score.player >=5 || this.score.AI >=5){
	   return true;
	}
	return false;
};

Score.prototype.getText = function(){
	return "YOU "+this.score.player+" X "+this.score.AI+" BOT";
};

