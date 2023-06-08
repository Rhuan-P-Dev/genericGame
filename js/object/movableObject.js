import { Object } from "./object.js"

export class MovableObject extends Object {

    xMult = undefined
    yMult = undefined
    xyMultLimit = undefined
    vel = undefined
    maxVel = undefined

    constructor(
            xMult = 0,
            yMult = 1,
            xyMultLimit = 1,
            vel = 0.25,
            maxVel = 2,
        ){
            super()
            this.xMult = xMult
            this.yMult = yMult
            this.xyMultLimit = xyMultLimit
            this.vel = vel
            this.maxVel = maxVel
    }

}