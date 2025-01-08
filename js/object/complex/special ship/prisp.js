import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { SwitchStatsController } from "../../../misc/switchStatsController.js"
import { Ship } from "../ship.js"

export class Prisp {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship
            ],
            build
        )

        this.graphicID = "prisp"

        this.priority *= 1.5

        this.maxLife *= 1.5

        this.damage *= 1.5

    }

    passBuildList = {

        "add_prisp_special": (updateThis) => {

            new SwitchStatsController().add(
                updateThis,
                "life",
                [
                    {
                        "flag": 1,
                        "max": "maxLife",
                        "state": false,
                        "above": (params) => {

                            params.object.maxShield += 100

                            return "above"
                        },
                        "below": (params) => {

                            params.object.maxShield -= 100

                            return "below"
                        }
                    },{
                        "flag": 0.95,
                        "max": "maxLife",
                        "state": false,
                        "above": (params) => {

                            params.object.shieldRegen += 20/60

                            return "above"
                        },
                        "below": (params) => {

                            params.object.shieldRegen -= 20/60

                            return "below"
                        }
                    },{
                        "flag": 0.8,
                        "max": "maxLife",
                        "state": false,
                        "above": (params) => {

                            params.object.vel += 0.15
                            params.object.maxVel += 0.5

                            return "above"
                        },
                        "below": (params) => {

                            params.object.vel -= 0.15
                            params.object.maxVel -= 0.5

                            return "below"
                        }
                    },{
                        "flag": 0.7,
                        "max": "maxLife",
                        "state": false,
                        "above": (params) => {

                            let above = new EffectsController().add(
                                "help",
                                "onDamage",
                                {
                                    "object": params.object,
                                },{
                                    "timeout":{
                                        "frameOut": 5*60,
                                    },
                                    "countDown": {
                                        "countDownFunction": ["deleteInstruction"],
                                        "count": 99999
                                    }
                                }
                            )

                            return above
                        },
                        "below": (params) => {

                            params.object.onDamage.remove(
                                params.aboveReturn.stage,
                                params.aboveReturn.priority
                            )

                            return "below"
                        }
                    },{
                        "flag": 0.6,
                        "max": "maxLife",
                        "state": false,
                        "above": (params) => {

                            params.object.energyRegen += 5/60

                            let above = new EffectsController().add(
                                "energy barrier",
                                "onDamage",
                                {
                                    "object": params.object,
                                }
                            )

                            return above
                        },
                        "below": (params) => {

                            params.object.energyRegen -= 5/60

                            params.object.onDamage.remove(
                                params.aboveReturn.stage,
                                params.aboveReturn.priority
                            )

                            return "below"
                        }
                    },{
                        "flag": 0.5,
                        "max": "maxLife",
                        "state": false,
                        "above": (params) => {

                            params.object.lifeRegen += 1/60

                            return "above"
                        },
                        "below": (params) => {

                            params.object.lifeRegen -= 1/60

                            return "below"
                        }
                    },{
                        "flag": 0.3,
                        "max": "maxLife",
                        "state": false,
                        "above": (params) => {

                            let above = new EffectsController().add(
                                "illusion v1",
                                "effect",
                                {
                                    "object": params.object,
                                },{
                                    "frameOut": 10*60,
                                    "repeat": -1,
                                }
                            )

                            return above
                        },
                        "below": (params) => {

                            new EffectsController().remove(
                                params.object,
                                params.aboveReturn
                            )

                            return "below"
                        }
                    },
                ]
            )
        },

        "prisp_life": (updateThis) => {

            updateThis.life.math("*", 1.5)
    
        },

    }

}