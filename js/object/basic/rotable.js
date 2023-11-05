
import { setFrameOut } from "../../frame/frameController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { CustomMathController } from "../../generalUtils/math.js"
import { VectorController } from "../../generalUtils/vector.js"
import { CommonImport } from "../common/commonImport.js"

var Vector = ""
var CustomMath = ""

onInit(function(){

    Vector = new VectorController()
    CustomMath = new CustomMathController()

})

export class Rotable {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    passBuildList = {
        "add_basic_rotateFunctions" : (updateThis) => {

            updateThis.modifierStatusOb.add({
                "func": "updateCircleStats",
                "class": updateThis
            })
    
            updateThis.modifierStatusOb.add({
                "func": "updateRadian",
                "class": updateThis
            })
    
            updateThis.rotateOb.add({
                "func": "rotationReset",
                "class": updateThis
            })
    
        }

    }

    rotateOb = new Observer()
    rightRotateOb = new Observer()
    leftRotateOb = new Observer()
    
    modifierStatusOb = new Observer()
    
    xMult = 1
    yMult = 0

    cosine = 1
    sine = 0

    radian = -Math.PI/2

    resetVel = Vector.toRadians(1) / 10
    rotationVel = Vector.toRadians(2)
    currentRotationVel = this.resetVel
    rotationMult = 2

    getPercentageOfCurrentRotationVel(percentage){
        return this.currentRotationVel * (percentage / 100)
    }

    setAngle(angle){

        let result = Vector.setAngle(angle)

        this.xMult = result.x
        this.yMult = result.y

        this.modifierStatusOb.run(this)

    }

    getAngle(){

        return Vector.getAngle(
            this.yMult,
            this.xMult,
        )

    }

    log(){ // delete???

        console.log("-------------------------")

        console.log(this)

        console.log(this.xMult)
        console.log(this.yMult)
        console.log(this.radian)
        console.log(this.cosine)
        console.log(this.sine)
        console.log(this.rotationVel)
        console.log(this.currentRotationVel)

        console.log("-------------------------")

    }

    rotateToRight(vel = null){

        // The value: this.currentRotationVel = X

        Vector.rotate(this, -vel || -this.currentRotationVel)
        
        this.rightRotateOb.run(vel || this.currentRotationVel)

        this.modifierStatusOb.run(vel || this.currentRotationVel)

        this.rotateOb.run(vel || this.currentRotationVel) // <- rotationReset <---- It's because of HIM!

        // The value: this.currentRotationVel = X2

    }

    rotateToLeft(vel = null){

        Vector.rotate(this, vel || this.currentRotationVel)

        this.leftRotateOb.run(vel || this.currentRotationVel)

        this.modifierStatusOb.run(vel || this.currentRotationVel)

        this.rotateOb.run(vel || this.currentRotationVel)

    }

    updateCircleStats(){

        let triangle = Vector.triangleFactory(this.xMult, this.yMult)

        this.cosine = triangle.cosine
        this.sine = triangle.sine

    }

    updateRadian(){

        this.radian = -Vector.getAngle(
            this.xMult,
            this.yMult
        )

    }

    rotationReset(){

        if(
            this.currentRotationVel * this.rotationMult <= this.rotationVel
        ){
            this.currentRotationVel *= this.rotationMult

        }else if(
            this.currentRotationVel < this.rotationVel
        ){
            this.currentRotationVel += this.rotationVel - this.currentRotationVel
        }

        setFrameOut(
            () => {
                this.currentRotationVel = this.resetVel
            },2,1, true, this.ID + "+rotationReset"
        )

    }

}