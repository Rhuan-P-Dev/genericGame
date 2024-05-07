import { GameStateController } from "../../gameState/gameStateController.js"
import { ObjectActivatesController } from "../../objectController/objectActivatesController.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { AIController } from "../../AI/AIController.js"
import { MultiplyStatsController } from "../../generalUtils/multiplyStats.js"
import { EffectsController } from "../../effects/effectsController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"

var GameState = ""
var ObjectActivates = ""
var Activate = ""
var AIC = ""
var MultiplyStats = ""
var Effects = ""
var CloneObject = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectActivates = new ObjectActivatesController()
    Activate = new ActivateController()
    AIC = new AIController()
    MultiplyStats = new MultiplyStatsController()
    Effects = new EffectsController()
    CloneObject = new CloneObjectController()

})

export class FactoryController{

    useFactory(object, ID){

        let result = Activate.useActivate(object, ID)

        if(result.return){

            Activate.basicAjustObject(object, result.activate, result.return)

            ObjectActivates.setActivates(result.return, result.activate.config.activates)

            Factory.addCustomFunctions(
                object,
                result.activate,
                result.activate.config,
                result.return
            )

            Activate.addObject(result.return)

            result.activate.factoryUseActivateObserver.run({
                "object":result.return,
                "activate":result.activate
            })

        }

    }

    createObject(object, activate, config){

        let newObject = new config.objectClass(true)

        if(activate.effects){

            Effects.applyEffects(
                newObject,
                activate.effects
            )

        }

        if(config.AI){
            AIC.giveAI(newObject, config.AI)
        }

        if(config.behavior){
            Factory.setBehavior(newObject, config)
        }

        if(config.statsMult){

            MultiplyStats.multiply(
                newObject,
                config.statsMult,
            )

        }

        if(config.lifeTime){

            newObject.lifeTime = config.lifeTime

        }

        return newObject

    }

    setBehavior(object, config){

        object.searchPriority = config.behavior

    }

    addCustomFunctions(
        object,
        activate,
        config,
        newObject
    ){

        for(let index in config.customFunctions){

            config.customFunctions[index](
                object,
                activate,
                config,
                newObject
            )

        }

    }

    yourselfFactory(object, activate, config){

        // imcompleto os usuários disso devem implementar os seus próprios 'selfs'
        // your self - facotry!

        if(!config.selffff){
            config.selffff = CloneObject.clone(object) // 'self'
        }

        let clone = CloneObject.clone(config.selffff)

        MultiplyStats.multiply(clone, config.statsMult)

        clone.width = object.width / 2
        clone.height = object.height / 2

        return clone

    }

}

var Factory = new FactoryController()