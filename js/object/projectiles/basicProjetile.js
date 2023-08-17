
import { Object } from "../basic/object.js"

export class BasicProjetile extends Object {

    constructor(){

        super()

        this.typeOfObject = "basicProjetile"

        this.onHitFunctions.add(selfDestruction)

    }

}

function selfDestruction(params){
    params.object.life = -1
    params.object.maxLife = -1
}