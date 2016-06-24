
// Author Joshua Koo twitter.com/blurspline | github.com/zz85
// 21 June 2016. Drank tea. Couldn't sleep. Decided to
// connect bluetooth game controller, try the Game Controller API
// and made a crude drone / quadcopter controller

// Built for SteelSeries Stratus XL (Vendor: 0111 Product: 1419)
// You may need to press any button on your gamepad or
// or switch tabs to activate the controller!?

// Gamepad API references
// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad
// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
// https://www.smashingmagazine.com/2015/11/gamepad-api-in-web-games/
// http://html5gamepad.com/

'use strict';

var currentPad;
var gp;
var start = performance.timing.navigationStart;

var canvas;
var ctx;
var craft;

init();

function init() {
	craft = new Copter()

	canvas =  document.createElement('canvas');
	document.body.appendChild(canvas);

	canvas.width = 800;
	canvas.height = 800;
	canvas.style.position = 'absolute';
	canvas.style.zIndex = 100;

	ctx = canvas.getContext('2d');
}



var then = performance.now();
var start = performance.now();

const GROUND = 0;
const RADIUS = 100;
const ANALOG_L_X = 200;
const ANALOG_L_Y = 200;
const ANALOG_R_X = 600;
const ANALOG_R_Y = 200;
const ANALOG_STICK_RADUIS = 4;
const DEAD_ZONE_THRESHOLD = 0.1; // 0.25;
const YAW_PER_SECOND = Math.PI * 1; //
const MAX_VS = -6; // max vertical speed
const MAX_HS = 20;

let leftX;
let leftY;
let rightX;
let rightY;
let calibratedLX;
let calibratedLY;
let calibratedRX;
let calibratedRY;

var butt = new Button();

function Button() {

}


function animate() {
	requestAnimationFrame(animate);

	var now = performance.now();
	var delta = (now - then) / 1000; // in seconds
	then = now;

	var gamepads = navigator.getGamepads();
  	gp = gamepads[currentPad.index];

	if (gp) {
		debug.innerHTML = `
		${gp.connected ? 'Connected' : 'Disconnected'}<br/>
		Controller: ${gp.id}<br/>
		Axes: ${gp.axes.map( (a,b)=> `#${b}: ${a.toFixed(4)} `)} <br>
		Buttons: ${gp.buttons.map( (b, i) => `#${i}: ${b.pressed? 'on' : 'off'} ${b.value}` )}<br/>
		Timestamp: ${new Date(start + gp.timestamp / 1000 / 1000 )}<br/>
		Mapping: ${gp.mapping}<br/>
		Aircrat: ${craft.print()}<br/>
		Flight time: ${((then-start)/1000).toFixed(1)}s
		`;

		var tmp = gp.buttons[11].pressed;
		if (tmp != butt.pressed) {
			// do something
			if (tmp) {
				craft.returnToHome();
			}
		}
		butt.pressed = tmp;

		leftX = gp.axes[ axes_mappings.leftAnalogX ];
		leftY = gp.axes[ axes_mappings.leftAnalogY ];
		rightX = gp.axes[ axes_mappings.rightAnalogX ];
		rightY = gp.axes[ axes_mappings.rightAnalogY ];


		// update simulation

		calibratedLX = applyDeadzone( leftX, DEAD_ZONE_THRESHOLD );
		calibratedLY = applyDeadzone( leftY, DEAD_ZONE_THRESHOLD );
		calibratedRX = applyDeadzone( rightX, DEAD_ZONE_THRESHOLD );
		calibratedRY = applyDeadzone( rightY, DEAD_ZONE_THRESHOLD );

		craft.adjustHeight( calibratedLY * delta * MAX_VS ); // vertical height 5m/s
		craft.adjustYaw( calibratedLX * delta * YAW_PER_SECOND ); // yaw, 2s for 1 full rotation

		craft.adjustTrottleX( calibratedRX * delta * MAX_HS );
		craft.adjustTrottleY( calibratedRY * delta * MAX_HS );

		craft.update();


		// TODO add calibration (dead center + extreme ends)
		// TOOD add S curve post processing


		render();
	}
}


function applyDeadzone (number, threshold) {
	var percentage = (Math.abs(number) - threshold) / (1 - threshold);

	if(percentage < 0)
		percentage = 0;

   return percentage * (number > 0 ? 1 : -1);
}

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