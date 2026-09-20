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

const islandShape = new THREE.Shape();

islandShape.moveTo(-32, -12);
islandShape.lineTo(-28, -22);
islandShape.lineTo(-16, -28);
islandShape.lineTo(-2, -30);
islandShape.lineTo(14, -27);
islandShape.lineTo(28, -20);
islandShape.lineTo(34, -8);
islandShape.lineTo(32, 5);
islandShape.lineTo(27, 17);
islandShape.lineTo(17, 26);
islandShape.lineTo(4, 30);
islandShape.lineTo(-10, 28);
islandShape.lineTo(-21, 23);
islandShape.lineTo(-29, 14);
islandShape.lineTo(-34, 2);
islandShape.lineTo(-35, -7);
islandShape.closePath();

const islandGeometry = new THREE.ShapeGeometry(
    islandShape
);

const island = new THREE.Mesh(
    islandGeometry,
    grassMaterial
);

island.rotation.x = -Math.PI / 2;
island.position.y = 0;

scene.add(island);


// ========================================
// BEACH
// ========================================

const beachShape = new THREE.Shape();

beachShape.moveTo(-34, -12);
beachShape.lineTo(-30, -23);
beachShape.lineTo(-17, -30);
beachShape.lineTo(-2, -32);
beachShape.lineTo(15, -29);
beachShape.lineTo(30, -22);
beachShape.lineTo(36, -9);
beachShape.lineTo(34, 6);
beachShape.lineTo(29, 18);
beachShape.lineTo(18, 28);
beachShape.lineTo(4, 32);
beachShape.lineTo(-11, 30);
beachShape.lineTo(-23, 25);
beachShape.lineTo(-31, 15);
beachShape.lineTo(-37, 2);
beachShape.lineTo(-37, -8);
beachShape.closePath();

const beachGeometry = new THREE.ShapeGeometry(
    beachShape
);

const beach = new THREE.Mesh(
    beachGeometry,
    dirtMaterial
);

beach.rotation.x = -Math.PI / 2;
beach.position.y = -0.02;

scene.add(beach);


// ========================================
// LIGHTHOUSE
// ========================================

