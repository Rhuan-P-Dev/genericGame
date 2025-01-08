import { DefenseScorerController } from "./defenseScorerController.js"
import { FactoryScorerController } from "./factoryScorerController.js"
import { SpecialScorerController } from "./specialScorerController.js"
import { WeaponScorerController } from "./weaponScorerController.js"

export class ScorerController{

    scorerType = {
        "defense": new DefenseScorerController(),
        "weapon": new WeaponScorerController(),
        "special": new SpecialScorerController(),
        "factory": new FactoryScorerController()
    }

    get(type, activateName){

        return this.scorerType[type].get(activateName)

    }

    getAll(type){
        return this.scorerType[type].getAll()
    }

}