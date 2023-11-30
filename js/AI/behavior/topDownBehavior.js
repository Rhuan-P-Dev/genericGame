
import { BasicBehavior } from "./basicBehavior.js"

export class TopDownBehavior extends BasicBehavior {

    constructor(){

        super()

        this.searchPriority.targetObsession = 6
        this.searchPriority.targetPriority = 10
        this.searchPriority.above = false
        this.searchPriority.below = true
        this.searchPriority.min = -5
        this.searchPriority.max = 10
        this.searchPriority.ifDontHave.first = -1
        this.searchPriority.ifDontHave.all = false

    }

}