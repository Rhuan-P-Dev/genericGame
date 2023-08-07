
import { GameStateController } from "../../../gameState/gameStateController.js"
import { ObjectCreatorController } from "../../../objectController/objectCreatorController.js"
import { SpecialController } from "../specialController.js"
import { LvUp } from "./specials/lvUp.js"
import { Overclock } from "./specials/overclock.js"
import { WeakClone } from "./specials/weakClone.js"

var GameState = ""
var ObjectCreator = ""

var Special = ""

onInit(function(){

    Special = new SpecialController()

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class SpecialInfoController{

    constructor(build = false){

        let specials = {
            "WeakClone": new WeakClone(),
            "Overclock": new Overclock(),
            "LvUp": new LvUp(),
        }

        if(build){

            for (let key in specials) {

                let special = specials[key]

                special.ID = randomUniqueID()

                special.callBack = Special.useSpecial

            }

        }

        return specials

    }

}