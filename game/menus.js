// Title Screen

var blinktitle = true;

function draw_title() {
	clear('#1a1c2c');
	CTX.strokeStyle = '#bc4258';
	CTX.lineWidth = 5;
	CTX.strokeRect(0,0,WIDTH,HEIGHT)
	titlelogo.draw();
	CTX.fillStyle = '#566c86';
	CTX.font = '16px TIC';
	CTX.fillText('Ben Aeraki',7,HEIGHT-7);
	if (blinktitle) {
		CTX.font = '22px TIC';
		CTX.fillText('Press Space to Start', 332, 520);
	};
};

function update_title() {
	if (updframe%90 < 45) { blinktitle=true; } 
	else { blinktitle=false };
	if (keyPressed(' ')) {
		_update = update_levelsel;
		_draw = draw_levelsel;
	};
};






// Level Select

var currentlevel = 0;
var buttoncooldown = 0;

function draw_levelsel() {

	let lev = levels[currentlevel];

	clear('#1a1c2c');
	lev.scene.draw();
	clear('#1a1c2cbb');

	if (currentlevel !== 0) {
		levelrectangle(currentlevel-1,-20);
	};

	
	rect(60,120,WIDTH-80,120,'#333c57');
	rect2(60,120,WIDTH-80,120,'#b13e53',5);
	drawtext(lev.name,80,175,'#f4f4f4','26px TIC');
	drawtext('High Score: '+lev.hiscore, 100,215,'#566c86');

	for (let i=currentlevel+1; i<levels.length; i++) {
		levelrectangle(i,280+((i-1-currentlevel) * 130));
	};
};

function update_levelsel() {

	// Navigate Levels
	if (buttoncooldown === 0) {
		if (keyPressed('ArrowUp') && currentlevel !== 0) {
			currentlevel--;
			buttoncooldown=10;
		};
		if (keyPressed('ArrowDown') && currentlevel < levels.length-1) {
			currentlevel++;
			buttoncooldown=10;
		};
	};

	// Select & Load Level
	if (keyPressed('z')) {
		if (currentlevel !== 2) {
			_update = update_game;
			_draw = draw_game;
			CURRENTENVIRONMENT = levels[currentlevel].scene;
		};
		if (currentlevel === 1) {
			enemiesactive = [
				copy( enemytypes.slime_blue ),
				copy( enemytypes.snake_green )
			];
		}
	};

	// Button Cooldown
	if (buttoncooldown>0) {buttoncooldown--};
};

function levelrectangle(i,y) {
	let lev = levels[i];
	rect(100,y,WIDTH-100,90,'#333c57');
	drawtext(lev.name,120,y+57,'#566c86','26px TIC');
};