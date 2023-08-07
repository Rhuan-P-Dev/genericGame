import { FocusedTopDownBehavior } from "../AI/behavior/focusedTopDownBehavior.js"
import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { FrameController, setFrameOut } from "../frame/frameController.js"
import { InheritController } from "../generalUtils/inherit.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { ShipCreatorController } from "../ship/shipCreatorController.js"
import { ActivateController } from "../shipUnits/forAllShipUnits/activateController.js"
import { SpecialController } from "../shipUnits/special/specialController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"

var Frame = ""
var AIUtils = ""
var ScreenRender = ""
var Special = ""
var ShipCreator = ""

onInit(function(){

    Frame = new FrameController()
    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    Special = new SpecialController()
    ShipCreator = new ShipCreatorController()

})

export class EffectsController {

    effectsList = {
        "red": (params) => {

            params.object.life -= 100

        },
        "infinity energy": (params) => {

            params.object.energy = params.object.maxEnergy 

        },
        "evolutron": (params) => {

            Special.lvUp(
                params.object,
                undefined,
                {
                    "statsMult": params.statsMult
                }
            )

        },
        "second stage": (params) => {

            Special.lvUp(
                params.object,
                undefined,
                {
                    "statsMult": 5
                }
            )

        },
        "bounty hunter": (params) => {

            ShipCreator.createShip("enemyTeam", ["movable","turret"]).color = "purple"
            ShipCreator.createShip("enemyTeam", ["movable","turret"]).color = "purple"
            ShipCreator.createShip("enemyTeam", ["movable","turret"]).color = "purple"
            ShipCreator.createShip("enemyTeam", ["movable","turret"]).color = "purple"

        },
        "clone": (params) => {

            Special.weakClone(
                params.object,
                undefined,
                {
                    "statsMult": params.statsMult
                }
            )

        },
        "illusion": (params) => {

            Special.illusion(
                params.object,
            )

        },
        "gojo": (params) => {

            let range = 100

            let closestObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "maxDistance": range
                }
            )

            ScreenRender.addDrawRequest(
                ScreenRender.drawCircle,
                {
                    "x": params.object.x,
                    "y": params.object.y,
                    "radius": range,
                }
            )

            for (let index = 0; index < closestObjects.length; index++) {

                let object = closestObjects[index]

                let mult = linear(
                    AIUtils.getDistanceOfObjects(params.object, object),
                    range,
                )

                object.currentXVel -= object.currentXVel * mult
                object.currentYVel -= object.currentYVel * mult

            }

        },
        "MR": (params) => {

            let object = params.object

            let missile = new WeaponsController().createMissile(object)

            missile.damage = params.target.damage

            new InheritController().inherit(
                missile,
                [
                    FocusedTopDownBehavior,
                ]
            )

            new ActivateController().basicAjustObject(object, missile)

            new ActivateController().addObject(missile)

        },
        "RAIO": (params) => {

            let closestObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "maxDistance": params.range,
                    "includeEnemyTeam": false,
                    "includeSameTeam": true,
                    "includeYourself": false,
                }
            )

            ScreenRender.addDrawRequest(
                ScreenRender.drawCircle,
                {
                    "x": params.object.x,
                    "y": params.object.y,
                    "radius": params.range,
                }
            )

            let closestObject = AIUtils.getObject(
                closestObjects,
                params.object,
                "closest"
            )

            params.object.life -= params.damage

            if(closestObject){

                ScreenRender.addDrawRequest(
                    ScreenRender.drawLine,
                    {
                        "start": params.object,
                        "goal": closestObject,
                    }
                )

                Effects.add(
                    "RAIO",
                    "effect",
                    {
                        "object": closestObject,
                        "range": params.range/2,
                        "damage": params.damage/2
                    },
                    30,
                    1
                )

            }

        }
    }

    typeTable = {
        "effect": this.addEffect,
        "onHit": this.addOn,
        "onDeath": this.addOn,
    }

    getAll(){
        return this.effectsList
    }

    get(effectName){
        return this.effectsList[effectName]
    }

    add(
        effectName,
        effectType,
        params,
        frameOut = 60,
        repeat = -1,
        overwrite = false,
        name = undefined
    ){

        this.typeTable[effectType](
            effectName,
            effectType,
            params,
            frameOut,
            repeat,
            overwrite,
            name,
        )

        // effect sao efeitoa. onhit, ondeath, oneffect?

    }

    addOn(
        effectName,
        effectType,
        params,
        frameOut,
        repeat,
        overwrite,
        name,
    ){

        effectType += "Functions"

        params.object[effectType].add( (params) => {
            Effects.get(effectName)(params)
        })

    }

    addEffect(
        effectName,
        effectType,
        params,
        frameOut,
        repeat,
        overwrite,
        name,
    ){

        Frame.add(
            () => {
                Effects.get(effectName)(params)
            },
            frameOut,
            repeat,
            overwrite,
            name,
        )

    }

}

var Effects = new EffectsController()

function linear(current, max){

    let result = current / max

    result = 1 - result

    return result

}