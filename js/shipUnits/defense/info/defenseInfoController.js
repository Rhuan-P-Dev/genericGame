import { GameStateController } from "../../../gameState/gameStateController.js"
import { ObjectCreatorController } from "../../../objectController/objectCreatorController.js"
import { DefenseController } from "../defenseController.js"
import { Regen } from "./defense/regen.js"

var GameState = ""
var ObjectCreator = ""

var Defense = ""

onInit(function(){

    Defense = new DefenseController()

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class DefenseInfoController{

    constructor(build = false){

        let defenses = {
            "Regen": new Regen()
        }

        if(build){

            for (let key in defenses) {

                let defense = defenses[key]

                defense.ID = randomUniqueID()

                defense.callBack = Defense.useDefense

            }

        }

        return defenses

    }

}