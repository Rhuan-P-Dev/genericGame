
import { Rotable } from "../../../../object/rotable.js"

export class Weapon extends Rotable{

    typeOfObject = "weapon"

    name = undefined
    cost = 10
    type = "???"
    range = 180 // 3 * 60
    func = undefined
    baseFunc = undefined
    reload = 60
    reloadTemp = 0
    reloadStep = 1
    xMult = 0
    yMult = 1
    hasModifier = false
    config = {
        multVel: 3,
        damageMult: 1,
    }
    lifeTime = 60

    calcStats(){

        this.range = this.lifeTime * this.config.multVel

    }

}