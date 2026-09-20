import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180/build/three.module.js";


// ========================================
// SCENE
// ========================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x9fc8d8);

scene.fog = new THREE.FogExp2(
    0x9fc8d8,
    0.012
);


// ========================================
// CAMERA
// ========================================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 10);


// ========================================
// RENDERER
// ========================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

document.body.appendChild(renderer.domElement);


// ========================================
// LIGHTING
// ========================================

const ambientLight = new THREE.HemisphereLight(
    0xbfdde8,
    0x46543d,
    2
);

scene.add(ambientLight);


const sun = new THREE.DirectionalLight(
    0xffffff,
    2
);

sun.position.set(
    -50,
    80,
    30
);

scene.add(sun);


// ========================================
// MATERIALS
// ========================================

const grassMaterial = new THREE.MeshStandardMaterial({
    color: 0x5f8750
});

const dirtMaterial = new THREE.MeshStandardMaterial({
    color: 0x79634d
});

const waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d849b,
    roughness: 0.7
});

const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x65462f
});

const treeTrunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x493526
});

const treeLeafMaterial = new THREE.MeshStandardMaterial({
    color: 0x285b38
});

const lighthouseMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5e1d3
});


// ========================================
// OCEAN
// ========================================

const oceanGeometry = new THREE.PlaneGeometry(
    500,
    500
);

const ocean = new THREE.Mesh(
    oceanGeometry,
    waterMaterial
);

ocean.rotation.x = -Math.PI / 2;
ocean.position.y = -1;

scene.add(ocean);


// ========================================
// ISLAND
// ========================================

const islandGeometry = new THREE.CylinderGeometry(
    38,
    45,
    3,
    10
);

const island = new THREE.Mesh(
    islandGeometry,
    grassMaterial
);

island.position.y = -0.2;

scene.add(island);


// ========================================
// BEACH / SHORE
// ========================================

const beachGeometry = new THREE.CylinderGeometry(
    40,
    47,
    1,
    10
);

const beach = new THREE.Mesh(
    beachGeometry,
    dirtMaterial
);

beach.position.y = -1.0;

scene.add(beach);


// ========================================
// LIGHTHOUSE
// ========================================

function createLighthouse() {

    const lighthouse = new THREE.Group();

    // Tower
    const towerGeometry = new THREE.CylinderGeometry(
        4,
        5,
        14,
        16
    );

    const tower = new THREE.Mesh(
        towerGeometry,
        lighthouseMaterial
    );

    tower.position.y = 7;

    lighthouse.add(tower);


    // Roof
    const roofGeometry = new THREE.ConeGeometry(
        4.8,
        3,
        16
    );

    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x8c332d
    });

    const roof = new THREE.Mesh(
        roofGeometry,
        roofMaterial
    );

    roof.position.y = 15.5;

    lighthouse.add(roof);


    // Light
    const lightGeometry = new THREE.SphereGeometry(
        1.3,
        16,
        16
    );

    const lightMaterial = new THREE.MeshBasicMaterial({
        color: 0xfff2b0
    });

    const light = new THREE.Mesh(
        lightGeometry,
        lightMaterial
    );

    light.position.y = 15;

    lighthouse.add(light);


    // Put lighthouse toward the upper-left part
    // of the island, matching the map.

    lighthouse.position.set(
        -10,
        0,
        -12
    );

    scene.add(lighthouse);
}

createLighthouse();


// ========================================
// DOCK
// ========================================

function createDock() {

    const dock = new THREE.Group();

    const plankGeometry = new THREE.BoxGeometry(
        2,
        0.5,
        5
    );

    for (let i = 0; i < 8; i++) {

        const plank = new THREE.Mesh(
            plankGeometry,
            woodMaterial
        );

        plank.position.z = i * 4;

        dock.add(plank);
    }


    // Support posts

    const postGeometry = new THREE.CylinderGeometry(
        0.25,
        0.25,
        4,
        8
    );

    for (let i = 0; i < 8; i++) {

        const post1 = new THREE.Mesh(
            postGeometry,
            woodMaterial
        );

        post1.position.set(
            -0.7,
            -1.5,
            i * 4
        );

        dock.add(post1);


        const post2 = new THREE.Mesh(
            postGeometry,
            woodMaterial
        );

        post2.position.set(
            0.7,
            -1.5,
            i * 4
        );

        dock.add(post2);
    }


    // Point the dock toward the sea.

    dock.rotation.y = Math.PI / 4;

    dock.position.set(
        -16,
        0,
        10
    );

    scene.add(dock);
}

