function draw_title() {

};

function update_title() {

};

function draw_game() {
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
	enemytypes['slime_blue'].draw();
	enemytypes['snake_green'].draw();
	redwizard.draw();
	gate.draw();

	// Healthbar
	CTX.strokeStyle = '#333c57';
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

function update_game() {

	redwizard.keyboardMovement();
	if (keyPressed('ArrowLeft')) { redwizard.sheetcol = 1 };
	if (keyPressed('ArrowRight')) { redwizard.sheetcol = 0 };

};

// Start Game
_update = update_game;
_draw = draw_game;