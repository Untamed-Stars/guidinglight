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
// Stone Steps
//

const stairMaterial = new THREE.MeshStandardMaterial({
    color:0x777777,
    roughness:1
});

const stairCount = 8;

for(let i=0;i<stairCount;i++){

    const step = new THREE.Mesh(

        new THREE.BoxGeometry(
            1.8 + i * 0.08,
            0.25,
            0.48
        ),

        stairMaterial

    );

    step.position.set(

        0,

        5.15 + i * 0.25,

        4.65 - i * 0.48

    );

    lighthouse.add(step);

}

/////////////////////////////////////////////////
// Spiral Lighthouse Windows
/////////////////////////////////////////////////

const windowGroup = new THREE.Group();
lighthouse.add(windowGroup);

const stoneMaterial = new THREE.MeshStandardMaterial({
    color: 0x8f8f8f,
    roughness: 0.95
});

const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x5b3b24,
    roughness: 0.85
});

const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0xffe2b3,
    emissive: 0xffbb66,
    emissiveIntensity: 2.2,
    transparent: true,
    opacity: 0.95
});

const towerHeight = 15;
const bottomRadius = 2.3;
const topRadius = 1.6;

const windowCount = 8;

for(let i = 0; i < windowCount; i++){

    const windowAssembly = new THREE.Group();
    

    //
    // Stone Frame
    //

    const frame = new THREE.Mesh(

        new THREE.BoxGeometry(0.9,1.25,0.18),

        stoneMaterial

    );

    windowAssembly.add(frame);

    //
    // Wooden Frame
    //

    const woodFrame = new THREE.Mesh(

        new THREE.BoxGeometry(0.72,1.05,0.08),

        woodMaterial

    );

    woodFrame.position.z = 0.055;

    windowAssembly.add(woodFrame);

    //
    // Glass
    //

    const glass = new THREE.Mesh(

        new THREE.PlaneGeometry(0.56,0.88),

        glassMaterial

    );

    glass.position.z = 0.101;

    windowAssembly.add(glass);

    //
    // Stone Sill
    //

    const sill = new THREE.Mesh(

        new THREE.BoxGeometry(1.0,0.08,0.22),

        stoneMaterial

    );

    sill.position.set(0,-0.67,0.02);

    windowAssembly.add(sill);

    //
    // Warm Interior Light
    //

    const light = new THREE.PointLight(
        0xffc67a,
        0.4,
        2
    );

    light.position.z = -0.25;

    windowAssembly.add(light);


   /////////////////////////////////////////////////////
// Spiral Placement
/////////////////////////////////////////////////////

const t = i / (windowCount - 1);

// Move windows from above the door toward the balcony.
const y = 10 + t * 11;

// 1.5 turns around the lighthouse.
let angle = t * Math.PI * 3;

// Keep the lower windows away from the door.
if(i < 3){
    angle += Math.PI * 0.45;
}

// Radius of tapered tower at this height.
const localY = y - 7;

const towerRadius =
    bottomRadius -
    (bottomRadius - topRadius) *
    (localY / towerHeight);

const radius = towerRadius + 0.08;

windowAssembly.position.set(

    Math.sin(angle) * radius,

    y,

    Math.cos(angle) * radius

);

// Face outward from the lighthouse.
windowAssembly.lookAt(

    windowAssembly.position.x * 3,

    y,

    windowAssembly.position.z * 3

);

windowGroup.add(windowAssembly);

};
    
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
//
// Main Beacon
//

const beacon = new THREE.PointLight(
    0xfff1b5,
    10,
    70
);

beacon.position.set(
    0,
    24.2,
    0
);

lighthouse.add(beacon);


// Sweeping beam
const beamMaterial = new THREE.MeshBasicMaterial({

    color:0xfff3c4,

    transparent:true,

    opacity:0.14,

    side:THREE.DoubleSide,

    depthWrite:false,

    blending:THREE.AdditiveBlending

});

const beam = new THREE.Mesh(

    new THREE.CylinderGeometry(
        0.15,
        2.5,
        45,
        32,
        1,
        true
    ),

    beamMaterial

);

