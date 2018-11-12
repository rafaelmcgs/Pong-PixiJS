// JavaScript Document
function Button (gameManager_, text, clickFunction_, position_){
	PIXI.Container.call(this);
}
Button.prototype = Object.create(PIXI.Container.prototype);
Button.prototype.resize = function(){
	
};