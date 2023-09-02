import { FocusedTopDownBehavior } from "../AI/behavior/focusedTopDownBehavior.js"
import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { FrameController, setFrameOut } from "../frame/frameController.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { InheritController } from "../generalUtils/inherit.js"
import { MathController } from "../generalUtils/math.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { ShipCreatorController } from "../ship/shipCreatorController.js"
import { ActivateController } from "../shipUnits/forAllShipUnits/activateController.js"
import { SpecialController } from "../shipUnits/special/specialController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"
import { GenericEffectsController } from "./generic/genericEffectsController.js"
import { OtherEffectsController } from "./other/otherEffectsController.js"

var Frame = ""
var AIUtils = ""
var ScreenRender = ""
var Special = ""
var ShipCreator = ""
var Math = ""
var CloneObject = ""

var GenericEffects = ""
var OtherEffects = ""

onInit(function(){

    Frame = new FrameController()
    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    Special = new SpecialController()
    ShipCreator = new ShipCreatorController()
    Math = new MathController()
    CloneObject = new CloneObjectController()

    GenericEffects = new GenericEffectsController()
    OtherEffects = new OtherEffectsController()

})

export class EffectsController {

    effectsList = {}

    builded = false

    buildGeneric(){

        let allGenericEffects = GenericEffects.getAll()

        CloneObject.recursiveCloneAttribute(
            allGenericEffects.positive,
            this.effectsList
        )

        CloneObject.recursiveCloneAttribute(
            allGenericEffects.negative,
            this.effectsList
        )

    }

    buildOther(){

        let allOtherEffects = OtherEffects.getAll()

        CloneObject.recursiveCloneAttribute(
            allOtherEffects.positive,
            this.effectsList
        )

        CloneObject.recursiveCloneAttribute(
            allOtherEffects.negative,
            this.effectsList
        )

    }

    build(){

        if(this.builded){return}

        this.buildGeneric()

        this.buildOther()

        this.builded = true

    }

    typeTable = {
        "effect": this.addEffect,
        "onHit": this.addOn,
        "onDeath": this.addOn,
        "onDamage": this.addOn,
    }

    getAll(){
        this.build()
        return this.effectsList
    }

    get(effectName){
        this.build()
        return this.effectsList[effectName]
    }

    add(
        effectName,
        effectType,
        params,
        config = {},
        ID = randomUniqueID()
    ){

        this.typeTable[effectType](
            effectName,
            effectType,
            params,
            config,
            ID,
        )

    }

    addOn(
        effectName,
        effectType,
        params,
    ){

        params.object[effectType].add( (params) => {
            params = Effects.fix(params, effectName, "params")
            Effects.get(effectName).config.func(params)
        })

    }

    addEffect(
        effectName,
        effectType,
        params,
        config = {},
        ID = randomUniqueID(),
    ){

        Effects.fixer(
            {
                config,
                params,
            },
            effectName,
        )

        Frame.add(
            () => {
                Effects.get(effectName).config.func(params)
            },
            config.frameOut,
            config.repeat,
            config.overwrite,
            ID,
            () => {
                Effects.remove(params.object, ID)
            }
        )

        params.object.effects[ID] = {
            effectName,
            effectType,
            params,
            config,
            ID,
        }
        
    }

    fixer(data, effectName){

        this.fix(data.config, effectName, "config")
        this.fix(data.params, effectName, "params")

    }

    fix(data, effectName, name){

        let effect = Effects.get(effectName)

        CloneObject.recursiveCloneAttribute(
            effect[name],
            data,
        )

    }

    remove(object, ID){

        Frame.remove(ID)

        delete object.effects[ID]

    }

    removeAll(object){

        for (let effect in object.effects){

            this.remove(object, effect)

        }

        object.effects = {}

    }

}

var Effects = new EffectsController()