import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { FactoryController } from "../../../../shipUnits/factory/factoryController.js"
import { Ghu } from "./ghu.js"
import { Traz } from "./traz.js"

export class Trazghu {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Traz,
                Ghu
            ],
            build
        )

        this.graphicID = "trazghu"

        //this.priority += 0.5
        //this.defense = 1
        //this.maxLife = 50
        //this.maxEnergy = 100
        //this.energy = 100
        //this.energyRegen = 5/60

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

        "add_trazghu_split": (updateThis) => {

            updateThis.onDeath.add(
                (params) => {
                    updateThis.onDeath.remove("last",1002)
                    
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
                        "objectClass": Traz,
                        "AI": params.object.AI,
                        "coreType": params.object.coreType,
                        "activates": activates,
                        "behavior": new FocusedTopDownBehavior().searchPriority,
                        "statsMult": 0
                    }

                    let config2 = {
                        "objectClass": Ghu,
                        "AI": params.object.AI,
                        "coreType": params.object.coreType,
                        "activates": activates2,
                        "behavior": new FocusedTopDownBehavior().searchPriority,
                        "statsMult": 0
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

                },"last",1002)

        },

        "trazghu_life": (updateThis) => {

            updateThis.life.math("*",1.25)
    
        }

    }

}