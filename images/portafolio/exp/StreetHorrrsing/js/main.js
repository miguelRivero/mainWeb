var color1 = "#fbfc26";
var color2 = "#f31a0f";
var color3 = "#690b21";
var color4 = "#fb07a7";
var color5 = "#273943";
var colorTri1 = "#fa4204";
var colorTri2 = "#5ef707";
var rectItems = 10;
var noRect = true;
var rectGroup = new Group();
var rightRect;
var leftRect
var isdrawing = false;

//////// Triangle Sky//////////////////////
	var triangle_sky = new Image();
	triangle_sky.src = 'img/sky1.png';
	
	var cover = $('#cover');
	
	var triangleGroup = new Group();
	
	var window_W = $(window).width(); 
	var window_H = $(window).height(); 
	var offset = cover.offset();
	var minX = offset.left;
	var maxX = offset.left+480;
	var minY = offset.top;
	var maxY = offset.top+480;

	TriangleSky = Raster;
	TriangleSky.prototype.velocity = new Point(0,0);
	TriangleSky.prototype.acceleration = new Point(0,0);
	TriangleSky.prototype.mass;
	TriangleSky.prototype.limit;
	TriangleSky.prototype.angle = 0;

	TriangleSky.prototype.applyPowerOfCursor = function(cursor_power){
		var cursor_power = new Point(cursor_power.x/this.mass, cursor_power.y/this.mass);
		this.acceleration = this.acceleration.add(cursor_power);
	}

	TriangleSky.prototype.update = function(cursor,delta){
		this.velocity = this.velocity.add(this.acceleration);
		if(magnitude(this.velocity) > this.limit)
		{
			this.velocity = this.velocity.normalize();
			this.velocity = this.velocity.multiply(this.limit);
		}
         

		this.position = this.position.add(this.velocity);
		this.position = this.position.add(new Point(random(.2, .8), random(.2, .7)));
		
		this.acceleration = this.acceleration.multiply(0);
		this.image = triangle_sky;
		var deltaX = this.position.x - cursor.x;
		var deltaY = this.position.y - cursor.y;
		var angleDegrees = this.position.x < cursor.x ? this.angle - 180 : this.angle;
		this.rotate(angleDegrees*0.05);
		angleDegrees++;
		}

	Cursor = Point;

	Cursor.prototype.getItNow = function(triangleSky){
		var force = new Point(this.x,this.y);	
		force = force.subtract(triangleSky.position);
		var distance = magnitude(force);
		distance = scale(distance,10,20);
		force = force.normalize();
		var strength = (2 * triangleSky.mass) / distance;
		force = force.multiply(strength);
		return force;
	}

	var cursor = new Cursor($(window).width()*.5,$(window).height()*.5);

   $(document).mousemove(function(e){
	    if( (e.pageX > minX) && (e.pageX < maxX) ) {
	    	if ( (e.pageY > minY) && (e.pageY < maxY) ){
		    	cursor.x = e.pageX - minX;
				cursor.y = e.pageY - minY;
				//console.log("hit");
	    	} else {
		    	cursor.x = random(100, 380);
		    	cursor.y = random(100, 380);
				//console.log("out");

	    	}
	    //console.log(cursor.x+" "+cursor.y);
	    }
   	});
   
	triangle_sky.onload = function(){
		for(var i = 0; i < 10; i++){
			var triangleSky = new TriangleSky(triangle_sky);
			triangleSky.position = new Point(Math.random()*canvas.width,Math.random()*canvas.height);
			triangleSky.scale(random(.3,.8));
			triangleSky.limit = random(5,6);
			triangleSky.mass = random(10,12);
			triangleSky.angle = random(0,360);
			triangleSky.rotate(triangleSky.angle);
			
			triangleGroup.addChild(triangleSky);
			$('#cube').css("visibility","visible");
			$('#cube2').css("visibility","visible");

		}
		view.onFrame = function(event) {
			var triangleSkys = triangleGroup.children;
			for(var j = 0; j < triangleSkys.length; j++){
				triangleSkys[j].update(cursor,event.delta);
				var cursor_power = cursor.getItNow(triangleSkys[j]);
				triangleSkys[j].applyPowerOfCursor(cursor_power);	
			}	
		}
	}
	
	random = function(a,b){
		return Math.random() * (b - a) + a;
	}
	magnitude = function(vector){
		return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	}
	scale = function(value,min,max){
		if(value < min){
			value = min;
		}
		if(value > max){
			value = max;
		}
		return value;	
	}


