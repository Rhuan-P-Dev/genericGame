import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { DarkEnergyObject } from "../../uncommon/darkEnergyObject.js"
import { SelfSwarmObject } from "../../uncommon/selfSwarmObject.js"
import { DroneV2 } from "../droneV2.js"
import { Ship } from "../ship.js"

var Effects
var Animations
var Damage
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()
    Damage = new DamageController()
    ObjectActivates = new ObjectActivatesController()

})

export class SelfSwarmDrone{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DroneV2,
                SelfSwarmObject
            ],
            build
        )

        this.graphicID = "self swarm drone"

        this.priority += 1

        this.defense *= 5

        this.vel *= 1.25
        this.maxVel *= 1.25
        this.rotationVel *= 1.5

        this.lifeRegen = -4/60

    }

}