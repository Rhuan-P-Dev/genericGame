import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { MultiplyStatsController } from "../../generalUtils/multiplyStats.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { SpecialInfoController } from "./info/specialInfoController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { EffectsController } from "../../effects/effectsController.js"

var GameState = ""
var ObjectCreator = ""
var MultiplyStats = ""
var CloneObject = ""
var Activate = ""
var Effects = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()
    MultiplyStats = new MultiplyStatsController()
    CloneObject = new CloneObjectController()
    Activate = new ActivateController()
    Effects = new EffectsController()

})

const stats = {
    "stats":[
        "damage",
        "defense",
        "energy",
        "energyRegen",
        "life",
        "lifeRegen",
        "maxEnergy",
        "maxLife",
        "maxVel",
        "vel",
        "lifeTime",
    ],

    "invertedStatus":[
    ],

    "invertedExponentialStatus": [
        "resistance"
    ],

    "mult": undefined,
}

export class SpecialController{

    useSpecial(object, ID){

        Activate.useActivate(object, ID)

    }

    getAll(){
        return new SpecialInfoController()
    }

    getInfo(specialName){

        return new SpecialInfoController(true)[specialName]
    }

    weakClone(object, activate, config){

        let weakClone = CloneObject.clone(object)

        stats.mult = config.mult

        MultiplyStats.multiply(weakClone, stats)

        weakClone.ID = randomUniqueID()

        GameState.addObject(weakClone, true)

    }

    lvUp(object, activate, config){

        stats.mult = config.mult

        MultiplyStats.multiply(object, stats)

    }

    overclock(object, activate, config){

        let overclockMult = config.overclockMult
        let overclockDiv = config.overclockDiv

        let overclockBuff = object.energyRegen * overclockMult
        let overclockDebuff = overclockBuff / overclockDiv

        object.lifeRegen -= overclockDebuff
        object.energyRegen += overclockBuff

        

        setFrameOut( () => {

            object.lifeRegen += overclockDebuff
            object.energyRegen -= overclockBuff

        }, 600)

    }

    illusion(object, activate, config){

        let illusion = CloneObject.clone(object)

        console.log(
"AS ILLUSIONS ESTÃO BUGADAS, O TRIGGER DE MORTE ESTASENDO APAGADO!"
            )

        illusion.life = 1
        illusion.maxLife = 1
        illusion.defense = 0
        illusion.resistance = 1
        illusion.damage = 0

        illusion.lifeTime = undefined

        illusion.activates = {}

        illusion.ID = randomUniqueID()

        illusion.onDeath = new Observer() //<---------------------------
        illusion.onHit = new Observer()
        illusion.onDamage = new Observer()

        illusion.damageConfig.type = "illusion"

        Effects.removeAll(illusion)

        let AI = false

        if(illusion.AI){
            AI = true
        }

        GameState.addObject(illusion, AI)

    }

}

var Special = new SpecialController()