function createLighthouse() {

    const lighthouse = new THREE.Group();

    // ========================================
    // MAIN TOWER
    // ========================================

    const towerMaterial = new THREE.MeshStandardMaterial({
        color: 0xd9d1c1,
        roughness: 0.8
    });

    const towerGeometry = new THREE.CylinderGeometry(
        3.2,
        4.2,
        12,
        16
    );

    const tower = new THREE.Mesh(
        towerGeometry,
        towerMaterial
    );

    tower.position.y = 6;

    lighthouse.add(tower);


    // ========================================
    // DARK BASE
    // ========================================

    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x665b50,
        roughness: 1
    });

    const baseGeometry = new THREE.CylinderGeometry(
        4.5,
        4.8,
        1.2,
        16
    );

    const base = new THREE.Mesh(
        baseGeometry,
        baseMaterial
    );

    base.position.y = 0.6;

    lighthouse.add(base);


    // ========================================
    // HORIZONTAL BANDS
    // ========================================

    const bandMaterial = new THREE.MeshStandardMaterial({
        color: 0x4c514f,
        roughness: 0.9
    });

    function addBand(y, radius) {

        const geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            0.35,
            16
        );

        const band = new THREE.Mesh(
            geometry,
            bandMaterial
        );

        band.position.y = y;

        lighthouse.add(band);
    }

    addBand(2.2, 3.75);
    addBand(9.8, 3.0);


    // ========================================
    // WINDOWS
    // ========================================

    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x31434a,
        roughness: 0.5
    });

    function addWindow(y, rotation = 0) {

        const geometry = new THREE.BoxGeometry(
            0.7,
            1.4,
            0.15
        );

        const window = new THREE.Mesh(
            geometry,
            windowMaterial
        );

        const radius = 3.15;

        window.position.set(
            Math.sin(rotation) * radius,
            y,
            Math.cos(rotation) * radius
        );

        window.rotation.y = rotation;

        lighthouse.add(window);
    }

    addWindow(4.2, 0);
    addWindow(7, Math.PI);
    addWindow(9, 0);


    // ========================================
    // LANTERN ROOM PLATFORM
    // ========================================

    const platformGeometry = new THREE.CylinderGeometry(
        4,
        4,
        0.45,
        16
    );

    const platform = new THREE.Mesh(
        platformGeometry,
        bandMaterial
    );

    platform.position.y = 10.2;

    lighthouse.add(platform);


    // ========================================
    // LANTERN ROOM
    // ========================================

    const lanternFrameMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x333b3a,
            roughness: 0.7
        });


    const lanternGlassMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffe7a3,
            emissive: 0xffc85c,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.75
        });


    const lanternGlassGeometry =
        new THREE.CylinderGeometry(
            2.7,
            2.7,
            2.8,
            12
        );

    const lanternGlass = new THREE.Mesh(
        lanternGlassGeometry,
        lanternGlassMaterial
    );

    lanternGlass.position.y = 11.8;

    lighthouse.add(lanternGlass);


    // Vertical supports around the lantern

    for (let i = 0; i < 8; i++) {

        const angle =
            (i / 8) * Math.PI * 2;

        const postGeometry =
            new THREE.BoxGeometry(
                0.15,
                3,
                0.15
            );

        const post =
            new THREE.Mesh(
                postGeometry,
                lanternFrameMaterial
            );

        post.position.set(
            Math.sin(angle) * 2.65,
            11.8,
            Math.cos(angle) * 2.65
        );

        lighthouse.add(post);
    }


    // ========================================
    // LANTERN ROOF
    // ========================================

    const roofMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x6f4038,
            roughness: 0.8
        });

    const roofGeometry =
        new THREE.ConeGeometry(
            3.3,
            1.8,
            12
        );

    const roof =
        new THREE.Mesh(
            roofGeometry,
            roofMaterial
        );

    roof.position.y = 13.9;

    lighthouse.add(roof);


    // ========================================
    // ROOF SPIRE
    // ========================================

    const spireGeometry =
        new THREE.CylinderGeometry(
            0.12,
            0.12,
            1.5,
            8
        );

    const spire =
        new THREE.Mesh(
            spireGeometry,
            lanternFrameMaterial
        );

    spire.position.y = 15.5;

    lighthouse.add(spire);


    // ========================================
    // WARM LIGHT
    // ========================================

    const lighthouseLight =
        new THREE.PointLight(
            0xffd98a,
            30,
            35
        );

    lighthouseLight.position.y = 12;

    lighthouse.add(lighthouseLight);


    // ========================================
    // DOOR
    // ========================================

    const doorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x493b32,
            roughness: 0.9
        });

    const doorGeometry =
        new THREE.BoxGeometry(
            1.4,
            2.5,
            0.2
        );

    const door =
        new THREE.Mesh(
            doorGeometry,
            doorMaterial
        );

    door.position.set(
        0,
        1.8,
        4.05
    );

    lighthouse.add(door);


    // ========================================
    // PLACE LIGHTHOUSE
    // ========================================

    lighthouse.position.set(
        -10,
        0,
        -12
    );

    scene.add(lighthouse);
}


// ========================================
// DOCK
// ========================================

function createDock() {

    const dock = new THREE.Group();

    const plankMaterial = new THREE.MeshStandardMaterial({
        color: 0x6b4932,
        roughness: 0.9
    });


    // ========================================
    // DOCK WALKWAY
    // ========================================

    const plankGeometry = new THREE.BoxGeometry(
        2.8,
        0.35,
        3
    );

    for (let i = 0; i < 9; i++) {

        const plank = new THREE.Mesh(
            plankGeometry,
            plankMaterial
        );

        plank.position.z = i * 3;

        dock.add(plank);
    }


    // ========================================
    // SUPPORT POSTS
    // ========================================

    const postGeometry = new THREE.CylinderGeometry(
        0.18,
        0.18,
        3.5,
        8
    );

    for (let i = 0; i < 9; i++) {

        const post1 = new THREE.Mesh(
            postGeometry,
            plankMaterial
        );

        post1.position.set(
            -1,
            -1.5,
            i * 3
        );

        dock.add(post1);


        const post2 = new THREE.Mesh(
            postGeometry,
            plankMaterial
        );

        post2.position.set(
            1,
            -1.5,
            i * 3
        );

        dock.add(post2);
    }


    // ========================================
    // POSITION
    // ========================================

    dock.position.set(
        -18,
        0.2,
        20
    );

    dock.rotation.y = 0;

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
    [10, -16, 1.1],
    [16, -15, 0.9],
    [22, -12, 1.2],
    [27, -8, 1],
    
    [12, -8, 0.9],
    [18, -6, 1.1],
    [25, -3, 0.8],
    [29, 2, 1.2],

    [10, 0, 1],
    [15, 2, 1.2],
    [22, 5, 0.9],
    [27, 8, 1.1],

    [8, 7, 0.8],
    [14, 10, 1.1],
    [20, 12, 0.9],
    [24, 15, 1.2],

    [5, 14, 1],
    [11, 17, 0.8],
    [17, 18, 1.1],

    [4, 3, 0.7],
    [7, -3, 0.9]
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
    5
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
