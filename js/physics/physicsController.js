
import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { DamageController } from "../damage/damageController.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"

var GameState = ""
var AIUtils = ""
var Damage = ""
var ScreenRender

onInit(function(){

    GameState = new GameStateController()
    AIUtils = new AIUtilsController()
    Damage = new DamageController()
    ScreenRender = new ScreenRenderController()

})

export class PhysicsController {

    update(){

        let allObjectsPhysics = GameState.getAllObjectsPhysics()

        for(let objectName in allObjectsPhysics){
            let object = allObjectsPhysics[objectName]

            Physics.movimentationSimulation(object)
            Physics.colisonSimulation(object)
            Physics.laserSimulation(object)

        }
    }

    movimentationSimulation(object){

        object.x += object.currentXVel
        object.y += object.currentYVel

    }

    colisonSimulation(object){

        let allObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object
        )

        for (let index = 0; index < allObjects.length; index++) {

            let currentObject = allObjects[index]
         
            let distance = AIUtils.getDistanceOfObjects(object, currentObject)
            
            if(distance < object.width + currentObject.width){
                
                object.onHit.run({
                    "object": object,
                    "otherObject": currentObject,
                })

            }

        }

    }

    laserSimulation(object){

        if(
            object.laserLength !== undefined
        ){

            let owner = object

            while(owner.owner){
    
                owner = owner.owner
    
            }

            object.preLaserObserver.run({
                "object": object,
                "owner": owner,
            })

            const predict = object.predictLaser()

            const enemyObjects = AIUtils.getObjectInCoordinates(
                object,
                object,
                predict,
                object.getAngle(),
                {
                    "maxDistance": object.getLaserLength()*2
                }
            )

            var laserDamage = object.damage
            var laserWidthHeight = object.width + object.height

            var basePoint = undefined
            var tempPredict = object

            if(
                !enemyObjects
                ||
                enemyObjects.length === 0
            ){

                ScreenRender.addDrawRequest(
                    {
                        "func": ScreenRender.drawLine,
                        "params": {
                            "positions": [
                                [
                                    predict.x,
                                    predict.y,
                                ],[
                                    object.x,
                                    object.y,
                                ]
                            ],
                            "color": object.laserColor,
                            "lineWidth":
                            object.width + object.height,
                            IGORE_IN_FOCUS: true
                        }
                    }
    
                )

                object.posLaserObserver.run({
                    "object": object,
                    "owner": owner,
                    "laserWidthHeight": laserWidthHeight,
                    "laserDamage": laserDamage,
                    "predict": predict,
                    "tempPredict": tempPredict,
                })

                return
            }

            const enemyObjectsWithDistance = enemyObjects.map(
                enemyObject => [
                    enemyObject,
                    AIUtils.getDistanceOfObjects(object, enemyObject)
                ]
            ).sort((a, b) => a[1] - b[1])

            for (
                let index = 0;
                index < enemyObjectsWithDistance.length;
                index++
            ) {
                const enemyObject = enemyObjectsWithDistance[index][0]
                const enemyDistance = enemyObjectsWithDistance[index][1]

                basePoint = tempPredict
                tempPredict = object.predictLaser(object, enemyDistance/2)

                ScreenRender.addDrawRequest(
                    {
                        "func": ScreenRender.drawLine,
                        "params": {
                            "positions": [
                                [
                                    basePoint.x,
                                    basePoint.y,
                                ],[
                                    tempPredict.x,
                                    tempPredict.y,
                                ]
                            ],
                            "color": object.laserColor,
                            "lineWidth": laserWidthHeight,
                            IGORE_IN_FOCUS: true
                        }
                    }
    
                )

                Damage.doMinimalAttack(
                    laserDamage,
                    object.damageTypes,
                    object,
                    enemyObject,
                )

                const laserXEnemy = Math.min(
                    laserWidthHeight / (enemyObject.width + enemyObject.height),
                    1
                )

                if(
                    laserXEnemy !== 1
                ){

                    laserWidthHeight *= laserXEnemy
                    laserDamage *= laserXEnemy

                }

            }

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawLine,
                    "params": {
                        "positions": [
                            [
                                tempPredict.x,
                                tempPredict.y,
                            ],[
                                predict.x,
                                predict.y,
                            ]
                        ],
                        "color": object.laserColor,
                        "lineWidth": laserWidthHeight,
                        IGORE_IN_FOCUS: true
                    }
                }

            )

            object.posLaserObserver.run({
                "object": object,
                "owner": owner,
                "laserWidthHeight": laserWidthHeight,
                "laserDamage": laserDamage,
                "predict": predict,
                "tempPredict": tempPredict,
            })

        }

    }

}

var Physics = new PhysicsController()