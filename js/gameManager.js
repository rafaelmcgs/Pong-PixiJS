// JavaScript Document

function GameManager (){
	PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
	
	this.mainDiv;	
	this.canvas;	
	this.stage;
	this.renderer;
	
	this.loader = PIXI.loader;
	this.loader.add("sound-hit", "sounds/hit.ogg");
	this.loader.load(this.init.bind(this));
}
GameManager.prototype.init = function(){
	this.mainDiv = document.getElementById("mainDiv");
	this.mainDiv.className = "game";
	
	this.canvas = document.createElement( 'canvas' );
	this.mainDiv.appendChild(this.canvas);
		
	this.stage = new PIXI.Stage;
	this.renderer = new PIXI.WebGLRenderer(
			window.innerWidth,
			window.innerHeight,
			{view:this.canvas,
			antialias:true,
			forceFXAA:true,
			powerPreference : 'high-performance'}
	);
	
	window.addEventListener('resize', this.resize.bind(this));
	requestAnimationFrame(this.update.bind(this));
	
	
};
GameManager.prototype.update = function(){
	
	this.renderer.render(this.stage);
	requestAnimationFrame(this.update.bind(this));
	
};
GameManager.prototype.resize = function(){
	 this.renderer.resize(window.innerWidth,window.innerHeight);
};

