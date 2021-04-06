// Basic Stats
var maxhealth = 100;
var health = 100;
var level = 1;
var projectiles = [];

// Player Sprite
var redwizard = new Sprite('./sprites/redwizard.png', 240, 320, 80, 80);
redwizard.name = 'redwizard';
redwizard.speed = 6;
redwizard.movement = true;
redwizard.boxsize = {
	x: 10, y: 50,
	w: 60, h: 30
};
redwizard.damagebox = {
	x: 10, y: 10,
	w: 60, h: 60
};
redwizard.animations['idle'] = 	{
	0: (self) => {
		self.sheetcol=0;
		self.sheetrow=0;
	},
	1: (self) => {
		self.sheetrow=1;
	},
	frames: 2,
	loop: true,
	fps: 3
};
redwizard.animations['fire'] = {
	0: (self) => {
		self.sheetrow=0;
		self.sheetcol=2;
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
	frames: 7,
	loop: false,
	fps: 28
};
redwizard.animations['hit'] = {
	0: (self) => {
		self.sheetrow=0;
		self.sheetcol=4;
	},
	1: (self) => { self.sheetrow++ },
	2: (self) => { self.sheetrow-- },
	3: (self) => { self.sheetrow++ },
	4: (self) => { self.sheetrow-- },
	5: (self) => { self.sheetrow++ },
	6: (self) => { self.sheetrow-- },
	7: (self) => { self.sheetrow++ },
	8: (self) => { self.sheetrow-- },
	9: (self) => { self.sheetrow++ },
	10: (self) => { self.sheetrow-- },
	11: (self) => { self.sheetrow++ },
	12: (self) => { self.sheetrow-- },
	frames: 13,
	loop: false,
	fps: 15
};
redwizard.defaultanimation = 'idle';