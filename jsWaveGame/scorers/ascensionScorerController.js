import { EnergizedIntermediary } from "../../js/object/basic/energizedIntermediary.js"
import { ShieldIntermediary } from "../../js/object/basic/shieldIntermediary.js"
import { StandardArmor } from "../../js/object/basic/standardArmor.js"
import { CombatShrewd } from "../../js/object/uncommon/combatShrewd.js"
import { DarkEnergyIntermediary } from "../../js/object/uncommon/darkEnergyIntermediary.js"
import { Death } from "../../js/object/uncommon/death.js"
import { DivineEnergyIntermediary } from "../../js/object/uncommon/divineEnergyIntermediary.js"
import { InvestorSoul } from "../../js/object/uncommon/investorSoul.js"
import { LevelingSystem } from "../../js/object/uncommon/levelingSystem.js"
import { PrimordialFlame } from "../../js/object/uncommon/primordialFlame.js"
import { RemnantResistance } from "../../js/object/uncommon/remnantResistance.js"
import { RoyaltyPrivileges } from "../../js/object/uncommon/royaltyPrivileges.js"
import { SelfSwarmIntermediary } from "../../js/object/uncommon/selfSwarmIntermediary.js"
import { SnowProperties } from "../../js/object/uncommon/snowProperties.js"
import { SoulCorruption } from "../../js/object/uncommon/soulCorruption.js"
import { Undead } from "../../js/object/uncommon/undead.js"

export class AscensionScorerController {

    baseCost = 50000

    ascensionScorer = {
        "SelfSwarm": 10,
        "DarkEnergy": 5,
        "StandardArmor": 1.5,
        "Shield": 3,
        "Energized": 1.1,
        "Remnant": 7,
        "PrimordialFlame": 10,
        "CombatShrewd": 5,
        "DivineEnergy": 20,
        "Undead": 10,
        "Death": 30,
        "RoyaltyPrivileges": 50,
        "LevelingSystem": 20,
        "investorSoul": 10,
        "SnowProperties": 5,
        "SoulCorruption": 7
    }

    ascensionObjects = {
        "SelfSwarm": SelfSwarmIntermediary,
        "DarkEnergy": DarkEnergyIntermediary,
        "StandardArmor": StandardArmor,
        "Shield": ShieldIntermediary,
        "Energized": EnergizedIntermediary,
        "Remnant": RemnantResistance,
        "PrimordialFlame": PrimordialFlame,
        "CombatShrewd": CombatShrewd,
        "DivineEnergy": DivineEnergyIntermediary,
        "Undead": Undead,
        "Death": Death,
        "RoyaltyPrivileges": RoyaltyPrivileges,
        "LevelingSystem": LevelingSystem,
        "investorSoul": InvestorSoul,
        "SnowProperties": SnowProperties,
        "SoulCorruption": SoulCorruption

    }

    get(ascension) {
        return this.ascensionScorer[ascension] * this.baseCost
    }

    getObject(ascension) {
        return new (this.ascensionObjects[ascension])()
    }

    getAll(visualizer = false) {
        let allEffects = []

        let nameSuffix = ""

        if(visualizer){
            nameSuffix += " - ascension"
        }

        for (let [ascension, value] of Object.entries(this.ascensionScorer)) {
            allEffects.push([ascension + nameSuffix, value * this.baseCost])
        }
        return allEffects
    }

    getRandom(quantity = 1){
        
        let allEffects = this.getAll()

        if (allEffects.length === 0) {
            return undefined
        }

        let result = []

        for (let index = 0; index < quantity; index++) {

            result.push(
                returnRandomArray(
                    allEffects
                )
            )
            
        }
        
        return result
    }

}