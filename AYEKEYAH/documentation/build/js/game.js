// Constructs a new game object.
// Game object handles updating, rendering, pushing and popping states, as well as
// overall game logic such as measuring time between frames (frametime), and allowing the
// application to enter and maintain fullscreen.
function Game(glFrame) {
	this.states 		= new Array();
	this.frametime 		= 0;
	this.isRunning 		= true;
	this.clock 			= new THREE.Clock(true);
	this.renderer 		= new THREE.WebGLRenderer();
	this.glFrame		= glFrame;
	this.isFullScreen 	= true;
	this.isMobile		= false;
	this.mousePos 		= null;

	this.init(glFrame);
}

// Initiates the game by adding a DOM hook to the canvas, and pushing in the initial state.
Game.prototype.init = function(glFrame) {
	var self = this;

	// Add an event supporting button press on cardboard or mouselick on PC
	this.renderer.domElement.addEventListener("click", this.onInputClick.bind(this), false);

	// If we aren't on mobile, also add an event listener for mouse movement
	if(!this.isMobile) {
		this.renderer.domElement.addEventListener("mousemove", this.onMouseMove.bind(this), false);
	}

	this.glFrame.appendChild(this.renderer.domElement);
	this.states.push(new TestState(this));
}

// Get the last state in the array - the active state
Game.prototype.getActiveState = function() {
	return this.states[this.states.length - 1];
}

// Handles the user clicking or tapping/using cardboard button
Game.prototype.onInputClick = function() {
	var state 			= this.getActiveState();
	var clickPosition 	= this.mousePos;

	if(state.handleClick != undefined) {
		if(this.isMobile) {
			clickPosition = state.camera.getWorldPosition();
		}

		state.handleClick(clickPosition, this.frametime);
	}
}

// Handler to store position when the mouse is moved
Game.prototype.onMouseMove = function() {
	event.preventDefault();

	this.mousePos = new THREE.Vector2(
		(event.clientX / window.innerWidth) * 2 - 1,
		-(event.clientY / window.innerHeight) * 2 + 1
	);
}

// Attempts to fullscreen the application
Game.prototype.fullscreen = function() {
	var glFrame = this.glFrame;

	if (glFrame.requestFullscreen) {
		glFrame.requestFullscreen();
	}
	else if (glFrame.msRequestFullscreen) {
		glFrame.msRequestFullscreen();
	}
	else if (glFrame.mozRequestFullScreen) {
		glFrame.mozRequestFullScreen();
	}
	else if (glFrame.webkitRequestFullscreen) {
		glFrame.webkitRequestFullscreen();
	}
}

// Resizes the canvas to make sure it takes up the correct space
// and that it has the correct aspect ratio
Game.prototype.resizeCanvas = function(state, camera) {
	var width = this.glFrame.offsetWidth;
	var height = this.glFrame.offsetHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	this.renderer.setSize(width, height);
	state.effect.setSize(width, height);
}

// Updates the game. Occurs once per frame update- gets delta time, attempts to
// go fullscreen if we aren't already, and then updates the current active state.
Game.prototype.update = function() {
	this.frametime = this.clock.getDelta();

	if(this.isFullScreen) this.fullscreen();

	if(this.states.length > 0) {
		this.states[this.states.length - 1].update(this.frametime);
	}
}

// Renders the game to the browser. Occurs once per frame update. Only renders
// the currently active state (top of the stack).
Game.prototype.render = function() {
	if(this.states.length > 0) {
		this.states.slice(-1)[0].render(this.frametime);
	}
}
