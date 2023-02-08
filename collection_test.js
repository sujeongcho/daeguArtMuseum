import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ImagePanel } from './ImagePanel';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { TWEEN } from 'three/addons/libs/tween.module.min.js';
import gsap from 'gsap';


export default function example() {
	const table = [
		"./images/01.png",'art', 'artist', 5,1,
		"./images/02.png",'art', 'artist', 6,1,
		"./images/03.png",'art', 'artist', 7,1,
		"./images/04.png",'art', 'artist', 8,1,
		"./images/05.png",'art', 'artist', 9,1,
		"./images/06.png",'art', 'artist', 10,1,
		"./images/07.png",'art', 'artist', 11,1,
		"./images/036.png",'art', 'artist', 12,1,
		"./images/037.png",'art', 'artist', 13,1,
		"./images/055.png",'art', 'artist', 14,1,
		"./images/08.png",'art', 'artist', 5,2,
		"./images/09.png",'art', 'artist', 6,2,
		"./images/010.png",'art', 'artist', 7,2,
		"./images/011.png",'art', 'artist', 8,2,
		"./images/012.png",'art', 'artist', 9,2,
		"./images/013.png",'art', 'artist', 10,2,
		"./images/014.png",'art', 'artist', 11,2,
		"./images/038.png",'art', 'artist', 12,2,
		"./images/039.png",'art', 'artist', 13,2,
		"./images/056.png",'art', 'artist', 14,2,
		"./images/015.png",'art', 'artist', 5,3,
		"./images/016.png",'art', 'artist', 6,3,
		"./images/017.png",'art', 'artist', 7,3,
		"./images/018.png",'art', 'artist', 8,3,
		"./images/019.png",'art', 'artist', 9,3,
		"./images/020.png",'art', 'artist', 10,3,
		"./images/021.png",'art', 'artist', 11,3,
		"./images/040.png",'art', 'artist', 12,3,
		"./images/041.png",'art', 'artist', 13,3,
		"./images/057.png",'art', 'artist', 14,3,
		"./images/022.png",'art', 'artist', 5,4,
		"./images/023.png",'art', 'artist', 6,4,
		"./images/024.png",'art', 'artist', 7,4,
		"./images/025.png",'art', 'artist', 8,4,
		"./images/026.png",'art', 'artist', 9,4,
		"./images/027.png",'art', 'artist', 10,4,
		"./images/028.png",'art', 'artist', 11,4,
		"./images/042.png",'art', 'artist', 12,4,
		"./images/043.png",'art', 'artist', 13,4,
		"./images/058.png",'art', 'artist', 14,4,
		"./images/029.png",'art', 'artist', 5,5,
		"./images/030.png",'art', 'artist', 6,5,
		"./images/031.png",'art', 'artist', 7,5,
		"./images/032.png",'art', 'artist', 8,5,
		"./images/033.png",'art', 'artist', 9,5,
		"./images/034.png",'art', 'artist', 10,5,
		"./images/035.png",'art', 'artist', 11,5,
		"./images/044.png",'art', 'artist', 12,5,
		"./images/045.png",'art', 'artist', 13,5,
		"./images/059.png",'art', 'artist', 14,5,
		"./images/046.png",'art', 'artist', 5,6,
		"./images/047.png",'art', 'artist', 6,6,
		"./images/048.png",'art', 'artist', 7,6,
		"./images/049.png",'art', 'artist', 8,6,
		"./images/050.png",'art', 'artist', 9,6,
		"./images/051.png",'art', 'artist', 10,6,
		"./images/052.png",'art', 'artist', 11,6,
		"./images/053.png",'art', 'artist', 12,6,
		"./images/054.png",'art', 'artist', 13,6,
		"./images/060.png",'art', 'artist', 14,6,


	];

	let camera, scene, renderer;
	let controls;

	const objects = [];
	const targets = { table: [], sphere: [], helix: [], grid: [] };

	init();
	animate();

	function init() {
		camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.z = 3000;

		scene = new THREE.Scene();

		// table
		for (let i = 0; i < table.length; i += 5) {
			const element = document.createElement('div');
			element.className = 'element';
			element.style.backgroundImage = `url('${table[i]}')`;
			//element.style.backgroundColor = 'rgba(0,127,127' + (Math.random() * 0.5 + 0.25) + ')';

	

			// const symbol = document.createElement('div');
			// symbol.className = 'symbol';
			// symbol.textContent = table[i];
			// element.appendChild(symbol);

		

		
			// for (let i = 0; i<table.length; i++){
			// 	const imageElement = document.createElement('div');
			// 	imageElement.src = table[i];
			// }

			//const imageElement = document.createElement('div');
			//element.innerHTML = `<img src='${table[i]}' alt=''>`;
			//imageElement.src = table[i];

			const objectCSS = new CSS3DObject(element);
			objectCSS.position.x = Math.random() *5000 - 2000;
			objectCSS.position.y = Math.random() * 5000 - 2000;
			objectCSS.position.z = Math.random() * 5000 - 2000;
			scene.add(objectCSS);

			objects.push(objectCSS);


			const object = new THREE.Object3D();
			object.position.x = ( table[ i + 3 ] * 150 ) - 1330;
			object.position.y = - ( table[ i + 4 ] * 250 ) + 990;

			targets.table.push( object );
		}

		// sphere
		const vector = new THREE.Vector3();

		for (let i = 0, l = objects.length; i < l; i++) {

			const phi = Math.acos(- 1 + (2 * i) / l);
			const theta = Math.sqrt(l * Math.PI) * phi;

			const object = new THREE.Object3D();

			object.position.setFromSphericalCoords(450, phi, theta);

			vector.copy(object.position).multiplyScalar(2);

			object.lookAt(vector);

			targets.sphere.push(object);

		}

		// helix
		for (let i = 0, l = objects.length; i < l; i++) {
			const theta = i * 0.175 + Math.PI;
			const y = - (i * 8) + 450;

			const object = new THREE.Object3D();

			object.position.setFromCylindricalCoords(800, theta, y);

			vector.x = object.position.x * 2;
			vector.y = object.position.y;
			vector.z = object.position.z * 2;

			object.lookAt(vector);

			targets.helix.push(object);
		}
		// grid

		for (let i = 0; i < objects.length; i++) {

			const object = new THREE.Object3D();

			object.position.x = ((i % 5) * 400) - 800;
			object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
			object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

			targets.grid.push(object);

		}

		// 
		renderer= new CSS3DRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('container').appendChild(renderer.domElement);


		// 
		controls = new TrackballControls( camera, renderer.domElement );
				controls.minDistance = 500;
				controls.maxDistance = 5000;
				controls.addEventListener( 'change', render );

				const buttonTable = document.getElementById( 'table' );
				buttonTable.addEventListener( 'click', function () {

					transform( targets.table, 2000 );

				} );

				const buttonSphere = document.getElementById( 'sphere' );
				buttonSphere.addEventListener( 'click', function () {

					transform( targets.sphere, 2000 );

				} );

				const buttonHelix = document.getElementById( 'helix' );
				buttonHelix.addEventListener( 'click', function () {

					transform( targets.helix, 2000 );

				} );
				const buttonGrid = document.getElementById( 'grid' );
				buttonGrid.addEventListener( 'click', function () {

					transform( targets.grid, 2000 );

				} );

				transform( targets.table, 2000 );
				//

				window.addEventListener( 'resize', onWindowResize );
	}


	function transform( targets, duration ) {

		TWEEN.removeAll();

		for ( let i = 0; i < objects.length; i ++ ) {

			const object = objects[ i ];
			const target = targets[ i ];

			new TWEEN.Tween( object.position )
				.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.start();

			new TWEEN.Tween( object.rotation )
				.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.start();

		}

		new TWEEN.Tween( this )
			.to( {}, duration * 2 )
			.onUpdate( render )
			.start();

	}
	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		render();

	}
	function animate() {

		requestAnimationFrame( animate );

		TWEEN.update();

		controls.update();

	}
	function render() {

		renderer.render( scene, camera );

	}


}















