function Sprite(src, x, y, w, h, tags=[], animations={}) {

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
	this.sheetrow = 0;
	this.sheetcol = 0;

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
		CTX.drawImage(this.image, this.sheetrow*this.w, this.sheetcol*this.h, this.w, this.h, this.x, this.y, this.w, this.h);
		if (COLLISIONDEBUGTOOL) {
			CTX.fillStyle = 'rgb(255,0,0,0.20)';
			if (this.tags.includes(COLLISIONSOLIDTAG)) {CTX.fillStyle = 'rgb(0,255,0,0.20)';};
			CTX.fillRect(this.boxsize.x+this.x, this.boxsize.y+this.y, this.boxsize.w, this.boxsize.h);
		};
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
	this.collisionWithTag = function(tag, scope=CURRENTENVIRONMENT) {
		let objects = scope.objects;
		let res = false;
		for (let i=0; i<objects.length; i++) {
			if (objects[i].type === 'Sprite') {

				if (objects[i].tags.includes(tag) && this.collisionWithSprite(objects[i])) { res=true };

			} else if (objects[i].type === 'TileMap') {
				for (let ty=0; ty<objects[i].manifest.length; ty++) {
					for (let tx=0; tx<objects[i].manifest[ty].length; tx++) {

						let spr = objects[i].manifest[ty][tx];
						if (spr.tags.includes(tag) && this.collisionWithSprite(spr)) { res=true };

					};
				};
			};
		};
		return res;
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
				this.moveDirection(this.speed*map[1], this.speed*map[2]);
			};
		};
	};

	// Animations
	this.animations = {
		/*'default': {
			frames: 2,
			0: () => {
				this.sheetrow++;
			},
			1: () => {
				this.sheetrow--;
			},
			loop: true,
			fps: 3
		}*/
	};
	
	this.currentanimation = undefined;
	this.defaultanimation = undefined;
	this.animationframe = 0;

	this.animationplayer;

	this.playAnimation = function (id) {
		console.log('Played Animation: ' + id);
		//clearInterval(this.animationplayer);
		this.currentanimation = id;
		this.animationframe = 0;

		this.animationplayer = setInterval((
			function(self) { return function() {
				let ani = self.animations[ self.currentanimation ];
				ani[ self.animationframe ](self);
				self.animationframe++;

				if (self.animationframe >= ani.frames) {
					if (ani.loop === true) {
						self.animationframe = 0 
					} else {
						clearInterval(self.animationplayer);
					};
				};
			}
		})(this) , 1000/this.animations[id].fps);
	};


};