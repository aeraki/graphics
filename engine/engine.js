const canvas = document.getElementById('canvas');
const width = canvas.width = window.innerWidth - 15;
const height = canvas.height = window.innerHeight - 15;
const ctx = canvas.getContext('2d');

// Collision Debugging
var COLLISIONDEBUGTOOL = false;
var COLLISIONSOLIDTAG = 'solid';
// Tileset Debugging
var TILESETDEBUGTOOL = true;

// Canvas Base Graphics
function clear(color) {
	if (color === undefined) { color = 'white' };
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, width, height);
};
function line(x, y, color, width=1) {

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
function keyboardDebugger(x, y, color='black') {
	if (x === undefined) {x = y = 0};
	ctx.font = '14px arial';
	for (let i=0; i<Object.keys(keyboard).length; i++) {
		ctx.fillStyle = color;
		if ( keyboard[ Object.keys(keyboard)[i] ]) {
			ctx.fillStyle = 'green';
		};
		ctx.fillText(Object.keys(keyboard)[i], x, y+15+(20*i))
	};
};