
import { VectorController } from "../../generalUtils/vector.js"

var Vector = ""

onInit(function(){

    Vector = new VectorController()

})

export class Rotable {

    constructor(){

        this.modifierStatusOb.add({
            "func": "updateCircleStats",
            "class": this
        })

        this.modifierStatusOb.add({
            "func": "updateRadian",
            "class": this
        })

    }
    
    xMult = 1
    yMult = 0

    rightRotateOb = new Observer()
    leftRotateOb = new Observer()

    modifierStatusOb = new Observer()

    radian = -1.57

    angle = Vector.toRadians(2)

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

        console.log("-------------------------")

    }

    rotateToRight(angle = this.angle){

        Vector.rotate(this, -angle)

        this.rightRotateOb.run(this)

        this.modifierStatusOb.run(this)

    }

    rotateToLeft(angle = this.angle){

        Vector.rotate(this, angle)

        this.leftRotateOb.run(this)

        this.modifierStatusOb.run(this)

    }

    cosine = 1
    sine = 0

    updateCircleStats(rotable = this){

        let triangle = Vector.triangleFactory(rotable.xMult, rotable.yMult)

        rotable.cosine = triangle.cosine
        rotable.sine = triangle.sine

    }

    updateRadian(rotable = this){

        rotable.radian = -Vector.getAngle(
            rotable.xMult,
            rotable.yMult
        )

    }

}