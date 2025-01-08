import { setFrameOut } from "../../../frame/frameController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { CloneObjectController } from "../../../generalUtils/cloneObject.js"
import { MultiplyStatsController } from "../../../generalUtils/multiplyStats.js"
import { WeaponsController } from "../weaponsController.js"
import { Barrier } from "./modifiers/barrier.js"
import { Burst } from "./modifiers/burst.js"
import { Growing } from "./modifiers/growing.js"
import { Machinegun } from "./modifiers/machinegun.js"
import { ModDice } from "./modifiers/modBased/modDice.js"
import { ModSpread } from "./modifiers/modBased/modSpread.js"
import { Clone } from "./modifiers/clone.js"
import { ShadowBarrier } from "./modifiers/shadowBarrier.js"
import { Shotgun } from "./modifiers/shotgun.js"
import { Swarm } from "./modifiers/swarm.js"
import { Widen } from "./modifiers/widen.js"
import { ModDistortion } from "./modifiers/modBased/modDistortion.js"
import { MidWiden } from "./modifiers/midWiden.js"

var Weapons = ""
var cloneObject = ""
var MultiplyStats = ""
var GameState = ""

onInit(function(){

    Weapons = new WeaponsController()
    cloneObject = new CloneObjectController()
    MultiplyStats = new MultiplyStatsController()
    GameState = new GameStateController()
})

export class WeaponsModifiersController{

    modifiers = {
        "spread": ModSpread,
        "widen": Widen,
        "mid widen": MidWiden,

        "distortion": ModDistortion,

        "growing": Growing,

        "machinegun": Machinegun,

        "burst": Burst,
        "shotgun": Shotgun,
        "clone": Clone,
        "barrier": Barrier,
        "shadow barrier": ShadowBarrier,
        "swarm": Swarm,

        //"dice": ModDice,
    }

    get(modifierName, build = false){

        if(build){
            return new this.modifiers[modifierName](true)
        }else{
            return this.modifiers[modifierName]
        }
    }

    getRandomModifiers(modsCount) {
        const modifierNames = Object.keys(this.modifiers);
        const randomModifiers = []

        for (let index = 0; index < modsCount; index++) {
            const randomIndex = randomInteger(0, modifierNames.length-1)
            const randomModifier = modifierNames[randomIndex]
            randomModifiers.push(randomModifier)
        }

        return randomModifiers

    }

    getAll(){
        return this.modifiers
    }

    getMult(modifier){
        return modifier.costMult
    }

    build(modifierName){

        let modifier = new this.modifiers[modifierName]()

        modifier.ID = randomUniqueID()

        return modifier

    }

    setModifierMode(activate){

        activate.func = this.useModifier

        activate.hasModifier = true

        activate.modifiers = new ModifiersDoublyLinkedList()

    }

    addModifier(activate, modifierName){

        let modifier = this.build(modifierName)

        if(!activate.hasModifier){

            activate.config.weapon.baseFunc = activate.func

            this.setModifierMode(activate)

        }

        modifier.activate = activate

        activate.modifiers.add(modifier)

        activate.cost *= modifier.costMult

    }

    useModifier(object, activate){

        return activate.modifiers.runAll()

    }

    attributeRandomizer(output, modifier, config, node){

        for (let index = 0; index < output.length; index++) {

            for(let attribute in output[index].object){

                if(
                    typeof(output[index].object[attribute]) == "number"
                ){

                    let randomMult = randomFloat(
                        -modifier.fluctuation,
                        modifier.fluctuation
                    )

                    let value = output[index].object[attribute] * randomMult

                    output[index].object[attribute] += value

                }

    
            }

        }
        
        return output

    }

    replicator(output, modifier, config, node){

        let newOutput = []

        for (let index = 0; index < output.length; index++) {

            if(modifier.addOriginalObject){
                newOutput.push({
                    "object": output[index].object,
                    "config": output[index].config,
                })
            }

            for (let indey = 0; indey < modifier.quantity; indey++) {

                let tempProjectile = cloneObject.clone(output[index].object)
                let tempConfig = cloneObject.cloneAttribute(output[index].config)

                MultiplyStats.multiply(tempProjectile, modifier.stats.statsMult)

                newOutput.push({
                    "object": tempProjectile,
                    "config": tempConfig,
                })
        
            }

        }
        
        return newOutput


    }

