
import { VectorController } from "../../generalUtils/vector.js"

var Vector = ""

onInit(function(){

    Vector = new VectorController()

})

export class Rotable {

    constructor(){

        this.rightRotateOb.add({
            "func": "updateCircleStats",
            "class": this
        })

        this.leftRotateOb.add({
            "func": "updateCircleStats",
            "class": this
        })

    }

    frontLineMult = 7
    
    xMult = 0
    yMult = 1

    stepMult = Math.PI /  (1.5 * 60)
    xStepMult = Math.PI / (1.5 * 60)
    yStepMult = Math.PI / (1.5 * 60)

    xyMultLimit = 1

    rightRotateOb = new Observer()
    leftRotateOb = new Observer()

    rotateToRight(){

        this.fixRotateRight()

        this.xMult -= this.xStepMult
        this.yMult -= this.yStepMult

        this.rightRotateOb.run(this)

    }

    rotateToLeft(){

        this.fixRotateLeft()

        this.xMult += this.xStepMult
        this.yMult += this.yStepMult

        this.leftRotateOb.run(this)

    }

    fixRotateRight(){

        if(this.xMult <= -this.xyMultLimit){
            this.xStepMult = -this.stepMult
        }else if(this.xMult >= this.xyMultLimit){
            this.xStepMult = this.stepMult
        }
    
        if(this.yMult <= -this.xyMultLimit){
            this.yStepMult = -this.stepMult
        }else if(this.yMult >= this.xyMultLimit){
            this.yStepMult = this.stepMult
        }

    }

    fixRotateLeft(){
        if(this.xMult <= -this.xyMultLimit){
            this.xStepMult = this.stepMult
        }else if(this.xMult >= this.xyMultLimit){
            this.xStepMult = -this.stepMult
        }
    
        if(this.yMult <= -this.xyMultLimit){
            this.yStepMult = this.stepMult
        }else if(this.yMult >= this.xyMultLimit){
            this.yStepMult = -this.stepMult
        }
    }

    coseno = 0
    seno = 1

    updateCircleStats(rotable){

        let triangle = Vector.triangleFactory(rotable.xMult, rotable.yMult)

        rotable.coseno = triangle.coseno
        rotable.seno = triangle.seno


    }

}