import { AIController } from "../../../AI/AIController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { FocusedNearBehavior } from "../../../AI/behavior/focusedNearBehavior.js"

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

    constructor(){

        this.createAutoWeapons()

    }

    createAutoWeapons(){

        for(let index in this.weapons){

            this.weapons["auto " + index] = "PLACE HOLDER"

        }

    }

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

        let auto = this.checkAutoWeapon(weaponName)
        weaponName = this.fixWeaponName(weaponName)

        let weapon = this.weapons[weaponName]

        if(!weapon){return undefined}

        weapon = ActivateInfo.preBuild(new weapon(true))

        if(auto){

            this.transformIntoAutoWeapon(weapon)

            weapon.auto = true

            AIC.giveAI(weapon, ["ship_turret"])
            GameState.addObject(weapon, true, false, false, false, false, false)

        }

        if(weapon.build){
            weapon.build()
        }

        weapon.calcStats()

        return weapon

    }

    checkAutoWeapon(weaponName){

        let weaponSubName = weaponName.substring(0,5)

        let auto = false

        if(weaponSubName == "auto "){
            auto = true
        }

        return auto

    }

    fixWeaponName(weaponName){

        if(
            this.checkAutoWeapon(weaponName)
        ){

            weaponName = weaponName.substring(5)

        }

        return weaponName

    }

    transformIntoAutoWeapon(weapon){

        new InheritController().inherit(
            weapon,
            [
                FocusedNearBehavior,
            ],
            false
        )

        weapon.cost *= 0.5
        weapon.rotationVel *= 1.75

        weapon.reload *= 1.5
        weapon.lifeTime *= 0.75
        weapon.range *= 0.5
        weapon.config.weapon.multVel *= 0.75
        weapon.config.weapon.damageMult *= 0.5

    }

}