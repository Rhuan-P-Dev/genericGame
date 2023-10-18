
import { LvUp } from "./specials/lvUp.js"
import { Overclock } from "./specials/overclock.js"
import { WeakClone } from "./specials/weakClone.js"
import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"

var ActivateInfo = ""

onInit(function(){

    ActivateInfo = new ActivateInfoController()

})

export class SpecialInfoController{

    specials = {
        "WeakClone": WeakClone,
        "Overclock": Overclock,
        "LvUp": LvUp,
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

        special = ActivateInfo.preBuild(new special())

        return special

    }

}