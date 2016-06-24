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