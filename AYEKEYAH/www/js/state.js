	var stepNo = 0;
	var totalSteps = 5;
	var startTime	= Date.now();
	var productNameText;
	var stepText;
	amountToMove = 0.15;

function TestState(game) {
	this.game		= game;
	this.scene 		= new THREE.Scene();
	this.camera 	= new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 1000);
	this.effect		= new THREE.StereoEffect(game.renderer);
	this.controls 	= initControls(this.camera, this.game);

	this.init();
}

TestState.prototype.handleClick = function(clickPosition, frametime) {
	if (stepNo < 5) {
		stepNo+=1;
	}
	else {
		alert("Congratulations, hopefully you now have a fully functioning table!");
	}
	stepText.innerHTML = "Step " + stepNo + " of " + totalSteps;

	switch(stepNo) {
    case 1:
    	// Add HUD
		document.body.appendChild(productNameText);
		document.body.appendChild(stepText);
		document.body.appendChild(descriptionText);

		this.scene.remove(entireTable);
		this.scene.remove(this.textMesh);

		this.scene.add(tableTop);
		this.scene.add(leg1);
		leg1.position.y = 30;

		this.camera.position.set(10,35,25);
        break;
    case 2:
    	this.camera.position.set(10,55,55);
    	leg1.position.y = 30;
        this.scene.add(leg2);
        leg2.position.y = 30;
        descriptionText.innerHTML = "Do the same for leg 2 as shown";
        break;
    case 3:
        this.scene.add(leg3);
        leg3.position.y = 30;
        descriptionText.innerHTML = "Do the same again for leg 3";
        break;
	case 4:
		this.scene.add(leg4);
		leg4.position.y = 30;
		descriptionText.innerHTML = "Finally attach the last leg!";
		break;
	case 5:
		this.scene.remove(tableTop);
		this.scene.remove(leg1);
		this.scene.remove(leg2);
		this.scene.remove(leg3);
		this.scene.remove(leg4);
		this.scene.add(entireTable);
		descriptionText.innerHTML = "Now rotate the table!";

    default:
        
	} 
}


