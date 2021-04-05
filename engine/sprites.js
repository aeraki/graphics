function Sprite(src, x, y, w, h, tags=[], sheetrow=0, sheetcol=0) {

	this.type = 'Sprite';

	// Image
	let image = new Image();
	image.src = src;
	this.image = image;

	// Position/Size
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	// Tags
	this.tags = tags;

	// Spritesheet
	this.sheetrow = sheetrow;
	this.sheetcol = sheetcol;
	this.offsetrow = 0;
	this.offsetcol = 0;

	// Collision Box
	this.boxsize = {
		x: 0, y: 0,
		w: this.w,
		h: this.h
	};
		// Note: Boxsize is relative to the Sprite,
		// but CollisionBox is Relative to the Canvas.

	// Draw Sprite on Canvas
	this.draw = function() {
		
		// Draws to Canvas
		CTX.drawImage(this.image, (this.sheetrow+this.offsetrow)*this.w, (this.sheetcol+this.offsetcol)*this.h, 
		this.w, this.h, this.x, this.y, this.w, this.h);

		// Draws Debug Tool
		if (COLLISIONDEBUGTOOL) {
			CTX.fillStyle = 'rgb(255,0,0,0.20)';
			if (this.tags.includes(COLLISIONSOLIDTAG)) {CTX.fillStyle = 'rgb(0,255,0,0.20)';};
			CTX.fillRect(this.boxsize.x+this.x, this.boxsize.y+this.y, this.boxsize.w, this.boxsize.h);
		};

		// Starts Default Animation of no animation playing.
		if (this.currentanimation === undefined && this.defaultanimation !== undefined) {
			this.playAnimation(this.defaultanimation);
		};
	};

	// Collision Box Management and Detection
	this.collisionBox = function(box=this.boxsize) {
		return {
			x: box.x + this.x,
			y: box.y + this.y,
			w: box.w, h: box.h
		};
	};
	this.collisionWithSprite = function (spr) {
		let one = this.collisionBox();
		let two = spr.collisionBox();
		if (one.x < two.x + two.w &&
			one.x + one.w > two.x &&
			one.y < two.y + two.h &&
			one.y + one.h > two.y) {
				return true
		} else { return false };
	};
	this.collisionWithTag = function(tag, scope=CURRENTENVIRONMENT.objects) {
		let objects = scope;
		for (let i=0; i<objects.length; i++) {
			if (objects[i].type === 'Sprite') {

				if (objects[i].tags.includes(tag) && this.collisionWithSprite(objects[i])) { return objects[i] };

			} else if (objects[i].type === 'TileMap') {
				for (let ty=0; ty<objects[i].manifest.length; ty++) {
					for (let tx=0; tx<objects[i].manifest[ty].length; tx++) {

						let spr = objects[i].manifest[ty][tx];
						if (spr.tags.includes(tag) && this.collisionWithSprite(spr)) { return spr };

					};
				};
			};
		};
		return false;
	};


	// Movement + Keyboard Input
	this.movement = false;
	this.speed = 1;
	this.keyboardMovementMap = [
		['ArrowUp', 0, -1],
		['ArrowDown', 0, 1],
		['ArrowLeft', -1, 0],
		['ArrowRight', 1, 0]
	];
	this.moveDirection = function(x, y) { if (this.movement) {
		// Remember Current Position
		let oldx = this.x;
		let oldy = this.y;

		// Move in Direction
		this.x += x;
		this.y += y;

		// Detect for Collision
		if (this.collisionWithTag(COLLISIONSOLIDTAG)) {
			// Move back if solid.
			this.x = oldx;
			this.y = oldy;
		};
	}};
	this.keyboardMovement = function() {
		for (let i=0; i<this.keyboardMovementMap.length; i++) {
			let map = this.keyboardMovementMap[i];
			if ( keyPressed(map[0]) ) {
				for (let s=0; s<this.speed; s++) {
					this.moveDirection(map[1], map[2]);
				};
			};
		};
	};

	// Animations
	this.animations = {};
	
	this.currentanimation = undefined;
	this.defaultanimation = undefined;
	this.animationframe = 0;

	this.animationplayer;

	this.playAnimation = function (id) {
		//console.log('Played Animation: ' + id);

		// Cancel if the animation is already playing.
		if (this.currentanimation === id) {
			return false;
		};

		// Removes the Previous Animation
		clearInterval(this.animationplayer);

		// Updates the Animation Variables
		this.currentanimation = id;
		this.animationframe = 1;

		// Runs the first frame in advance
		this.animations[ this.currentanimation ][0](this);
		if (ANIMATIONDEBUGTOOL && this.name === ANIMATIONSPRITENAME) {
			console.log('Frame: -1; Row: '+this.sheetrow+'; Col: '+this.sheetcol+';');
		};

		this.animationplayer = setInterval((
			// Run this at the fps of the animation
			function(self) { return function() {
				// Gets the animation from the sprite.
				let ani = self.animations[ self.currentanimation ];
				// Runs the animation function
				ani[ self.animationframe ](self);
				
				// If debuging is on, show frame data.
				if (ANIMATIONDEBUGTOOL && self.name === ANIMATIONSPRITENAME) {
					console.log('Frame: '+self.animationframe+'; Row: '+self.sheetrow+'; Col: '+self.sheetcol+'; Loop: '+ani.loop);
				};
				// Add one to the frame.
				self.animationframe++;

				// If the animation is finished
				if (self.animationframe === ani.frames) {
					// Loop the animation
					if (ani.loop === true) {
						self.animationframe = 0;
					// End the animation
					} else {
						self.currentanimation = undefined;
						clearInterval(self.animationplayer);
					};
				};
			};
		})(this) , 1000/this.animations[id].fps);
	};

	this.stopAnimation = function () {
		this.currentanimation = undefined;
		clearInterval(this.animationplayer);
	};


};