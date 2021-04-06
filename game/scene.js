var gate = new Sprite('./sprites/Gate.png', 0, 165, 80, 320);

// Tileset, with 2 Tiles Solid
var dungeontiles = new Tileset('./sprites/Tiles.png', 80, 80, 3, 2);
dungeontiles[0].tags = ['solid'];
dungeontiles[2].tags = ['solid'];
dungeontiles[3].tags = ['solid'];

dungeontiles[3].animations['flicker'] = {
	0: (self) => {
		self.sheetrow=0;
	},
	1: (self) => {
		self.sheetrow=1;
	},
	2: (self) => {
		self.sheetrow=2;
	},
	frames: 3,
	loop: true,
	fps: 9
};
dungeontiles[3].defaultanimation = 'flicker';

// Creates the scene
var Scene1 = new Environment([
	new TileMap(dungeontiles, [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,3,2,2,2,3,2,2,3,2,2,2,3,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	]),
	gate
	//new Sprite('./sprites/block.png', 400, 400, 80, 80, tags=['solid'])
], backgroundColor='#333c57');









var practicetiles = new Tileset('./sprites/PracticeTiles.png', 80, 80, 3, 2);
practicetiles[0].tags = ['solid'];
practicetiles[2].tags = ['solid'];
practicetiles[3].tags = ['solid'];
practicetiles[3].animations['flicker'] = {
	0: (self) => {
		self.sheetrow=0;
	},
	1: (self) => {
		self.sheetrow=1;
	},
	2: (self) => {
		self.sheetrow=0;
	},
	3: (self) => {
		self.sheetrow=2;
	},
	frames: 4,
	loop: true,
	fps: 15
};
practicetiles[3].defaultanimation = 'flicker';

var PracticeRange = new Environment([
	new TileMap(practicetiles, [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,3,2,2,2,3,2,2,3,2,2,2,3,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	])
], backgroundColor='#1a1c2c');