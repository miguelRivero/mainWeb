$(document).ready(function() {
	// Handler for .ready() called.
	// Set up some variables and add a mousemove handler to the page
	var mouseX = 0; // Mouse X pos relative to window centre
	var mouseY = 0; // Mouse Y pos relative to window centre
	var lastMouseX = 0;
	var lastMouseY = 0;
	var windowCentreX = window.innerWidth / 2;
	var windowCentreY = window.innerHeight / 2;

	var WebGLSupported = isWebGLSupported(); // Check for WebGL support
	var cube = $("#cube");
	var mouseDown = false;
	
    /* == GLOBAL DECLERATIONS == */
    TouchMouseEvent = {
        DOWN: "touchmousedown",
        UP: "touchmouseup",
        MOVE: "touchmousemove"
    }
   
    /* == EVENT LISTENERS == */
    var onMouseEvent = function(event) {
        var type;
        
        switch (event.type) {
            case "mousedown": type = TouchMouseEvent.DOWN; break;
            case "mouseup":   type = TouchMouseEvent.UP;   break;
            case "mousemove": type = TouchMouseEvent.MOVE; break;
            default: 
                return;
        }
        
        var touchMouseEvent = normalizeEvent(type, event, event.pageX, event.pageY);      
        $(event.target).trigger(touchMouseEvent); 
    }
    
    var onTouchEvent = function(event) {
        var type;
        
        switch (event.type) {
            case "touchstart": type = TouchMouseEvent.DOWN; break;
            case "touchend":   type = TouchMouseEvent.UP;   break;
            case "touchmove":  type = TouchMouseEvent.MOVE; break;
            default: 
                return;
        }
        
        var touch = event.originalEvent.touches[0];
        var touchMouseEvent;
        
        if (type == TouchMouseEvent.UP) 
            touchMouseEvent = normalizeEvent(type, event, null, null);
        else 
            touchMouseEvent = normalizeEvent(type, event, touch.pageX, touch.pageY);
        
        $(event.target).trigger(touchMouseEvent); 
    }
    
    /* == NORMALIZE == */
    var normalizeEvent = function(type, original, x, y) {
        return $.Event(type, {
            pageX: x,
            pageY: y,
            originalEvent: original
        });
    }
    
    /* == LISTEN TO ORIGINAL EVENT == */
    var jQueryDocument = $(document);
   
    if ("ontouchstart" in window) {
        jQueryDocument.on("touchstart", onTouchEvent);
        jQueryDocument.on("touchmove", onTouchEvent);
        jQueryDocument.on("touchend", onTouchEvent); 
    } else {
        jQueryDocument.on("mousedown", onMouseEvent);
        jQueryDocument.on("mouseup", onMouseEvent);
        jQueryDocument.on("mousemove", onMouseEvent);
    }
	
	/////////////END MOUSE-TOUCH EVENTS/////////////
	
	$(document.body).on('mousedown', function(event) {
		mouseDown = true;
	});
	
	$(document).on('mousemove', function(event) {
		// Update mouseX and mouseY based on the new mouse X and Y positions
		mouseX = (event.clientX - windowCentreX);
		mouseY = (event.clientY - windowCentreY);
	});
	
	$(document.body).on('mouseup', function(event) {
		mouseDown = false;
	});
	
	// Create the renderer and add it to the page's body element
	var renderer = WebGLSupported ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
	renderer.setSize(480, 480);
	// attach the render-supplied DOM element
	var tcube = renderer.domElement;
	cube.append(tcube);
	//document.body.appendChild(renderer.domElement);
	// Create the scene to hold the object
	var scene = new THREE.Scene();

	// Create the camera
	var camera = new THREE.Camera(
	35, // Field of view
	1, // Aspect ratio
	.1, // Near plane distance
	10000 // Far plane distance
	);

	// Position the camera
	camera.position.set(0, 0, 15);

	// Create the materials
	var materialClass = WebGLSupported ? THREE.MeshLambertMaterial : THREE.MeshBasicMaterial;
	var bottomSide = new materialClass({
		color: 0xffffff,
		map: THREE.ImageUtils.loadTexture('img/heroes_cube_real.jpg')
	});
	var topSide = new materialClass({
		color: 0xffffff,
		map: THREE.ImageUtils.loadTexture('img/heroes_cube_orig.jpg')
	});
	var frontSide = new materialClass({
		color: 0xffffff,
		map: THREE.ImageUtils.loadTexture('img/nextDayTitle.png')
	});
	var backSide = new materialClass({
		color: 0xffffff,
		map: THREE.ImageUtils.loadTexture('img/review.png')
	});
	var leftSide = new materialClass({
		color: 0xffffff,
		map: THREE.ImageUtils.loadTexture('img/html5oes.png')
	});
	var rightSide = new materialClass({
		color: 0xffffff,
		map: THREE.ImageUtils.loadTexture('img/void.png')
	});

	var materials = [
	leftSide, // Left side
	rightSide, // Right side
	topSide, // Top side
	bottomSide, // Bottom side
	frontSide, // Front side
	backSide // Back side
	];

	// Create the book and add it to the scene
	var book = new THREE.Mesh(new THREE.CubeGeometry(4.9, 4.9, 4.9, 3, 3, 3, materials), new THREE.MeshFaceMaterial());
	book.overdraw = true;
	scene.addChild(book);

	function animate() {

		if (mouseX < 240 && mouseX > -240 && mouseY < 240 && mouseY > -240) {
			if (mouseDown) {
				if ((mouseX != lastMouseX) || (mouseY != lastMouseY)) {
					book.rotation.y += mouseX * 0.0005;
					book.rotation.x += mouseY * 0.0005;
					lastMouseX = mouseX;
					lastMouseY = mouseY;
				}
			}
			$('body').css('cursor', 'pointer');
		} else {
			$('body').css('cursor', 'auto');
		}
		// Render the frame
		renderer.render(scene, camera);
	}

	setInterval(animate, 1000 / 60);
});

/*
 Check if the browser supports WebGL
 */

function isWebGLSupported() {

	var cvs = document.getElementById('cube');

	var contextNames = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
	var ctx;

	if (navigator.userAgent.indexOf("MSIE") >= 0) {
		try {
			ctx = WebGLHelper.CreateGLContext(cvs, 'canvas');
		} catch (e) {}
	} else {
		for (var i = 0; i < contextNames.length; i++) {
			try {
				ctx = cvs.getContext(contextNames[i]);
				if (ctx) break;
			} catch (e) {}
		}
	}

	if (ctx) return true;
	return false;
}

