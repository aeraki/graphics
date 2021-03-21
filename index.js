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
	0: () => {
		redwizard.sheetrow++;
	},
	1: () => {
		redwizard.sheetrow--;
	},
	frames: 2,
	loop: true,
	fps: 3
};
redwizard.defaultanimation = 'idle';

// Initiates the Keys Used
keyPressed('ArrowUp');
keyPressed('ArrowDown');
keyPressed('ArrowLeft');
keyPressed('ArrowRight');

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

	// Player
	redwizard.draw();

	// Debug Tools
	keyboardDebugger(5, 5, color='white');
	showFps(color='white');

};

function _update() {

	redwizard.keyboardMovement();
	if (keyPressed('ArrowLeft')) { redwizard.sheetcol = 1 };
	if (keyPressed('ArrowRight')) { redwizard.sheetcol = 0 };

};