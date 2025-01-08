import { SpecialInfoController } from "../../../js/shipUnits/special/info/specialInfoController.js"
import { WeaponsInfoController } from "../../../js/shipUnits/weapons/info/weaponsInfoController.js"
import { WeaponScorerController } from "./weaponScorerController.js"

var WeaponsInfo
var WeaponScorer
var SpecialInfo

onInit(function(){

    WeaponsInfo = new WeaponsInfoController()
    WeaponScorer = new WeaponScorerController()
    SpecialInfo = new SpecialInfoController()

})

var cache = {}

export class SpecialScorerController {

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
        "basic camouflage": "basic",
        "basic taunt": "basic",
        "turbo 1": "basic",
        "overclock": "basic",
        "dummy maker": "basic",

        "blink": "intermediate",
        "camouflage": "intermediate",
        "test quantum bomb": "intermediate",
        "illusion 1": "intermediate",
        "turbo 2": "intermediate",

        "splitter 1": "advanced",
        "teleport": "advanced",
        "ghost system": "advanced",

        "weak clone": "epic",
        "lv up": "epic",

        "action load": "special",
        "action save": "special",

        "minor perfect area clone": "special",

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

    scorer(special){

        let score = this.getAvarege(
            this.activateToLevel[special]
        )

        return score

    }

    get(specialName){
        return this.scorer(specialName)
    }

    getAll(){

        let scores = []

        let specials = SpecialInfo.buildAll()

        for(let special of specials){

            let specialName = special.name

            scores.push(
                [
                    specialName,
                    parseInt(this.scorer(special.name))
                ]
            )

        }

        return scores
    }
}