// Cylinder points along Y by default.
// Rotate it so it points horizontally.
beam.rotation.x = Math.PI / 2;

lighthouse.add(beam);


// Sweeping spotlight
const sweepLight = new THREE.SpotLight(

    0xfff1b5,

    20,

    100,

    Math.PI / 12,

    0.5,

    1

);

sweepLight.position.set(
    0,
    24.2,
    0
);

lighthouse.add(sweepLight);

lighthouse.add(sweepLight.target);
    
//
// Detailed Porch Lantern
//

const lantern = new THREE.Group();


//
// Metal frame
//

const metalMat = new THREE.MeshStandardMaterial({
    color:0x333333,
    metalness:.8,
    roughness:.4
});


// top cap

const lanternTop = new THREE.Mesh(

    new THREE.CylinderGeometry(.25,.32,.08,16),

    metalMat

);

lanternTop.position.y=.65;

lantern.add(lanternTop);


// bottom cap

const lanternBottom = new THREE.Mesh(

    new THREE.CylinderGeometry(.32,.25,.08,16),

    metalMat

);

lanternBottom.position.y=-.65;

lantern.add(lanternBottom);


//
// Glass body
//

const lanternGlass = new THREE.Mesh(

    new THREE.CylinderGeometry(
        .25,
        .25,
        1.1,
        16
    ),

    new THREE.MeshPhysicalMaterial({

        color:0xffdd88,

        emissive:0xffaa33,

        emissiveIntensity:2,

        transparent:true,

        opacity:.7,

        roughness:0

    })

);

lantern.add(lanternGlass);


//
// Vertical metal bars
//

for(let i=0;i<4;i++){

    const bar = new THREE.Mesh(

        new THREE.BoxGeometry(
            .03,
            1.2,
            .03
        ),

        metalMat

    );

    const angle=i*Math.PI/2;

    bar.position.set(

        Math.sin(angle)*.25,

        0,

        Math.cos(angle)*.25

    );

    lantern.add(bar);

}


//
// Hanging hook
//

const hook = new THREE.Mesh(

    new THREE.TorusGeometry(
        .15,
        .025,
        8,
        16
    ),

    metalMat

);

hook.rotation.x=Math.PI/2;

hook.position.y=.8;

lantern.add(hook);


//
// Light inside lantern
//

const porchLamp = new THREE.PointLight(

    0xffbb66,

    3,

    10

);

lantern.add(porchLamp);



//
// Position lantern beside door
//

lantern.position.set(
    1.1,
    8.7,
    2.45
);


lighthouse.add(lantern);


//
// Star field
//

const starCanvas=document.createElement("canvas");

starCanvas.width=32;
starCanvas.height=32;

const starCtx=starCanvas.getContext("2d");

starCtx.beginPath();

starCtx.arc(
    16,
    16,
    10,
    0,
    Math.PI*2
);

starCtx.fillStyle="white";

starCtx.fill();


const starTexture=new THREE.CanvasTexture(
    starCanvas
);


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

    new THREE.Float32BufferAttribute(
        verts,
        3
    )

);


const stars=new THREE.Points(

    starGeo,

    new THREE.PointsMaterial({

        map:starTexture,

        transparent:true,

        size:1.2,

        depthWrite:false

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

    camera.lookAt(
    lighthouse.position.x,
    15,
    lighthouse.position.z
    );

// Sweep the lighthouse beam.
const sweepAngle = time * 0.7;


// Position the visible beam around
// the lighthouse.
beam.position.set(

    Math.sin(sweepAngle) * 22,

    24.2,

    Math.cos(sweepAngle) * 22

);


// Point the beam back toward the lighthouse.
beam.lookAt(
    0,
    24.2,
    0
);


// Move the spotlight target.
sweepLight.target.position.set(

    Math.sin(sweepAngle) * 40,

    24.2,

    Math.cos(sweepAngle) * 40

);


// Gentle beacon pulse.
beacon.intensity =
    10 + Math.sin(time * 8) * 1.5;

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
