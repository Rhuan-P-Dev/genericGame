
import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { DefenseInfoController } from "./info/defenseInfoController.js"
import { setFrameOut } from "../../frame/frameController.js"

var GameState = ""
var ObjectCreator = ""

var Activate = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

    Activate = new ActivateController()

})

export class DefenseController{

    useDefense(object, ID){

        Activate.useActivate(object, ID)

    }

    getAll(){

        return new DefenseInfoController()

    }

    getInfo(DefenseName){

        return new DefenseInfoController(true)[DefenseName]

    }

    regen(object, activate, config){

        object.lifeRegen += config.lifeRegenBuff
        object.energyRegen -= config.energyRegenDebuff

        setFrameOut( () => {

            object.lifeRegen -= config.lifeRegenBuff
            object.energyRegen += config.energyRegenDebuff

        }, 120)

    }

}

var Defense = new DefenseController()