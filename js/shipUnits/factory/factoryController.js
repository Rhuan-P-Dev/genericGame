import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { ObjectActivatesController } from "../../objectController/objectActivatesController.js"
import { FactoryInfoController } from "./info/factoryInfoController.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { EffectsController } from "../../effects/effectsController.js"

var GameState = ""
var ObjectCreator = ""
var ObjectActivates = ""

var Activate = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()
    ObjectActivates = new ObjectActivatesController()

    Activate = new ActivateController()

})

export class FactoryController{

    useFactory(object, ID){

        let result = Activate.useActivate(object, ID)

        if(result.return){
            Activate.addObject(result.return)
        }

    }

    getAll(){

        return new FactoryInfoController()

    }

    getInfo(factoryName){

        return new FactoryInfoController(true)[factoryName]

    }

    createObject(object, activate, config){

        let newObject = new config.objectClass()

        Activate.basicAjustObject(object, newObject)

        ObjectCreator.giveObjectAI(newObject, config.AI)

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