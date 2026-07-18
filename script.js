import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180/build/three.module.js";

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(0x07111f,0.02);

const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth/window.innerHeight,
    .1,
    1000
);

camera.position.set(10,7,18);

const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

renderer.domElement.style.position="absolute";
renderer.domElement.style.top="0";
renderer.domElement.style.left="0";

/////////////////////////////////////////////////
// Moonlight
/////////////////////////////////////////////////

const moon = new THREE.DirectionalLight(0xbfd7ff,2);

moon.position.set(8,20,10);

scene.add(moon);

scene.add(new THREE.AmbientLight(0x6f85aa,.5));

/////////////////////////////////////////////////
// Ocean
/////////////////////////////////////////////////

const ocean = new THREE.Mesh(

    new THREE.PlaneGeometry(500,500,120,120),

    new THREE.MeshPhongMaterial({

        color:0x163d63,

        flatShading:true

    })

);

ocean.rotation.x=-Math.PI/2;

scene.add(ocean);

/////////////////////////////////////////////////
// Island
/////////////////////////////////////////////////

const island = new THREE.Mesh(

    new THREE.CylinderGeometry(12,22,5,32),

    new THREE.MeshStandardMaterial({

        color:0x42523d

    })

);

island.position.y=2;

scene.add(island);

/////////////////////////////////////////////////
// Lighthouse
/////////////////////////////////////////////////

const tower = new THREE.Mesh(

    new THREE.CylinderGeometry(1.5,2.4,15,32),

    new THREE.MeshStandardMaterial({

        color:0xf0ece5

    })

);

tower.position.y=10;

scene.add(tower);

const roof = new THREE.Mesh(

    new THREE.ConeGeometry(2.2,2.5,32),

    new THREE.MeshStandardMaterial({

        color:0x3f2f29

    })

);

roof.position.y=18.8;

scene.add(roof);

/////////////////////////////////////////////////
// Lantern
/////////////////////////////////////////////////

const glow = new THREE.PointLight(0xffeeaa,8,45);

glow.position.set(0,17.2,0);

scene.add(glow);

/////////////////////////////////////////////////
// Stars
/////////////////////////////////////////////////

const starGeo=new THREE.BufferGeometry();

const starCount=3000;

const verts=[];

for(let i=0;i<starCount;i++){

    verts.push(

        (Math.random()-.5)*350,

        Math.random()*140+20,

        (Math.random()-.5)*350

    );

}

starGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(verts,3)
);

const stars=new THREE.Points(

    starGeo,

    new THREE.PointsMaterial({

        color:0xffffff,

        size:.6

    })

);

scene.add(stars);

/////////////////////////////////////////////////
// Animation
/////////////////////////////////////////////////

let time=0;

function animate(){

    requestAnimationFrame(animate);

    time+=0.003;

    camera.position.x=Math.sin(time)*22;

    camera.position.z=Math.cos(time)*22;

    camera.lookAt(0,9,0);

    glow.intensity=6+Math.sin(time*12);

    ocean.geometry.attributes.position.needsUpdate=true;

    renderer.render(scene,camera);

}

animate();

/////////////////////////////////////////////////

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
