// Basic Stats
var maxhealth = 100;
var health = 100;
var level = 1;
var projectiles = [];

// Player Sprite
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
redwizard.animations['fire'] = {
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
};
redwizard.animations['hit'] = {
	0: (self) => {
		self.sheetrow=0;
		self.sheetcol+=4;
	},
	1: (self) => {
		self.sheetrow=0;
		self.sheetcol-=4;
	},
	frames: 2,
	loop: false,
	fps: 5
};
redwizard.defaultanimation = 'idle';
redwizard.hiton = true;