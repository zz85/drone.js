'use strict';

class Wind {
	constructor() {
		this.force = new THREE.Vector3();
	}

	update() {
		var time = performance.now();

		let strength = Math.cos( time / 7000 ) * 20 + 40;
		this.force.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( strength );
	}
}