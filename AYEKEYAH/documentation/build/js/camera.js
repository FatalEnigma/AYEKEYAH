function createCamera(scene) {
	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
	camera.position.set(0, 15, 0);
	scene.add(this.camera);
	return camera;
}