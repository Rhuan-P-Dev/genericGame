
import { Object } from "../basic/object.js"

export class BasicProjetile extends Object {

    constructor(){

        super()

        this.typeOfObject = "basicProjetile"

        this.onHitFunctions.add(selfDestruction)

    }

}

function selfDestruction(data){
    data.object.life = -1
    data.object.maxLife = -1
}