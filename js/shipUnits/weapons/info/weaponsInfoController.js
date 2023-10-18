import { AIController } from "../../../AI/AIController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"
import { M1 } from "./weapons/M1.js"
import { P1 } from "./weapons/P1.js"
import { SP1 } from "./weapons/SP1.js"
import { Auto_P1 } from "./weapons/auto_P1.js"
import { Auto_SP1 } from "./weapons/auto_SP1.js"



var GameState = ""
var AIC = ""
var ActivateInfo = ""

onInit(function(){

    GameState = new GameStateController()
    AIC = new AIController()
    ActivateInfo = new ActivateInfoController()

})

export class WeaponsInfoController{

    weapons = {
        "P1": P1,
        "auto_P1": Auto_P1,
        "M1": M1,
        "SP1": SP1,
        "auto_SP1": Auto_SP1,
    }

    getAll(){

        return this.weapons

    }

    get(weaponName){

        return this.weapons[weaponName]

    }

    build(weaponName){

        let weapon = this.weapons[weaponName]

        if(!weapon){return undefined}

        weapon = ActivateInfo.preBuild(new weapon())

        if(weapon.auto){

            AIC.giveAI(weapon, ["ship_turret"])
            GameState.addObject(weapon, true, false, false, false, false, false)

        }

        if(weapon.build){
            weapon.build()
        }

        weapon.calcStats()

        return weapon

    }

}