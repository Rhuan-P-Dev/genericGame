import { GameStateController } from "../../gameState/gameStateController.js"
import { ObjectActivatesController } from "../../objectController/objectActivatesController.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { AIController } from "../../AI/AIController.js"
import { MultiplyStatsController } from "../../generalUtils/multiplyStats.js"

var GameState = ""
var ObjectActivates = ""
var Activate = ""
var AIC = ""
var MultiplyStats = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectActivates = new ObjectActivatesController()
    Activate = new ActivateController()
    AIC = new AIController()
    MultiplyStats = new MultiplyStatsController()

})

export class FactoryController{

    useFactory(object, ID){

        let result = Activate.useActivate(object, ID)

        if(result.return){

            Activate.basicAjustObject(object, result.activate, result.return)

            Activate.addObject(result.return)

            result.activate.useActivateObserver.run({
                "object":result.return,
                "activate":result.activate
            })

        }

    }

    createObject(object, activate, config){

        let newObject = new config.objectClass(true)
            AIC.giveAI(newObject, config.AI)

        ObjectActivates.setActivates(newObject, config.activates)

            Factory.setBehavior(newObject, config)

        MultiplyStats.multiply(
            newObject,
            config.statsMult,
        )

        Factory.addCustomFunctions(
            object,
            activate,
            config,
            newObject
        )

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

}

var Factory = new FactoryController()