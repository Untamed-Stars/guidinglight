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
// Detailed Lighthouse
/////////////////////////////////////////////////

const lighthouse = new THREE.Group();
scene.add(lighthouse);

//
// Foundation
//

const foundation = new THREE.Mesh(
    new THREE.CylinderGeometry(3.4,4.1,2,32),
    new THREE.MeshStandardMaterial({
        color:0x7a7a7a,
        roughness:1
    })
);

foundation.position.y=6;
lighthouse.add(foundation);

//
// Main Tower
//

const tower = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6,2.3,15,48),
    new THREE.MeshStandardMaterial({
        color:0xf6f2ea,
        roughness:.9
    })
);

tower.position.y=14.5;
lighthouse.add(tower);

//
// Stone Trim
//

const trimBottom=new THREE.Mesh(
    new THREE.TorusGeometry(2.35,.12,16,64),
    new THREE.MeshStandardMaterial({color:0x8c8c8c})
);
trimBottom.rotation.x=Math.PI/2;
trimBottom.position.y=7.2;
lighthouse.add(trimBottom);

const trimTop=trimBottom.clone();
trimTop.position.y=21.8;
lighthouse.add(trimTop);

//
// Door
//

const door=new THREE.Mesh(
    new THREE.BoxGeometry(.9,1.8,.12),
    new THREE.MeshStandardMaterial({
        color:0x5d3d28
    })
);

door.position.set(0,7.9,2.28);
lighthouse.add(door);

//
// Door Frame
//

const frameMat=new THREE.MeshStandardMaterial({
    color:0x999999
});

const leftFrame=new THREE.Mesh(
    new THREE.BoxGeometry(.08,2,.15),
    frameMat
);

leftFrame.position.set(-.5,7.9,2.3);

const rightFrame=leftFrame.clone();
rightFrame.position.x=.5;

const topFrame=new THREE.Mesh(
    new THREE.BoxGeometry(1.08,.08,.15),
    frameMat
);

topFrame.position.set(0,8.9,2.3);

lighthouse.add(leftFrame,rightFrame,topFrame);

//
// Lantern beside door
//

const porchLamp=new THREE.PointLight(
    0xffcc88,
    2,
    8
);

porchLamp.position.set(1.1,8.5,2.4);
lighthouse.add(porchLamp);

//
// Steps
//

const stepGeo=new THREE.BoxGeometry(1.6,.2,.7);

for(let i=0;i<3;i++){

    const step=new THREE.Mesh(
        stepGeo,
        new THREE.MeshStandardMaterial({
            color:0x666666
        })
    );

    step.position.set(
        0,
        7+.2*i,
        2.8+.35*i
    );

    lighthouse.add(step);

}

//
// Windows
//

const windowMat=new THREE.MeshStandardMaterial({

    color:0xffd78f,

    emissive:0xffb84d,

    emissiveIntensity:1.5

});

for(let i=0;i<8;i++){

    const win=new THREE.Mesh(

        new THREE.BoxGeometry(.45,.7,.06),

        windowMat

    );

    const angle=i*Math.PI/4;

    const radius=1.72;

    win.position.set(

        Math.sin(angle)*radius,

        9+i*1.45,

        Math.cos(angle)*radius

    );

    win.lookAt(0,win.position.y,0);

    lighthouse.add(win);

}

//
// Balcony
//

const balcony=new THREE.Mesh(

    new THREE.CylinderGeometry(2.6,2.6,.25,48),

    new THREE.MeshStandardMaterial({

        color:0x444444

    })

);

balcony.position.y=22.4;

lighthouse.add(balcony);

//
// Balcony Railings
//

for(let i=0;i<40;i++){

    const angle=i/40*Math.PI*2;

    const pole=new THREE.Mesh(

        new THREE.CylinderGeometry(.03,.03,.8,8),

        new THREE.MeshStandardMaterial({

            color:0x999999

        })

    );

    pole.position.set(

        Math.sin(angle)*2.45,

        22.8,

        Math.cos(angle)*2.45

    );

    lighthouse.add(pole);

}

//
// Balcony Ring
//

const ring=new THREE.Mesh(

    new THREE.TorusGeometry(2.45,.05,8,64),

    new THREE.MeshStandardMaterial({

        color:0xbdbdbd

    })

);

ring.rotation.x=Math.PI/2;

ring.position.y=23.2;

lighthouse.add(ring);

//
// Support Beams
//

for(let i=0;i<8;i++){

    const beam=new THREE.Mesh(

        new THREE.BoxGeometry(.08,.8,.08),

        new THREE.MeshStandardMaterial({

            color:0x555555

        })

    );

    const angle=i*Math.PI/4;

    beam.position.set(

        Math.sin(angle)*2,

        22,

        Math.cos(angle)*2

    );

    beam.rotation.z=.5;

    lighthouse.add(beam);

}

//
// Lantern Room
//

const lanternRoom=new THREE.Mesh(

    new THREE.CylinderGeometry(1.55,1.55,2.4,8),

    new THREE.MeshPhysicalMaterial({

        color:0xffffff,

        transmission:.85,

        transparent:true,

        roughness:0,

        thickness:.1

    })

);

lanternRoom.position.y=24.1;

lighthouse.add(lanternRoom);

//
// Copper Roof
//

const roof=new THREE.Mesh(

    new THREE.ConeGeometry(1.9,2.1,8),

    new THREE.MeshStandardMaterial({

        color:0x648b74,

        metalness:.4,

        roughness:.8

    })

);

roof.position.y=26.3;

lighthouse.add(roof);

//
// Weather Vane
//

const vane=new THREE.Mesh(

    new THREE.BoxGeometry(.08,.9,.08),

    new THREE.MeshStandardMaterial({

        color:0x333333

    })

);

vane.position.y=27.3;

lighthouse.add(vane);

const vaneArrow=new THREE.Mesh(

    new THREE.BoxGeometry(.9,.05,.05),

    new THREE.MeshStandardMaterial({

        color:0x333333

    })

);

vaneArrow.position.y=27.6;

lighthouse.add(vaneArrow);

//
// Main Beacon
//

const beacon=new THREE.PointLight(
    0xfff1b5,
    10,
    60
);

beacon.position.y=24.2;

lighthouse.add(beacon);

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
