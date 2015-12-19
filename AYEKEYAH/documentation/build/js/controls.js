function initControls(camera, game) {
    var controls = new THREE.OrbitControls(camera, game.renderer.domElement);
    controls.noPan 	= true;
  	controls.noZoom = true;

  	controls.target.set(
	    camera.position.x,
	    camera.position.y,
	    camera.position.z
  	);

  	// Really dodgy method of checking if we're on mobile or not
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		controls = new THREE.DeviceOrientationControls(camera);
	    controls.connect();
	    controls.update();

	    // Make sure the game knows we are using mobile controls
	    game.isMobile = true;
	}

	return controls;
}