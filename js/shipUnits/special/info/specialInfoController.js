
import { LvUp } from "./specials/lvUp.js"
import { Overclock } from "./specials/overclock.js"
import { WeakClone } from "./specials/weakClone.js"
import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"
import { Illusion1 } from "./specials/illusion1.js"
import { BasicCamouflage } from "./specials/basicCamouflage.js"
import { BasicTaunt } from "./specials/basicTaunt.js"
import { Blink } from "./specials/blink.js"
import { Teleport } from "./specials/teleport.js"
import { DummyMaker } from "./specials/dummyMaker.js"
import { TestQuantumBomb } from "./specials/testQuantumBomb.js"
import { GhostSystem } from "./specials/ghostSystem.js"
import { Turbo1 } from "./specials/turbo1.js"
import { Splitter1 } from "./specials/splitter1.js"
import { Camouflage } from "./specials/camouflage.js"
import { MinorPerfectAreaClone } from "./specials/divineEnergy/minorPerfectAreaClone.js"
import { Turbo2 } from "./specials/turbo2.js"
import { ActionLoad } from "./specials/actionLoad.js"
import { ActionSave } from "./specials/actionSave.js"

var ActivateInfo = ""

onInit(function(){

    ActivateInfo = new ActivateInfoController()

})

export class SpecialInfoController{

    specials = {
        "weak clone": WeakClone,
        "overclock": Overclock,
        "lv up": LvUp,
        "illusion 1": Illusion1,
        "basic camouflage": BasicCamouflage,
        "camouflage": Camouflage,
        "basic taunt": BasicTaunt,
        "blink": Blink,
        "teleport": Teleport,
        "dummy maker": DummyMaker,
        "test quantum bomb": TestQuantumBomb,
        "ghost system": GhostSystem,
        "turbo 1": Turbo1,
        "turbo 2": Turbo2,
        "splitter 1": Splitter1,

        //divine energy
        "minor perfect area clone": MinorPerfectAreaClone,

        //actionPoints
        "action load": ActionLoad,
        "action save": ActionSave,
    }

    getAll(){

        return this.specials

    }

    get(specialName){

        return this.specials[specialName]

    }

    build(specialName){

        let special = this.specials[specialName]

        if(!special){return undefined}

        special = ActivateInfo.preBuild(new special(true))

        return special

    }

    buildAll(){

        let specials = []

        for(let specialName in this.specials){
            specials.push(
                this.build(specialName)
            )
        }

        return specials
    }

}