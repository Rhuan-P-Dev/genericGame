
import { setFrameOut } from "../../frame/frameController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { VectorController } from "../../generalUtils/vector.js"
import { CommonImport } from "../common/commonImport.js"

var Vector = ""

onInit(function(){

    Vector = new VectorController()

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

            updateThis.modifierStatusObserver.add({
                "func": "updateCircleStats",
                "class": updateThis
            })
    
            updateThis.modifierStatusObserver.add({
                "func": "updateRadian",
                "class": updateThis
            })
    
            updateThis.rotateObserver.add({
                "func": "rotationReset",
                "class": updateThis
            })
    
        }

    }

    rotateObserver = new Observer()
    rightRotateObserver = new Observer()
    leftRotateObserver = new Observer()
    
    setAngleObserver = new Observer()
    modifierStatusObserver = new Observer()
    
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

        this.setAngleObserver.run(this)

        this.modifierStatusObserver.run(this)

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
        
        this.rightRotateObserver.run(vel || this.currentRotationVel)

        this.modifierStatusObserver.run(vel || this.currentRotationVel)

        this.rotateObserver.run(vel || this.currentRotationVel) // <- rotationReset <---- It's because of HIM!

        // The value: this.currentRotationVel = X2

    }

    rotateToLeft(vel = null){

        Vector.rotate(this, vel || this.currentRotationVel)

        this.leftRotateObserver.run(vel || this.currentRotationVel)

        this.modifierStatusObserver.run(vel || this.currentRotationVel)

        this.rotateObserver.run(vel || this.currentRotationVel)

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
            },2,1, true, this.ID + " rotationReset"
        )

    }

    disableRotationResul = {
        "rotateToLeft": undefined,
        "rotateToRight": undefined
    }

    disableRotation(){

        if(
            this.disableRotationResul
            &&
            this.disableRotationResul.rotateToLeft === undefined
            &&
            this.disableRotationResul.rotateToRight === undefined
        ){

            this.disableRotationResul.rotateToLeft = this.rotateToLeft
            this.disableRotationResul.rotateToRight = this.rotateToRight

            this.rotateToLeft = () => {}
            this.rotateToRight = () => {}
        }

    }

    enableRotation(){

        this.rotateToLeft = this.disableRotationResul.rotateToLeft
        this.rotateToRight = this.disableRotationResul.rotateToRight

        this.disableRotationResul.rotateToLeft = undefined
        this.disableRotationResul.rotateToRight = undefined

    }

}