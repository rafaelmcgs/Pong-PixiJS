// JavaScript Document
function Field (gameManager){
	PIXI.Graphics.call(this);
	
	var dimensions = gameManager.getGameSize();
	
	//draw the fild limits
	this.beginFill(0x000000);
	this.lineStyle(4, 0xffffff, 1,0);
	this.drawRect(0, 0, dimensions.width, dimensions.height);
	
	//draw the midle line
	this.moveTo(dimensions.width/2, 0);
	this.lineTo(dimensions.width/2, dimensions.height);
	
}
Field.prototype = Object.create(PIXI.Graphics.prototype);
