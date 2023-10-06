
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
    
    xMult = 0
    yMult = 1

    rightRotateOb = new Observer()
    leftRotateOb = new Observer()

    radian = 0

    rotate(theta){

        let sinTheta = Math.sin(theta)
        let cosTheta = Math.cos(theta)

        let newXMult = this.xMult * cosTheta + this.yMult * sinTheta
        let newYMult = -this.xMult * sinTheta + this.yMult * cosTheta

        this.xMult = newXMult
        this.yMult = newYMult

    }

    rotateD(theta){

        let sinTheta = Math.sin(theta)
        let cosTheta = Math.cos(theta)

        let h = this.xMult * cosTheta + this.yMult * sinTheta
        let hh = -this.xMult * sinTheta + this.yMult * cosTheta

        this.xMult = h
        this.yMult = hh


        /*
        o JS? tem um bug que se vc fizer
        issso: this.xMult = this.xMult * cosTheta + this.yMult * sinTheta
        o resultado é diferente
        disso: let h = this.xMult * cosTheta + this.yMult * sinTheta
        */
        //this.xMult = this.xMult * cosTheta + this.yMult * sinTheta


        //console.log(
        //    h, this.xMult
        //)

        //this.cccc(this)

    }

    rotatePoint(theta) {
        var x = this.xMult//point[0]; // cos value
        var y = this.yMult //point[1]; // sin value
    
        var xNew = x * Math.cos(theta) + y * Math.sin(theta);
        var yNew = -x * Math.sin(theta) + y * Math.cos(theta);
    
        console.log(
            xNew
        )

        this.xMult = xNew
        this.yMult = yNew
    }

    cccc(a){

        return

        a.xMult = parseInt(a.xMult * 1000000000) / 1000000000
        a.yMult = parseInt(a.yMult * 1000000000) / 1000000000
        return

        console.log(
            a.xMult,a.yMult
        )

        if(
            a.xMult <  0.0000000000001
            ||
            a.xMult < -0.0000000000001
        ){
            a.xMult *= 10
            console.warn("soft fix")
        }

        if(
            a.yMult <  0.0000000000001
            ||
            a.yMult < -0.0000000000001
        ){
            a.yMult *= 10
            console.warn("soft fix")
        }

        if(a.xMult == 0 && a.yMult == 0){
            a.xMult = a.cosine
            a.yMult = a.sine
            console.error("fix")
        }

    }

    getAngle(){
        return Math.atan2(this.xMult,this.yMult)
    }

    angle = (Math.PI / 180) * 4

    rotateToRight(){

        let localAngle = -this.angle

        this.rotate(localAngle)

        this.radian = -this.getAngle()

        this.rightRotateOb.run(this)

    }

    rotateToLeft(){

        let localAngle = this.angle

        this.rotate(localAngle)

        this.radian = -this.getAngle()

        this.leftRotateOb.run(this)

    }

    cosine = 0
    sine = 1

    updateCircleStats(rotable = this){

        let triangle = Vector.triangleFactory(rotable.xMult, rotable.yMult)

        rotable.cosine = triangle.cosine
        rotable.sine = triangle.sine


    }

}