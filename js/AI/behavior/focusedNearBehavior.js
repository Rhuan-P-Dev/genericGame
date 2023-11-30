
import { NearBehavior } from "./nearBehavior.js"

export class FocusedNearBehavior extends NearBehavior {

    constructor(){

        super()

        this.searchPriority.min = 2

    }

}