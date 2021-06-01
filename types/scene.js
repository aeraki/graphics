class Scene {

	constructor(objectlist) {

		// Object type;
		this.type = 'Scene';

		this.clearColor;

		// Object list;
		this.objects = [];
		if (Array.isArray(objectlist)) { // Add objects to list;
			objectlist.forEach( (val) => {
				this.objects.push(val);
			});
		} else if (objectlist !== undefined) {
			console.error('Scene constructor not given array.');
		};

		// Draw and Update Functions;
		this.draw;
		this.update;
		this.init;

		// Scene-Based Keyboard Events;
		this.keyEvents = [];

	};

	// Prototype Scene Management;
	PROTOTYPE_DRAW() {
		clear(this.clearColor);
		this.objects.forEach( (obj) => {
			if (obj.draw) {obj.draw()};
		});
		if (this.draw) {this.draw()};
	};
	PROTOTYPE_UPDATE() {
		this.objects.forEach( (obj) => {
			if (obj.update) {obj.update()};
		});
		if (this.update) {this.update()};
	};
	PROTOTYPE_INIT() {
		this.objects.forEach( (obj) => {
			if (obj.init) {obj.init()};
		});
		if (this.init) {this.init()};
	};

	// Opens Scene;
	open() {
		// Set the Engine to run the Scene;
		CURRENTSCENE = this;
		DRAW = undefined;
		UPDATE = undefined;

		// Tell Objects about the scene;
		this.objects.forEach( (obj) => {
			obj.scene = this;
		});

		// Reset and Add to the Keyboard Event System;
		keyboard.clearEvents();
		this.keyEvents.forEach( (e) => { keyboard.events.push(e) });

		// Initialize Scene
		this.PROTOTYPE_INIT();

		return this;
	};

	// Adds Object to Scene;
	addObject(list) {
		if (!Array.isArray(list)) { list = [list] };
		list.forEach( (obj) => {
			obj.scene = this;
			if (obj.init) {obj.init()};
			this.objects.push(obj);
		});
		return this;
	};

	// Adds Scene-Level Keyboard Events;
	addKeyEvent(keys, event) {
		// If a single key is given, convert to Array;
		if (typeof keys === 'string') { keys = [keys] };

		let e = {
			'keys': keys,
			'event': event
		};

		// Add events to eventlist;
		this.keyEvents.push(e);

		// If this is the current scene,
			// Add the event to the global event list.
		if (this === CURRENTSCENE) {
			keyboard.events.push(e);
		};

		return this;
	};

};