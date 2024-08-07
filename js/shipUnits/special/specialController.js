import { GameStateController } from "../../gameState/gameStateController.js"
import { MultiplyStatsController } from "../../generalUtils/multiplyStats.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { EffectsController } from "../../effects/effectsController.js"
import { ComplexOnType, ComplexOnTypeFunctions } from "../../object/instructions/onInstructions.js"
import { DamageController } from "../../damage/damageController.js"
import { ConsumeStatsController } from "../../misc/consumeStatsController.js"
import { Object } from "../../object/basic/object.js"
import { StatsObserverController } from "../../object/instructions/statsObserverController.js"

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

            Activate.basicAjustObject(object, result.activate, result.return)

            Activate.addObject(result.return)

        }

    }

    clone(object, activate, config){

        console.log(
            "O MODO QUE OS CLONES SÃO FEITOS E MEU 'ME' PODE DAR CONFLITOS COM O 'CLONE V1' ETC!"
        )

        if(config.split){

            MultiplyStats.multiply(object, config.statsMult)

        }

        let clone = CloneObject.clone(object)

        if(!config.split){

            MultiplyStats.multiply(clone, config.statsMult)

        }
        

        return clone

    }

    lvUp(object, activate, config){

        MultiplyStats.multiply(object, config.statsMult)

    }

    illusion(object, activate, config){

        let illusion = CloneObject.clone(object)

        illusion.lifeTime = undefined

        illusion.activates = {}

        illusion.onDeath = new ComplexOnType()
        illusion.onHit = new ComplexOnType()
        illusion.onDamage = new ComplexOnType()

        illusion.life.set(1)
        illusion.maxLife = 1

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

        Effects.removeAll(illusion)

        return illusion

    }

    teleport(object, activate, config){

        object.x += object.cosine * config.distance
        object.y += object.sine * config.distance

    }

    distractionDummy(object, activate, config){

        let newObject = new Object(true)

        newObject.width = config.scale
        newObject.height = config.scale

        newObject.priority = config.priority
        
        newObject.maxLife = config.life
        newObject.life.set(config.life)

        newObject.defense = config.defense

        return newObject

    }

    quantumBomb(object, activate, config){

        setFrameOut(() => {

            let bomb = new DamageController().explosionDamageShell(object)

            bomb.damageConfig.range = config.range
            bomb.damage = config.damage

            new DamageController().radiusCalc(
                bomb
            )

            object.onDeath.run(
                {
                    "object": object
                }
            )

        },config.frameOut)

    }

    invulnerabilitySystem(object, activate, config){

        // isso vai dar um trabalho...
        // para isso funcioanr precissa retirar do PhysicsController()

        let nullEffect = {
            "prefixFunc": [],
            "func": () => {},
            "suffixFunc": ["stopStages"],
            "stopStages": {
                "stages": ["first", "middle", "last"],
            },
            "stage": "first",
            "priority": -10,
        }

        nullEffect.config = nullEffect

        new ComplexOnTypeFunctions().apply(nullEffect)

        config.onHit.priority = object.onHit.add(
            nullEffect,
            nullEffect.stage,
            nullEffect.priority
        )

        config.onDamage.priority = object.onDamage.add(
            nullEffect,
            nullEffect.stage,
            nullEffect.priority
        )

        setFrameOut(() => {

            object.onHit.remove(
                config.onHit.stage,
                config.onHit.priority
            )

            object.onDamage.remove(
                config.onDamage.stage,
                config.onDamage.priority
            )

        
        },1,1)

    }

}

var Special = new SpecialController()