createDock();


// ========================================
// TREES
// ========================================

function createTree(x, z, scale = 1) {

    const tree = new THREE.Group();


    // Trunk

    const trunkGeometry = new THREE.CylinderGeometry(
        0.45,
        0.6,
        4,
        8
    );

    const trunk = new THREE.Mesh(
        trunkGeometry,
        treeTrunkMaterial
    );

    trunk.position.y = 2;

    tree.add(trunk);


    // Leaves

    const leavesGeometry = new THREE.ConeGeometry(
        2.5,
        6,
        8
    );

    const leaves = new THREE.Mesh(
        leavesGeometry,
        treeLeafMaterial
    );

    leaves.position.y = 6;

    tree.add(leaves);


    tree.position.set(
        x,
        0,
        z
    );

    tree.scale.setScalar(scale);

    scene.add(tree);
}


// Forest area on the right side of the map.

const forestTrees = [
    [12, -14, 1.1],
    [18, -11, 0.9],
    [23, -7, 1.2],
    [14, -5, 0.8],
    [21, -1, 1],
    [27, 2, 1.1],
    [17, 4, 0.9],
    [24, 8, 1.2],
    [12, 8, 1],
    [20, 12, 0.8],
    [7, 3, 1.1],
    [10, -1, 0.9]
];

for (const tree of forestTrees) {
    createTree(
        tree[0],
        tree[1],
        tree[2]
    );
}


// ========================================
// PLAYER
// ========================================

const player = {
    height: 2,
    speed: 8,
    jumpStrength: 10,

    velocityY: 0,

    onGround: true
};

camera.position.set(
    0,
    player.height,
    8
);


// ========================================
// KEYBOARD INPUT
// ========================================

const keys = {};

window.addEventListener(
    "keydown",
    (event) => {

        keys[event.code] = true;

        if (
            event.code === "Space" &&
            player.onGround
        ) {

            player.velocityY =
                player.jumpStrength;

            player.onGround = false;
        }
    }
);


window.addEventListener(
    "keyup",
    (event) => {

        keys[event.code] = false;
    }
);


// ========================================
// MOUSE LOOK
// ========================================

let yaw = 0;
let pitch = 0;

document.body.addEventListener(
    "click",
    () => {

        document.body.requestPointerLock();

    }
);


document.addEventListener(
    "mousemove",
    (event) => {

        if (
            document.pointerLockElement !== document.body
        ) {
            return;
        }

        const sensitivity = 0.002;

        yaw -= event.movementX * sensitivity;
        pitch -= event.movementY * sensitivity;

        const limit = Math.PI / 2 - 0.05;

        pitch = Math.max(
            -limit,
            Math.min(limit, pitch)
        );

    }
);


// ========================================
// MOVEMENT
// ========================================

const clock = new THREE.Clock();

function updatePlayer(delta) {

    const direction = new THREE.Vector3();


    // Forward / backward

    if (keys["KeyW"]) {
        direction.z -= 1;
    }

    if (keys["KeyS"]) {
        direction.z += 1;
    }


    // Left / right

    if (keys["KeyA"]) {
        direction.x -= 1;
    }

    if (keys["KeyD"]) {
        direction.x += 1;
    }


    // Prevent diagonal movement
    // from being faster.

    if (direction.lengthSq() > 0) {

        direction.normalize();


        // Rotate movement according
        // to the direction Mara is looking.

        direction.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            yaw
        );


        camera.position.x +=
            direction.x *
            player.speed *
            delta;

        camera.position.z +=
            direction.z *
            player.speed *
            delta;
    }


    // ====================================
    // GRAVITY
    // ====================================

    player.velocityY -=
        25 * delta;

    camera.position.y +=
        player.velocityY * delta;


    // Ground

    if (camera.position.y <= player.height) {

        camera.position.y =
            player.height;

        player.velocityY = 0;

        player.onGround = true;
    }


    // ====================================
    // CAMERA ROTATION
    // ====================================

    camera.rotation.order = "YXZ";

    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
}


// ========================================
// GAME LOOP
// ========================================

function animate() {

    requestAnimationFrame(animate);

    const delta = Math.min(
        clock.getDelta(),
        0.05
    );

    updatePlayer(delta);

    renderer.render(
        scene,
        camera
    );
}

animate();


// ========================================
// WINDOW RESIZE
// ========================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);
