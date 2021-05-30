const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
var WIDTH = CANVAS.width = window.innerWidth - 15;
var HEIGHT = CANVAS.height = window.innerHeight - 15;

var CURRENTSCENE;

// Frames
var fpsaverage = 0;
var countfps = 0;
var updframe = 0;

// Canvas Base Graphics
function clear(color) {
	// If no color provided, clear as transparent;
	if (color === undefined) {
		CTX.clearRect(0, 0, WIDTH, HEIGHT);
	} else {
		CTX.fillStyle = color;
		CTX.fillRect(0, 0, WIDTH, HEIGHT);
	};
};
function line(x1, y1, x2, y2, color, width=2) {
	CTX.strokeStyle = color;
	CTX.lineWidth = width;
	CTX.beginPath();
	CTX.moveTo(x1, y1);
	CTX.lineTo(x2, y2);
	CTX.stroke();
};
function drawtext(text,x,y,color,font) {
	if (color) {CTX.fillStyle = color};
	if (font) {CTX.font = font};
	CTX.fillText(text,x,y);
};
function rectFill(x,y,w,h,color) {
	if (color) {CTX.fillStyle = color};
	CTX.fillRect(x,y,w,h);
};
function rectStroke(x,y,w,h,color,thickness) {
	if (color) {CTX.strokeStyle = color};
	if (thickness) {CTX.lineWidth = thickness};
	CTX.strokeRect(x,y,w,h);
};

// Change Canvas Size
function changeCanvasSize(w, h) {
	if (w === undefined) { w = window.innerWidth - 15};
	if (h === undefined) { h = window.innerHeight - 15};
	WIDTH = CANVAS.width = w;
	HEIGHT = CANVAS.height = h;
};

// Copy Objects because F&ck pointers.
function copyOf(obj) {
	var a = {};
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
	// Adds to update frame count;
	updframe++;
	if(updframe>999){updframe=0};
}, 1000/60);