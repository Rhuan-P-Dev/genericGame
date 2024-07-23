import { Object } from "./object.js"

import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { CustomMathController } from "../../generalUtils/math.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { Rotable } from "./rotable.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { ComplexRenderController } from "../../graphics/complexRenderController.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { setFrameOut } from "../../frame/frameController.js"

var AIUtils = ""
var CustomMath = ""
var ScreenRender
var ComplexRender

onInit(function(){

    AIUtils = new AIUtilsController()
    CustomMath = new CustomMathController()
    ScreenRender = new ScreenRenderController()
    ComplexRender = new ComplexRenderController()

})

export class MovableObject {

    vel = 0.1
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

    addMovimentationTrace(){

        let object = new Object()

        object.team = "particule"
        object.graphicID = "trace particule"
        object.color = "red"
        object.radian = 0
        object.width = 6
        object.height = 6

        object.x = this.x + randomInterval(object.width/2)
        object.y = this.y + randomInterval(object.height/2)

        setFrameOut(
            () => {

                ScreenRender.addDrawRequest(
                    {
                        "func": () => {

                            ComplexRender.renderComplexFormat(object)
        
                            ScreenRender.reset({
                                "x": 0,
                                "y": 0,
                                "radian": 0
                            })
        
                        },
                        "params": object,
                    }
                )

                
            },
            1,
            10,
        )

        return

        new AnimationsController().run({
            "name":"trace",
            "focus": {
                "x": this.x,
                "y": this.y,
            },
            "offset": {
                "x": randomInterval(this.height/2),
                "y": randomInterval(this.width/2),
            },
            "frameRandomOffsetX": 0,
            "frameRandomOffsetY": 0,
            "randomPointOffsetX": 0,
            "randomPointOffsetY": 0,
        })


    }

    advanceShip(){
        
        this.advanceShipX()
        this.fixVelocityX()

        this.advanceShipY()
        this.fixVelocityY()

        this.addMovimentationTrace()

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