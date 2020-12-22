//GENERAL VARS
var play = false; //start paused
var num_balls = 250; //num of balls
var max_vX = 12; var max_vY = 7; //maximum velocity x and y
var max_radius = 15; var min_radius = 3; // max and min balls size
var FRAMES_PER_SEGON = 60;

//Button start/stop
function start_pause(){
	if (play==true){play=false;}else{play=true;}
	console.log(play)
}

$(document).ready(function() {
  /*CANVAS CLASS*/
  var Canvas_class = function(id) {
       this._canvas = $("#"+id); //Privat
       this.canvasWidth = this._canvas.width();
       this.canvasHeight = this._canvas.height();
       this.context = this._canvas.get(0).getContext("2d");//public
       //clean
       this.clean = function(){
           this.context.clearRect(0, 0, this.canvasWidth,this.canvasHeight);
       }
       //print
       this.print_balls=function(x,y,radi,color){
			  this.context.fillStyle = color;
			  this.context.beginPath();
			  this.context.arc(x, y, radi, 0, Math.PI*2);
			  this.context.closePath();
			  this.context.fill();
      }
    }



   /*PILOTA CLASS*/
   var Ball_class = function(x, y, radi,  vX, vY, aX, aY,color) {
		  this.x = x; //posx
		  this.y = y; //posy
		  this.radi = radi;	 //radi pilota
		  this.vX = vX; //velocitat x
		  this.vY = vY; //velocitat y
		  this.aX = aX; //acceleració x
		  this.aY = aY; //acceleració y
		  this.color = color;
			this.count = 0;

      //Screen Size
      screen_height = myCanvas.canvasHeight; //alçada
      screen_width = myCanvas.canvasWidth; //amplada

    this.log = function(){
			console.log("aX: "+this.aX+" aY: "+this.aY)
			console.clear();
    }

    this.mou = function(){
			//move
			if (play == true){
      this.x = this.x + this.vX + this.aX;
			this.y = this.y + this.vY + this.aY;
		}

			//screen colisions
			if (this.y >= screen_height - this.radi) {this.y == screen_height - this.radi; this.vY=this.vY*-1; this.count++;} //inferior Y
			if (this.y <= 0 + this.radi) {this.y == 0 + this.radi; this.vY=this.vY*-1; this.count++;} //superior y
			if (this.x >= screen_width - this.radi) {this.x== screen_width; this.vX=this.vX*-1; this.count++;} //dreta X
			if (this.x <= 0 + this.radi) {this.x == 0 + this.radi; this.vX=this.vX*-1; this.count++;} //esquerra x
    }
  }


  /*ANIMATE*/
  function animate() {
  	 myCanvas.clean();
		 for (n=0; n < num_balls; n++){
			 balls[n].mou();
			 myCanvas.print_balls(balls[n].x, balls[n].y, balls[n].radi,balls[n].color);
		 }
  		setTimeout(animate, 1 / FRAMES_PER_SEGON * 1000);
	}



  /*MAIN*/
  var myCanvas = new Canvas_class("mycanvas"); //create canvas
	balls = [] //array balls
	
	//COLOR PALETES
	bluestyle =["Aqua","Azure","Blue","BlueViolet","CadetBlue","DarkBlue"];
	redtyle =["Brown","Crimson","DarkRed","DeepPink","FireBrick","IndianRed"];
	greenstyle =["LightGreen","Lime","LimeGreen","MediumSeaGreen","MediumSpringGreen","PaleGreen"];
	yellowstyle =["Yellow","Orange","OrangeRed","LightSalmon","GoldenRod","Gold"];
	
	colors_list =[bluestyle, redtyle, greenstyle, yellowstyle];
	
	//select a random color palette
	randomcolor = Math.floor((Math.random() * colors_list.length));
	colors = colors_list[randomcolor];
	
	//RANDOM BALL GENERATOR
	for (n=0; n < num_balls; n++){
		//Math.random() * (max - min) + min
		var radi = Math.random() * (max_radius - min_radius) + min_radius; //random radius
		var x = myCanvas.canvasWidth/2; var y = myCanvas.canvasHeight/2; //middle of the screen
		var vX = Math.random() * (max_vX - (max_vX*-1)) + (max_vX*-1); //random VX
		var vY = Math.random() * (max_vY - (max_vY*-1)) + (max_vY*-1); //random VY
		var aX = 0; var aY = 0; //acceleration
		var rcolor = parseInt(Math.random()* (colors.length)); //random color

		balls[n] = new Ball_class(x, y, radi, vX, vY, aX, aY, colors[rcolor]); //generate random balls
	}

	animate(); //let's go!

});
