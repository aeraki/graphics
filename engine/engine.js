const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
var WIDTH = CANVAS.width = window.innerWidth - 15;
var HEIGHT = CANVAS.height = window.innerHeight - 15;

var CURRENTSCENE;

// Frames
var fpsaverage = 0;
var countfps = 0;
var updframe = 0;
var updfps = 60;

// Count FPS
setInterval(function() {
	fpsaverage = countfps;
	countfps = 0;
}, 1000);

// Defaults;
var DEFAULTS = {
	keyboard: {
		moveUp: ['ArrowUp', 'w'],
		moveLeft: ['ArrowLeft', 'a'],
		moveDown: ['ArrowDown', 's'],
		moveRight: ['ArrowRight', 'd']
	},
	solidtags: ['solid']
};
DEFAULTS.keymap = [
	{keys: DEFAULTS.keyboard.moveUp, x:0, y:-1},
	{keys: DEFAULTS.keyboard.moveLeft, x:-1, y:0},
	{keys: DEFAULTS.keyboard.moveDown, x:0, y:1},
	{keys: DEFAULTS.keyboard.moveRight, x:1, y:0},
]

// Change Canvas Size
function changeCanvasSize(w, h) {
	if (w === undefined) { w = window.innerWidth - 15};
	if (h === undefined) { h = window.innerHeight - 15};
	WIDTH = CANVAS.width = w;
	HEIGHT = CANVAS.height = h;
};

// Random Function;
function random(a,b) {

	// Random Number - Max Only;
		// Return a number from 0 to A;
	if (typeof a === 'number' && b === undefined) {
		return Math.floor(Math.random() * (a+1));
	};

	// Random Number - Min and Max;
		// Returns a number from A to B;
	if (typeof a === 'number' && typeof b === 'number') {
		return Math.floor(Math.random() * (b+1 - a) + a);
	};

	// Random from Array;
	if (Array.isArray(a) && b === undefined) {
		return a[random(a.length-1)];
	};

};

// Copy Objects because F&ck pointers.
function copyOf(obj) {
	var a = Object.create(Object.getPrototypeOf(obj));
	for (var x in obj) a[x] = obj[x];
	return a;
};

// Game Structure
var UPDATE;
var DRAW;

function draw_loop() { // Loops every frame;
	// If draw exists, run on every frame;
	if (DRAW !== undefined) {DRAW()};
	if (CURRENTSCENE) {CURRENTSCENE.PROTOTYPE_DRAW()};
	// Adds to fps counter;
	countfps++;
	// Run again on next frame;
	requestAnimationFrame(draw_loop);
};
requestAnimationFrame(draw_loop);

setInterval( function() { // Loops 60x a second;
	// Checks for update to exist;
	if (UPDATE !== undefined) {UPDATE()};
	if (CURRENTSCENE) {CURRENTSCENE.PROTOTYPE_UPDATE()};

	// Runs Held Keyboard Events;
	keyboard.held.forEach( (k) => {
		// For every expected key held;
		// Look for events with matching keys.
		keyboard.heldEvents.forEach( (e) => {
			if (e.keys.includes(k)) { e.event()	};
		});

	});

	// Adds to update frame count;
	updframe++;
	if(updframe>999){updframe=0};
}, 1000/updfps);