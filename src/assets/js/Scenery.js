define(['threejs'], function() {
    var Scenery = function(scene, geometry, material) {
        var scope = this;

		material = new THREE.MeshBasicMaterial({
			color: 0x222222
		});
		geometry = new THREE.CubeGeometry(600, 10, 300);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, - 10, 0);
        //mesh.castShadow = true;
        //mesh.receiveShadow = true;
		scene.add(mesh);
    };

    return Scenery;
});
