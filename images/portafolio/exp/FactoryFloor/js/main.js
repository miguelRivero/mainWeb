$( document ).ready(function() {

	var cover, canvas, context, heightL, widthL;
	setTimeout(codepeninit, 10);
	
	function random(a,b){
		return Math.random() * (b - a) + a;
	}
	
	function codepeninit() {
	    canvas = document.getElementById('myCanvas');
 	    context = canvas.getContext('2d');
	    heightL = canvas.width = canvas.parentNode.clientWidth;;
	    widthL = canvas.height = canvas.parentNode.clientHeight;;
	    
	    setInterval(function () {
	        new Runner().go();
	    }, 800);
	}
	
	function Runner() {
	    this.x = ~~ (widthL*0.5 + (Math.random() * 100 - 50));
	    this.y = ~~ (heightL*0.5 + (Math.random() * 100 - 50));
	    this.angle = Math.random() * 360;
	    this.segment_length = 5;
	    this.color = {
	        r: ~~(Math.random() * 255),
	        g: ~~(Math.random() * 255),
	        b: ~~(Math.random() * 255)
	    };
	}
	
	Runner.prototype = {
	    constructor: Runner,
	    go: function () {
	        var rad = this.angle * (Math.PI/180);
	        context.beginPath();
	        context.moveTo(this.x, this.y);
	        this.x += this.segment_length * Math.cos(rad),
	        this.y += this.segment_length * Math.sin(rad);
	        context.lineTo(this.x, this.y);
            context.lineWidth = 3;//random(1,9);
            var thisAlpha = random(0.7,0.9);
	        context.strokeStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ','+thisAlpha+')';
	        context.stroke();
	        context.closePath();
	        this.angle += Math.random() * 30 - 15;
		    console.log ("thisAlpha "+thisAlpha);

	        if (this.x > 0 && this.x < widthL && this.y > 0 && this.y < heightL) {
	            setTimeout(this.go.bind(this), 1000 / 15);
	        }
	
	    }
	};
	
	document.addEventListener('mousedown', function(e) {
   		 context.clearRect(0,0,widthL,heightL);
	},  true);
	
	document.addEventListener('mouseup', function(e) {
	    setInterval(function () {
	        new Runner().go();
	    }, 800);
	},  true);	
	
	
	
});