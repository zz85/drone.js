'use strict';

class Wind {
	constructor() {
		this.windForce = new THREE.Vector3();
	}

	update() {
		var time = performance.now();

		let windStrength = Math.cos( time / 7000 ) * 20 + 40;
		this.windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength );
	}
}