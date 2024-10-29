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

    defaultTempConfig = {
        "prefixFunc": [],
        "suffixFunc": ["deleteInstruction"],
        
        "stage": "middle",
        "priority": 5,
    }

    apply(
        applyType,
        tempConfig,
        effectName,
        effectType,
        params,
        config = {},
    ){

        CloneObject.recursiveCloneAttribute(this.defaultTempConfig, tempConfig)

        tempConfig.func = (localParams) => {

            let objects = []

            if(
                localParams.otherObject
                &&
                !localParams.otherObjectMaster
            ){

                objects.push(localParams.otherObject)

            }else if(localParams.otherObjectMaster){

                objects.push(localParams.otherObjectMaster)

            }else{

                objects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                    params.object,
                    {
                        "maxDistance": params.range,
                        "includeEnemyTeam": true,
                        "includeSameTeam": false,
                        "includeYourself": false,
                    }
                )
            }

            for (
                let index = 0;
                index < objects.length
                &&
                objects[index].ID;
                index++
            ) {

                let newParams = CloneObject.recursiveCloneAttribute(params)

                newParams.object = objects[index]

                if(
                    effectName === "effect"
                ){
                    Effects.fix(newParams, effectName, effectType, "params")
                }

                Effects.linkOwnerToEffect(
                    newParams,
                    localParams.object,
                    false
                )

                Effects.add(
                    effectName,
                    effectType,
                    newParams,
                    config,
                    false,
                    randomUniqueID()
                )
                
            }
            
        }

        new ComplexOnTypeFunctions().apply(tempConfig)

        tempConfig.config = tempConfig

        return params.object[applyType].add(
            tempConfig,
            tempConfig.stage || "first",
            tempConfig.priority || 0
        )

    }

    fakeObjectsNames = [
        "parasiteSelfAttack",
        "parasiteBlasterAttack",
        "parasiteObject",
        "fakeObject"
    ]

    linkOwnerToEffect(params, owner, force = true){

        for(let fakeNameIndex in Effects.fakeObjectsNames){

            let fakeName = Effects.fakeObjectsNames[fakeNameIndex]

            if(
                !params[fakeName]
                &&
                force
            ){
                params[fakeName] = {}
            }

            if(params[fakeName]){
                params[fakeName].owner = owner
            }

        }

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

        return this.typeTable[effectType](
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

        if(!config.before){
            config.before = {}
        }

        Effects.fix(config, effectName, "on", "config")
        Effects.fix(config.before, effectName, "on", "before")

        new ComplexOnTypeFunctions().apply(config)

        let oldFunc = config.func
        let oldFuncBefore = config.before?.config?.func || null

        let callFuncs = (runtimeParams) => {
            if(oldFuncBefore){oldFuncBefore(runtimeParams)}
            oldFunc(runtimeParams)
        }

        config.config = config

        config.func = (runtimeParams) => {

            Effects.fix(params, effectName, "on", "params")

            CloneObject.recursiveCloneAttribute(
                params,
                runtimeParams,
                true,
            )

            callFuncs(runtimeParams)

        }

        let priority = params.object[effectType].add(
            config,
            config.stage || "first",
            config.priority || 0
        )

        delete params.object

        return {
            priority,
            "stage": config.stage || "first"
        }

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

        return ID
        
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
        Frame.remove(ID+"_before")
        Frame.remove(ID+"_after")

        delete object.effects[ID]
        delete object.effects[ID+"_before"]
        delete object.effects[ID+"_after"]

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
                apply.tempConfig || {},
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

    getAllEffectsInfo(object){

        let effects = []

        let maybeEffects = [
            ...object.onDamage.getAll(true),
            ...object.onHit.getAll(true),
            ...object.onDeath.getAll(true),
        ]

        for (let index = 0; index < maybeEffects.length; index++) {

            let maybeEffect = maybeEffects[index]

            if(maybeEffect.effectName){
                effects.push(
                    maybeEffect
                )
            }

        }

        for (let ID in object.effects){

            effects.push(object.effects[ID])

        }

        return effects

    }

    getTotalEffects(object){
        return Object.keys(object.effects).length + this.getEffectsCount(object)
    }

    // maybe this score is wrong
    formatEffectsScore(
        effect,
        effectsObject = {
            "add": {
                "effect": [],
                "onHit": [],
                "onDamage": [],
                "onDeath": []
            },
            "apply": []
        }
    ){

        if(!effect){return effectsObject}

        let effectName = effect[0]
        let deBuff = effect[1]
        let applyType = effect[2]

        if(deBuff == "positive"){

            effectsObject.add[applyType].push(effectName)

        }else{

            let metaEffectType = applyType
            let metaApplyType = "onDamage"

            if(GenericEffectsScorer.haveThis(
                effectName
            )){
                metaEffectType = "effect"

                if(applyType !== "effect"){
                    metaApplyType = applyType
                }

            }

            effectsObject.apply.push(
                Effects.simpleApplyEffectsTemplate(
                    effectName,
                    metaEffectType,
                    true,
                    metaApplyType,
                    false
                )
            )

        }

        return effectsObject
    }

    formatAllEffectsScore(effects){

        let effectsObject = this.formatEffectsScore()

        if(!effects){effects = []}

        for (let index = 0; index < effects.length; index++) {

            if(!effectsObject){
                effectsObject = this.formatEffectsScore(
                    effects[index]
                )
            }else{
                effectsObject = this.formatEffectsScore(
                    effects[index],
                    effectsObject
                )
            }

        }

        return effectsObject

    }

    addEffectsInActivates(object, effects){

        for (let index = 0; index < effects.length; index++) {

            let effect = effects[index]

            for (let ID in object.activates) {

                this.addEffectInActivate(
                    object.activates[ID],
                    effect
                )

            }

        }

    }

    addEffectInActivate(activate, effect){

        if(
            activate.type !== "weapon"
        ){return}

        if(!activate.effects){
            activate.effects = []
        }

        activate.effects = [
            ...activate.effects,
            effect
        ]

    }

}

var Effects = new EffectsController()