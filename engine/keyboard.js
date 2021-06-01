document.addEventListener('keydown', function(event) {
	
	// Runs Regular Keyboard Events;
	keyboard.events.forEach( (e) => {
		if (e.keys.includes( event.key )) {
			event.preventDefault();
			e.event();
		};
	});

	// Notes when a key is pressed down for Held Keyboard Events;
	if (keyboard.lookingForHeld.includes(event.key) && !keyboard.held.includes(event.key)) {
		keyboard.held.push(event.key);
	};

});

// For detecting when Held Keyboard Events end;
document.addEventListener('keyup', function(event) {
	if (keyboard.lookingForHeld.includes(event.key) && keyboard.held.includes(event.key)) {
		keyboard.held.splice(keyboard.held.indexOf(event.key), 1);
	};
});

var keyboard = {

	// Regular Keyboard Events;
	events: [
		/*{
			keys: ['ArrowLeft'],
			event: () => {
				console.log('Left was pressed.');
			}
		}*/
	],

	// Runs when a key is hit;
	addEvent: (keys, event) => {
		// If a single key is given, convert to Array;
		if (typeof keys === 'string') { keys = [keys] };

		// Add events to eventlist;
		keyboard.events.push({
			'keys': keys,
			'event': event
		});

		return keyboard;
	},

	// Held Keyboard Events;
	lookingForHeld: [],
	held: [],
	heldEvents: [],

	addHeldEvent: (keys, event) => {
		// If a single key is given, convert to Array;
		if (typeof keys === 'string') { keys = [keys] };
		
		// Add keys to 'lookingForHeld' if not already there;
		keys.forEach( (k)=> {
			if (!keyboard.lookingForHeld.includes(k)) {
				keyboard.lookingForHeld.push(k);
			};
		});

		// Add to 'heldEvents'
		keyboard.heldEvents.push({
			'keys': keys,
			'event': event
		});

	},

	// Clears all Keyboard Events;
	clearEvents: () => {
		keyboard.events = [];
		keyboard.lookingForHeld = [];
		keyboard.held = [];
		keyboard.heldEvents = [];
	}

};