import { GameStateController } from "../../gameState/gameStateController.js"
import { ObjectActivatesController } from "../../objectController/objectActivatesController.js"
import { FactoryInfoController } from "./info/factoryInfoController.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { AIController } from "../../AI/AIController.js"

var GameState = ""
var ObjectActivates = ""
var Activate = ""
var AIC = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectActivates = new ObjectActivatesController()
    Activate = new ActivateController()
    AIC = new AIController()

})

export class FactoryController{

    useFactory(object, ID){

        let result = Activate.useActivate(object, ID)

        if(result.return){

            Activate.addObject(result.return)
        }

    }

    createObject(object, activate, config){

        let newObject = new config.objectClass(true)

        Activate.basicAjustObject(object, activate, newObject)

        AIC.giveAI(newObject, config.AI)

        ObjectActivates.setActivates(newObject, config.apply)

        Factory.setBehavior(object, config)

        return newObject

    }

    setBehavior(object, config){

        object.searchPriority = config.behavior

    }

}

var Factory = new FactoryController()