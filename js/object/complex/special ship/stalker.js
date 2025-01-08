import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { ComplexOnTypeFunctions } from "../../instructions/onInstructions.js"
import { Ship } from "../ship.js"

export class Stalker {

    invisiblePriority = -10
    visiblePriority = 14
    invisibleReload = 5*60

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "stalker"

        this.priority = this.invisiblePriority

        this.vel *= 0.8
        this.maxVel *= 0.8

    }

    passBuildList = {

        "Stalker_special": (updateThis) => {

            updateThis.addActivateObserver.add(
                (activate) => {
                    activate.useActivateObserver.add(
                        (object) => {
                            object.priority = object.visiblePriority
                            setFrameOut(
                                () => {
                                    object.priority = object.invisiblePriority
                                },
                                object.invisibleReload,
                                1,
                                true,
                                object.ID + " Stalker_special"
                            )
                        }
                    )
                }
            )

            let breakInvisibility = {
                "prefixFunc": [],
                "func": (params) => {

                    params.object.priority = params.object.visiblePriority
                    setFrameOut(
                        () => {
                            params.object.priority = params.object.invisiblePriority
                        },
                        params.object.invisibleReload,
                        1,
                        true,
                        params.object.ID + " Stalker_special"
                    )

                },

                "stage": "first",
                "priority": 0,

            }

            new ComplexOnTypeFunctions().apply(breakInvisibility)

            updateThis.onDamage.add(
                breakInvisibility,
                breakInvisibility.stage,
                breakInvisibility.priority
            )

        },

    }

}