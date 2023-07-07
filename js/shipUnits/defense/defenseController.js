import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { MovableObject } from "../../object/movableObject.js"
import { Object } from "../../object/object.js"
import { EnergizadObject } from "../../object/energizedObject.js"

var GameState = ""
var ObjectCreator = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class DefenseController{

    regen(object){

        if(object.energy < 10){return}

        object.energy -= 10

        object.lifeRegen += 0.25
        object.energyRegen -= 0.05

        setTimeout( () => {

            object.lifeRegen -= 0.25
            object.energyRegen += 0.05

        }, 2500)

    }

}

var Defense = new DefenseController()