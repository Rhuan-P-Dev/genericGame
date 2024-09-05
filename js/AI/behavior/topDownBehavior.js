
import { BasicBehavior } from "./basicBehavior.js"

export class TopDownBehavior extends BasicBehavior {

    constructor(){

        super()

        this.searchPriority.targetObsession = 6
        this.searchPriority.targetPriority = 100
        this.searchPriority.min = -5
        this.searchPriority.max = 100

    }

}