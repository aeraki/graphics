// Create Enemies
var enemytypes = {};



// Blue Slime
enemytypes['slime_blue'] = new Sprite('./sprites/Enemies.png', 1120, 240, 80, 80, tags=['enemy']);
enemytypes['slime_blue'].movement = true;
enemytypes['slime_blue'].boxsize = {
	x: 0, y: 20,
	w: 80, h: 50
};
enemytypes['slime_blue'].animations['idle'] = {
	0: (self) => {
		self.sheetrow++;
	},
	1: (self) => {
		self.sheetrow--;
	},
	frames: 2,
	loop: true,
	fps: 4
};
enemytypes['slime_blue'].defaultanimation = 'idle';
enemytypes['slime_blue'].speed = 2;
enemytypes['slime_blue'].maxhealth = 2;
enemytypes['slime_blue'].health = 2;



// Green Snake
enemytypes['snake_green'] = new Sprite('./sprites/Enemies.png', 1120, 400, 80, 80, tags=['enemy']);
enemytypes['snake_green'].sheetcol = 1;
enemytypes['snake_green'].movement = true;
enemytypes['snake_green'].boxsize = {
	x: 0, y: 20,
	w: 80, h: 45
};
enemytypes['snake_green'].animations['idle'] = {
	0: (self) => {
		self.sheetrow++;
	},
	1: (self) => {
		self.sheetrow--;
	},
	frames: 2,
	loop: true,
	fps: 6
};
enemytypes['snake_green'].defaultanimation = 'idle';
enemytypes['snake_green'].speed = 4;
enemytypes['snake_green'].maxhealth = 1;
enemytypes['snake_green'].health = 1;



// Draw Enemy Healthbar Function
function proto_enemyHealthbar() {;
	CTX.fillStyle = '#1a1c2c';
	CTX.fillRect(this.x, this.y+this.h, this.w, 15);
	CTX.fillStyle = '#bc4258';
	CTX.fillRect(this.x+3, this.y+this.h+3, (this.health/this.maxhealth)*(this.w-6), 9);
};
for (var id in enemytypes) {
	enemytypes[id].drawHealth = proto_enemyHealthbar;
};


// Practice Slime
enemytypes['practice_slime'] = copy(enemytypes['slime_blue']);
enemytypes['practice_slime'].sheetcol+=2;
enemytypes['practice_slime'].speed = 5;
enemytypes['practice_slime'].maxhealth = 1;
enemytypes['practice_slime'].health = 1;
enemytypes['practice_slime'].drawHealth = function () {};