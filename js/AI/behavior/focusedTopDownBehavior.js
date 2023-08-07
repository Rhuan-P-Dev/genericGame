
import { TopDownBehavior } from "./topDownBehavior.js"

export class FocusedTopDownBehavior extends TopDownBehavior {

    constructor(){

        super()

        this.searchPriority.min = 2

    }

}