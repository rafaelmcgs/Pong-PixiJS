// JavaScript Document
function Title (){
	PIXI.Text.call(this);
	this.style  = {
		fontSize:26,
		fontFamily:"Minecraft",
		fill:'#ffffff'
	}; 
}
Title.prototype = Object.create(PIXI.Text.prototype);

Title.prototype.resize = function(){
	var elementBounds;
	var maxSize = {
		width: window.innerWidth * 0.9,
		height: window.innerHeight * 0.4
 	};
	
	//Define text fontsize
	this.style.fontSize = 100;	
	var sizeOK = false;
	//Loop til textBounds fit in maxSize
	while(!sizeOK){
		elementBounds = this. getLocalBounds();
		if(
			elementBounds.width < maxSize.width
			&& elementBounds.height < maxSize.height
		){
			sizeOK=true;
		}else{
		   this.style.fontSize -= 1;
		}
	}
	
	//Reposition element
	this.x = (window.innerWidth - elementBounds.width)/2;
	this.y = (window.innerHeight/2) - elementBounds.height;
	
};

Title.prototype.setText = function(value){
	this.text = value;
	this.resize();
};