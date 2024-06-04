class Humanoid {
    constructor(world, scene){
        this.world = world;
        this.scene = scene;
        this.parts = {};
        this.createParts();
    }
    // Function to create a box in both Three.js and Cannon.js
    createBox(width, height, depth, position, color) {
        // Three.js
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({
            color: color
        });
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        // Cannon.js
        const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
        const body = new CANNON.Body({
            mass: 1
        });
        body.addShape(shape);
        body.position.set(position.x, position.y, position.z);
        this.world.addBody(body);
        return {
            mesh,
            body
        };
    }
    addHingeConstraint(bodyA, bodyB, pivotA, pivotB, axisA, axisB) {
        const constraint = new CANNON.HingeConstraint(bodyA, bodyB, {
            pivotA: pivotA,
            pivotB: pivotB,
            axisA: axisA,
            axisB: axisB
        });
        this.world.addConstraint(constraint);
        return constraint;
    }
    createParts() {
        // Create humanoid parts
        const offset = 1;
        this.head = this.createBox(1, 1, 1, new THREE.Vector3(0, 6 + offset, 0), 0xff0000);
        this.torso = this.createBox(2, 3, 1, new THREE.Vector3(0, 3 + offset, 0), 0x00ff00);
        this.leftArm = this.createBox(1, 3, 1, new THREE.Vector3(-1.5, 3 + offset, 0), 0x0000ff);
        this.rightArm = this.createBox(1, 3, 1, new THREE.Vector3(1.5, 3 + offset, 0), 0x0000ff);
        this.leftLeg = this.createBox(1, 3, 1, new THREE.Vector3(-0.5, 0 + offset, 0), 0xffff00);
        this.rightLeg = this.createBox(1, 3, 1, new THREE.Vector3(0.5, 0 + offset, 0), 0xffff00);
        // Connect parts with hinge constraints
        this.headToTorso = this.addHingeConstraint(head.body, torso.body, new CANNON.Vec3(0, -0.5, 0), new CANNON.Vec3(0, 1.5, 0), new CANNON.Vec3(1, 0, 0), new CANNON.Vec3(1, 0, 0));
        this.leftArmToTorso = this.addHingeConstraint(leftArm.body, torso.body, new CANNON.Vec3(0.5, 1.5, 0), new CANNON.Vec3(-1, 1.5, 0), new CANNON.Vec3(0, 1, 0), new CANNON.Vec3(0, 1, 0));
        this.rightArmToTorso = this.addHingeConstraint(rightArm.body, torso.body, new CANNON.Vec3(-0.5, 1.5, 0), new CANNON.Vec3(1, 1.5, 0), new CANNON.Vec3(0, 1, 0), new CANNON.Vec3(0, 1, 0));
        this.leftLegToTorso = this.addHingeConstraint(leftLeg.body, torso.body, new CANNON.Vec3(0.5, 1.5, 0), new CANNON.Vec3(-0.5, -1.5, 0), new CANNON.Vec3(1, 0, 0), new CANNON.Vec3(1, 0, 0));
        this.rightLegToTorso = this.addHingeConstraint(rightLeg.body, torso.body, new CANNON.Vec3(-0.5, 1.5, 0), new CANNON.Vec3(0.5, -1.5, 0), new CANNON.Vec3(1, 0, 0), new CANNON.Vec3(1, 0, 0));
    }
    update() {
        // Update positions and rotations
        this.head.mesh.position.copy(this.head.body.position);
        this.head.mesh.quaternion.copy(this.head.body.quaternion);
        this.torso.mesh.position.copy(this.torso.body.position);
        this.torso.mesh.quaternion.copy(this.torso.body.quaternion);
        this.leftArm.mesh.position.copy(this.leftArm.body.position);
        this.leftArm.mesh.quaternion.copy(this.leftArm.body.quaternion);
        this.rightArm.mesh.position.copy(this.rightArm.body.position);
        this.rightArm.mesh.quaternion.copy(this.rightArm.body.quaternion);
        this.leftLeg.mesh.position.copy(this.leftLeg.body.position);
        this.leftLeg.mesh.quaternion.copy(this.leftLeg.body.quaternion);
        this.rightLeg.mesh.position.copy(this.rightLeg.body.position);
        this.rightLeg.mesh.quaternion.copy(this.rightLeg.body.quaternion);
    }
}

//# sourceMappingURL=index.94935b54.js.map
