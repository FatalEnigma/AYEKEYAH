function TestState(game) {
	this.game		= game;
	this.scene 		= new THREE.Scene();
	this.camera 	= new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 1000);
	this.effect		= new THREE.StereoEffect(game.renderer);
	this.controls 	= initControls(this.camera, this.game);

	this.init();
}

TestState.prototype.init = function() {
	this.camera.position.set(0, 15, 30);

	this.camera.position.set(0, 15, 30);

	this.textGeometry = new THREE.TextGeometry("Hello World", { size: 5, height: 1 });

	this.textMesh = new THREE.Mesh(
		this.textGeometry,
		new THREE.MeshBasicMaterial({
    		color: 0xFF0000, opacity: 1
  		})
	);

	this.textMesh.position.set(-20, 0, -20);

	this.light = new THREE.PointLight(0x999999, 4, 300);
	this.light.position.set(50, 100, 50);

	this.floorGeometry = new THREE.PlaneBufferGeometry(1000, 1000);	
	this.floorTexture = THREE.ImageUtils.loadTexture('img/textures/wood.jpg');
	this.floorTexture.wrapS = THREE.RepeatWrapping;
	this.floorTexture.wrapT = THREE.RepeatWrapping;
	this.floorTexture.repeat = new THREE.Vector2(50, 50);
	this.floorTexture.anisotropy = this.game.renderer.getMaxAnisotropy();

	this.floorMaterial = new THREE.MeshPhongMaterial({
	    color: 0xffffff,
	    specular: 0xffffff,
	    shininess: 20,
	    shading: THREE.FlatShading,
	    map: this.floorTexture
  	});

	this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
	this.floor.rotation.x = -Math.PI / 2;

	this.scene.add(this.textMesh);
	this.scene.add(this.light);
	this.scene.add(this.floor);
	this.scene.add(this.camera);
}

TestState.prototype.update = function(frametime) {
	this.game.resizeCanvas(this, this.camera);
	this.controls.update(frametime);
	if(this.textMesh.position.z > -40) {
		this.textMesh.position.z -= 0.2;
		this.textMesh.position.y += 0.2;
	}
	else {
		this.textMesh.rotation.x += Math.PI / 16;
	}
}

TestState.prototype.render = function(frametime) {
	this.camera.updateProjectionMatrix();
	this.effect.render(this.scene, this.camera);
}