import { EffectsController } from "../../../effects/effectsController.js"
import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { Ship } from "../ship.js"

var Effects
var ObjectActivates
var Animations

onInit(function(){

    Effects = new EffectsController()
    ObjectActivates = new ObjectActivatesController()
    Animations = new AnimationsController()

})

/* Inspiration(s)

Overall idea: Rap do All Might (Boku no Hero Academia) - O SÍMBOLO DA PAZ | NERD HITS - https://youtu.be/JhYqNZNGLMM?si=fH4vZMXHoKh3vtE3&t=42

*/

export class Hero{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "hero - weak"

    }

    passBuildList = {

        "add_Hero_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "redemption lance")
                    ObjectActivates.giveActivate(object, "defense", "energy shield")
                    ObjectActivates.giveActivate(object, "factory", "safe perimeter carrier 1")
                    ObjectActivates.giveActivate(object, "factory", "safe perimeter carrier 1")
                }
            )

            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"hero's wish",
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut":1,
                        "repeat": 1,
                    },
                    "runTimeBuild": (object, animationConfig, loopConfig) => {
        
                        animationConfig.focus = object
        
                        animationConfig.offset = {
                            "x": 0,
                            "y": -50,
                        }
        
                    }
                }],
                true
            )

            setFrameOut(
                () => {
                    updateThis.graphicID = "hero - strong"
                },
                30*60
            )

            Effects.add(
                "one for all",
                "effect",
                {
                    "object": updateThis,
                },{
                    "frameOut": 30*60
                },
                true
            )

            Effects.add(
                "redemption of the heart",
                "effect",
                {
                    "object": updateThis,
                },{},
                true
            )

            Effects.add(
                "inspiration",
                "effect",
                {
                    "object": updateThis,
                },{},
                true
            )

            Effects.add(
                "inspiration",
                "onKill",
                {
                    "object": updateThis,
                },{},
                true
            )

            Effects.add(
                "harm to good",
                "onDamage",
                {
                    "object": updateThis,
                },{},
                true
            )

        },

    }

}