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


function createLighthouse() {
    const lighthouse = new THREE.Group();

    // =========================
    // MATERIALS
    // =========================

    const towerMaterial = new THREE.MeshStandardMaterial({
        color: 0x6f7d8d,
        roughness: 0.85
    });

    const stoneMaterial = new THREE.MeshStandardMaterial({
        color: 0x4d5661,
        roughness: 1
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
        color: 0x252b30,
        roughness: 0.8
    });

    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xffe58a,
        emissive: 0xffc44d,
        emissiveIntensity: 1.5
    });

    const doorMaterial = new THREE.MeshStandardMaterial({
        color: 0x49372c,
        roughness: 0.9
    });

    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x4c6b63,
        roughness: 0.85
    });

    // =========================
    // BASE
    // =========================

    const baseGeometry = new THREE.CylinderGeometry(
        6.0,
        6.5,
        1.5,
        20
    );

    const base = new THREE.Mesh(baseGeometry, stoneMaterial);
    base.position.y = 0.7;
    lighthouse.add(base);

    // =========================
    // MAIN TOWER
    // =========================

    const towerGeometry = new THREE.CylinderGeometry(
        4.2,     // top radius
        5.6,     // bottom radius
        22,      // height
        24
    );

    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = 11.7;
    lighthouse.add(tower);

    // =========================
    // TOP PLATFORM
    // =========================

    const platformGeometry = new THREE.CylinderGeometry(
        4.9,
        4.9,
        0.6,
        24
    );

    const platform = new THREE.Mesh(platformGeometry, darkMaterial);
    platform.position.y = 22.7;
    lighthouse.add(platform);

    // =========================
    // BALCONY RAILING
    // =========================

    const railingRadius = 4.7;

    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;

        const postGeometry = new THREE.BoxGeometry(
            0.12,
            1.2,
            0.12
        );

        const post = new THREE.Mesh(postGeometry, darkMaterial);

        post.position.set(
            Math.sin(angle) * railingRadius,
            23.25,
            Math.cos(angle) * railingRadius
        );

        lighthouse.add(post);
    }

    // Bottom railing ring
    const railingBottomGeometry = new THREE.TorusGeometry(
        railingRadius,
        0.09,
        6,
        32
    );

    const railingBottom = new THREE.Mesh(
        railingBottomGeometry,
        darkMaterial
    );

    railingBottom.rotation.x = Math.PI / 2;
    railingBottom.position.y = 22.8;
    lighthouse.add(railingBottom);

    // Top railing ring
    const railingTop = new THREE.Mesh(
        railingBottomGeometry,
        darkMaterial
    );

    railingTop.rotation.x = Math.PI / 2;
    railingTop.position.y = 23.8;
    lighthouse.add(railingTop);

    // =========================
    // LANTERN ROOM
    // =========================

    const lanternGlassMaterial = new THREE.MeshStandardMaterial({
        color: 0xffe9a8,
        emissive: 0xffc94f,
        emissiveIntensity: 1.8,
        transparent: true,
        opacity: 0.7
    });

    const lanternGeometry = new THREE.CylinderGeometry(
        3.0,
        3.0,
        3.0,
        16
    );

    const lantern = new THREE.Mesh(
        lanternGeometry,
        lanternGlassMaterial
    );

    lantern.position.y = 25.1;
    lighthouse.add(lantern);

    // Lantern vertical frames
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;

        const frameGeometry = new THREE.BoxGeometry(
            0.14,
            3.2,
            0.14
        );

        const frame = new THREE.Mesh(
            frameGeometry,
            darkMaterial
        );

        frame.position.set(
            Math.sin(angle) * 2.9,
            25.1,
            Math.cos(angle) * 2.9
        );

        lighthouse.add(frame);
    }

    // =========================
    // LANTERN TOP
    // =========================

    const roofGeometry = new THREE.ConeGeometry(
        3.5,
        2.0,
        16
    );

    const roof = new THREE.Mesh(
        roofGeometry,
        roofMaterial
    );

    roof.position.y = 27.6;
    lighthouse.add(roof);

    // Small roof cap
    const capGeometry = new THREE.CylinderGeometry(
        0.45,
        0.45,
        0.35,
        10
    );

    const cap = new THREE.Mesh(
        capGeometry,
        darkMaterial
    );

    cap.position.y = 28.7;
    lighthouse.add(cap);

    // =========================
    // SPIRE
    // =========================

    const spireGeometry = new THREE.CylinderGeometry(
        0.08,
        0.08,
        1.8,
        8
    );

    const spire = new THREE.Mesh(
        spireGeometry,
        darkMaterial
    );

    spire.position.y = 29.7;
    lighthouse.add(spire);

    // =========================
    // LIGHT
    // =========================

    const lighthouseLight = new THREE.PointLight(
        0xffd477,
        40,
        45
    );

    lighthouseLight.position.y = 25.2;
    lighthouse.add(lighthouseLight);

    // =========================
    // WINDOWS
    // =========================

    function addWindow(y, angle) {
        const windowGroup = new THREE.Group();

        const frameGeometry = new THREE.BoxGeometry(
            1.0,
            1.7,
            0.18
        );

        const frame = new THREE.Mesh(
            frameGeometry,
            darkMaterial
        );

        windowGroup.add(frame);

        const glassGeometry = new THREE.BoxGeometry(
            0.65,
            1.3,
            0.2
        );

        const glass = new THREE.Mesh(
            glassGeometry,
            windowMaterial
        );

        glass.position.z = 0.08;
        windowGroup.add(glass);

        const radius = 3.65;

        windowGroup.position.set(
            Math.sin(angle) * radius,
            y,
            Math.cos(angle) * radius
        );

        windowGroup.rotation.y = angle;

        lighthouse.add(windowGroup);
    }

    addWindow(5.2, 0);
    addWindow(9.5, Math.PI * 0.55);
    addWindow(14, Math.PI);
    addWindow(18.5, Math.PI * 1.55);

    // =========================
    // DOOR
    // =========================

    // This group is the hinge.
    // The actual door is offset from it,
    // allowing the door to rotate naturally later.

    const door = new THREE.Group();

    const doorGeometry = new THREE.BoxGeometry(
        1.7,
        2.8,
        0.25
    );

    const doorMesh = new THREE.Mesh(
        doorGeometry,
        doorMaterial
    );

    // Move the door away from the hinge.
    doorMesh.position.x = 0.85;

    door.add(doorMesh);

    // Door frame
    const frameLeftGeometry = new THREE.BoxGeometry(
        0.18,
        3.2,
        0.35
    );

    const frameLeft = new THREE.Mesh(
        frameLeftGeometry,
        darkMaterial
    );

    frameLeft.position.x = 1.75;
    frameLeft.position.y = 0.2;
    door.add(frameLeft);

    const frameRight = frameLeft.clone();
    frameRight.position.x = 0;
    door.add(frameRight);

    const frameTopGeometry = new THREE.BoxGeometry(
        1.9,
        0.18,
        0.35
    );

    const frameTop = new THREE.Mesh(
        frameTopGeometry,
        darkMaterial
    );

    frameTop.position.set(
        0.85,
        1.8,
        0
    );

    door.add(frameTop);

    // Door handle
    const handleGeometry = new THREE.SphereGeometry(
        0.1,
        8,
        8
    );

    const handle = new THREE.Mesh(
        handleGeometry,
        darkMaterial
    );

    handle.position.set(
        1.5,
        0,
        0.18
    );

    door.add(handle);

    // Door hinge position
    door.position.set(
        -0.85,
        1.6,
        4.75
    );

    // Information for our future interaction system
    door.userData.isOpen = false;
    door.userData.openAngle = -Math.PI / 2;
    door.userData.closedAngle = 0;

    lighthouse.userData.door = door;

    lighthouse.add(door);

    // =========================
    // DOOR LIGHT
    // =========================

    const doorLight = new THREE.PointLight(
        0xffc66d,
        4,
        8
    );

    doorLight.position.set(
        0,
        2.5,
        4.9
    );

    lighthouse.add(doorLight);

    // =========================
    // FRONT STAIRS
    // =========================

    const stairMaterial = new THREE.MeshStandardMaterial({
        color: 0x505b67,
        roughness: 1
    });

    for (let i = 0; i < 8; i++) {
        const stairGeometry = new THREE.BoxGeometry(
            3.6 + i * 0.35,
            0.35,
            0.8
        );

        const stair = new THREE.Mesh(
            stairGeometry,
            stairMaterial
        );

        stair.position.set(
            0,
            0.2 + i * 0.35,
            5.3 + i * 0.8
        );

        lighthouse.add(stair);
    }

    // =========================
    // POSITION
    // =========================

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
