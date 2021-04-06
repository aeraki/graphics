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
		_update = update_game;
		_draw = draw_game;
	};
};