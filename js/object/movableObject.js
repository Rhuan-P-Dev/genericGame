import { Object } from "./object.js"

export class MovableObject extends Object {

    vel = 0.05
    maxVel = 3

    prioritys = {
        priority: 1,
        targetPriority: undefined,
        above: undefined,
        nothing: undefined,
    }

    constructor(){

        super()

        this.typeOfObject = "MovableObject"

    }


    advanceShip(){

        if(this.checkVelocityX()){
            this.advanceShipX()
        }

        if(this.checkVelocityY()){
            this.advanceShipY()
        }

    }

    advanceShipX(){
        this.currentXVel += this.vel * this.xMult
    }

    advanceShipY(){
        this.currentYVel += this.vel * this.yMult
    }

    checkVelocityX(){

        let currentTempXVel = this.currentXVel

        currentTempXVel += this.vel * this.xMult

        let currentTempXVel_positive = parsePositive(currentTempXVel)
        let currentXVel_positive = parsePositive(this.currentXVel)

        if(currentXVel_positive > currentTempXVel_positive){
            return true
        }

        let softXMult = parsePositive(this.xMult)

        if(
            currentTempXVel < ( -this.maxVel * softXMult )
            ||
            currentTempXVel > ( this.maxVel * softXMult )
        ){
            return false
        }

        return true
    }

    checkVelocityY(){

        let currentTempYVel = this.currentYVel

        currentTempYVel += this.vel * this.yMult

        let currentTempYVel_positive = parsePositive(currentTempYVel)
        let currentYVel_positive = parsePositive(this.currentYVel)

        if(currentYVel_positive > currentTempYVel_positive){
            return true
        }

        let softYMult = parsePositive(this.yMult)

        if(
            currentTempYVel < ( -this.maxVel * softYMult )
            ||
            currentTempYVel > ( this.maxVel * softYMult )
        ){
            return false
        }

        return true

    }

}