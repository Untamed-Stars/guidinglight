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
// COLLISIONS
// ========================================

const collisionBoxes = [];

function addCollisionBox(
    x,
    y,
    z,
    width,
    height,
    depth
) {
    collisionBoxes.push(
        new THREE.Box3(
            new THREE.Vector3(
                x - width / 2,
                y - height / 2,
                z - depth / 2
            ),
            new THREE.Vector3(
                x + width / 2,
                y + height / 2,
                z + depth / 2
            )
        )
    );
}


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

    // ========================================
    // MATERIALS
    // ========================================

    const towerMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x6f7d8d,
            roughness: 0.85
        });

    const stoneMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4d5661,
            roughness: 1
        });

    const darkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x252b30,
            roughness: 0.8
        });

    const windowMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffe58a,
            emissive: 0xffc44d,
            emissiveIntensity: 1.5
        });

    const doorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x49372c,
            roughness: 0.9
        });

    const roofMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4c6b63,
            roughness: 0.85
        });


    // ========================================
    // DIMENSIONS
    // ========================================

    const towerHeight = 32;

    const bottomRadius = 7;
    const topRadius = 5.2;

    const wallThickness = 0.8;

    const doorWidth = 2.4;
    const doorHeight = 3.6;

    const towerBottom = 1.5;
    const towerTop =
        towerBottom + towerHeight;


    // ========================================
    // BASE
    // ========================================

    const baseGeometry =
        new THREE.CylinderGeometry(
            7.8,
            8.2,
            1.5,
            24
        );

    const base =
        new THREE.Mesh(
            baseGeometry,
            stoneMaterial
        );

    base.position.y = 0.75;

    lighthouse.add(base);


    // Collision around the base
    addCollisionBox(
        -10,
        0.75,
        -12,
        15.5,
        1.5,
        15.5
    );


    // ========================================
    // TOWER WALLS
    // ========================================
    //
    // Instead of one solid cylinder,
    // create four wall sections.
    //
    // The front wall has a doorway gap.
    //
    // ========================================

    const wallHeight = towerHeight;


    // ----------------------------------------
    // Back wall
    // ----------------------------------------

    const backWallGeometry =
        new THREE.CylinderGeometry(
            topRadius,
            bottomRadius,
            wallHeight,
            24,
            1,
            false,
            Math.PI * 0.25,
            Math.PI * 0.5
        );

    const backWall =
        new THREE.Mesh(
            backWallGeometry,
            towerMaterial
        );

    backWall.position.y =
        towerBottom + wallHeight / 2;

    lighthouse.add(backWall);


    // ----------------------------------------
    // Left wall
    // ----------------------------------------

    const leftWallGeometry =
        new THREE.CylinderGeometry(
            topRadius,
            bottomRadius,
            wallHeight,
            24,
            1,
            false,
            Math.PI * 0.75,
            Math.PI * 0.5
        );

    const leftWall =
        new THREE.Mesh(
            leftWallGeometry,
            towerMaterial
        );

    leftWall.position.y =
        towerBottom + wallHeight / 2;

    lighthouse.add(leftWall);


    // ----------------------------------------
    // Right wall
    // ----------------------------------------

    const rightWallGeometry =
        new THREE.CylinderGeometry(
            topRadius,
            bottomRadius,
            wallHeight,
            24,
            1,
            false,
            Math.PI * 1.75,
            Math.PI * 0.5
        );

    const rightWall =
        new THREE.Mesh(
            rightWallGeometry,
            towerMaterial
        );

    rightWall.position.y =
        towerBottom + wallHeight / 2;

    lighthouse.add(rightWall);


    // ========================================
    // FRONT WALL
    // ========================================
    //
    // Two sections leave a real doorway.
    //
    // ========================================

    const frontWallGeometry =
        new THREE.CylinderGeometry(
            topRadius,
            bottomRadius,
            wallHeight,
            24,
            1,
            false,
            Math.PI * 1.25,
            Math.PI * 0.5
        );

    const frontWall =
        new THREE.Mesh(
            frontWallGeometry,
            towerMaterial
        );

    frontWall.position.y =
        towerBottom + wallHeight / 2;

    lighthouse.add(frontWall);


    // ========================================
    // DOORWAY
    // ========================================

    const doorBottom = 1.5;

    const doorTop =
        doorBottom + doorHeight;


    // Door frame
    const frameMaterial = darkMaterial;


    // Left frame
    const leftFrameGeometry =
        new THREE.BoxGeometry(
            0.3,
            doorHeight,
            0.5
        );

    const leftFrame =
        new THREE.Mesh(
            leftFrameGeometry,
            frameMaterial
        );

    leftFrame.position.set(
        -doorWidth / 2,
        doorBottom + doorHeight / 2,
        bottomRadius + 0.15
    );

    lighthouse.add(leftFrame);


    // Right frame
    const rightFrame =
        leftFrame.clone();

    rightFrame.position.x =
        doorWidth / 2;

    lighthouse.add(rightFrame);


    // Top frame
    const topFrameGeometry =
        new THREE.BoxGeometry(
            doorWidth + 0.6,
            0.3,
            0.5
        );

    const topFrame =
        new THREE.Mesh(
            topFrameGeometry,
            frameMaterial
        );

    topFrame.position.set(
        0,
        doorTop,
        bottomRadius + 0.15
    );

    lighthouse.add(topFrame);


    // ========================================
    // DOOR
    // ========================================

    const door = new THREE.Group();

    const doorGeometry =
        new THREE.BoxGeometry(
            doorWidth,
            doorHeight - 0.2,
            0.22
        );

    const doorMesh =
        new THREE.Mesh(
            doorGeometry,
            doorMaterial
        );

    doorMesh.position.x =
        doorWidth / 2;

    doorMesh.position.y =
        -(doorHeight - 0.2) / 2;

    door.add(doorMesh);


    // Door handle
    const handleGeometry =
        new THREE.SphereGeometry(
            0.12,
            10,
            10
        );

    const handle =
        new THREE.Mesh(
            handleGeometry,
            darkMaterial
        );

    handle.position.set(
        doorWidth - 0.35,
        -doorHeight / 2,
        0.2
    );

    door.add(handle);


    // Hinge position
    door.position.set(
        -doorWidth / 2,
        doorBottom + doorHeight,
        bottomRadius + 0.35
    );


    // Future interaction
    door.userData.isOpen = false;

    door.userData.openAngle =
        -Math.PI / 2;

    door.userData.closedAngle = 0;

    lighthouse.userData.door = door;

    lighthouse.add(door);


    // ========================================
    // DOOR LIGHT
    // ========================================

    const doorLight =
        new THREE.PointLight(
            0xffc66d,
            5,
            10
        );

    doorLight.position.set(
        0,
        3,
        bottomRadius + 1
    );

    lighthouse.add(doorLight);


    // ========================================
    // WINDOWS
    // ========================================

    function addWindow(
        y,
        angle
    ) {

        const radius =
            bottomRadius + 0.05;

        const geometry =
            new THREE.BoxGeometry(
                1.1,
                1.8,
                0.2
            );

        const window =
            new THREE.Mesh(
                geometry,
                windowMaterial
            );

        window.position.set(
            Math.sin(angle) * radius,
            y,
            Math.cos(angle) * radius
        );

        window.rotation.y =
            angle;

        lighthouse.add(window);
    }


    addWindow(6, 0);
    addWindow(12, Math.PI * 0.5);
    addWindow(18, Math.PI);
    addWindow(24, Math.PI * 1.5);


    // ========================================
    // BALCONY
    // ========================================

    const platformGeometry =
        new THREE.CylinderGeometry(
            5.8,
            5.8,
            0.6,
            24
        );

    const platform =
        new THREE.Mesh(
            platformGeometry,
            darkMaterial
        );

    platform.position.y =
        towerTop + 0.3;

    lighthouse.add(platform);


    // ========================================
    // BALCONY RAILING
    // ========================================

    const railingRadius = 5.6;

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const angle =
            (i / 20) *
            Math.PI * 2;

        const postGeometry =
            new THREE.BoxGeometry(
                0.14,
                1.4,
                0.14
            );

        const post =
            new THREE.Mesh(
                postGeometry,
                darkMaterial
            );

        post.position.set(
            Math.sin(angle) *
                railingRadius,

            towerTop + 1,

            Math.cos(angle) *
                railingRadius
        );

        lighthouse.add(post);
    }


    // ========================================
    // LANTERN ROOM
    // ========================================

    const lanternHeight = 3.5;

    const lanternGeometry =
        new THREE.CylinderGeometry(
            3.8,
            3.8,
            lanternHeight,
            16
        );

    const lanternMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffe9a8,
            emissive: 0xffc94f,
            emissiveIntensity: 1.8,
            transparent: true,
            opacity: 0.55
        });

    const lantern =
        new THREE.Mesh(
            lanternGeometry,
            lanternMaterial
        );

    lantern.position.y =
        towerTop + 2.4;

    lighthouse.add(lantern);


    // Lantern frames
    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const angle =
            (i / 12) *
            Math.PI * 2;

        const frameGeometry =
            new THREE.BoxGeometry(
                0.15,
                lanternHeight + 0.2,
                0.15
            );

        const frame =
            new THREE.Mesh(
                frameGeometry,
                darkMaterial
            );

        frame.position.set(
            Math.sin(angle) * 3.65,
            towerTop + 2.4,
            Math.cos(angle) * 3.65
        );

        lighthouse.add(frame);
    }


    // ========================================
    // LANTERN ROOF
    // ========================================

    const roofGeometry =
        new THREE.ConeGeometry(
            4.3,
            2.2,
            16
        );

    const roof =
        new THREE.Mesh(
            roofGeometry,
            roofMaterial
        );

    roof.position.y =
        towerTop + 5.2;

    lighthouse.add(roof);


    // ========================================
    // SPIRE
    // ========================================

    const spireGeometry =
        new THREE.CylinderGeometry(
            0.1,
            0.1,
            2,
            8
        );

    const spire =
        new THREE.Mesh(
            spireGeometry,
            darkMaterial
        );

    spire.position.y =
        towerTop + 7.2;

    lighthouse.add(spire);


    // ========================================
    // LIGHT
    // ========================================

    const lighthouseLight =
        new THREE.PointLight(
            0xffd477,
            50,
            55
        );

    lighthouseLight.position.y =
        towerTop + 2.5;

    lighthouse.add(
        lighthouseLight
    );


    // ========================================
    // EXTERIOR STAIRS
    // ========================================

    const stairMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x505b67,
            roughness: 1
        });


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const stairGeometry =
            new THREE.BoxGeometry(
                3.5 + i * 0.4,
                0.35,
                0.8
            );

        const stair =
            new THREE.Mesh(
                stairGeometry,
                stairMaterial
            );

        stair.position.set(
            0,
            1.5 - i * 0.35,
            bottomRadius +
                0.7 +
                i * 0.8
        );

        lighthouse.add(stair);
    }


    // ========================================
    // LIGHTHOUSE POSITION
    // ========================================

    lighthouse.position.set(
        -10,
        0,
        -12
    );

    scene.add(
        lighthouse
    );


    // ========================================
    // LIGHTHOUSE COLLISIONS
    // ========================================

    // These are deliberately simple for now.
    // The doorway itself is left open.

    const worldX = -10;
    const worldZ = -12;


    // Back wall
    addCollisionBox(
        worldX,
        towerTop / 2,
        worldZ - 5.5,
        12,
        towerHeight,
        1
    );


    // Left wall
    addCollisionBox(
        worldX - 5.5,
        towerTop / 2,
        worldZ,
        1,
        towerHeight,
        12
    );


    // Right wall
    addCollisionBox(
        worldX + 5.5,
        towerTop / 2,
        worldZ,
        1,
        towerHeight,
        12
    );


    // Front wall sections.
    // Leave a gap for the doorway.

    addCollisionBox(
        worldX - 4.5,
        towerTop / 2,
        worldZ + 5.5,
        3,
        towerHeight,
        1
    );

    addCollisionBox(
        worldX + 4.5,
        towerTop / 2,
        worldZ + 5.5,
        3,
        towerHeight,
        1
    );


    // Door collision is intentionally NOT
    // added yet because the door starts open
    // to the interior.

    return lighthouse;
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