    distortion(output, modifier, config, node){

        for (let index = 0; index < output.length; index++) {

            output[index].config.distortionX -= randomFloat(-modifier.distortion, modifier.distortion)
            output[index].config.distortionY -= randomFloat(-modifier.distortion, modifier.distortion)

        }
    
        return output

    }

    spread(output, modifier, config, node){

        for (let index = 0; index < output.length; index++) {

            output[index].config.tempSpreadX -= randomFloat(-modifier.spread, modifier.spread)
            output[index].config.tempSpreadY -= randomFloat(-modifier.spread, modifier.spread)

        }
    
        return output
    
    }

    burst(output, modifier, config, node){

        WeaponsModifiers.spread(output, modifier)

        let newOutput = []

        for (let index = 0; index < output.length; index++) {

            for (let indey = 0; indey < modifier.quantity; indey++) {

                let tempProjectile = cloneObject.clone(output[index].object)

                MultiplyStats.multiply(tempProjectile, modifier.stats.statsMult)

                newOutput.push({
                    "object": tempProjectile,
                    "config": cloneObject.cloneAttribute(output[index].config)
                })

                newOutput[newOutput.length-1].config.interval = modifier.interval * indey
        
            }

            GameState.remove(output[index].object)

        }
        
        return newOutput
    
    }

    shotgun(output, modifier, config, node){

        let newOutput = []

        for (let index = 0; index < output.length; index++) {

            for (let indey = 0; indey < modifier.quantity; indey++) {

                let tempProjectile = cloneObject.clone(output[index].object)
                let tempConfig = cloneObject.cloneAttribute(output[index].config)

                WeaponsModifiers.spread([{
                    "object": tempProjectile,
                    "config": tempConfig,
                }], modifier)

                WeaponsModifiers.distortion([{
                    "object": tempProjectile,
                    "config": tempConfig,
                }], modifier)
    
                MultiplyStats.multiply(tempProjectile, modifier.stats.statsMult)

                newOutput.push({
                    "object": tempProjectile,
                    "config": tempConfig,
                })

                newOutput[newOutput.length-1].config.interval = 0

            }

            GameState.remove(output[index].object)

        }
        
        return newOutput
    
    }

    cumulative(output, modifier, config, node){

        modifier.value += modifier.valueStep

        setFrameOut( () => {

            modifier.stats.mult = modifier.value

            for (let index = 0; index < output.length; index++) {

                MultiplyStats.multiply(output[index].object, modifier.stats.statsMult)
                output[index].config.tempMultVel += modifier.value

            }

            modifier.value = modifier.valueBase

            modifier.activate.modifiers.runAll(node.next, output)

        },
        modifier.activate.reload + 1,
        1,
        true,
        modifier.ID + " - growing",
        )

        return false
    }

    machinegun(output, modifier, config, node){

        modifier.value += modifier.activate.reload * modifier.valueStep

        modifier.activate.reloadTemp -= modifier.value

        setFrameOut( () => {

            modifier.value = modifier.valueBase

            return false

        },
        alwaysPositive(modifier.activate.reloadTemp) + 2,
        1,
        true,
        modifier.ID + " - machinegun",
        )

        return output
        
    }

}

var WeaponsModifiers = new WeaponsModifiersController()

export class OutputObjectsConfig {

    constructor(){

        return {
            "tempSpreadX": 0,
            "tempSpreadY": 0,
            "distortionX": 0,
            "distortionY": 0,
            "tempMultVel": 0,
            "interval": 1,
        }

    }

}

class OutputObjects {

    constructor(node){

        let objects = node.value.activate.config.weapon.baseFunc(
            node.value.activate.owner,
            node.value.activate,
            node.value.activate.config,
        )

        for (let index = 0; index < objects.length; index++) {

            objects[index].object.lifeTime = node.value.activate.lifeTime

        }

        return objects

    }

}

export class ModifiersDoublyLinkedList extends LinkedList{

    add(value){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node.value = value
                node.next = {}

                node.next.previous = node

                return true
            }else{
                node = node.next
            }
        }
    }
    
    runAll(node = this.list.next, outputObjects = []){

        if(outputObjects.length == 0){

            outputObjects = new OutputObjects(node)

        }

        while(node.next){

            outputObjects = node.value.func(
                outputObjects,
                node.value,
                node.value.activate.config,
                node,
            )

            if(!outputObjects){return false}

            node = node.next

        }

        if(!outputObjects){return false}

        if(!node.next){
            node = node.previous
        }

        return Weapons.processObjects(node.value.activate, outputObjects)
        
    }

}