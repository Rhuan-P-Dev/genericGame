import { FocusedTopDownBehavior } from "../AI/behavior/focusedTopDownBehavior.js"
import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { setFrameOut } from "../frame/frameController.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { CustomMathController } from "../generalUtils/math.js"
import { AnimationsController } from "../graphics/animation/animationsController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { SelfSwarmDrone } from "../object/complex/special drone/selfSwarmDrone.js"
import { FactoryController } from "../shipUnits/factory/factoryController.js"
import { ExplosionDamage } from "./damageTypes/explosion.js"

var AIUtils
var ScreenRender
var CloneObject
var Animations
var CustomMath

onInit(function(){

    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    CloneObject = new CloneObjectController()
    Animations = new AnimationsController()
    CustomMath = new CustomMathController()

})

export class DamageController {

    damageTypeTable = {
        "single": this.damageCalc,
        "radius": this.radiusCalc,
    }

    schedulerTypeTable = {
        "linear": this.linear,
        "linearReverse": this.linearReverse,
        "uniform": this.uniform
    }

    addDamage(object, type, amount, force = false) {

        if(!object.damageTypes){
            object.damageTypes = {}
        }

        if(force) {
            object.damageTypes[type] = amount
        }else {
            object.damageTypes[type] = (object.damageTypes[type] || 0) + amount
        }
    }

    addDefense(object, stat, type, amount, force = false) {

        if(!object.defenseTypes[stat]){
            object.defenseTypes[stat] = {}
        }

        if(force) {
            object.defenseTypes[stat][type] = amount
        }else {
            object.defenseTypes[stat][type] = (object.defenseTypes[stat][type] || 0) + amount
        }
        
    }

    addDamageOrder(object, damageType, stat, direction, reference) {
        if (!object.damageOrder[damageType]) {
            object.damageOrder[damageType] = [
                stat
            ]
        }else{
            insertRelativeTo(object.damageOrder[damageType], stat, direction, reference)
        }

    }

    removeDamageOrder(object, damageType, stat) {
        if (
            object.damageOrder
            &&
            object.damageOrder[damageType]
        ) {
            const index = object.damageOrder[damageType].indexOf(stat)
            if (index !== -1) {
                object.damageOrder[damageType].splice(index, 1)
            }
            if (object.damageOrder[damageType].length === 0) {
                delete object.damageOrder[damageType]
            }
        }
    }

    immunityTo(object, stat){

        if(
            object.damageOrder
            &&
            object.damageOrder[stat]
        ){
            delete object.damageOrder[stat]
        }

    }

    doDamage(params){

        this.damageTypeTable[params.object.damageConfig.type](
            params.object,
            params.otherObject
        )

    }

    passDamageMultiplierTable = {
        "dark energy": 0.8,
        "parasite blaster": 0.5,
        "surprise attack": 1,
    }

    selfSwarm(params, damage){

        if(
            params.object.selfSwarmProduction === undefined
        ){
            params.object.selfSwarmProduction = 0
            params.object.selfSwarmProductionMax = 60
        }

        params.object.selfSwarmProduction += damage

        if(
            params.object.selfSwarmProduction >= params.object.selfSwarmProductionMax
        ){

            params.object.selfSwarmProduction = 0

            let config = {
                "objectClass": SelfSwarmDrone,
                "AI": ["missileV1"],
                "behavior": new FocusedTopDownBehavior().searchPriority,
                "statsMult": 0,
                "randomPos": randomInterval(params.object.width + params.object.height)
            }
    
            new FactoryController().createObjectNow(
                params.otherObjectMaster,
                {},
                config,
                params.object
            )

            params.object.selfSwarmProductionMax *= 2

        }

    }

    agony(params, damage){

        if(
            damage <= 1
            ||
            params.object.life.get() <= 0
        ){return}

        let physicalDamageObject = this.getMinimalDamage(
            damage / 3,
            {
                "physical": 1
            },
            params.otherObject
        )

        let agonyDamageObject = this.getMinimalDamage(
            damage / 2,
            {
                "agony": 1
            },
            params.otherObject
        )

        setFrameOut(() => {

            if(params.object.life.get() <= 0){return}

            this.damageCalc(physicalDamageObject, params.object)
            this.damageCalc(agonyDamageObject, params.object)

        },
            5*60,
            3
        )

    }

