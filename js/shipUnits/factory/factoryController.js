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

        let newObject = new config.objectClass()

        Activate.basicAjustObject(object, newObject)

        AIC.giveAI(newObject, config.AI)

        Factory.setActivates(newObject, config.apply)

        Factory.setBehavior(object, config)

        return newObject

    }

    setBehavior(object, config){

        object.searchPriority = config.behavior

    }

    setActivates(object, activates){

        for (let key in activates) {

            for (let index = 0; index < activates[key].length; index++) {

                let activateName = activates[key][index]

                ObjectActivates.giveActivate(object, key, activateName)

            }

        }

    }

}

var Factory = new FactoryController()