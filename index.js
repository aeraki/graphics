var frame = 0;

var dungeontiles = new Tileset('./sprites/Tiles.png', 80, 80, 4, 1);
dungeontiles[2].tags = ['solid'];
dungeontiles[3].tags = ['solid'];

var CURRENTENVIRONMENT = new Environment([
	new TileMap(dungeontiles, [
		[3, 2, 3],
		[1, 1, 1],
		[1, 1, 1]
	], x=720),
	new Sprite('./sprites/block.png', 400, 400, 80, 80, tags=['solid'])
], backgroundColor='#333c57');

let redwizard = new Sprite('./sprites/redwizard.png', 160, 120, 80, 80);
redwizard.speed = 2;
redwizard.movement = true;
redwizard.boxsize = {
	x: 0, y: 50,
	w: 80, h: 30
};

keyPressed('ArrowDown');
keyPressed('ArrowUp');
keyPressed('ArrowRight');
keyPressed('ArrowLeft');

function _update() {
	// Draw Environment
	clear();
	CURRENTENVIRONMENT.draw();

	// Draw Title Text
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 1;
	ctx.font = '30px arial';
	ctx.strokeText('Canvas Graphics & Collision Test', 5, 30);
	ctx.strokeText('by Ben Aeraki', 5, 60);

	// Player
	redwizard.keyboardMovement();
	if (keyPressed('ArrowLeft')) { redwizard.sheetcol = 1 };
	if (keyPressed('ArrowRight')) { redwizard.sheetcol = 0 };
	redwizard.draw();
	keyboardDebugger(20, 80, color='white');

	// Continue
	frame++;if(frame>999){frame=0};
	requestAnimationFrame(_update);
};
  
_update();