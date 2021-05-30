document.addEventListener('keydown', function(event) {
	
	keyboard.events.forEach( (e) => {
		if (e.keys.includes( event.key )) {
			e.event();
		};
	});

	

});

var keyboard = {

	events: [
		/*{
			keys: ['ArrowLeft'],
			event: () => {
				console.log('Left was pressed.');
			}
		}, {
			keys: ['ArrowRight'],
			event: () => {
				console.log('Right was pressed');
			}
		}*/
	],

	held: [],

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

	isHeld: (keys) => {
		if (typeof keys === 'string') { keys = [keys] };

	}

};