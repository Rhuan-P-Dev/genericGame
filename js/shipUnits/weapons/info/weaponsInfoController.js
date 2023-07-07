import { GameStateController } from "../../../gameState/gameStateController.js"
import { ObjectCreatorController } from "../../../objectController/objectCreatorController.js"
import { WeaponsController } from "../weaponsController.js"
import { M1 } from "./weapons/M1.js"
import { P1 } from "./weapons/P1.js"
import { Auto_P1 } from "./weapons/auto_P1.js"


var GameState = ""
var ObjectCreator = ""

var Weapons = ""

onInit(function(){

    Weapons = new WeaponsController()

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class WeaponsInfoController{

    constructor(build = false){

        let weapons = {
            "P1": new P1(),
            "auto_P1": new Auto_P1(),
            "M1": new M1()
        }

        if(build){

            for (let key in weapons) {

                let weapon = weapons[key]

                weapon.ID = randomUniqueID()

                weapon.callBack = Weapons.useWeapon

                if(weapon.auto){
                    ObjectCreator.giveObjectAI(weapon, ["ship_turret"])
                    GameState.addObject(weapon, true, false, false, false, false, false)
                }

                if(weapon.build){
                    weapon.build()
                }




                weapon.calcStats()

            }

        }

        return weapons

    }

}