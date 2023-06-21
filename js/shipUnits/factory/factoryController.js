import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { MovableObject } from "../../object/movableObject.js"
import { WeaponLessShip } from "../../object/weaponLessShip.js"
import { Object } from "../../object/object.js"
import { EnergizadObject } from "../../object/energizedObject.js"

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

        let turret = new EnergizadObject()

        turret.x = object.x
        turret.y = object.y
        turret.team = object.team
        turret.color = object.color
        turret.ID = randomUniqueID()

        ObjectCreator.giveObjectAI(turret, ["turret"])
        GameState.addObject(turret, true)

    }

}

var Factory = new FactoryController()