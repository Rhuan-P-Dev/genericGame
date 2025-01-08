import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { DamageController } from "../../damage/damageController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState
var Damage
var AIUtils

onInit(function(){

    GameState = new GameStateController()
    Damage = new DamageController()
    AIUtils = new AIUtilsController()

})

export class OtherEffectsController {

    effectsList = {

        "energy shield": (params) => {

            if(
                params.object.energy < 0
                ||
                params.calcDamage < 0
            ){return}

            let reducedDamage = params.calcDamage * params.config.getPercentage(params)

            params.object.energy -= reducedDamage

            if(params.object.energy < 0){return}

            params.calcDamage -= reducedDamage

        },

        "resurrection": (params) => {

            params.object.life.set(params.object.maxLife * params.config.getPercentage(params))

        },

        "revenger": (params) => {

            let damage = params.calcDamage * params.config.getPercentage(params)

            if(
                damage > 0
                &&
                params.otherObjectMaster.ID
            ){

                params.fakeObject.damage = damage

                Damage.damageCalc(
                    params.fakeObject,
                    params.otherObjectMaster
                )

            }

        },

        "convert": (params) => {

            if(
                params.otherObject.ID
            ){
                GameState.changeTeam(
                    params.otherObject,
                    params.object
                )
            }

        },

        "damage multiplier": (params) => {

            params.calcDamage *= params.config.getPercentage(params)
            params.damage *= params.config.getPercentage(params)

        },

        "damage type evolution": (params) => {

            const otherObjectDamage = Damage.getDamages(
                params.otherObject
            )

            for (const damage in otherObjectDamage) {

                const typeCalcDamage = otherObjectDamage[damage] * params.calcDamage

                Damage.addDefense(
                    params.object,
                    "life",
                    damage,
                    typeCalcDamage * params.config.percentage
                )

            }

        },

        "damage split": (params) => {

            if(params.calcDamage < 1){return}

            const allies = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "includeEnemyTeam": false,
                    "includeSameTeam": true,
                    "minPriority": 2,
                    "maxDistance": params.range,
                }
            )

            if (allies.length === 0) {
                return
            }

            const damagePerAlly = params.calcDamage / (allies.length+1)
        
            allies.forEach(ally => {
                setFrameOut(
                    () => {
                        Damage.doMinimalAttack(
                            damagePerAlly,
                            params.otherObject.damageTypes,
                            params.otherObject,
                            ally,
                        )
                    },1
                )
            })
        
            params.calcDamage = damagePerAlly
        
        },

        "bad to good": (params) => {

            if (params.calcDamage <= 0) { return }
        
            let stat = params.calcDamage * params.config.getPercentage(params)
        
            params.statName.forEach(statName => {
                if (typeof params.object[statName] == "number") {
                    params.object[statName] += stat
                } else {
                    params.object[statName].math("+", stat)
                }
            })
        
            params.calcDamage -= stat
        },

    }

    effectsInfo = {

        "positive": {

            "deny damage": {

                "on": {

                    "config": {
                        "prefixFunc": ["stopStages","timeout"],
                        "func": () => {},
                        "suffixFunc": [],

                        "stopStages": {
                            "stages": ["first", "middle", "last",],
                        },

                        "timeout":{
                            "frameOut": 60,
                        },

                        "stage": "first",
                        "priority": 0,

                    },
        
                    "params": {},

                }

            },

            "converter": {

                "on": {

                    "config": {
                        "func": this.effectsList["convert"],
                    },
        
                    "params": {},

                },
    
            },
            "energy shield of faith": {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["energy shield"],
                        "suffixFunc": [],

                        "stage": "first",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return params.object.energy / params.object.maxEnergy

                        }

                    },
        
                    "params": {},

                }

            },

            "energy barrier": {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["energy shield"],
                        "suffixFunc": [],

                        "stage": "first",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return 0.25

                        }

                    },
        
                    "params": {},

                }

            },

            "resurrection": {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["resurrection"],
                        "suffixFunc": ["stopStages","deleteInstruction"],

                        "stopStages": {
                            "stages": ["last"],
                        },

                        "stage": "last",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return 1

                        }

                    },
        
                    "params": {},

                }

            },

            "resurrection - 4": {

                "on": {

                    "config": {
                        "prefixFunc": [""],
                        "func": this.effectsList["resurrection"],
                        "suffixFunc": ["countDown","stopStages"],

                        "countDown": {
                            "countDownFunction": ["deleteInstruction"],
                            "count": 5
                        },

                        "stopStages": {
                            "stages": ["last"],
                        },

                        "stage": "last",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return 1

                        }

                    },
        
                    "params": {},

                }

            },

            "counterback":  {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["revenger"],
                        "suffixFunc": [],

                        "stage": "middle",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return 0.25

                        }

                    },
        
                    "params": {
                        "fakeObject": {
                            "damageTypes": {
                                "revenge": 1,
                            }
                        },
                    },

                }

            },

            "defense evolution": {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["damage type evolution"],
                        "suffixFunc": [],

                        "stage": "last",
                        "priority": 0,

                        "percentage": 0.001

                    },

                    "params": {},

                }

            },

            "distributor": {

                "on": {
            
                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["damage split"],
                        "suffixFunc": [],
            
                        "stage": "first",
                        "priority": 0,
            
                    },
            
                    "params": {
                        "range": 200,
                    },
            
                }
            
            },

            "harm to good": {

                "on": {
            
                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["bad to good"],
                        "suffixFunc": ["timeout"],

                        "timeout":{
                            "frameOut": 1*60,
                        },
            
                        "stage": "first",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return 1

                        }
            
                    },
            
                    "params": {
                        "statName": ["life","energy","shield"]
                    },
            
                }
            
            },

        },

        "negative": {

            "fragile": {

                "on": {

                    "config": {
                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["damage multiplier"],
                        "suffixFunc": [],

                        "stage": "first",
                        "priority": 0,

                        "countDown": {
                            "countDownFunction": ["deleteInstruction"],
                            "count": 3
                        },

                        "getPercentage": (params) => {

                            return params.mult

                        }

                    },
        
                    "params": {

                        "mult": 1.5

                    },

                }

            },

            "scrapper": {

                "on": {

                    "config": {
                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["damage multiplier"],
                        "suffixFunc": [],

                        "stage": "first",
                        "priority": 0,

                        "countDown": {
                            "countDownFunction": ["deleteInstruction"],
                            "count": 70
                        },

                        "getPercentage": (params) => {

                            return params.mult

                        }

                    },
        
                    "params": {

                        "mult": 1.01

                    },

                }

            },

        },

    }

    getAll(){
        return this.effectsInfo
    }

    get(effectName){
        return this.effectsInfo[effectName]
    }

}

var OtherEffects = new OtherEffectsController()