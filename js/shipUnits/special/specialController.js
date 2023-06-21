import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { MovableObject } from "../../object/movableObject.js"
import { WeaponLessShip } from "../../object/weaponLessShip.js"
import { Object } from "../../object/object.js"

var GameState = ""
var ObjectCreator = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class SpecialController{

    mainCanvas = document.getElementById("mainCanvas")

    makeWeakClone(object){

        if(object.energy < 50){return}

        object.energy -= 50

        let weakClone = structuredClone(object)

        for (let atribute in object) {
            if(typeof(weakClone[atribute]) != "number"){continue}
            if(atribute == "x" ||
               atribute == "y" ||
               atribute == "frontLineMult" ||
               atribute == "yStepMult" ||
               atribute == "xStepMult" ||
               atribute == "stepMult" ||
               atribute == "xyMultLimit" ||
               atribute == "yMult" ||
               atribute == "xMult" ||
               atribute == "width" ||
               atribute == "height" ||
               atribute == "currentXVel" ||
               atribute == "currentYVel"
            ){continue}

            weakClone[atribute] *= 0.75

        }

        weakClone.ID = randomUniqueID()

        if(object.AI){
            ObjectCreator.giveObjectAI(weakClone, object.AI.returnAll(), true)
        }else{
            ObjectCreator.giveObjectAI(weakClone, ["movable", "bot", "replicator"], true)
        }

        GameState.addObject(weakClone, true)

    }

    lvUp(object){

        if(object.energy < 100){return}

        object.energy -= 100

        for (let atribute in object) {
            if(typeof(object[atribute]) != "number"){continue}
            if(atribute == "x" ||
               atribute == "y" ||
               atribute == "frontLineMult" ||
               atribute == "yStepMult" ||
               atribute == "xStepMult" ||
               atribute == "stepMult" ||
               atribute == "xyMultLimit" ||
               atribute == "yMult" ||
               atribute == "xMult" ||
               atribute == "width" ||
               atribute == "height" ||
               atribute == "currentXVel" ||
               atribute == "currentYVel"
            ){continue}

            object[atribute] *= 1.1

        }

    }

}

var Special = new SpecialController()