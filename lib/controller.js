var butt = new Button();

function Button() {

}

const DEFAULT_GAMEPAD_BINDINGS = {
	'SteelSeries Stratus XL (Vendor: 0111 Product: 1419)': {

	}
};

// SOMEHOW MAPPINGS SEEMS ALL DIFFERENT IN FIREFOX!??!!??!

const axes_mappings = {
	leftAnalogX: 0, // left -1, right + 1
	leftAnalogY: 1, // up -1, down +1
	rightAnalogX: 2, // up -1, down + 1
	rightAnalogY: 5, // left -1, right +1,
	directional: 9, // up -1, leff 0.7, down 0.1, right -0.4 - clockwise top -1, to bottom 0, top 1
	L2: 4, // release -1, full press 1
	R2: 3,
};


// do calibration, center, extreme ends!

const button_mappings = {
	leftAnalog: 13,
	rightAnalog: 14,
	start: 11,
	L1: 6,
	R1: 7,
	A: 0,
	B: 1,
	X: 3,
	Y: 4,
};

window.addEventListener('gamepadconnected', function(e) {
	console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
		e.gamepad.index, e.gamepad.id,
		e.gamepad.buttons.length, e.gamepad.axes.length);

	currentPad = e.gamepad;
	animate();
});

window.addEventListener('gamepaddisconnected', function(e) {
	console.log('Gamepad disconnected from index %d: %s',
		e.gamepad.index, e.gamepad.id);
});

