import {
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	LoadingManager,
	AmbientLight,
	PointLight,
	TextureLoader
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

let camera, scene, renderer, object;

class Model {

	init() {
		scene = new Scene();

		camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    	camera.position.z = 250;

		const ambientLight = new AmbientLight( 0xcccccc, 0.4 );
		scene.add( ambientLight );

		const pointLight = new PointLight( 0xffffff, 0.8 );
		camera.add( pointLight );
		scene.add( camera );

		
		function loadModel() {

			object.traverse( function ( child ) {

				if ( child.isMesh ) child.material.map = texture;

			} );

			object.position.y = 0;
			object.scale.set(0.1, 0.1, 0.1);
			scene.add( object );

		}

		const manager = new LoadingManager( loadModel );

		// texture

		const textureLoader = new TextureLoader( manager );
		const texture = textureLoader.load( '../assets/uv_grid_opengl.jpg' );

		function onProgress( xhr ) {

			if ( xhr.lengthComputable ) {

				const percentComplete = xhr.loaded / xhr.total * 100;
				console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

			}

		}

		function onError() {}

		const loader = new OBJLoader( manager );
		loader.load( '../assets/MotherShip.obj', function ( obj ) {

			object = obj;

		}, onProgress, onError );


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

export default Model;
