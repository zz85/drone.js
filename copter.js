function Copter() {
	this.altitude = 0; // z
	this.bearing = 0; // orientation / rotation

	this.x = 0; // gps/loc x
	this.y = 0; // gps/loc

	this.vx = 0;
	this.vy = 0;
}

Copter.prototype.print = function() {
	return `Altitude: ${this.altitude.toFixed(3)}m
	Bearing: ${this.bearing}
	GPS: ${this.x}, ${this.y}
	VS, HS...
	`;
};

Copter.prototype.adjustHeight = function(h) {
	this.altitude += h;
	if (this.altitude < GROUND) {
		this.altitude = GROUND;
	}
};

Copter.prototype.adjustYaw = function(v) {
	this.bearing += v;
};

Copter.prototype.adjustTrottleX = function(v) {
	this.vx += Math.cos( this.bearing ) * v;
	this.vy += Math.sin( this.bearing ) * v;
};

Copter.prototype.adjustTrottleY = function(v) {
	this.vx -= Math.sin( this.bearing ) * v;
	this.vy += Math.cos( this.bearing ) * v;
};

Copter.prototype.returnToHome = function() {
	this.x = 0;
	this.y = 0;
};

Copter.prototype.update = function() {
	// should also cap acceleration

	this.x += this.vx;
	this.y += this.vy;

	this.vx *= 0.97;
	this.vy *= 0.97;
};
