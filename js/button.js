// JavaScript Document
function Button (gameManager_, text, clickFunction_, align_){
	PIXI.Container.call(this);
	
	this.gameManager = gameManager_;
	this.callBackFunction = clickFunction_;
	this.align = align_;
	
	//create and add box
	this.box = new PIXI.Graphics();	
	this.addChild(this.box);
	
	//create and add text
	this.text = new PIXI.Text(text);
	this.text.style  = {
		fontSize:26,
		fontFamily:"Minecraft",
		fill:'#ffffff'
	};	
	this.addChild(this.text);
	
	//set click event
	this.interactive = true;
	this.on("click", this.callBackFunction.bind(this.gameManager));
	
	this.resize();
}
Button.prototype = Object.create(PIXI.Container.prototype);
Button.prototype.resize = function(){
	var boxSize = {
		width: window.innerWidth * 0.40,
		height: Math.max(window.innerWidth * 0.1 , 40)
 	};
	var textBounds;
	var buttonBounds;
	
	this.box.clear();
	this.box.beginFill(0x000000);
	this.box.lineStyle(4, 0xffffff, 1);
	this.box.drawRect(0, 0, boxSize.width, boxSize.height);
	
	this.text.style.fontSize = 100;
	var sizeOK = false;
	while(!sizeOK){
		textBounds = this.text.getLocalBounds();
		if(
			textBounds.width < boxSize.width * 0.9
			&& textBounds.height < boxSize.height * 0.9
		){
			sizeOK=true;
		}else{
		   this.text.style.fontSize -= 1;
		}
	}
	
	//reposition text
	this.text.x = (boxSize.width - textBounds.width)/2;
	this.text.y = (boxSize.height - textBounds.height)/2;
	
	//reposition button
	buttonBounds = this.getLocalBounds();
	switch(this.align){
		case "left":
			this.x = (window.innerWidth*0.45) - buttonBounds.width;
		break;
		case "right":
			this.x = (window.innerWidth*0.55);
		break;
		case "center":
			this.x = (window.innerWidth - buttonBounds.width)/2;
		break;
	}
	this.y = (window.innerHeight/2) + buttonBounds.height;
	
	
};