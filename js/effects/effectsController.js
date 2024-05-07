import { FocusedTopDownBehavior } from "../AI/behavior/focusedTopDownBehavior.js"
import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { FrameController, setFrameOut } from "../frame/frameController.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { InheritController } from "../generalUtils/inherit.js"
import { CustomMathController } from "../generalUtils/math.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { ComplexOnTypeFunctions } from "../object/instructions/onInstructions.js"
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
var CustomMath = ""
var CloneObject = ""

var GenericEffects = ""
var OtherEffects = ""

onInit(function(){

    Frame = new FrameController()
    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    Special = new SpecialController()
    ShipCreator = new ShipCreatorController()
    CustomMath = new CustomMathController()
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

    checkEffect(effectName, effectType,){

        if(effectType != "effect"){
            effectType = "on"
        }

        if(this.get(effectName)[effectType]){
            return true
        }else{
            return false
        }
    }

    apply(
        applyType,
        effectName,
        effectType,
        params,
        config = {},
        ID = randomUniqueID()
    ){

        let tempConfig = {
            "prefixFunc": [],
            "suffixFunc": ["deleteInstruction"],

            "stage": "middle",
            "priority": 5,
        }

        tempConfig.func = (localParams) => {

            params.object = localParams.otherObject

            Effects.add(
                effectName,
                effectType,
                params,
                config,
                false,
                ID,
            )
            
        }

        new ComplexOnTypeFunctions().apply(tempConfig)

        params.object[applyType].add(
            tempConfig,
            tempConfig.stage || "first",
            tempConfig.priority || 0
        )

    }

    add(
        effectName,
        effectType,
        params,
        config = {},
        promise = false,
        ID = randomUniqueID()
    ){

        if(!this.checkEffect(effectName, effectType)){return false}

        this.typeTable[effectType](
            effectName,
            effectType,
            params,
            config,
            promise,
            ID,
        )

    }

    addOn(
        effectName,
        effectType,
        params,
        config
    ){

        Effects.fix(config, effectName, "on", "config")

        new ComplexOnTypeFunctions().apply(config)

        let oldFunc = config.func

        config.config = config

        config.func = (runtimeParams) => {

            Effects.fix(params, effectName, "on", "params")

            CloneObject.recursiveCloneAttribute(
                params,
                runtimeParams,
                true,
            )

            oldFunc(runtimeParams)

        }

        params.object[effectType].add(
            config,
            config.stage || "first",
            config.priority || 0
        )

        delete params.object

    }

    addEffect(
        effectName,
        effectType,
        params,
        config = {},
        promise = false,
        ID = randomUniqueID(),
    ){

        Effects.fixer(
            {
                config,
                params,
            },
            effectName,
            "effect"
        )

        if(!promise){

            let effect = Effects.get(effectName).effect
            let effectBefore = effect.before
            let effectAfter = effect.after

            if(effectBefore){

                Frame.add(
                    () => {
                        effectBefore.config.func(params)
                    },
                    effectBefore.config.frameOut || config.frameOut,
                    effectBefore.config.repeat || config.repeat,
                    config.overwrite,
                    ID+"_before",
                    () => {
                        Effects.remove(params.object, ID+"_before")
                    }
                )

                params.object.effects[ID+"_before"] = {
                    effectName,
                    effectType,
                    params,
                    "config": effectBefore.config || config,
                    promise,
                    ID,
                }

            }

            Frame.add(
                () => {
                    
                    effect.config.func(params)

                },
                config.frameOut,
                config.repeat,
                config.overwrite,
                ID,
                () => {
                    Effects.remove(params.object, ID)
                }
            )

            if(effectAfter){

                Frame.add(
                    () => {
                        effectAfter.config.func(params)
                    },
                    effectAfter.config.frameOut || config.frameOut,
                    effectAfter.config.repeat || config.repeat,
                    config.overwrite,
                    ID+"_after",
                    () => {
                        Effects.remove(params.object, ID+"_after")
                    }
                )

                params.object.effects[ID+"_after"] = {
                    effectName,
                    effectType,
                    params,
                    "config": effectAfter.config || config,
                    promise,
                    ID,
                }

            }

        }

        params.object.effects[ID] = {
            effectName,
            effectType,
            params,
            config,
            promise,
            ID,
        }
        
    }

    fixer(data, effectName, type){

        this.fix(data.config, effectName, type, "config")
        this.fix(data.params, effectName, type, "params")

    }

    fix(data, effectName, type, name){

        let effect = Effects.get(effectName)

        CloneObject.recursiveCloneAttribute(
            effect[type][name],
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

    closePromises(object){
       
        for (let index in object.effects){

            let effect = object.effects[index]

            if(effect.promise){

                effect.promise = false

                this.add(
                    effect.effectName,
                    effect.effectType,
                    effect.params,
                    effect.config,
                    effect.promise,
                    effect.ID,
                )

            }

        }
        
    }

    applyEffects(object, effects){

        for (let index = 0; index < effects.length; index++) {

            let currentEffect = effects[index]

            let global = CloneObject.recursiveCloneAttribute(currentEffect)

            let apply = global.apply

            let effect = global.effect

            effect.params.object = object

            this.applyEffect(
                effect,
                apply
            )
            
        }

    }

    applyEffect(
        effect,
        apply
    ){

        if(apply.apply){

            Effects.apply(
                apply.applyType,
                effect.config.name,
                effect.config.type,
                effect.params,
                effect.config,
            )

        }else{

            Effects.add(
                effect.config.name,
                effect.config.type,
                effect.params,
                effect.config,
            )

        }

    }

}

var Effects = new EffectsController()