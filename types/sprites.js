class Sprite {

	constructor(src, x, y, w, h) {

		// Object Type;
		this.type = 'Sprite';

		// Sprite Image;
		if (src !== undefined) {
			let image = new Image();
			image.src = src;
			this.image = image;
		} else {
			console.error('Engine: No image URL given to sprite.');
		};

		// Position and Size;
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 50;
		this.h = h || 50;

		// Sprite Tags;
		this.tags = [];

		// Draw Width;
		this.dw = this.w;
		this.dh = this.h;

		// Spritesheet Reference;
		this.sheetrow = 0;
		this.sheetcol = 0;
		this.offsetrow = 0; // Offset_ adds onto Sheet_;
		this.offsetcol = 0;

		// Reference to the scene the Object is in;
		this.scene = false; // false if none;

		// Movement Property;
		this.movable = false;
		this.speed = 5;
		this.keymap;
		this.mindsolids = true;

	};

	// Draw and Update the Sprite;
	draw() {
		CTX.drawImage(this.image, // The Sprite Image;
			(this.sheetrow+this.offsetrow)*this.w, // X,Y Distance
			(this.sheetcol+this.offsetcol)*this.h, // Relative to Image;
			this.w, this.h, // Width/Height Relative to Image;
			this.x, this.y, // Position relative to Canvas;
			this.dw, this.dh); // Width/Height of drawn sprite;
		return this;
	};
	update() {
		return this;
	};
	init() {
															if (this.movable) {
																keyboard.addHeldEvent('ArrowRight', ()=>{ this.x += 6 });
																keyboard.addHeldEvent('ArrowLeft',  ()=>{ this.x -= 6 });
																keyboard.addHeldEvent('ArrowUp',    ()=>{ this.y -= 6 });
																keyboard.addHeldEvent('ArrowDown',  ()=>{ this.y += 6 });
															};

		return this;
	};

	// Manage Movement;
	keyboardMovement( keymap ) {
		this.keymap = keymap || DEFAULTS.keymap;
		this.movable = true;
		return this;
	};

	// Manage Position;
	setPosition(x,y) {
		this.x = x;
		this.y = y;
		return this;
	}
	movePositionBy(x,y) {
		this.x += x;
		this.y += y;
		return this;
	};

	// Manage Drawing Properties;
	setSheet(x,y) {
		this.sheetrow = x;
		this.sheetcol = y;
		return this;
	};
	shiftSheetBy(x,y) {
		this.sheetrow += x;
		this.sheetcol += y;
		return this;
	};

	// Manage Tags;
	addTag(taglist) {
		if (!Array.isArray(taglist)) {taglist = [taglist]};
		taglist.forEach( (val) => { this.tags.push(val) });
		return this;
	};

};