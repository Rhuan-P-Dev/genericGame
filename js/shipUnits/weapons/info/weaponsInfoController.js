import { AIController } from "../../../AI/AIController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { FocusedNearBehavior } from "../../../AI/behavior/focusedNearBehavior.js"

import { BlackHoleGenerator1 } from "./energy/weapons/blackHoleGenerator1.js"
import { MissileBurst1 } from "./energy/weapons/missileBurst1.js"
import { MineLauncher1 } from "./energy/weapons/mineLauncher1.js"
import { Piston1 } from "./energy/weapons/piston1.js"
import { SniperPiston1 } from "./energy/weapons/sniperPiston1.js"
import { Scrapper1 } from "./energy/weapons/scrapper1.js"
import { FlameThrower1 } from "./energy/weapons/flameThrower1.js"
import { Fragilizer1 } from "./energy/weapons/fragilizer1.js"
import { Disassemble1 } from "./energy/weapons/disassemble1.js"
import { ElectrifiedMissile1 } from "./energy/weapons/electrifiedMissile1.js"
import { Paintbrush1 } from "./energy/weapons/paintbrush1.js"
import { Missilepiston } from "./energy/weapons/missilepiston.js"
import { Shotgun1 } from "./energy/weapons/shotgun1.js"
import { MissileCluster1 } from "./energy/weapons/missileCluster1.js"
import { MiniWorldLauncher } from "./energy/weapons/miniWorldLauncher.js"
import { SmallBulletCluster1 } from "./energy/weapons/smallBulletCluster1.js"
import { Diffusion1 } from "./energy/weapons/diffusion1.js"
import { Bubbler1 } from "./energy/weapons/bubbler1.js"
import { ElectrifiedBomb1 } from "./energy/weapons/electrifiedBomb1.js"
import { ToyMachinegun } from "./energy/weapons/toyMachinegun.js"
import { ParasiteInjection1 } from "./energy/weapons/parasiteInjection1.js"
import { DeathHandLauncher } from "./energy/weapons/deathHandLauncher.js"
import { EmptyColor } from "./darkEnergy/weapons/emptyColor.js"
import { BlessedBlue } from "./darkEnergy/effectWeapons/blessedBlue.js"
import { BlessedRed } from "./darkEnergy/effectWeapons/blessedRed.js"
import { BlessedSpecial } from "./darkEnergy/effectWeapons/blessedSpecial.js"
import { SelfSwarmThreeSniper } from "./energy/weapons/selfSwarmThreeSniper.js"
import { SelfSwarmRain } from "./energy/weapons/selfSwarmRain.js"
import { MinorJudgment } from "./divineEnergy/effectWeapons/minorJudgment.js"
import { Lance1 } from "./energy/weapons/lance1.js"
import { LaserSword } from "./energy/weapons/laserSword.js"
import { FastLaser } from "./energy/weapons/fastLaser.js"
import { BigLaser } from "./energy/weapons/bigLaser.js"
import { BoneLauncher } from "./energy/weapons/boneLauncher.js"
import { DeathRay } from "./energy/weapons/deathRay.js"
import { PaintingMachinegun } from "./energy/weapons/paintingMachinegun.js"
import { SniperLaser1 } from "./energy/weapons/sniperLaser1.js"
import { FlameThrower2 } from "./energy/weapons/flameThrower2.js"
import { ActionFight } from "./actionPoints/effectWeapons/actionFight.js"
import { ActionMercy } from "./actionPoints/effectWeapons/actionMercy.js"
import { RedemptionLance } from "./energy/weapons/redemptionLance.js"
import { SnowLauncher } from "./energy/weapons/snowLauncher.js"
import { LaserWeb } from "./energy/weapons/laserWeb.js"

var GameState
var AIC
var ActivateInfo

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
        "flame thrower 1": FlameThrower1,
        "flame thrower 2": FlameThrower2,
        "scrapper 1": Scrapper1,
        "fragilizer 1": Fragilizer1,
        "disassemble 1": Disassemble1,
        "electrified missile 1": ElectrifiedMissile1,
        "paintbrush 1": Paintbrush1,
        "missilepiston": Missilepiston,
        "shotgun 1": Shotgun1,
        "missile cluster 1": MissileCluster1,
        "mini world launcher": MiniWorldLauncher,
        "small bullet cluster 1": SmallBulletCluster1,
        "diffusion 1": Diffusion1,
        "bubbler 1": Bubbler1,
        "electrified bomb 1": ElectrifiedBomb1,
        "toy machinegun": ToyMachinegun,
        "parasite injection 1": ParasiteInjection1,
        "death hand launcher": DeathHandLauncher,
        "self swarm three sniper": SelfSwarmThreeSniper,
        "self swarm rain": SelfSwarmRain,

        "bone launcher": BoneLauncher,

        "lance 1": Lance1,
        "laser sword": LaserSword,
        "fast laser": FastLaser,
        "big laser": BigLaser,

        "death ray": DeathRay,
        "painting machinegun": PaintingMachinegun,
        "sniper laser 1": SniperLaser1,
        "redemption lance": RedemptionLance,

        "snow launcher": SnowLauncher,
        "laser web": LaserWeb,

        //dark energy
        "blessed blue": BlessedBlue,
        "blessed red": BlessedRed,
        "empty color": EmptyColor,
        "blessed special": BlessedSpecial,


        //divine energy
        "minor judgment": MinorJudgment,

        //actionPoints
        "action fight": ActionFight,
        "action mercy": ActionMercy,


    }

    getAll(){

        return this.weapons

    }

    get(weaponName){

        return this.weapons[weaponName]

    }

    build(weaponName, addOnGame = true){

        let auto = this.checkAutoWeapon(weaponName)
        weaponName = this.fixWeaponName(weaponName)

        const isModed = weaponName.split("|")[1]

        if(isModed){
            var weapon = this.weapons[weaponName.split("|")[0]]
        }else{
            var weapon = this.weapons[weaponName]
        }

        if(
            !weapon
            &&
            !isModed
        ){return undefined}

        weapon = ActivateInfo.preBuild(new weapon(true))

        weapon.auto = auto

        if(weapon.auto){

            this.transformIntoAutoWeapon(weapon)

            AIC.giveAI(weapon, ["ship_turret"])

            if(addOnGame){
                GameState.addObject(weapon, true, false, false, false, false, false)
            }

        }

        if(isModed){
            const mods = weaponName.split("|").slice(1)
            this.addMods(weapon, mods)
        }

        if(weapon.build){
            weapon.build()
        }

        if(weapon.calcStats){
            weapon.calcStats()
        }

        return weapon

    }

    addMods(weapon, mods){
        if(!weapon.modifiersList){return}
        for(let mod of mods){
            weapon.modifiersList.push(mod)
        }
    }

    buildAll(addOnGame = true){

        let weapons = []

        for(let weaponName in this.weapons){
            weapons.push(
                this.build(weaponName, addOnGame)
            )
        }

        return weapons
    }

    checkAutoWeapon(weaponName){

        if(
            weaponName.substring(0,5) == "auto "
        ){
            return true
        }else{
            return false
        }

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
        weapon.rotationVel *= 2

        weapon.reload *= 1.5
        weapon.lifeTime *= 0.75

        if(
            !weapon.isLaser
        ){
            weapon.range *= 0.75
        }

        if(weapon.distance !== undefined){
            weapon.distance *= 0.75
        }

        if(weapon.config.weapon){
            weapon.config.weapon.multVel *= 0.75
            weapon.config.weapon.damageMult *= 0.5
        }

    }

}