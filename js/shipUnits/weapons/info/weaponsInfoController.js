import { AIController } from "../../../AI/AIController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"
import { BlackHoleGenerator1 } from "./weapons/blackHoleGenerator1.js"
import { MissileBurst1 } from "./weapons/missileBurst1.js"
import { MineLauncher1 } from "./weapons/mineLauncher1.js"
import { Piston1 } from "./weapons/piston1.js"
import { SniperPiston1 } from "./weapons/sniperPiston1.js"



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
        "piston 1": Piston1,
        "sniper piston 1": SniperPiston1,
        "missile burst 1": MissileBurst1,
        "black hole generator 1": BlackHoleGenerator1,
        "mine launcher 1": MineLauncher1,
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

        weapon = ActivateInfo.preBuild(new weapon(true))

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