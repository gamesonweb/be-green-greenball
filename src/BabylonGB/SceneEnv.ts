import {
    AbstractMesh,
    CannonJSPlugin,
    CubeTexture,
    Engine,
    MeshBuilder,
    PhysicsImpostor,
    Scene,
    SceneLoader
} from "@babylonjs/core"
import {FreeCamera} from "@babylonjs/core/Cameras";
import {HemisphericLight} from "@babylonjs/core/Lights";
import {Vector3} from "@babylonjs/core/Maths";
import "@babylonjs/loaders";
import * as CANNON from "cannon";

export class SceneEnv {

    scene: Scene;
    engine: Engine;
    sphere!: AbstractMesh;
    ground!: AbstractMesh;
    character!: AbstractMesh;
    targetBox!: AbstractMesh;
    targetBox2!: AbstractMesh;
    targetBox3!: AbstractMesh;

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(this.canvas, true);
        this.engine.displayLoadingUI();
        this.scene = this.createScene();
        this.createEnv();
        this.createCharacter();
        this.createController();
        this.createImpostors();
        this.createMovingTarget();
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
    }

    /**
     * Crée une nouvelle scène Babylon.js.
     * @returns La scène créée.
     */
    createScene(): Scene {
        const scene = new Scene(this.engine);

        const hemiLight = new HemisphericLight("light", new Vector3(1, 2, 1), this.scene);
        hemiLight.intensity = 0;

        const envTex = CubeTexture.CreateFromPrefilteredData("./env/sky.env", scene);
        scene.environmentTexture = envTex;
        scene.createDefaultSkybox(envTex, true)

        scene.onPointerDown = (e) => {
            if (e.button === 0) this.engine.enterPointerlock();
            if (e.button === 1) this.engine.exitPointerlock();
        }

        const fPS = 60;
        const gravity = -9.81;
        scene.gravity = new Vector3(0, gravity / fPS, 0);
        scene.collisionsEnabled = true;

        scene.enablePhysics(new Vector3(0, gravity, 0), new CannonJSPlugin(true, 10, CANNON));
        return scene;

    }

    /**
     * Charge un environnement 3D à partir d'un fichier glb.
     * @returns Une promesse résolue une fois que le chargement est terminé.
     */
    async createEnv(): Promise<void> {
        const {meshes} = await SceneLoader.ImportMeshAsync("", "./models/", "level.glb", this.scene);
        meshes.map(mesh => {
            mesh.checkCollisions = true;

            const hemiLight = new HemisphericLight("hemilight", new Vector3(0, 10, 0), this.scene);
            hemiLight.intensity = 0.25;
        })

        this.engine.hideLoadingUI();
    }

    /**
     * Crée un contrôleur de caméra pour l'utilisateur.
     */
    createController(): void {
        const camera = new FreeCamera("camera", new Vector3(0, 2, 0), this.scene);
        camera.attachControl();
        camera.speed = 0.50;

        camera.applyGravity = true;
        camera.checkCollisions = true;

        camera.ellipsoid = new Vector3(1, 1, 1);

        camera.minZ = 0.45;
        camera.angularSensibility = 4000;

        camera.keysUp.push(90);
        camera.keysLeft.push(81);
        camera.keysDown.push(83);
        camera.keysRight.push(68);

    }

    /**
     * Crée les imposteurs physiques pour la balle et le sol.
     */
    createImpostors(): void {
        this.sphere = MeshBuilder.CreateSphere("ball", {diameter: 2});
        this.sphere.position = new Vector3(8, 10, 0);
        this.sphere.physicsImpostor = new PhysicsImpostor(this.sphere, PhysicsImpostor.SphereImpostor, {
            mass: 1,
            friction: 1,
            restitution: 0.5
        })

        this.ground = MeshBuilder.CreateGround("ground", {width: 50, height: 50});
        this.ground.physicsImpostor = new PhysicsImpostor(this.ground, PhysicsImpostor.BoxImpostor, {
            mass: 0,
            restitution: 0.51
        });
        this.ground.isVisible = false;
    }

    /**
     * Charge un personnage 3D à partir d'un fichier glb.
     * @returns Une promesse résolue une fois que le chargement est terminé.
     */
    async createCharacter(): Promise<void> {
        const {meshes} = await SceneLoader.ImportMeshAsync("", "./models/character/", "Idle.glb", this.scene);
        this.character = meshes[0];
        this.character.position = new Vector3(0, 0, 0);
        this.character.scaling = new Vector3(2, 2, 2);
    }

    /**
     * Crée une boîte cible avec une taille et une position spécifiées.
     * @param size - La taille de la boîte.
     * @param position - La position de la boîte.
     * @returns La boîte cible créée.
     */
    createTargetBox(size: number, position: Vector3): AbstractMesh {
        const targetBox = MeshBuilder.CreateBox('target', {size: size}, this.scene);
        targetBox.position = position;
        targetBox.position = position;


        targetBox.physicsImpostor = new PhysicsImpostor(targetBox, PhysicsImpostor.BoxImpostor, {
            mass: 0,
            restitution: 0.6
        });
        return targetBox;
    }

    createMovingTarget(): void {
        this.targetBox = this.createTargetBox(8, new Vector3(30, 70, 200));
        this.targetBox2 = this.createTargetBox(9, new Vector3(30, 90, 190));
        this.targetBox3 = this.createTargetBox(10, new Vector3(25, 50, 180));

        const leftLimit1 = -65;
        const rightLimit1 = 70;

        const leftLimit2 = -90;
        const rightLimit2 = 60;

        const leftLimit3 = -105;
        const rightLimit3 = 100;


        let direction1 = 1;
        let direction2 = 1;
        let direction3 = 1;

        const speed1 = 1;
        const speed2 = 1.2
        const speed3 = 1.5;

        this.scene.registerBeforeRender(() => {
            this.targetBox.position.x += direction1 * speed1;
            this.targetBox2.position.x += direction2 * speed2;
            this.targetBox3.position.x += direction3 * speed3;

            if (this.targetBox.position.x > rightLimit1) {
                direction1 = -1;
            } else if (this.targetBox.position.x < leftLimit1) {
                direction1 = 1;
            }

            if (this.targetBox2.position.x > rightLimit2) {
                direction2 = -1;
            } else if (this.targetBox2.position.x < leftLimit2) {
                direction2 = 1;
            }

            if (this.targetBox3.position.x > rightLimit3) {
                direction3 = -1;
            } else if (this.targetBox3.position.x < leftLimit3) {
                direction3 = 1;
            }
        });
    }

}
