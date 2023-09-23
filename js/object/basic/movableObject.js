import { Object } from "./object.js"

import { CustomMathController } from "../../generalUtils/math.js"

var CustomMath = ""

onInit(function(){

    CustomMath = new CustomMathController()

})

export class MovableObject extends Object {

    vel = 0.05
    maxVel = 3

    velDecayDiv = 3
    currentVelDecay = 2
    maxVelMultFactor = 2

    constructor(){

        super()

        this.priority += 1
        
    }

    advanceShip(){
        
        //console.log("X VEL: " + this.currentXVel)
        //console.log("Y VEL: " + this.currentYVel)

        //console.log("X C: " + this.coseno)
        //console.log("Y S: " + this.seno)



        this.advanceShipX()
        this.fixVelocityX()

        this.advanceShipY()
        this.fixVelocityY()

    }

    advanceShipX(){

        let mult = 1

        if(this.maxVel / parsePositive(this.currentXVel) < 1){
            mult = (this.maxVel / parsePositive(this.currentXVel)) ** 5
        }

        //console.log(
        //    this.currentXVel.toFixed(2),
        //    (parseInt(((this.vel * this.coseno) * mult) * 1000)) / 1000,
        //    (parseInt(mult * 1000)) / 1000
        //)
    
        this.currentXVel += (this.vel * this.coseno) * mult

    } 

    advanceShipY(){

        let mult = 1

        if(this.maxVel / parsePositive(this.currentYVel) < 1){
            mult = (this.maxVel / parsePositive(this.currentYVel)) ** 5
        }

        console.log(
            this.currentYVel.toFixed(2),
            (parseInt(((this.vel * this.seno) * mult) * 1000)) / 1000,
            (parseInt(mult * 1000)) / 1000
        )
    
        this.currentYVel += (this.vel * this.seno) * mult

    }

    /*

    fixVelocityX(){

        let softMax = CustomMath.exponential(
            parsePositive(this.coseno),
            this.maxVelMultFactor
        ) * this.maxVel

        softMax = parsePositive(this.coseno) * this.maxVel

        if(
            this.currentXVel < -softMax
        ){
            this.currentXVel += (this.vel / this.velDecayDiv) + ((parsePositive(this.currentXVel) ** this.currentVelDecay) / 500)
        }else if(
            this.currentXVel > softMax
        ){
            this.currentXVel -= (this.vel / this.velDecayDiv) + ((this.currentXVel ** this.currentVelDecay) / 500)
        }

    }

    */

    fixVelocityX(){

        let softMax = CustomMath.diminishingReturns(
            parsePositive(this.coseno),
            this.maxVelMultFactor
        ) * this.maxVel

        softMax = ((parsePositive(this.coseno) * (this.maxVel * 2.1)) / 1)

        console.log(
            softMax
        )

        if(
            this.currentXVel < -softMax
            ||
            this.currentXVel > softMax
        ){

            if(this.currentXVel < 0){
                this.currentXVel += this.vel + (parsePositive(this.currentXVel) * 0.01)
            }else{
                this.currentXVel -= this.vel + (parsePositive(this.currentXVel) * 0.01)
            }

        }

    }

    fixVelocityY(){

        let softMax = CustomMath.diminishingReturns(
            parsePositive(this.seno),
            this.maxVelMultFactor
        ) * this.maxVel

        //softMax = parsePositive(this.seno) * this.maxVel

        softMax = ((parsePositive(this.seno) * (this.maxVel * 2.1)) / 1)// - (this.maxVel * (2 - this.seno))

        //softMax = parsePositive(this.seno) * this.maxVel

        console.log(
            softMax
        )

        if(
            this.currentYVel < -softMax
            ||
            this.currentYVel > softMax
        ){
            //this.currentYVel -= (this.vel / this.velDecayDiv) + ((parsePositive(this.currentYVel) ** this.currentVelDecay) / 500)

            let r = CustomMath.inverter(
                this.currentYVel
            ) 

            //console.log(r)

            //r = ((r * 2) * 2) * 2
            
            // this.currentVelDecay)

            r = r * (this.vel / 10)   //(r ** this.currentVelDecay)// / 1000

            //console.log(
              //  r//, this.currentVelDecay
            //)

            //this.currentYVel += r


            if(this.currentYVel < 0){
                this.currentYVel += this.vel + (parsePositive(this.currentYVel) * 0.01)
            }else{
                this.currentYVel -= this.vel + (parsePositive(this.currentYVel) * 0.01)
            }

            

        }

    }

}