import { TopDownBehavior } from "./topDownBehavior.js"

export class NearBehavior extends TopDownBehavior {

    constructor(){

        super()

        this.searchPriority.targetObsession = 0

    }

}