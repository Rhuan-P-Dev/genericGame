import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { ObjectActivatesController } from "../../objectController/objectActivatesController.js"
import { Turret } from "../../object/turrent.js"

var GameState = ""
var ObjectCreator = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class FactoryController{

    createTurret(object){

        if(object.energy < 25){return}

        object.energy -= 25

        let turret = new Turret()

        turret.x = object.x
        turret.y = object.y
        turret.team = object.team
        turret.color = object.color
        turret.ID = randomUniqueID()

        ObjectCreator.giveObjectAI(turret, ["turret"])

        new ObjectActivatesController().giveOffensiveActivate(turret)

        GameState.addObject(turret, true)

    }

}

var Factory = new FactoryController()