/////////CIRCLES///////////////////////////////////////

var circle1 = new Path.Circle(new Point(240, 146), 80);
circle1.style = {
	strokeColor: color1,
	strokeWidth: 10
};

var circle2 = new Path.Circle(new Point(240, 146), 70);
circle2.style = {
	strokeColor: color2,
	strokeWidth: 10
};

var circle3 = new Path.Circle(new Point(240, 146), 60);
circle3.style = {
	strokeColor: color3,
	strokeWidth: 10
};

var circle4 = new Path.Circle(new Point(240, 146), 50);
circle4.style = {
	strokeColor: color4,
	strokeWidth: 10
};

var circle5 = new Path.Circle(new Point(240, 146), 43);
circle5.fillColor = color5;

var bigCircle = new Group(circle1,circle2,circle3,circle4);

var leftCircle = bigCircle.clone();
leftCircle.addChild(circle5);
leftCircle.scale(0.6);
leftCircle.translate(-60,60);

var rightCircle = leftCircle.clone();
rightCircle.translate(120,0);



/////////TRIANGLES///////////////////////////////////////


function drawTriangle(a, b, c) {
    var path = new Path();
    path.strokeColor = colorTri1;
    path.fillColor = colorTri1;
    path.moveTo(a);
    path.lineTo(b);
    path.lineTo(c);
    path.lineTo(a);
}


function drawRectangle(a, b, c, d, col) {
    var path = new Path();
    path.strokeColor = col;
    path.fillColor = col;
    path.moveTo(a);
    path.lineTo(b);
    path.lineTo(c);
    path.lineTo(d);
    path.lineTo(a);
    
	rectGroup.addChild(path);
	rectGroup.moveAbove(rightCircle);

}

function drawRectangles(topRect, widthTopRect, marginRect, widthBottomRect, yPos, heightRect, colorRect){
				var rect = drawRectangle(   new Point( topRect,                         yPos), 
											new Point( topRect+widthTopRect,            yPos), 
											new Point( topRect+widthTopRect+marginRect, yPos+heightRect ),
											new Point( topRect+widthTopRect+marginRect-widthBottomRect, yPos+heightRect ),
											colorRect
				);
}

function drawRectanglesGroup(xPos, yPos, colorRect){
	var widthTopRect = 13;
	var i = 1;
	isdrawing = true;
    var timer = setInterval(function() {
		var marginRect = 1.5*i;
		var topRect = xPos - (widthTopRect/2);
		var widthBottomRect = widthTopRect + (marginRect*2);
		var heightRect = 2.3*i;
		var rect = drawRectangle(   new Point( topRect,                         yPos), 
									new Point( topRect+widthTopRect,            yPos), 
									new Point( topRect+widthTopRect+marginRect, yPos+heightRect ),
									new Point( topRect+widthTopRect+marginRect-widthBottomRect, yPos+heightRect ),
									colorRect
								);
		yPos = yPos+ (heightRect*1.7);
		widthTopRect = widthBottomRect;
		
		if (i < 10){
			i++;
		} else {
			clearInterval(timer);
			isdrawing = false;
		}
    }, 50);	
}

function toogleRect(x){
	if (x < 160){
		rightRect = drawRectanglesGroup(300, 210, colorTri2);
	} else if (x > 320){
		leftRect = drawRectanglesGroup(180, 210, colorTri1);
	} else {
		rightRect = drawRectanglesGroup(300, 210, colorTri2);
		leftRect = drawRectanglesGroup(180, 210, colorTri1);
	}
}

function clickMouse(event){
	var xCoord = event.pageX - minX;
	if (!isdrawing){
			if (noRect){
			rectGroup.removeChildren();
			noRect = false;
		} else {
			toogleRect(xCoord);
			noRect = true;
		}
	}


}

$(document).mousedown(clickMouse); 

$('#leftCircle').css("cursor", "pointer");  	
$('#rightCube').css("cursor", "pointer");  	

leftRect = drawRectanglesGroup(180, 210, colorTri1);
rightRect = drawRectanglesGroup(300, 210, colorTri2);
