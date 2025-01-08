import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"
import { Regen } from "./defense/regen.js"
import { LightShield } from "./defense/lightShield.js"
import { EfficientShield } from "./defense/efficientShield.js"
import { LightDefense } from "./defense/lightDefense.js"
import { HeavyDefense } from "./defense/heavyDefense.js"
import { SurviveInstinct1 } from "./defense/surviveInstinct1.js"
import { EnergyShield } from "./defense/energyShield.js"
import { BasicFortificationModule } from "./defense/basicFortificationModule.js"
import { FrontalShield } from "./defense/frontalShield.js"
import { MinorMiracleStone } from "./defense/minorMiracleStone.js"
import { LittleShieldBoost } from "./defense/littleShieldBoost.js"
import { Resilience1 } from "./defense/resilience1.js"
import { BandAid } from "./defense/bandAid.js"
import { BasicAntiProjectileSystem } from "./defense/basicAntiProjectileSystem.js"
import { BasicShieldArea } from "./defense/basicShieldArea.js"
import { ReflectShield1 } from "./defense/reflectShield1.js"
import { TacticUpgrade1 } from "./defense/tacticUpgrade1.js"
import { IronMind } from "./defense/ironMind.js"
import { HealPulse1 } from "./defense/healPulse1.js"
import { MinorDivineRevitalization } from "./defense/divineEnergy/minorDivineRevitalization.js"
import { HealPulse2 } from "./defense/healPulse2.js"

var ActivateInfo = ""

onInit(function(){

    ActivateInfo = new ActivateInfoController()

})

export class DefenseInfoController{

    defenses = {
        "regen": Regen,
        "light shield": LightShield,
        "band aid": BandAid,
        "efficient shield": EfficientShield,
        "light defense": LightDefense,
        "heavy defense": HeavyDefense,
        "survive instinct 1": SurviveInstinct1,
        "energy shield": EnergyShield,
        "basic anti-projectile system": BasicAntiProjectileSystem,
        "basic shield area": BasicShieldArea,
        "basic fortification module": BasicFortificationModule,
        "minor miracle stone": MinorMiracleStone, // incompleto
        "little shield boost": LittleShieldBoost,
        "resilience 1": Resilience1,
        "reflect shield 1": ReflectShield1,
        "tactic upgrade 1": TacticUpgrade1,
        "iron mind": IronMind,
         

        //"frontal shield": FrontalShield,










        /* suport */

        "heal pulse 1": HealPulse1,
        "heal pulse 2": HealPulse2,
        "minor divine revitalization": MinorDivineRevitalization


    }

    getAll(){
    
        return this.defenses
    
    }
    
    get(defenseName){
    
        return this.defenses[defenseName]
    
    }
    
    build(name){
    
        let defense = this.defenses[name]
    
        if(!defense){return undefined}

        defense = ActivateInfo.preBuild(new defense(true))
    
        return defense
    
    }

    buildAll(){

        let defenses = []

        for(let defenseName in this.defenses){
            defenses.push(
                this.build(defenseName)
            )
        }

        return defenses
    }

}