function checkPlayerCollision() {

    const playerRadius = 0.45;

    const playerBox =
        new THREE.Box3(
            new THREE.Vector3(
                camera.position.x -
                    playerRadius,

                camera.position.y -
                    player.height,

                camera.position.z -
                    playerRadius
            ),

            new THREE.Vector3(
                camera.position.x +
                    playerRadius,

                camera.position.y,

                camera.position.z +
                    playerRadius
            )
        );


    for (
        const collisionBox
        of collisionBoxes
    ) {

        if (
            playerBox.intersectsBox(
                collisionBox
            )
        ) {
            return true;
        }
    }

    return false;
}

function updatePlayer(delta) {

    const direction =
        new THREE.Vector3();
}

const clock = new THREE.Clock();


    // ========================================
    // INPUT
    // ========================================

    if (keys["KeyW"]) {
        direction.z -= 1;
    }

    if (keys["KeyS"]) {
        direction.z += 1;
    }

    if (keys["KeyA"]) {
        direction.x -= 1;
    }

    if (keys["KeyD"]) {
        direction.x += 1;
    }


    if (direction.lengthSq() > 0) {

        direction.normalize();

        direction.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            yaw
        );


        // ====================================
        // COLLISION-AWARE MOVEMENT
        // ====================================

        const moveX =
            direction.x *
            player.speed *
            delta;

        const moveZ =
            direction.z *
            player.speed *
            delta;


        // Try X movement
        camera.position.x += moveX;

        if (
            checkPlayerCollision()
        ) {
            camera.position.x -= moveX;
        }


        // Try Z movement
        camera.position.z += moveZ;

        if (
            checkPlayerCollision()
        ) {
            camera.position.z -= moveZ;
        }
    }


    // ========================================
    // GRAVITY
    // ========================================

    player.velocityY -=
        25 * delta;

    camera.position.y +=
        player.velocityY * delta;


    // Ground
    if (
        camera.position.y <=
        player.height
    ) {

        camera.position.y =
            player.height;

        player.velocityY = 0;

        player.onGround = true;
    }


    // ========================================
    // CAMERA
    // ========================================

    camera.rotation.order =
        "YXZ";

    camera.rotation.y =
        yaw;

    camera.rotation.x =
        pitch;
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
