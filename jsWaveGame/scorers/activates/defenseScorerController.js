import { DefenseInfoController } from "../../../js/shipUnits/defense/info/defenseInfoController.js"
import { WeaponsInfoController } from "../../../js/shipUnits/weapons/info/weaponsInfoController.js"
import { WeaponScorerController } from "./weaponScorerController.js"

var DefenseInfo
var WeaponsInfo
var WeaponScorer

onInit(function(){

    WeaponsInfo = new WeaponsInfoController()
    DefenseInfo = new DefenseInfoController()
    WeaponScorer = new WeaponScorerController()

})

var cache = {}

export class DefenseScorerController {

    basic = [
        "missile burst 1",
        "piston 1",
        "toy machinegun",
        "shotgun 1"
    ]

    intermediate = [
        "small bullet cluster 1",
        "scrapper 1",
        "diffusion 1",
        "fragilizer 1",
    ]

    advanced = [
        "self swarm three sniper",
        "missile cluster 1",
        "paintbrush 1",
        "sniper piston 1",
        "blessed red",
        "mini world launcher"
    ]

    epic = [
        "laser web",
        "lance 1",
        "self swarm rain",
        "paintbrush 1"
    ]

    special = [
        "big laser",
        "laser web",
        "sniper laser 1",
        "empty color",
        "black hole generator 1"
    ]

    activateToLevel = {
        "light defense": "basic",
        "light shield": "basic",
        "heal pulse 1": "basic",
        
        "little shield boost": "intermediate",
        "reflect shield 1": "intermediate",
        "regen": "intermediate",
        "iron mind": "intermediate",
        "energy shield": "intermediate",
        "heal pulse 2": "intermediate",

        "minor miracle stone": "advanced",
        "efficient shield": "advanced",
        "heavy defense": "advanced",
        "survive instinct 1": "advanced",
        "basic anti-projectile system": "advanced",
        "basic shield area": "advanced",
        "basic fortification module": "advanced",
        "band aid": "advanced",

        "resilience 1": "advanced",
        "tactic upgrade 1": "advanced",

        "minor divine revitalization": "special",

        "random": "special",
    }

    getAvarege(level){

        if(cache[level]){
            return cache[level]
        }
        
        let score = 0

        for (let index = 0; index < this[level].length; index++) {
            score += WeaponScorer.get(this[level][index])
        }

        score /= this[level].length

        cache[level] = score

        return score

    }

    scorer(defense){

        let score = this.getAvarege(
            this.activateToLevel[defense]
        )

        return score

    }

    get(defenseName){
        return this.scorer(defenseName)
    }

    getAll(){

        let scores = []

        let defenses = DefenseInfo.buildAll()

        for(let defense of defenses){

            let defenseName = defense.name

            scores.push(
                [
                    defenseName,
                    parseInt(this.scorer(defense.name))
                ]
            )

        }

        return scores
    }
}