    fireAnimation(params, damage){

        for (let index = 0; index < parseInt(damage/2) + 1; index++) {

            Animations.run({
                "name":"fire",
                //"type":"relative",
                //"focus": params.object,
                "focus": {
                    "x": params.object.x,
                    "y": params.object.y,
                },
                "offset": {
                    "x": randomInteger(-params.object.width, params.object.width),
                    "y": randomInteger(-params.object.height, params.object.height),
                },
                "frameRandomOffsetX": 2,
                "frameRandomOffsetY": 2,
                "randomPointOffsetX": 1,
                "randomPointOffsetY": 1,
            })

        }

    }

    fire(params, damage){

        if(
            damage <= 1
            ||
            params.object.life.get() <= 0
        ){return}

        let fireDamageObject = this.getMinimalDamage(
            damage * 0.9,
            {
                "fire": 1
            },
            params.otherObject
        )

        setFrameOut(() => {

            if(params.object.life.get() <= 0){return}

            this.damageCalc(fireDamageObject, params.object)

        },
            10,
            1
        )

    }

    shock(params, damage){

        if(
            damage <= 1
            ||
            params.object.life.get() <= 0
        ){return}

        const RANGE = damage * 10
        const LINE_WIDTH = RANGE / 100
        var FRAME_OUT = damage / 5

        let closestAlliesObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
            params.object,
            {
                "maxDistance": RANGE,
                "includeEnemyTeam": false,
                "includeSameTeam": true,
                "includeYourself": false,
            }
        )

        ScreenRender.addDrawRequest( // debug
            {
                "func": ScreenRender.drawCircle,
                "params": {
                    "x": params.object.x,
                    "y": params.object.y,
                    "radius": RANGE,
                },
            }
        )

        let closestAllieObject = AIUtils.getObject(
            closestAlliesObjects,
            params.object,
            "closest"
        )

