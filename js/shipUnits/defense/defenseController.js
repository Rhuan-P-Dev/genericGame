
import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { DamageController } from "../../damage/damageController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { CustomMathController } from "../../generalUtils/math.js"
import { VectorController } from "../../generalUtils/vector.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { ConsumeStatsController } from "../../misc/consumeStatsController.js"
import { ComplexOnTypeFunctions } from "../../object/instructions/onInstructions.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"

var Activate = ""
var ScreenRender = ""
var ConsumeStats = ""
var AIUtils = ""
var CustomMath = ""
var Vector = ""
var GameState = ""
var CustomMath = ""
var Damage

onInit(function(){

    Activate = new ActivateController()
    ScreenRender = new ScreenRenderController()
    ConsumeStats = new ConsumeStatsController()
    AIUtils = new AIUtilsController()
    CustomMath = new CustomMathController()
    Vector = new VectorController()
    GameState = new GameStateController()
    CustomMath = new CustomMathController()
    Damage = new DamageController()

})

export class DefenseController{

    useDefense(object, ID){

        Activate.useActivate(object, ID)

    }

    energyShield(object, activate, config){

        Damage.addTempStatOrder(
            config.duration+1,
            object,
            config.shieldType
        )

        setFrameOut(
            () => {
                ScreenRender.addDrawRequest(
                    {
                        "func": ScreenRender.drawCircle,
                        "params": {
                            "x": object.x + object.currentXVel,
                            "y": object.y + object.currentYVel,
                            "radius": object.width + object.height,
                            "color": config.color,
                            "lineWidth": config.lineWidth,
                        },
                    }
                )
            },
            1,
            config.duration
        )

    }

    antiProjectileSystem(object, activate, config){

        let allObjectsAround = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object,
            {
                "maxDistance": config.range,
            }
        )

