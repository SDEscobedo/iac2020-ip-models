import {
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	AmbientLight,
	PointLight,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

let camera, scene, renderer, object;

class App {

	init() {
		scene = new Scene();

		camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    	camera.position.z = 30;

		const ambientLight = new AmbientLight( 0xffffff, 0.3 );
		scene.add( ambientLight );

		const pointLight = new PointLight( 0xffffff, 0.8 );
		camera.add( pointLight );
		scene.add( camera );

		// Instantiate a loader
		const loader = new GLTFLoader();

		// Load a glTF resource
	loader.load(
		// resource URL
		'../app/assets/mother-ship.glb',
		// called when the resource is loaded
		function ( gltf ) {

		
			scene.add( gltf.scene );

			//gltf.animations; // Array<THREE.AnimationClip>
			//gltf.scene; // THREE.Group
			//gltf.scenes; // Array<THREE.Group>
			//gltf.cameras; // Array<THREE.Camera>
			//gltf.asset; // Object

		},
		// called while loading is progressing
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
		);

		

		


		renderer = new WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		//document.body.appendChild( renderer.domElement );
		document.getElementById( 'container' ).appendChild( renderer.domElement );

		window.addEventListener( 'resize', onWindowResize, false );

		const controls = new OrbitControls( camera, renderer.domElement );


		const buttonTable = document.getElementById( 'posprocessor' );
        buttonTable.addEventListener( 'click', function () {
    
            transform( 'posprocessor' );
    
        }, false );
    
        const buttonlTable = document.getElementById( 'processor' );
        buttonlTable.addEventListener( 'click', function () {
    
            transform( 'processor' );
    
        }, false );
    
        const buttonlBlock = document.getElementById( 'drones' );
        buttonlBlock.addEventListener( 'click', function () {
    
            transform( 'drones' );

    
        }, false );
		const buttonPanel = document.getElementById( 'panel' );
        buttonPanel.addEventListener( 'click', function () {
    
            transform( 'panel' );

    
        }, false );
		const buttonDeploy = document.getElementById( 'deployer' );
        buttonDeploy.addEventListener( 'click', function () {
    
            transform( 'deployer' );

    
        }, false );

		animate();

	}

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function transform(object) {
	if (object=='drones'){
		camera.position.set(4,3.3,5.3);
		camera.lookAt(0,3,0);
		camera.updateProjectionMatrix();	
	}else if (object=='processor'){
		camera.position.set(5.1,0,5.5);
		camera.lookAt(0,0,0);
	}else if (object=='posprocessor'){
		camera.position.set(3.2,-7.7,6.3);
		camera.lookAt(0,-3,0);
	}else if (object=='panel'){
		camera.position.set(-6.4,-14,7.2);
		camera.lookAt(-5.8,0,0);
	}else if (object=='deployer'){
		camera.position.set(-2.5,4.8,5.2);
		camera.lookAt(0,4.8,0);
	}


	
}

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	console.log(camera.position)

}

export { App }
