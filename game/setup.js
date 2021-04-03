// Set Canvas Size
changeCanvasSize(14*80, 8*80);

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
	fps: 9
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
var redwizard = new Sprite('./sprites/redwizard.png', 240, 320, 80, 80);
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
redwizard.animations['fire'] = 	{
	0: (self) => {
		self.sheetrow=0;
		self.sheetcol+=2;
	},
	1: (self) => {
		self.sheetrow++;
	},
	2: (self) => {
		self.sheetrow--;
	},
	3: (self) => {
		self.sheetrow++;
	},
	4: (self) => {
		self.sheetrow--;
	},
	5: (self) => {
		self.sheetrow++;
	},
	6: (self) => {
		self.sheetrow--;
	},
	7: (self) => {
		self.sheetrow=0;
		self.sheetcol-=2;
	},
	frames: 8,
	loop: false,
	fps: 28
}
redwizard.defaultanimation = 'idle';

// Projectiles
var projectileconstructor = new Sprite('./sprites/Projectile.png', 0, 0, 100, 50);
projectileconstructor.animations['idle'] = {
	0: (self) => {
		self.sheetcol++;
	},
	1: (self) => {
		self.sheetcol++;
	},
	2: (self) => {
		self.sheetcol++;
	},
	3: (self) => {
		self.sheetcol = 0;
	},
	frames: 4,
	loop: true,
	fps: 14
};
projectileconstructor.defaultanimation = 'idle';

// Create the Gate
var gate = new Sprite('./sprites/Gate.png', 0, 165, 80, 320);

var hplabel = new Sprite('./sprites/HP.png', 70, 14, 90, 48);

// Basic Stats
var maxhealth = 100;
var health = 100;
var level = 1;
var projectiles = [];

var enemiesactive = [];

// Level Outline
var levels = [
	// Level 1
	{
		enemies: []
	}
];