        if(closestAllieObject){

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawLine,
                    "params": {
                        "positions": [
                            [
                                params.object.x,
                                params.object.y,
                            ],[
                                closestAllieObject.x,
                                closestAllieObject.y,
                            ]
                        ],
                        "color": "yellow",
                        "lineWidth": LINE_WIDTH,
                    }
                }

            )

            // >>> THE FRAMEOUT CANNOT BE SMALLER THAN TWO <<<
            if(FRAME_OUT < 2){FRAME_OUT = 2}

            let shockDamageObject = this.getMinimalDamage(
                damage * 0.75,
                {
                    "shock": 1
                },
                params.otherObject
            )
    
            setFrameOut(() => {
    
                if(closestAllieObject.life.get() <= 0){return}
    
                this.damageCalc(shockDamageObject, closestAllieObject)
    
            },
                FRAME_OUT,
                1
            )

        }

    }

    requiredTable = {
        "fire": (params, damage) => {
            this.fireAnimation(params, damage)
            this.fire(params, damage)
        },
        "shock": (params, damage) => {
            this.shock(params, damage)
        },
        "agony": (params, damage) => {
            this.agony(params, damage)
        },
    }

    specialEffectsTable = {
        "life": {
            "self swarm": (params, damage) => {
                this.selfSwarm(params, damage)
            },
        }
    }

    getMaxDamage(victim, attacker, typeOfDamagedStats) {

        let maxDamage = 0
    
        for(let typeOfDamage in attacker.damageTypes){
    
            maxDamage += Math.max(
                this.getDamage(
                    victim,
                    attacker,
                    typeOfDamagedStats,
                    typeOfDamage,
                    attacker.damage
                ), 0
            )
    
        }
    
        return maxDamage
    }

    getDamage(victim, attacker, typeOfDamagedStats, typeOfDamage, damage) {

        let defenseMultiplier = 0

        if(
            victim.defenseTypes[typeOfDamagedStats]
            &&
            victim.defenseTypes[typeOfDamagedStats][typeOfDamage])
        {
            defenseMultiplier = victim.defenseTypes[typeOfDamagedStats][typeOfDamage]
        }
    
        damage *= attacker.damageTypes[typeOfDamage] || 0
        damage *= victim.resistance
        damage -= victim.defense * defenseMultiplier
    
        return damage

    }

    statOrder = {
        "energy shield": {
            "physical": 0.5,
            "fire": 4,
            "self swarm": 5,
            "self swarm production": 1000,
            "shock": -0.01,
            "parasite blaster": 0,
            "dark energy": 0,
            "agony": 0,
            "surprise attack": 0,
            "laser": 0.2,
            "ink": 0,//?
            "snow": 2.5,
        }
    }

    statConsume = {
        "energy shield": "energy"
    }

    addTempStatOrder(frame, object, type){

        for (const damageType in this.statOrder[type]) {

            const damageTypeValue = this.statOrder[type][damageType]
            const stat = this.statConsume[type]

            this.addTempDefense(
                frame,
                object,
                stat,
                damageType,
                damageTypeValue,
            )

            this.addTempDamageOrder(
                frame,
                object,
                damageType,
                stat,
                "before",
            )

        }

    }

    addTempDamageOrder(frames, object, damageType, stat, direction, reference){

        this.addDamageOrder(object, damageType, stat, direction, reference)

        setFrameOut(
            () => {
                this.removeDamageOrder(object, damageType, stat)
            },
            frames,
        )

    }

    addTempDefense(frames, object, stat, damageType, damageTypeValue){

        this.addDefense(
            object,
            stat,
            damageType,
            damageTypeValue,
        )

        setFrameOut(
            () => {
                this.addDefense(
                    object,
                    stat,
                    damageType,
                    CustomMath.inverter(damageTypeValue)
                )
            },
            frames,
        )

    }

    reciveDamage(params){

        //console.log(params)

        let damageCache = {}

        for(let typeOfDamage in params.otherObject.damageTypes){

            //console.log("typeOfDamage", typeOfDamage)

            for(let typeOfDamagedStatsIndex in params.object.damageOrder[typeOfDamage]){

                let typeOfDamagedStats = params.object.damageOrder[typeOfDamage][typeOfDamagedStatsIndex]

                //console.log("typeOfDamagedStats", typeOfDamagedStats)

                if(
                    params.object[typeOfDamagedStats] === undefined
                    ||
                    this.isNegative(params.object, typeOfDamagedStats)
                    ||
                    params.calcDamage <= 0
                    ||
                    damageCache[typeOfDamage] <= 0
                ){continue}

                let damage = this.getDamage(
                    params.object,
                    params.otherObject,
                    typeOfDamagedStats,
                    typeOfDamage,
                    damageCache[typeOfDamage] || params.calcDamage
                )

                if(this.requiredTable[typeOfDamage]){
                    this.requiredTable[typeOfDamage](params, damage)
                }

                if(
                    damage <= 0
                ){
                    damageCache[typeOfDamage] = damage
                    continue
                }

                //console.log("damage", damage)

                let statNumber = undefined

                if(typeof params.object[typeOfDamagedStats] == "number"){
                    statNumber = params.object[typeOfDamagedStats]
                    params.object[typeOfDamagedStats] -= damage
                }else{
                    statNumber = params.object[typeOfDamagedStats].get()
                    params.object[typeOfDamagedStats].math("-", damage)
                }

                params.object.lastAttacker = {
                    "calcDamage": params.calcDamage,
                    "damage": params.damage,
                    "otherObject": params.otherObject,
                    "otherObjectMaster": params.otherObjectMaster,
                    "typeOfDamage": typeOfDamage,
                    "typeOfDamagedStats": typeOfDamagedStats,
                }

                if(
                    this.specialEffectsTable[typeOfDamagedStats]
                    &&
                    this.specialEffectsTable[typeOfDamagedStats][typeOfDamage]
                ){
                    this.specialEffectsTable[typeOfDamagedStats][typeOfDamage](params, damage)
                }

                if(
                    (params.otherObject.passDamageMultiplier || this.passDamageMultiplierTable[typeOfDamage])
                    &&
                    (!params.object.defenseTypes[typeOfDamagedStats] || !params.object.defenseTypes[typeOfDamagedStats][typeOfDamage])
                ){

                    damage = damage * (
                        (params.otherObject.passDamageMultiplier || 0)
                        +
                        (this.passDamageMultiplierTable[typeOfDamage] || 0)
                    )
                    statNumber = 0

                }

                damageCache[typeOfDamage] = damage - statNumber

            }

        }

        //a

    }

    isNegative(object, typeOfDamagedStats){

        let number = undefined

        if(typeof object[typeOfDamagedStats] == "number"){
            number = object[typeOfDamagedStats]
        }else{
            number = object[typeOfDamagedStats].get()
        }

        if(number < 0){
            return true
        }else{
            return false
        }

    }

    damageCalc(attacker, victim){

        if(!victim.onDamage){return}

        let damage = attacker.damage
        let bokedDamage = attacker.damage

        if(attacker.original){
            attacker = attacker.original
        }

        let master = attacker

        while(master.owner){

            master = master.owner

        }

        // The 'onDamage' CANNOT be executed in the same frame as the object take damage, or it will cause a fatal recursive error.
        setFrameOut(
            () => {
                victim.onDamage.run({
                    "otherObjectMaster": master,
                    "otherObject": attacker,
                    "object": victim,
                    "damage": bokedDamage,
                    "calcDamage": damage,
                })
            },1
        )

    }

    radiusCalc(attacker){

        ScreenRender.addDrawRequest(
            {
                "func":ScreenRender.drawCircle,
                "params":{
                    "x": attacker.x,
                    "y": attacker.y,
                    "radius": attacker.damageConfig.range,
                },
            }
        )

        let allEnemyObject = AIUtils.returnArrayWithAlllObjectsOfTeams(
            attacker,
            {
                "maxDistance": attacker.damageConfig.range,
            }
        )

        for (let index = 0; index < allEnemyObject.length; index++) {

            let victim = allEnemyObject[index]

            let attackerBoked = Damage.schedulerTypeTable[attacker.damageConfig.scheduler](
                attacker,
                victim
            )

            Damage.damageCalc(attackerBoked, victim)
            
        }

    }

    boke(object){
    
        let boke = CloneObject.cloneSimple(object)

        boke.original = object

        return boke

    }

    linear(attacker, victim){

    }

    linearReverse(attacker, victim){

        let attackerBoked = Damage.boke(attacker)
        //let victimBoked = Damage.boke(victim)

        let mult = CustomMath.linearReverse(
            AIUtils.getDistanceOfObjects(attacker, victim),
            attacker.damageConfig.range,
        )

        mult += CustomMath.linear(
            attacker.width,
            attacker.damageConfig.range
        )

        mult += CustomMath.linear(
            victim.width,
            attacker.damageConfig.range
        )

        if(mult > 1){
            mult = 1
        }

        attackerBoked.damage *= mult

        return attackerBoked

    }

    uniform(attacker, victim){

        return Damage.boke(attacker)

    }

    getMinimalRadiusDamage(
        minimalObject = {},
        object = {}
    ){

        minimalObject.damageConfig = new ExplosionDamage().damageConfig
        
        minimalObject.damage = object.damage || 1

        minimalObject.damageTypes = object.damageTypes || {}

        minimalObject.width = object.width || 1

        return minimalObject

    }

    getMinimalDamage(
        damage,
        damageTypes,
        object,
    ){

        let minimalObject = {
            "damage": damage,
            "damageTypes": damageTypes
        }

        minimalObject.owner = object

        return minimalObject

    }

    doMinimalAttack(
        damage,
        damageTypes,
        object,
        otherObject,
    ){

        if(
            !object
            ||
            !otherObject
        ){return}

        let damageObject = this.getMinimalDamage(
            damage,
            damageTypes,
            object
        )

        this.damageCalc(
            damageObject,
            otherObject
        )

    }

}

var Damage = new DamageController()