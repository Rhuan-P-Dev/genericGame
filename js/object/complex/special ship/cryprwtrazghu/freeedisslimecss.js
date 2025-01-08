import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { FactoryController } from "../../../../shipUnits/factory/factoryController.js"
import { Freeedis } from "./freeedis.js"
import { Slimecss } from "./slimecss.js"

export class Freeedisslimecss {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Freeedis,
                Slimecss
            ],
            build
        )

        this.graphicID = "freeedisslimecss"

        this.priority *= 1.5

        this.maxLife *= 1.25

        this.defense *= 1.1

        this.energy *= 1.5
        this.maxEnergy *= 1.5

        this.damage *= 1.5

        this.shield *= 1.25
        this.maxShield *= 1.25
        this.shieldRegen *= 1.1

    }

    passBuildList = {

        "add_freeedisslimecss_split": (updateThis) => {

            // hack
            updateThis.onDeath.remove("last",1001)
            updateThis.onDeath.remove("last",1002)

            updateThis.onDeath.add(
                (params) => {

                    updateThis.onDeath.remove("last", 1000)
                    
                    let max = parseInt((Object.keys(params.object.activates).length) / 2)

                    let activates = {}
                    let activates2 = {}

                    for (let index = 0; index < max; index++) {

                        let activateInfo = params.object.activates[Object.keys(params.object.activates)[index]]

                        if(!activates[activateInfo.type]){
                            activates[activateInfo.type] = []
                        }
                        activates[activateInfo.type].push(activateInfo.name)

                    }

                    for (let index = max; index < Object.keys(params.object.activates).length; index++) {

                        let activateInfo = params.object.activates[Object.keys(params.object.activates)[index]]

                        if(!activates2[activateInfo.type]){
                            activates2[activateInfo.type] = []
                        }
                        activates2[activateInfo.type].push(activateInfo.name)

                    }
                    
                    let config = {
                        "objectClass": Freeedis,
                        "AI": params.object.AI,
                        "coreType": params.object.coreType,
                        "activates": activates,
                        "behavior": new FocusedTopDownBehavior().searchPriority,
                        "statsMult": 0,
                        "randomPos": randomInterval(params.object.width + params.object.height)
                    }

                    let config2 = {
                        "objectClass": Slimecss,
                        "AI": params.object.AI,
                        "coreType": params.object.coreType,
                        "activates": activates2,
                        "behavior": new FocusedTopDownBehavior().searchPriority,
                        "statsMult": 0,
                        "randomPos": randomInterval(params.object.width + params.object.height)
                    }

                    new FactoryController().createObjectNow(
                        updateThis,
                        {},
                        config
                    )

                    new FactoryController().createObjectNow(
                        updateThis,
                        {},
                        config2
                    )

            },"last",1000,)


            },

            


        "freeedisslimecss_life": (updateThis) => {

            updateThis.life.math("*",1.25)
    
        }

    }

}