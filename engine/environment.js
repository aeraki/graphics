function Environment(objects, backgroundColor='white') {

	this.objects = objects;
	this.backgroundColor = backgroundColor;

	this.draw = function() {
		if (this.backgroundColor !== undefined) {
			clear(this.backgroundColor);
		};
		for (let i=0; i<objects.length; i++) {
			objects[i].draw();
		};
	};
};

function Tileset(src, tilewidth, tileheight, tilesx, tilesy, padding=0) {

	this.type = 'Tileset';

	// Image
	let image = new Image();
	image.src = src;
	this.image = image;

	// Tile Sizes
	this.tilewidth = tilewidth;
	this.tileheight = tileheight;
	this.tilesx = tilesx;
	this.tilesy = tilesy;

	// Convert All Tiles to Sprites
	let tilecount = 0;
	for (let y=0; y<this.tilesy; y++) {
		for (let x=0; x<this.tilesx; x++) {
			let spr = new Sprite(this.image.src, 0, 0, this.tilewidth, this.tileheight);
			spr.sheetrow = x;
			spr.sheetcol = y;
			this[ tilecount ] = spr;
			tilecount++;
		};
	};

};

function TileMap(tileset, layout, x=0, y=0) {

	this.type = 'TileMap';

	this.tileset = tileset;
	this.layout = layout;
	this.image = this.tileset.image;

	this.manifest = []

	for (let ly=0; ly<layout.length; ly++) {
		this.manifest.push([]);
		for (let lx=0; lx<layout[ly].length; lx++) {
			let tid = layout[ly][lx];
			let spr = copy(this.tileset[tid]);
			spr.x = (this.tileset.tilewidth*lx)+x;
			spr.y = (this.tileset.tileheight*ly)+y;
			this.manifest[ly][lx] = spr;
		};
	};

	// Draw to Canvas
	this.draw = function() {
		for (let ty=0; ty<this.manifest.length; ty++) {
			for (let tx=0; tx<this.manifest[ty].length; tx++) {

				this.manifest[ty][tx].draw();

			};
		};
		if (TILESETDEBUGTOOL) {
			for (let dy=0; dy<Math.ceil(HEIGHT/this.tileset.tileheight); dy++) {
				line(0, dy*this.tileset.tileheight, WIDTH, dy*this.tileset.tileheight, '#88888833');
			};
			for (let dx=0; dx<Math.floor(WIDTH/this.tileset.tilewidth); dx++) {
				line(dx*this.tileset.tilewidth, 0, dx*this.tileset.tilewidth, HEIGHT, '#88888833');
			};
		};
	};

};