        if(config.drawArea){

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": object.x,
                        "y": object.y,
                        "radius": config.range,
                        "color": config.color,
                        "lineWidth": config.lineWidth,
                    },
                }
            )

        }

        let loop = 0

        for(let objectName in allObjectsAround){

            if(object.energy <= 0){break}

            let currentObject = allObjectsAround[objectName]

            if(config.drawLine){

                ScreenRender.addDrawRequest(
                    {
                        "func": ScreenRender.drawLine,
                        "params": {
                            "positions": [
                                [
                                    object.x,
                                    object.y,
                                ],[
                                    currentObject.x,
                                    currentObject.y,
                                ]
                            ],
                            "color": config.color,
                            "lineWidth": config.lineWidth,
                        }
                    }
    
                )

            }

            currentObject.life.math("-", config.damage) //TODO?

            object.energy -= config.hitEnergyConsume


            if(typeof(config.maxObjects) == "number"){

                loop += 1

                if(config.maxObjects <= loop){break}

            }

        }

        if(loop != 0){
            activate.reloadTemp = config.hitReload
        }

    }

    directionalShield(object, activate, config){

        return // No...
        ///!!!!!!!!!!!!!!!!!!!!!!!
        // o codigo funciona, porem, as balas teleportão!

        let growthEffect = {
            "prefixFunc": [],
            "func": (params) => {

                console.log("================================================")

                let configAngleL = new VectorController().toRadians(-config.angle)
                let configAngleR = new VectorController().toRadians(config.angle)
                let objectAngle = params.object.getAngle()

                let diffR = configAngleR + objectAngle
                let diffL = configAngleL + objectAngle

                let otherObjectAngle = new VectorController().vectorNormalize(
                    params.otherObject,
                    params.object,
                )

                otherObjectAngle = new VectorController().getAngle(
                    otherObjectAngle.y,
                    otherObjectAngle.x,
                )

                if(
                    diffL < otherObjectAngle
                    &&
                    diffR > otherObjectAngle
                ){
                    
                    params.calcDamage = 0

                }

            },
            "suffixFunc": [""],
            "stage": "first",
            "priority": -10,
        }

        growthEffect.config = growthEffect

        new ComplexOnTypeFunctions().apply(growthEffect)

        object.onDamage.add(
            growthEffect,
            growthEffect.stage,
            growthEffect.priority
        )

    }

    reflectShield(object, activate, config){

        let allObjectsAround = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object,
            {
                "maxDistance": config.range,
            }
        )

        drawShildReflect(object, config.range, config.angle, config.angleDistortion)

        for(let objectName in allObjectsAround){

            let otherObject = allObjectsAround[objectName]

            if(
                AIUtils.isInObjectAngle(
                    object,
                    otherObject,
                    config.angle,
                    config.angleDistortion
                )
            ){
            
                otherObject.currentXVel = CustomMath.inverter(otherObject.currentXVel)
                otherObject.currentYVel = CustomMath.inverter(otherObject.currentYVel)

            }

        }

    }

    growth(object, activate, config){
       
        let growthEffect = {
            "prefixFunc": [],
            "func": (params) => {

                if(params.calcDamage <= 0){return}

                for(let stat in config.stats){

                    params.object[config.stats[stat]] += params.calcDamage * config.percentage

                }

            },
            "suffixFunc": [],
            "stage": "middle",
            "priority": 10,
        }

        growthEffect.config = growthEffect

        new ComplexOnTypeFunctions().apply(growthEffect)

        object.onDamage.add(
            growthEffect,
            growthEffect.stage,
            growthEffect.priority
        )

    }

    psychologicalDefense(object, activate, config){

        let effect = {
            "prefixFunc": [],
            "func": (params) => {

                params.calcDamage -= randomInteger(
                    -(config.defense * config.decay),
                    config.defense
                )

            },
            "suffixFunc": [],
            "stage": "middle",
            "priority": 0,
        }

        effect.config = effect

        new ComplexOnTypeFunctions().apply(effect)

        let priority = object.onDamage.add(
            effect,
            effect.stage,
            effect.priority
        )

        setFrameOut(
            () => {

                object.onDamage.remove(
                    effect.stage,
                    priority
                )

            },config.timer,1
        )

    }

    healOther(object, activate, config){

        let closestAlliesObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object,
            {
                "maxDistance": config.range,
                "includeEnemyTeam": false,
                "includeSameTeam": true,
                "includeYourself": true,
            }
        )

        for(let objectName in closestAlliesObjects){

            let otherObject = closestAlliesObjects[objectName]

            for (let index = 0; index < config.stats.length; index++) {

                const stat = config.stats[index]

                typeof object[stat] == "number" ? otherObject[stat] += config.heal : otherObject[stat].math("+", config.heal)

            }

        }

        ScreenRender.addDrawRequest(
            {
                "func": ScreenRender.drawCircle,
                "params": {
                    "x": object.x,
                    "y": object.y,
                    "radius": config.range,
                    "color": config.color
                },
            }
        )

    }

}

function drawShildReflect(start, range, angle, angleDistortion) {

    let startAngle = Vector.sumAngles(
        start.getAngle()
        +
        Vector.toRadians(angleDistortion)
    )

    let right = Vector.setAngle(
        Vector.toRadians(angle) + startAngle
    )
    let left = Vector.setAngle(
        Vector.toRadians(-angle) + startAngle
    )

    left.x *= range
    left.x += start.x
    left.y *= range
    left.y += start.y

    right.x *= range
    right.x += start.x
    right.y *= range
    right.y += start.y

    ScreenRender.addDrawRequest(
        {
            "func": ScreenRender.drawLine,
            "params": {
                "positions": [
                    [
                        right.x,
                        right.y,
                    ],[
                        start.x,
                        start.y,
                    ],[
                        left.x,
                        left.y,
                    ]
                ],
            }
        }
    )

    ScreenRender.addDrawRequest(
        {
            "func": ScreenRender.drawArc,
            "params": {
                "x": start.x,
                "y": start.y,
                "radius": range,
                "startAngle": Vector.toRadians(-angle) + startAngle,
                "endAngle": Vector.toRadians(angle) + startAngle
            }
        }
    )

}

var Defense = new DefenseController()