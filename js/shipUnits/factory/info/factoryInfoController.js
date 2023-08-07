
import { GameStateController } from "../../../gameState/gameStateController.js"
import { ObjectCreatorController } from "../../../objectController/objectCreatorController.js"
import { FactoryController } from "../factoryController.js"
import { MSP1 } from "./factory/MSP1.js"
import { SP1 } from "./factory/SP1.js"
import { DF1 } from "./factory/DF1.js"

var GameState = ""
var ObjectCreator = ""

var Factory = ""

onInit(function(){

    Factory = new FactoryController()

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class FactoryInfoController{

    constructor(build = false){

        let factorys = {
            "SP1": new SP1(),
            "MSP1": new MSP1(),
            "DF1": new DF1(),
        }

        if(build){

            for (let key in factorys) {

                let factory = factorys[key]

                factory.ID = randomUniqueID()

                factory.callBack = Factory.useFactory

            }

        }

        return factorys

    }

}