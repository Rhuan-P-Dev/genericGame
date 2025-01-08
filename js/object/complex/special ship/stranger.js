import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { setFrameOut } from "../../../frame/frameController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { KeyBoardController } from "../../../keyboard/keyBoardController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { Ship } from "../ship.js"

var Effects
var Animations
var Damage
var ObjectActivates
var GameState
var KeyBoard

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()
    Damage = new DamageController()
    ObjectActivates = new ObjectActivatesController()
    GameState = new GameStateController()
    KeyBoard = new KeyBoardController()

})

export class Stranger{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "stranger"

        this.priority *= 1.5

    }

    passBuildList = {

        "add_stranger_special": (updateThis) => {

            updateThis.onDeath.add({
                "func": (params) => {

                    if(!params.object.respawn){
                        params.object.respawn = 5*60
                    }else{
                        params.object.respawn *= 1.25
                    }

                    let objectExist = GameState.getObjectOperationSlots(params.object.ID)

                    setFrameOut(
                        () => {

                            if(
                                params.object.ID == GameState.getPlayer().ID
                            ){
                                KeyBoard.makeObjectInPlayerControl(
                                    params.object
                                )
                            }

                            GameState.addObject(
                                params.object,
                                objectExist.AI,
                                objectExist.team,
                                objectExist.render,
                                objectExist.physics,
                                objectExist.rules,
                                objectExist.stats
                            )

                            params.object.maxLife = 200
                            params.object.life.set(200)

                        },
                        params.object.respawn,
                        1
                    )

                },
            },"last",0)

        },

    }

}