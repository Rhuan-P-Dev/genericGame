
import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"

import { MovableSaferPerimeter1 } from "./factory/movableSaferPerimeter1.js"
import { SaferPerimeter1 } from "./factory/saferPerimeter1.js"
import { BasicSafeZone1 } from "./factory/basicSafeZone1.js"
import { MineSeeder1 } from "./factory/mineSeeder1.js"
import { WarFactory } from "./factory/warFactory.js"
import { EvolveFactory } from "./factory/evolveFactory.js"
import { AdaptiveFactory } from "./factory/adaptiveFactory.js"
import { SafePerimeterCarrier1 } from "./factory/safePerimeterCarrier1.js"
import { AntiMob1 } from "./factory/antiMob1.js"
import { MovableScrapper1 } from "./factory/movableScrapper1.js"
import { MovableShotgun1 } from "./factory/movableShotgun1.js"
import { MovableFlameThrower1 } from "./factory/movableFlameThrower1.js"
import { WarPromoter1 } from "./factory/warPromoter1.js"
import { MovableMissileBurst1 } from "./factory/movableMissileBurst1.js"
import { MovableDisassemble1 } from "./factory/movableDisassemble1.js"
import { Upgrader1 } from "./factory/upgrader1.js"
import { Diffuser } from "./factory/diffuser.js"
import { Tank1 } from "./factory/tank1.js"
import { Assassin1 } from "./factory/assassin1.js"
import { MiniYourself1 } from "./factory/miniYourself1.js"
import { StationarBasicShieldArea } from "./factory/stationarBasicShieldArea.js"
import { StationaryBasicAntiProjectileSystem } from "./factory/stationaryBasicAntiProjectileSystem.js"
import { VanguardHelper1 } from "./factory/vanguardHelper1.js"
import { Upgrader2 } from "./factory/upgrader2.js"
import { Upgrader3 } from "./factory/upgrader3.js"
import { SelfSwarmMelee } from "./factory/selfSwarmMelee.js"
import { SelfSwarmSniper } from "./factory/selfSwarmSniper.js"
import { SummonSeniorSoldier } from "./factory/divineEnergy/summonSeniorSoldier.js"
import { SummonShip } from "./factory/divineEnergy/summonShip.js"
import { SummonHolyGeneral } from "./factory/divineEnergy/summonHolyGeneral.js"
import { FastLaserSentinel } from "./factory/fastLaserSentinel.js"
import { BigLaserSentinel } from "./factory/bigLaserSentinel.js"
import { GovernmentAgent1 } from "./factory/governmentAgent1.js"
import { GovernmentAgent2 } from "./factory/governmentAgent2.js"
import { GovernmentAgent3 } from "./factory/governmentAgent3.js"
import { GovernmentAgent5 } from "./factory/governmentAgent5.js"
import { GovernmentAgent4 } from "./factory/governmentAgent4.js"
import { CallChessBishop } from "./factory/royaltyPoints/callChessBishop.js"
import { CallChessHorse } from "./factory/royaltyPoints/callChessHorse.js"
import { CallChessTower } from "./factory/royaltyPoints/callChessTower.js"
import { CallChessPawn } from "./factory/royaltyPoints/callChessPawn.js"
import { FactoryShip } from "./factory/factoryShip.js"

var ActivateInfo = ""

onInit(function(){

    ActivateInfo = new ActivateInfoController()

})


export class FactoryInfoController{

    factorys = {
        "safer perimeter 1": SaferPerimeter1,
        "movable safer perimeter 1": MovableSaferPerimeter1,
        "basic safe zone 1": BasicSafeZone1,
        "mine seeder 1": MineSeeder1,
        "war factory": WarFactory,
        "evolve factory": EvolveFactory,
        "adaptive factory": AdaptiveFactory,
        "safe perimeter carrier 1": SafePerimeterCarrier1,
        "anti-mob 1": AntiMob1,
        "movable scrapper 1": MovableScrapper1,
        "movable shotgun 1": MovableShotgun1,
        "movable flame thrower 1": MovableFlameThrower1,
        "war promoter 1": WarPromoter1,
        "movable missile burst 1": MovableMissileBurst1,
        "movable disassemble 1": MovableDisassemble1,
        "diffuser": Diffuser,
        "tank 1": Tank1,
        "assassin 1": Assassin1,
        "mini yourself 1": MiniYourself1, // imcompleto


        "upgrader 1": Upgrader1,
        "upgrader 2": Upgrader2,
        "upgrader 3": Upgrader3,



        "vanguard helper 1": VanguardHelper1,


        

        // isso esta imcompleto, navedade deveria utilizar toda a energia para emtão morrer
        // talvez diminuir o range conforme a % da energya
        "stationary basic anti-projectile system": StationaryBasicAntiProjectileSystem,
        // isso esta imcompleto, navedade deveria utilizar toda a energia para emtão morrer
        // talvez diminuir o range conforme a % da energya
        "stationary basic shield area": StationarBasicShieldArea,


        "self swarm melee": SelfSwarmMelee,
        "self swarm sniper": SelfSwarmSniper,

        "fast laser sentinel": FastLaserSentinel,
        "big laser sentinel": BigLaserSentinel,

        "factory ship": FactoryShip,

        // GovernmentAgent
        "government agent 1": GovernmentAgent1,
        "government agent 2": GovernmentAgent2,
        "government agent 3": GovernmentAgent3,
        "government agent 4": GovernmentAgent4,
        "government agent 5": GovernmentAgent5,

        //royaltyPoints
        "call chess pawn": CallChessPawn,
        "call chess tower": CallChessTower,
        "call chess horse": CallChessHorse,
        "call chess bishop": CallChessBishop,

        //divineEnergy
        "summon senior soldier": SummonSeniorSoldier,
        "summon ship": SummonShip,
        "summon holy general": SummonHolyGeneral,

    }

    getAll(){

        return this.factorys

    }

    get(factoryName){

        return this.factorys[factoryName]

    }

    build(factoryName){

        let factory = this.factorys[factoryName]

        if(!factory){return undefined}

        factory = ActivateInfo.preBuild(new factory(true))

        return factory

    }

    buildAll(){

        let factorys = []

        for(let factoryName in this.factorys){
            factorys.push(
                this.build(factoryName)
            )
        }

        return factorys
    }

}