
import { Object } from "../basic/object.js"

export class BasicProjetile extends Object {

    constructor(){

        super()

         

        this.onHit.add(selfDestruction, "last", 0)

    }

}

function selfDestruction(params){
    params.object.life = -1
    params.object.maxLife = -1
}