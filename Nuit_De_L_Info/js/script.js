/* Initialisation js */
var c=console.log,
	el=(id)=>document.getElementById(id);
const BORDER_SIZE = 5;

/* Initialisation du style */
el("main_canvas").style="margin:"+BORDER_SIZE+"px";

/* Three JS */
var renderer = new THREE.WebGLRenderer({
		canvas: el("main_canvas"),
		antialias: true
	});

renderer.setClearColor(new THREE.Color(0x00ff00), 1);﻿
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(
	window.innerWidth - BORDER_SIZE*2, 
	window.innerHeight - BORDER_SIZE*2
);

var camera = new THREE.PerspectiveCamera(
	35, // Vertical field of view
	(window.innerWidth - BORDER_SIZE*2) / 
	(window.innerHeight - BORDER_SIZE*2),
	0.1,
	3000
);
//camera.position.set(0,0,0);
var scene = new THREE.Scene();

var light = {
	ambient : new THREE.AmbientLight(0xffffff, 0.5),
	point : [
		new THREE.PointLight(0xffffff, 0.5)
	]
};

scene.add(light.ambient);
for(var i=0; i<light.point.length;i++){
	scene.add(light.point[i]);
}


var geometry = new THREE.CubeGeometry(100,100,100);


// var material = new THREE.MeshBasicMaterial(); // FLAT
var material = new THREE.MeshLambertMaterial(
	{color: 0xf3ffe2}
);

// Load d'un objet 3d
var suzi, loader = new THREE.OBJLoader(); 
loader.load(
	'./models/suzi.obj',
	function ( obj ) {
		suzi = obj;
		suzi.position.set(0,0,-1000);
		suzi.scale.set( 100, 100, 100 );

		scene.add( suzi );
		requestAnimationFrame(update);
	}
);


// Ajout d'un CUBE
// var mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0,0,-1000);

// scene.add(mesh);



var delta = 0.01;
function update(){
	//delta += 0.1;
	// geometry.vertices[0].x = -25 + Math.sin(delta) * 50;
	// geometry.verticesNeedUpdate = true;
	suzi.rotation.y += delta;
	renderer.render(scene, camera);
	requestAnimationFrame(update);
}