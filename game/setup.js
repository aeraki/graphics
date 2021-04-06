// Set Canvas Size
changeCanvasSize(14*80, 8*80);

var enemiesactive = [];

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