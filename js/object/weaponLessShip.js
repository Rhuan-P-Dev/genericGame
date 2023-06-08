import { MovableObject } from "./movableObject.js"

export class WeaponLessShip extends MovableObject { //TODO: rename this class

    stepMult = undefined
    xStepMult = undefined
    yStepMult = undefined
    frontLineMult = undefined

    constructor(
            stepMult = 0.25,
            xStepMult = 0.25,
            yStepMult = 0.25,
            frontLineMult = 7,
        ){
            super()
            this.stepMult = stepMult
            this.xStepMult = xStepMult
            this.yStepMult = yStepMult
            this.frontLineMult = frontLineMult
    }

}