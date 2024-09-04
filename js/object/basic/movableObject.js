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
    maxVel = 6

    velDecay = 0.95

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

    disableAdvanceResul = {
        "advanceShip": undefined,
    }

    disableAdvance(){

        if(
            this.disableAdvanceResul
            &&
            this.disableAdvanceResul.advanceShip === undefined
        ){

            this.disableAdvanceResul.advanceShip = this.advanceShip

            this.advanceShip = () => {}

        }

    }

    enableAdvance(){

        this.advanceShip = this.disableAdvanceResul.advanceShip

        this.disableAdvanceResul.advanceShip = undefined

    }

    advanceShipX(){

        this.currentXVel += this.vel * this.cosine

    } 

    advanceShipY(){

        this.currentYVel += this.vel * this.sine

    }

    fixVelocityX(){

        if(
            parsePositive(this.cosine) * this.maxVel < parsePositive(this.currentXVel)
        ){
            this.currentXVel *= this.velDecay
            if(this.currentXVel < 0){
                this.currentXVel += this.vel/5
            }else{
                this.currentXVel -= this.vel/5
            }
        }

    }

    fixVelocityY(){

        if(
            parsePositive(this.sine) * this.maxVel < parsePositive(this.currentYVel)
        ){
            this.currentYVel *= this.velDecay
            if(this.currentYVel < 0){
                this.currentYVel += this.vel/5
            }else{
                this.currentYVel -= this.vel/5
            }
        }

    }

}