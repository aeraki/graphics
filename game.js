// Infinite
// by Ben Aeraki

changeCanvasSize(14*80, 8*80);

var player = new Sprite('./sprites/redwizard.png',160,160,80,80).keyboardMovement();

var tile = new Sprite('./sprites/tiles.png',0,0,80,80).setSheet(1,0).addTag('solid');

var testroom = new Scene([tile, player]).open();

testroom.addKeyEvent('w', ()=>{
	let n = copyOf(tile).setPosition(random(WIDTH-80),random(HEIGHT-80));
	testroom.addObject(n);
});