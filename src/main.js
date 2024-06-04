import * as THREE from 'three';
import * as CANNON from 'cannon';

//import {Humanoid} from './humanoid'
import { Population } from './population';

//import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
//import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Scene setup
const scene = new THREE.Scene();
let clock = new THREE.Clock();

//const loader = new FontLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-20, 5, 0);
camera.lookAt(new THREE.Vector3(0,0,0));

const renderer = new THREE.WebGLRenderer();

let delta = 0;
let interval = 1 / 30;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cannon.js world setup
const world = new CANNON.World();
world.gravity.set(0, -10, 0);
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;

// Create floor in Three.js
const floorGeometry = new THREE.PlaneGeometry(200, 200);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2;
scene.add(floorMesh);

// Step 2: Create a static plane for the floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
    mass: 0, // mass = 0 makes the body static
    shape: floorShape
});
// Rotate the plane so that it's horizontal (along the x-axis)
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

world.addBody(floorBody);

const population = new Population(world, scene, 10, 1, 0.01, 0.1);

const animate = () => {
    requestAnimationFrame(animate);
    //delta += clock.getDelta();

    world.step(interval); // what is this
    population.updatePopulation();
    renderer.render(scene, camera);



    //if (delta  > interval) {

        //renderer.render(scene, camera);
        //delta = delta % interval;
        //console.log(humanoid.position);
    //}

};

animate();