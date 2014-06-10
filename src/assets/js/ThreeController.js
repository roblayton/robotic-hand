define(['proj/Scenery', 'proj/ComplexRoboticHand', 'threejs', 'Leap', 'use!TrackballControls'], function(Scenery, ComplexRoboticHand) {
	var ThreeController = function(container, options) {
		options = options || {};
		var scope = this;
		var callback = options.callbacks.onRender;

		// Scene
		var scene = new THREE.Scene();
		// ------

		// Camera
		var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
		camera.position.set(0, 250, 300);
		// ------
		// Renderer
		var renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		container.appendChild(renderer.domElement);
		// ------
		// Controls
		var controls = new THREE.TrackballControls(camera, renderer.domElement);
		controls.target.set(0, 100, 0);
		// ------
		// Canvas
		var canvas = container.getElementsByTagName('canvas')[0];
		var width = canvas.width;
		var height = canvas.height;
		// ------
        //
		var light = new THREE.AmbientLight(0xff0000);
        scene.add(light);

		light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(-100, 25, 100).normalize();
        scene.add(light);

		//light = new THREE.DirectionalLight(0xffffff, 1);
		//light.position.set(100, 0, 0);
        //scene.add(light);
		//light.castShadow = true;
		//light.shadowMapWidth = 2048;
		//light.shadowMapHeight = 2048;
		//var d = 200;
		//light.shadowCameraLeft = - d;
		//light.shadowCameraRight = d;
		//light.shadowCameraTop = d * 2;
		//light.shadowCameraBottom = - d * 2;

		//light.shadowCameraNear = 100;
		//light.shadowCameraFar = 600;
		//light.shadowCameraVisible = true;
        //

        // Event Handlers
        var onLoadedHandler = function(evt) {
            animate();
        };

		// Geometry
		var material, geometry, mesh;

		// Ground plane
        var s = new Scenery(scene, geometry, material);

        // Robotic Hand
        var crb = new ComplexRoboticHand(scene, geometry, material, onLoadedHandler);

        // Gestures
        var gesture = '', lastGesture = '';

		Leap.loop(function(frame) {
			var hand, direction, len;
			if (frame.hands.length > 0) {
				hand = frame.hands[0];
				crb.palm.position.set(hand.stabilizedPalmPosition[0], hand.stabilizedPalmPosition[1], hand.stabilizedPalmPosition[2]);
				direction = v(hand.direction[0], hand.direction[1], hand.direction[2]); // best so far
				crb.palm.lookAt(direction.add(crb.palm.position));
				crb.palm.rotation.z = - hand.roll();
                crb.palm.rotation.set( hand.pitch(), -hand.yaw(), hand.roll() );
				crb.palm.visible = true;
			} else {
				crb.palm.visible = false;
                gesture = '';
			}

            /*
			len = frame.pointables.length;
            var i;
			if (len > 0) {
				var pointable;
				crb.palm.hasFingers = true;
				for (i = 0; i < 5; i++) {
					finger = crb.fingers[i];
					if (i < len) {
						pointable = frame.pointables[i];
						finger.position.set(pointable.stabilizedTipPosition[0], pointable.stabilizedTipPosition[1], pointable.stabilizedTipPosition[2]);
						direction = v(pointable.direction[0], pointable.direction[1], pointable.direction[2]);
						finger.lookAt(direction.add(finger.position));
						finger.scale.z = pointable.length;
						finger.visible = true;
					} else {
						finger.visible = false;
					}
				}

                if (len === 1) {
                } else if (len === 2 || len === 3) {
                    gesture = 'SCISSORS';
                } else if (len === 4 || len === 5) {
                    gesture = 'PAPER';
                }
			} else if (crb.palm.hasFingers) {
				for (i = 0; i < 5; i++) {
					crb.fingers[i].visible = false;
				}
				crb.palm.hasFingers = false;

                gesture = 'ROCK';
			}

            if (gesture != lastGesture) {
                lastGesture = gesture;
                if (options.callbacks.onGesture) {
                    options.callbacks.onGesture(gesture);
                }
            }
            */

            if (options.callbacks.onRender) {
                options.callbacks.onRender();
            }
		});

		var animate = function() {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};

		var v = function(x, y, z) {
			return new THREE.Vector3(x, y, z);
		};
	};

	return ThreeController;
});

