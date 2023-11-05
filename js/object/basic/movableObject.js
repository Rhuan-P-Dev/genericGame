import { Object } from "./object.js"

import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { CustomMathController } from "../../generalUtils/math.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { Rotable } from "./rotable.js"

var AIUtils = ""
var CustomMath = ""

onInit(function(){

    AIUtils = new AIUtilsController()
    CustomMath = new CustomMathController()

})

export class MovableObject {

    vel = 0.05
    maxVel = 3

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Object,
                Rotable,
            ],
            build
        )

        this.priority += 1
        
    }

    advanceShip(){
        
        this.advanceShipX()
        this.fixVelocityX()

        this.advanceShipY()
        this.fixVelocityY()

    }

    advanceShipX(){

        let mult = 1

        if(this.maxVel / parsePositive(this.currentXVel) < 1){
            mult = (this.maxVel / parsePositive(this.currentXVel)) ** 4
        }

        let productMult = AIUtils.getPointed(
            this,
            AIUtils.getFutureOf(this),
        )

        productMult = CustomMath.inverter(
            productMult
        )

        productMult = alwaysPositive(productMult)

        this.currentXVel += (this.vel * this.cosine) * (
            mult + (productMult * (1 - mult))
        )

    } 

    advanceShipY(){

        let mult = 1

        if(this.maxVel / parsePositive(this.currentYVel) < 1){
            mult = (this.maxVel / parsePositive(this.currentYVel)) ** 4
        }

        let productMult = AIUtils.getPointed(
            this,
            AIUtils.getFutureOf(this),
        )

        productMult = CustomMath.inverter(
            productMult
        )

        productMult = alwaysPositive(productMult)

        this.currentYVel += (this.vel * this.sine) * (
            mult + (productMult * (1 - mult))
        )

    }

    fixVelocityX(){

        let softMax = CustomMath.exponential(
            this.maxVel * parsePositive(this.cosine),
            6
        )

        let trueMax = parsePositive(this.cosine) * this.maxVel

        if(
            softMax < trueMax
        ){
            softMax = trueMax
        }

        if(
            this.currentXVel < -softMax
            &&
            this.currentXVel < 0
        ){

            this.currentXVel += this.vel

        }else if(
            this.currentXVel > softMax
            &&
            this.currentXVel > 0
        ){
            this.currentXVel -= this.vel
        }

    }

    fixVelocityY(){

        let softMax = CustomMath.exponential(
            this.maxVel * parsePositive(this.sine),
            6
        )

        let trueMax = parsePositive(this.sine) * this.maxVel

        if(
            softMax < trueMax
        ){
            softMax = trueMax
        }

        if(
            this.currentYVel < -softMax
            &&
            this.currentYVel < 0
        ){

            this.currentYVel += this.vel

        }else if(
            this.currentYVel > softMax
            &&
            this.currentYVel > 0
        ){
            this.currentYVel -= this.vel
        }

    }

}