import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { ObjectFactory } from "../../../../object/complex/factory.js"
import { FactoryExtend } from "../extend/factory.js"

export class WarFactory {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "war factory"
    cost = 200
    reload = 30*60

    currentVelMult = 0

    config = {
        "objectClass": ObjectFactory,
        "AI": ["useActivates"],
        "activates": {
            "factory": [
                "movable disassemble 1",
                "mine seeder 1",
                "movable missile burst 1"
            ],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
        "customFunctions": [
            (
                object,
                activate,
                config,
                newObject
            ) => { // make activate 10% faster each use
                for(let index in newObject.activates){

                    newObject.activates[index].factoryUseActivateObserver.add(
                        () => {
                            newObject.activates[index].reload *= 0.9
                        }
                    )

                }

            },
        ]
    }

}