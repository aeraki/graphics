// Set Canvas Size
changeCanvasSize(14*80, 8*80);

var enemiesactive = [];

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

CURRENTENVIRONMENT = Scene1;

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

var hplabel = new Sprite('./sprites/HP.png', 70, 14, 90, 48);

var titlelogo = new Sprite('./sprites/title.png', 172, 80, 998, 424);
titlelogo.dw=titlelogo.dw/1.3;
titlelogo.dh=titlelogo.dh/1.3;