// Add One Every _update()
var updframe = 0;

// Set Canvas Size
changeCanvasSize(14*80, 8*80)

// Tileset, with 2 Tiles Solid
var dungeontiles = new Tileset('./sprites/Tiles.png', 80, 80, 3, 2);
dungeontiles[0].tags = ['solid'];
dungeontiles[2].tags = ['solid'];
dungeontiles[3].tags = ['solid'];

dungeontiles[3].animations['flicker'] = {
	0: (self) => {
		self.sheetrow++;
	},
	1: (self) => {
		self.sheetrow++;
	},
	2: (self) => {
		self.sheetrow--;
	},
	3: (self) => {
		self.sheetrow--;
	},
	frames: 4,
	loop: true,
	fps: 4
};
dungeontiles[3].defaultanimation = 'flicker';

// Creates the scene
var Scene1 = new Environment([
	new TileMap(dungeontiles, [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,3,2,2,2,3,2,2,3,2,2,2,3,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	])//,
	//new Sprite('./sprites/block.png', 400, 400, 80, 80, tags=['solid'])
], backgroundColor='#333c57');

CURRENTENVIRONMENT = Scene1;

// Create the Player
var redwizard = new Sprite('./sprites/redwizard.png', 160, 120, 80, 80);
redwizard.speed = 6;
redwizard.movement = true;
redwizard.boxsize = {
	x: 10, y: 50,
	w: 60, h: 30
};
redwizard.animations['idle'] = 	{
	0: (self) => {
		self.sheetrow++;
	},
	1: (self) => {
		self.sheetrow--;
	},
	frames: 2,
	loop: true,
	fps: 3
};
redwizard.defaultanimation = 'idle';

// Create the Gate
var gate = new Sprite('./sprites/Gate.png', 0, 165, 80, 320);

// Initiates the Keys Used
keyPressed('ArrowUp');
keyPressed('ArrowDown');
keyPressed('ArrowLeft');
keyPressed('ArrowRight');

var health = 100;

function _draw() {
	// Draw Environment
	clear();
	CURRENTENVIRONMENT.draw();

	// Draw Title Text
	/*
	CTX.strokeStyle = 'white';
	CTX.lineWidth = 1;
	CTX.font = '30px arial';
	CTX.strokeText('Canvas Graphics & Collision Test', 5, 30);
	CTX.strokeText('by Ben Aeraki', 5, 60);*/

	// Draw Sprites
	redwizard.draw();
	gate.draw();

	CTX.strokeStyle = '#333c57'
	CTX.fillStyle = '#bc4258';
	CTX.lineWidth = 5;
	CTX.font = ' 30px Tahoma';
	CTX.fillText('HEALTH: ', 30, 48);
	CTX.fillRect(170, 22, 2*health, 30);
	CTX.strokeRect(170, 22, 200, 30);

	// Debug Tools
	//keyboardDebugger(5, 5, color='white');
	showFps(color='#257179');

};

function _update() {

	redwizard.keyboardMovement();
	if (keyPressed('ArrowLeft')) { redwizard.sheetcol = 1 };
	if (keyPressed('ArrowRight')) { redwizard.sheetcol = 0 };

};