import { Scene, Engine, StandardMaterial, Texture, CubeTexture, PBRMaterial, AnimationGroup, SceneLoader, CannonJSPlugin, MeshBuilder, PhysicsImpostor, AbstractMesh } from "@babylonjs/core"
import { FreeCamera, UniversalCamera } from "@babylonjs/core/Cameras";
import { HemisphericLight } from "@babylonjs/core/Lights";
import { Vector3 } from "@babylonjs/core/Maths";
import "@babylonjs/loaders";
import * as CANNON from "cannon";

export class SceneEnv {

    scene: Scene;
    engine: Engine;
    sphere!: AbstractMesh;
    ground!: AbstractMesh;


    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(this.canvas, true);
        this.engine.displayLoadingUI();
        this.scene = this.createScene();
        this.createEnv();
        this.createController();
        this.createImpostors();
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);

        const hemiLight = new HemisphericLight("light", new Vector3(1, 2, 1), this.scene);
        hemiLight.intensity = 0;

        const envTex = CubeTexture.CreateFromPrefilteredData("./env/sky.env", scene);
        scene.environmentTexture = envTex;
        scene.createDefaultSkybox(envTex, true)

        scene.onPointerDown = (e) => {
            if(e.button === 0) this.engine.enterPointerlock();
            if(e.button === 1) this.engine.exitPointerlock();
        }

        const fPS = 60;
        const gravity= -9.81;
        scene.gravity =  new Vector3(0,gravity/fPS,0);
        scene.collisionsEnabled = true;

        scene.enablePhysics(new Vector3(0,gravity,0), new CannonJSPlugin(true,10,CANNON));
        return scene;

    }

    async createEnv():Promise<void> {
        const {meshes} = await SceneLoader.ImportMeshAsync("","./models/","Prototype_Level.glb",this.scene);
        meshes.map(mesh=> {
            mesh.checkCollisions = true;

        const hemiLight = new HemisphericLight("hemilight", new Vector3(0,10,0), this.scene);
        hemiLight.intensity = 0.25;
    })

        this.engine.hideLoadingUI();
    }

    createController():void {
        const camera = new FreeCamera("camera", new Vector3(0, 10, 0),  this.scene);
        camera.attachControl();
        camera.speed = 0.25;

        camera.applyGravity = true;
        camera.checkCollisions = true;

        camera.ellipsoid =new Vector3(1,1,1);

        camera.minZ = 0.45;
        camera.angularSensibility = 4000;

        camera.keysUp.push(90);
        camera.keysLeft.push(81);
        camera.keysDown.push(83);
        camera.keysRight.push(68);
    }

    createImpostors(): void {
        this.sphere = MeshBuilder.CreateSphere("ball", {diameter: 2});
        this.sphere.position = new Vector3(8,10,0);
        this.sphere.physicsImpostor = new PhysicsImpostor(this.sphere, PhysicsImpostor.SphereImpostor, {mass : 1 , friction: 1, restitution: 0.5})
   
        this.ground = MeshBuilder.CreateGround("ground", {width:50, height:50});
        this.ground.physicsImpostor = new PhysicsImpostor(this.ground, PhysicsImpostor.BoxImpostor,  {mass:0, restitution: 0.51});
        this.ground.isVisible = false;
    }
}