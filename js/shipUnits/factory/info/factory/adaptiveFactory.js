import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { ArmoredObjectFactory } from "../../../../object/complex/armoredFactory.js"
import { FactoryExtend } from "../extend/factory.js"

export class AdaptiveFactory {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "adaptive factory"
    cost = 200
    reload = 30*60

    currentVelMult = 0

    config = {
        "objectClass": ArmoredObjectFactory,
        "AI": ["useActivates"],
        "activates": {
            "factory": ["tank 1", "movable safer perimeter 1","assassin 1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
        "customFunctions": [
            (
                object,
                activate,
                config,
                newObject
            ) => {
                //the 'adaptive factory' is incomplete
                //the 'adaptive factory' start to produce after 'params.object' death
                //make activate 25% more powerful after each death of 'params.object'
                for(let index in newObject.activates){

                    newObject.activates[index].factoryUseActivateObserver.add(
                        (params) => {

                            params.activate.reloadStep = 0

                            params.object.onDeath.add(
                                () => {

                                    params.activate.reloadStep = 1

                                    params.activate.config.statsMult += 0.25

                                },
                                "last",
                                0
                            )

                        }
                    )

                }

            },
        ]
    }

}