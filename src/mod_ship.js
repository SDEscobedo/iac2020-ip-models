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
		document.body.appendChild( renderer.domElement );

		window.addEventListener( 'resize', onWindowResize, false );

		const controls = new OrbitControls( camera, renderer.domElement );


		animate();

	}

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}

export { App }
