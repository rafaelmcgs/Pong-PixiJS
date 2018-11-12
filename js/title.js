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
Title.prototype.update = function(){
	
};
Title.prototype.resize = function(){
	
};

Title.prototype.setText = function(value){
	this.text = value;
	this.resize();
};