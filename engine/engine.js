const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
var WIDTH = CANVAS.width = window.innerWidth - 15;
var HEIGHT = CANVAS.height = window.innerHeight - 15;

// Collision Debugging
var COLLISIONDEBUGTOOL = false;
var COLLISIONSOLIDTAG = 'solid';
// Tileset Debugging
var TILESETDEBUGTOOL = false;

var fpsaverage = 0;
var countfps = 0;

// Canvas Base Graphics
function clear(color) {
	if (color === undefined) { color = 'white' };
	CTX.fillStyle = color;
	CTX.fillRect(0, 0, WIDTH, HEIGHT);
};
function line(x1, y1, x2, y2, color, width=2) {
	CTX.strokeStyle = color;
	CTX.lineWidth = width;
	CTX.beginPath();
	CTX.moveTo(x1, y1);
	CTX.lineTo(x2, y2);
	CTX.stroke();
};

// Change Canvas Size
function changeCanvasSize(w, h) {
	if (w === undefined) { w = window.innerWidth - 15};
	if (h === undefined) { h = window.innerHeight - 15};
	WIDTH = CANVAS.width = w;
	HEIGHT = CANVAS.height = h;
};

// Copy Function because F&ck pointers.
function copy(obj) {
	var a = {};
	for (var x in obj) a[x] = obj[x];
	return a;
}

// Keyboard Detection
var keyboard = {};
function keyPressed (keyid) {
	if (Object.keys(keyboard).includes(keyid)) {
		return keyboard[keyid];
	} else {
		keyboard[keyid] = false;
		document.addEventListener('keydown', function(event) {
			if (event.key === keyid) {
				keyboard[keyid] = true;
			};
		});
		document.addEventListener('keyup', function(event) {
			if (event.key === keyid) {
				keyboard[keyid] = false;
			};
		});
	};
};
// Draws Debug Tool on Screen
function keyboardDebugger(x, y, color='black') {
	if (x === undefined) {x = y = 0};
	CTX.font = '14px arial';
	for (let i=0; i<Object.keys(keyboard).length; i++) {
		CTX.fillStyle = color;
		if ( keyboard[ Object.keys(keyboard)[i] ]) {
			CTX.fillStyle = 'green';
		};
		CTX.fillText(Object.keys(keyboard)[i], x, y+15+(20*i))
	};
};

// Draws FPS to bottom-left
function showFps(color=black) {
	CTX.font = '14px arial';
	CTX.fillStyle = color;
	CTX.fillText(fpsaverage+'fps',2,HEIGHT-7)
};
setInterval(function() {
	fpsaverage = countfps;
	countfps = 0;
}, 1000);

// Sets up the _update and _draw functions.
var _draw = undefined;
var _update = undefined;

function ___CANVASUPDATE() {
	if (_draw !== undefined) {_draw()};
	countfps++;
	requestAnimationFrame(___CANVASUPDATE);
};

___CANVASUPDATE();

setInterval( function() {
	if (_update !== undefined) {_update()};
	updframe++;
	if(updframe>999){updframe=0};
}, 1000/60);