let texture = new THREE.TextureLoader().load('../texture/grass_texture.png');

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight, 0.1, 1000 
);

camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#00000");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// make it responsive
window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/ window.innerHeight;

    camera.updateProjectionMatrix();
})


let geometry = new THREE.SphereGeometry(1, 100, 100);
// let material = new THREE.MeshBasicMaterial({map: texture});
let material = new THREE.MeshLambertMaterial(({map: texture}));
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let spotLight = new THREE.SpotLight(0xffffff);

spotLight.position.set(10, 5, 10);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 500;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);

renderer.render(scene, camera);


let render = function(){
    requestAnimationFrame(render);
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

render();

