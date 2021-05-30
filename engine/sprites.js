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

		// Draw Width;
		this.dw = this.w;
		this.dh = this.h;

		// Sprite Tags;
		this.tags = [];

		// Spritesheet Reference;
		this.sheetrow = 0;
		this.sheetcol = 0;
		this.offsetrow = 0;
		this.offsetcol = 0;

		// Reference to the scene the Object is in;
		this.scene = false; // false if none;

		// Collision Boxes;
		this.defaultCollisionBox = 'default';
		this.collisionboxes = {
			'default': {
				x: 0, y: 0,
				w: this.w,
				h: this.h
			}
		};

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
							// TEMP CODE FOR MOVEMENT
								keyboard.addHeldEvent('ArrowRight', ()=>{ this.x += 6 });
								keyboard.addHeldEvent('ArrowLeft',  ()=>{ this.x -= 6 });
								keyboard.addHeldEvent('ArrowUp',    ()=>{ this.y -= 6 });
								keyboard.addHeldEvent('ArrowDown',  ()=>{ this.y += 6 });
		return this;
	};

	// Manage Tags;
	addTags(taglist) {
		taglist.forEach( (val) => { this.tags.push(val) });
		return this;
	};

	// Manage Collisions;

	// Manage Movement;
	

};