TestState.prototype.init = function() {
	this.camera.position.set(0, 15, 65);
	this.textGeometry = new THREE.TextGeometry(
		"LACK (IKEA Lingo for Table)", { size: 5, height: 1 });

	this.textMesh = new THREE.Mesh (
		this.textGeometry,
		new THREE.MeshBasicMaterial({
			color: 0xFFFF00, opacity: 1
		})
	);

	// 2D Strings
	productNameText = document.createElement('div');
	productNameText.setAttribute("id", "productNameText");
	productNameText.style.position = 'absolute';
	productNameText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	productNameText.style.width = 100;
	productNameText.style.height = 100;
	productNameText.style.backgroundColor = "blue";
	productNameText.style.color = "yellow"
	productNameText.innerHTML = "Product Name: LACK";
	productNameText.style.top = 10 + 'px';
	productNameText.style.left = 10 + 'px';

	stepText = document.createElement('div');
	stepText.setAttribute("id", "stepText");
	stepText.style.position = 'absolute';
	stepText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	stepText.style.width = 100;
	stepText.style.height = 100;
	stepText.style.backgroundColor = "blue";
	stepText.style.color = "yellow"
	stepText.innerHTML = "Step " + stepNo + " of " + totalSteps;
	stepText.style.top = 10 + 'px';
	stepText.style.left = 250 + 'px';

	descriptionText = document.createElement('div');
	descriptionText.setAttribute("id", "descriptionText");
	descriptionText.style.position = 'absolute';
	descriptionText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	descriptionText.style.width = 100;
	descriptionText.style.height = 100;
	descriptionText.style.backgroundColor = "blue";
	descriptionText.style.color = "yellow"
	descriptionText.innerHTML = "Attach first leg to table and screw into position as shown";
	descriptionText.style.top = 100 + 'px';
	descriptionText.style.left = 30 + 'px';


	

	// Lighting

	this.light = new THREE.DirectionalLight( 0xffffff );
    this.light.position.set( 0, 1, 1 ).normalize();


	/*this.light = new THREE.PointLight(0x999999, 4, 300);
	this.light.position.set(100, 100, 50);*/

	// Floor code
	this.floorGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
	this.floorTexture = 
	THREE.ImageUtils.loadTexture('img/textures/tile.jpg');
	this.floorTexture.wrapS = THREE.RepeatWrapping;
	this.floorTexture.wrapT = THREE.RepeatWrapping;
	this.floorTexture.repeat = new THREE.Vector2(50, 50);
	this.floorTexture.anisotropy = 
	this.game.renderer.getMaxAnisotropy();

		this.floorMaterial = new THREE.MeshPhongMaterial({
	    color: 0xffffff,
	    specular: 0xffffff,
	    shininess: 20,
	    shading: THREE.FlatShading,
	    map: this.floorTexture });

	this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
	this.floor.rotation.x = -Math.PI / 2;


	// Table
	var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('img/textures/wood.jpg') } );

	tableTop = new THREE.Mesh( new THREE.CubeGeometry(32, 1, 32), material);
	tableTop.position.x = 5;
	tableTop.position.y = 20.5;
	tableTop.position.z = -15

	leg1 = new THREE.Mesh( new THREE.CubeGeometry( 2, 20, 2 ), material);
	leg1.position.x = -10;
	leg1.position.y = 10;

	leg2 = new THREE.Mesh( new THREE.CubeGeometry( 2, 20, 2 ), material);
	leg2.position.x = 20;
	leg2.position.y = 10;

	leg3 = new THREE.Mesh( new THREE.CubeGeometry( 2, 20, 2 ), material);
	leg3.position.x = -10;
	leg3.position.y = 10;
	leg3.position.z = -30;

	leg4 = new THREE.Mesh( new THREE.CubeGeometry( 2, 20, 2 ), material);
	leg4.position.x = 20;
	leg4.position.y = 10;
	leg4.position.z = -30;

	this.scene.add(this.floor);
	this.scene.add(this.light);
	this.scene.add(this.camera);
	this.textMesh.position.set(-20, 40, -20);
	this.scene.add(this.textMesh);

	// Add table parts
	var combined = new THREE.Geometry();
	THREE.GeometryUtils.merge( combined, tableTop );
	THREE.GeometryUtils.merge( combined, leg1 );
	THREE.GeometryUtils.merge( combined, leg2 );
	THREE.GeometryUtils.merge( combined, leg3 );
	THREE.GeometryUtils.merge( combined, leg4 );


	entireTable = new THREE.Mesh( combined, material );
	this.scene.add( entireTable );


/*	this.scene.add(tableTop);
	this.scene.add(leg1);
	this.scene.add(leg2);
	this.scene.add(leg3);
	this.scene.add(leg4);*/

}

TestState.prototype.update = function(frametime) {
	this.game.resizeCanvas(this, this.camera);
	this.controls.update(frametime);
	

	var dtime	= Date.now() - startTime;

	switch(stepNo) {
		case 0:
		entireTable.rotation.y += 0.0225;
		entireTable.scale.x = 1.0 + 0.3*Math.sin(dtime/300);
		entireTable.scale.y = 1.0 + 0.3*Math.sin(dtime/300);
		entireTable.scale.z = 1.0 + 0.3*Math.sin(dtime/300);
		break;

	    case 1:
	    	leg1.rotation.y += 0.05;
	    	leg1.position.y += amountToMove;

	    	if ((leg1.position.y > 40) || (leg1.position.y < 30)) {
	    		amountToMove = amountToMove * -1;
	    	}


	        break;
	    case 2:
	        this.scene.add(leg2);
	        break;
	    case 3:
	        this.scene.add(leg3);
	        break;
		case 4:
			this.scene.add(leg4);
			break;
	    default:
        
	}



}

TestState.prototype.render = function(frametime) {
	this.camera.updateProjectionMatrix();
	this.effect.render(this.scene, this.camera);
}