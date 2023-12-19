import { GameStateController } from "../../gameState/gameStateController.js"
import { MultiplyStatsController } from "../../generalUtils/multiplyStats.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { SpecialInfoController } from "./info/specialInfoController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { EffectsController } from "../../effects/effectsController.js"
import { ComplexOnType, ComplexOnTypeFunctions } from "../../object/instructions/onInstructions.js"
import { DamageController } from "../../damage/damageController.js"
import { ConsumeStatsController } from "../../misc/consumeStatsController.js"

var GameState = ""
var MultiplyStats = ""
var CloneObject = ""
var Activate = ""
var Effects = ""
var Damage = ""
var ConsumeStats = ""

onInit(function(){

    GameState = new GameStateController()
    MultiplyStats = new MultiplyStatsController()
    CloneObject = new CloneObjectController()
    Activate = new ActivateController()
    Effects = new EffectsController()
    Damage = new DamageController()
    ConsumeStats = new ConsumeStatsController()

})

export class SpecialController{

    useSpecial(object, ID){

        let result = Activate.useActivate(object, ID)

        if(result.return){

            Activate.addObject(result.return)

        }

    }

    weakClone(object, activate, config){

        console.log(
            "O MODO QUE OS CLONES SÃO FEITOS E MEU 'ME' PODE DAR CONFLITOS COM O 'CLONE V1' ETC!"
        )

        let weakClone = CloneObject.clone(object)

        MultiplyStats.multiply(weakClone, config.statsMult)

        weakClone.ID = randomUniqueID()

        return weakClone

    }

    lvUp(object, activate, config){

        MultiplyStats.multiply(object, config.statsMult)

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

        illusion.life = 1
        illusion.maxLife = 1
        illusion.defense = 0
        illusion.resistance = 1
        illusion.damage = 0

        illusion.lifeTime = undefined

        illusion.activates = {}

        illusion.ID = randomUniqueID()

        illusion.onDeath = new ComplexOnType()
        illusion.onHit = new ComplexOnType()
        illusion.onDamage = new ComplexOnType()

        illusion.onDeath.add({
            "func": "removeObType",
            "class": GameState,
        },"first",0)

        illusion.onHit.add({
            "func": "removeObType",
            "class": GameState,
        },"first",0)

        illusion.onDamage.add({
            "func": "removeObType",
            "class": GameState,
        },"first",0)

        ConsumeStats.add(
            illusion,
            "life",
            [
                "last",
                10
            ],
            (object, damage) => {
                return (damage * object.resistance) - object.defense
            }
        )

        Effects.removeAll(illusion)

        let AI = false

        if(illusion.AI){
            AI = true
        }

        GameState.addObject(illusion, AI)

    }

}

var Special = new SpecialController()