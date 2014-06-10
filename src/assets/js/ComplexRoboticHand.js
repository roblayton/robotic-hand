define(['threejsx/loaders/ModelLoader', 'threejs'], function(ModelLoader) {
	var ComplexRoboticHand = function(scene, geometry, material, callback) {
		var scope = this;

		ModelLoader.load(scene, geometry, material, [{
			path: 'assets/models/robotic_hand.js'
		}], function(mesh) {
            scope.palm = mesh.bones[1];
            callback();
		});

        /*
		// Palm	
		geometry = new THREE.CubeGeometry(100, 20, 80);
		material = new THREE.MeshLambertMaterial({
			color: 0xcccccc
		});
		this.palm = new THREE.Mesh(geometry, material);
		this.palm.castShadow = true;
		this.palm.receiveShadow = true;
		scene.add(this.palm);

		// Fingers		
		this.fingers = [];
		geometry = new THREE.CubeGeometry(16, 12, 1);
		for (var i = 0; i < 5; i++) {
			mesh = new THREE.Mesh(geometry, material);
			//mesh.castShadow = true;
			//mesh.receiveShadow = true;
			scene.add(mesh);
			this.fingers.push(mesh);
		}
        */
	};

	return ComplexRoboticHand;
});

