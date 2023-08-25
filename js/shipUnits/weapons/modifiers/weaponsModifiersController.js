import { setFrameOut } from "../../../frame/frameController.js"
import { CloneObjectController } from "../../../generalUtils/cloneObject.js"
import { MultiplyStatsController } from "../../../generalUtils/multiplyStats.js"
import { WeaponsController } from "../weaponsController.js"
import { Burst } from "./modifiers/burst.js"
import { Growing } from "./modifiers/growing.js"
import { Machinegun } from "./modifiers/machinegun.js"
import { ModSpread } from "./modifiers/modBased/modSpread.js"
import { Shotgun } from "./modifiers/shotgun.js"

var Weapons = ""

var cloneObject = ""
var MultiplyStats = ""

onInit(function(){

    Weapons = new WeaponsController()

    cloneObject = new CloneObjectController()
    MultiplyStats = new MultiplyStatsController()

})

export class WeaponsModifiersController{

    modifiers = {
        "spread": undefined,
        "burst": undefined,
        "shotgun": undefined,
        "growing": undefined,
        "machinegun": undefined,
    }

    build(){
        this.modifiers.burst = new Burst()
        this.modifiers.machinegun = new Machinegun()
        this.modifiers.growing = new Growing()
        this.modifiers.shotgun = new Shotgun()
        this.modifiers.spread = new ModSpread()

        for(let modifierName in this.modifiers){
            this.modifiers[modifierName].ID = randomUniqueID()
        }

    }

    spread(output, modifier, config, node){

        for (let index = 0; index < output.length; index++) {

            output[index].config.tempXSpread -= randomFloat(-modifier.spread, modifier.spread)
            output[index].config.tempYSpread -= randomFloat(-modifier.spread, modifier.spread)

        }
    
        return output
    
    }

    burst(output, modifier, config, node){

        WeaponsModifiers.spread(output, modifier)

        let newOutput = []

        for (let index = 0; index < output.length; index++) {

            for (let indey = 0; indey < modifier.quantity; indey++) {

                let tempProjectile = cloneObject.clone(output[index].object)

                MultiplyStats.multiply(tempProjectile, modifier.stats)

                newOutput.push({
                    "object": tempProjectile,
                    "config": cloneObject.cloneAttribute(output[index].config)
                })

                newOutput[newOutput.length-1].config.interval = modifier.interval * indey
        
            }

        }
        
        return newOutput
    
    }

    shotgun(output, modifier, config, node){

        let newOutput = []

        for (let index = 0; index < output.length; index++) {

            for (let indey = 0; indey < modifier.quantity; indey++) {

                let tempProjectile = cloneObject.clone(output[index].object)
                let temConfig = cloneObject.cloneAttribute(output[index].config)

                WeaponsModifiers.spread([{
                    "object": tempProjectile,
                    "config": temConfig,
                }], modifier)
    
                MultiplyStats.multiply(tempProjectile, modifier.stats)

                newOutput.push({
                    "object": tempProjectile,
                    "config": temConfig,
                })

                newOutput[newOutput.length-1].config.interval = 0
        
            }

        }
        
        return newOutput
    
    }

    cumulative(output, modifier, config, node){

        modifier.value += modifier.valueStep

        setFrameOut( () => {

            modifier.stats.mult = modifier.value

            for (let index = 0; index < output.length; index++) {

                MultiplyStats.multiply(output[index].object, modifier.stats)
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

    getAllModifiers(){

        return this.modifiers
    }

    setModifierMode(activate){

        activate.func = this.useModifier

        activate.hasModifier = true

        activate.modifiers = new ModifiersDoublyLinkedList()

    }

    addModifier(activate, modifierName){

        this.build()

        let modifier = this.getAllModifiers()[modifierName]

        if(!activate.hasModifier){

            activate.config.baseFunc = activate.func

            this.setModifierMode(activate)

        }

        modifier.activate = activate

        activate.modifiers.add(modifier)

        activate.cost *= modifier.costMult

    }

    useModifier(object, activate){

        activate.modifiers.runAll()

    }

}

var WeaponsModifiers = new WeaponsModifiersController()

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

            outputObjects.push({
                "object": node.value.activate.baseFunc(
                    node.value.activate,
                ),
                "config": {
                    "tempXSpread": 0,
                    "tempYSpread": 0,
                    "tempMultVel": 1,
                    "interval": 1,
                }
            })

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

        Weapons.processObjects(node.value.activate, outputObjects)
        
    }

}