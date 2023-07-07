import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { MultiplyStatsController } from "../../generalUtils/multiplyStats.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"

var GameState = ""
var ObjectCreator = ""
var MultiplyStats = ""
var CloneObject = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()
    MultiplyStats = new MultiplyStatsController()
    CloneObject = new CloneObjectController()

})

const stats = {
    "stats":[
        "damage",
        "defense",
        "energy",
        "energyRegen",
        "life",
        "lifeRegen",
        "maxEnergy",
        "maxLife",
        "maxVel",
        "vel",
        "lifeTime",
    ],

    "invertedStatus":[
        "resistance"
    ],

    "statsMult": undefined,
}

// o modulo que faz os clones NÃO esta fazendos os clones direito / clonando os modificadores

export class SpecialController{

    mainCanvas = document.getElementById("mainCanvas")

    makeWeakClone(object){

        if(object.energy < 100){return}

        object.energy -= 100

        let weakClone = CloneObject.clone(object)

        stats.statsMult = 0.8
        MultiplyStats.multiply(weakClone, stats)

        weakClone.ID = randomUniqueID()

        if(object.AI){
            ObjectCreator.giveObjectAI(weakClone, object.AI.returnAll(), true)
        }else{
            ObjectCreator.giveObjectAI(weakClone, ["movable", "bot", "replicator"], true)
        }

        GameState.addObject(weakClone, true)

    }

    lvUp(object){

        //if(object.energy < 100){return}

        //object.energy -= 100

        stats.statsMult = 1.5
        MultiplyStats.multiply(object, stats)

    }

    overclock(object){

        //???????????????????

        if(object.energy < 10){return}

        object.energy -= 10

        let aaa = object.energyRegen/10

        object.lifeRegen -= aaa
        object.energyRegen += aaa

        setTimeout( () => {

            object.lifeRegen += aaa
            object.energyRegen -= aaa

        }, 1900)

    }

}

var Special = new SpecialController()