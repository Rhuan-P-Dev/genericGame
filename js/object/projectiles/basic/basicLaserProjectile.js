
import { DamageController } from "../../../damage/damageController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { CloneObjectController } from "../../../generalUtils/cloneObject.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { VectorController } from "../../../generalUtils/vector.js"
import { ScreenRenderController } from "../../../graphics/screenRenderController.js"
import { ActivateController } from "../../../shipUnits/forAllShipUnits/activateController.js"
import { Object } from "../../basic/object.js"
import { RotableObject } from "../../basic/rotableObject.js"

var CloneObject
var GameState
var Activate
var ScreenRender
var Vector
var Damage

onInit(function(){

    CloneObject = new CloneObjectController()
    GameState = new GameStateController()
    Activate = new ActivateController()
    ScreenRender = new ScreenRenderController()
    Vector = new VectorController()
    Damage = new DamageController()

})

export class BasicLaserProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Object,
                RotableObject,
            ],
            build
        )

        this.width *= 2
        this.height *= 2

        this.priority -= 1

        Damage.addDamage(this, "physical", 0, true)

    }

    preLaserObserver = new Observer()
    posLaserObserver = new Observer()

    graphicID = "null"

    laserLength = 180
    laserColor = "undefined"

    passBuildList = {
        "remove_death animation": (updateThis) => {
            updateThis.onDeath.remove("last",11)
        }
    }

    getLaserLength(){
        return this.laserLength
    }

    predictLaser(object = this, distance = object.getLaserLength()){

        let predict = {}

        predict.x = object.x + (object.cosine * distance)
        predict.y = object.y + (object.sine * distance)

        return predict

    }

    getLeftRightPoints(object = this){

        const right_point = Vector.setAngle(
            object.getAngle()
            +
            Vector.getAngle(
                Vector.setAngle(Vector.toRadians(45)).y,
                Vector.setAngle(Vector.toRadians(45)).x,
            )
        )

        right_point.getAngle = object.getAngle
        right_point.xMult = object.xMult
        right_point.yMult = object.yMult
        right_point.x = object.x + (object.width * 1.35) * right_point.x
        right_point.y = object.y + (object.height * 1.35) * right_point.y

        /*

        ScreenRender.addDrawRequest(
            {
                "func": ScreenRender.drawCircle,
                "params": {
                    "x": right_point.x,
                    "y": right_point.y,
                    "radius": 2,
                    "color": "blue",
                    "lineWidth": 2,
                }
            }

        )

        */

        const left_point = Vector.setAngle(
            object.getAngle()
            +
            Vector.getAngle(
                Vector.setAngle(Vector.toRadians(-45)).y,
                Vector.setAngle(Vector.toRadians(-45)).x,
            )
        )

        left_point.getAngle = object.getAngle
        left_point.xMult = object.xMult
        left_point.yMult = object.yMult
        left_point.x = object.x + (object.width * 1.35) * left_point.x
        left_point.y = object.y + (object.height * 1.35) * left_point.y

        /*

        ScreenRender.addDrawRequest(
            {
                "func": ScreenRender.drawCircle,
                "params": {
                    "x": left_point.x,
                    "y": left_point.y,
                    "radius": 2,
                    "color": "red",
                    "lineWidth": 2,
                }
            }

        )

        */

        return [
            left_point,
            right_point,
        ]

    }

}