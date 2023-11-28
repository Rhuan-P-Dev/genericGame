import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

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

            params.object.life = params.object.maxLife * params.config.getPercentage(params)

        },

        "revenger": (params) => {

            let damage = params.calcDamage * params.config.getPercentage(params)

            if(damage > 0){
                params.otherObjectMaster.life -= damage
            }

        },

        "convert": (params) => {

            GameState.changeTeam(
                params.otherObject,
                params.otherObject.team,
                params.object.team
            )

            params.otherObject.color = params.object.color

        },

        "damage multiplier": (params) => {

            params.calcDamage *= params.config.getPercentage(params)
            params.damage *= params.config.getPercentage(params)

        },

    }

    effectsInfo = {

        "positive": {

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
        
                    "params": {},

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