import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { ArmoredObjectFactory } from "../../../../object/complex/armoredFactory.js"
import { FactoryExtend } from "../extend/factory.js"

export class EvolveFactory {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "evolve factory"
    cost = 200
    reload = 30*60

    currentVelMult = 0

    config = {
        "objectClass": ArmoredObjectFactory,
        "AI": ["useActivates"],
        "activates": {
            "factory": ["movable missile burst 1","movable shotgun 1","movable flame thrower 1"]
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
                // make activate 5% more powerful after each death of 'params.object'
                // the activates need to have 'statsMult'
                for(let index in newObject.activates){

                    newObject.activates[index].factoryUseActivateObserver.add(
                        (params) => {

                            params.object.onDeath.add(
                                () => {
                                    params.activate.config.statsMult += 0.05
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