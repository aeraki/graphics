function draw_title() {

};

function update_title() {

};

function draw_game() {
	// Draw Environment
	clear();
	CURRENTENVIRONMENT.draw();

	// Draw Enemies
	for (let i=0; i<enemiesactive.length; i++) {
		enemiesactive[i].draw();
	};

	// Draw Sprites
	redwizard.draw();
	gate.draw();

	// Draw Projectiles
	for (let i=0; i<projectiles.length; i++) {
		projectiles[i].draw();
	};


	// Healthbar
	CTX.fillStyle = '#333c57';
	CTX.fillRect(170, 33, 200, 12);
	CTX.fillStyle = '#bc4258';
	CTX.fillRect(170, 33, 2*health, 12);
	hplabel.draw();

	// Debug Tools
	//keyboardDebugger(5, 5, color='white');
	showFps(color='#257179');

	debugText(redwizard.currentanimation);

};

function update_game() {

	redwizard.keyboardMovement();
	if (redwizard.currentanimation==='idle') {
		if (keyPressed('ArrowLeft')) { redwizard.sheetcol = 1 };
		if (keyPressed('ArrowRight')) { redwizard.sheetcol = 0 };
		
		if (keyPressed('z')) {
			redwizard.playAnimation('fire');
			let n = copy(projectileconstructor);
			let d = redwizard.sheetcol;
			if (d === 1) { d = -1 } else { d = 1 };
			n.direction = d;
			n.x = redwizard.x + (40*d); n.y = redwizard.y + 20;
			projectiles.push( n );
		};
	};

	if (keyPressed('q')) {
		if (redwizard.currentanimation!=='hit') {
			health -= 10;
			redwizard.playAnimation('hit');
		};
	};

	for (let i=0; i<projectiles.length; i++) {
		let p = projectiles[i];
		projectiles[i].x += (10*p.direction);
		if (p.x > WIDTH || p.x < (0 - p.w)) {
			projectiles.splice(i, 1);
		};
	};

	for (let i=0; i<enemiesactive.length; i++) {
		for (let s=0; s<enemiesactive[i].speed; s++) {
			enemiesactive[i].moveDirection(-1, 0);
		};
	};

};

// Startup Enemies

enemiesactive = [
	copy( enemytypes.slime_blue ),
	copy( enemytypes.snake_green )
]

// Start Game
_update = update_game;
_draw = draw_game;