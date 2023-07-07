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
    }

    // fazer varios projeteis com "metade" da força. o nome poderiaser replicator???

    // uma arma que aao inver de sobre escrever novos projeteis essa arma criar mais projeteis facros e junta com os antigos

    // um tipo especial de "nave?" que tem varias facetas em qunato um estiver viva todas vivem? / renasão

    // alem de modificados eu quero >effects< nos projetesi

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
                    "config": cloneObject.cloneObject(output[index].config)
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
                let temConfig = cloneObject.cloneObject(output[index].config)

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

        clearTimeout(modifier.callBackFunction)
        
        modifier.callBackFunction = setTimeout( () => {

            modifier.stats.statsMult = modifier.value

            for (let index = 0; index < output.length; index++) {

                MultiplyStats.multiply(output[index].object, modifier.stats)
                output[index].config.tempMultVel = modifier.value

            }

            modifier.value = modifier.valueBase

            modifier.activate.modifiers.runAll(node.next, output)

            return false

        }, 200) // TODO fazer um sisma que leve em comsiderasão os fremes do jogo

        return false
    }

    machinegun(output, modifier, config, node){

        modifier.value += modifier.valueStep

        modifier.activate.reloadTemp -= modifier.value
        
        clearTimeout(modifier.callBackFunction)
        
        modifier.callBackFunction = setTimeout( () => {

            modifier.value = modifier.valueBase

            return false

        }, 200)

        return output
    }

    getAllModifiers(){

        return this.modifiers
    }

    setModifierMode(activate){

        activate.func = this.useModifier

        activate.hasModifier = true

        activate.modifiers = new ModifiersLinkedList()

    }

    addModifier(activate, modifierName){

        this.build()

        let modifier = this.getAllModifiers()[modifierName]

        if(!activate.hasModifier){

            activate.config.baseFunc = activate.func

            this.setModifierMode(activate)

        }

        modifier.activate = activate

        activate.modifiers.add("modifier", modifier)

        activate.cost *= modifier.costMult

    }

    useModifier(object, activate){

        activate.modifiers.runAll()

    }

}

var WeaponsModifiers = new WeaponsModifiersController()

export class ModifiersLinkedList{

    list = {
        next:{}
    }

    add(name, value){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node[name] = value
                node.next = {}

                node.next.previous = node

                return true
            }else{
                node = node.next
            }
        }
    }
    
    remove(name){
        let node = this.list.next
        let tail = this.list
        while(1){
            if(!node.next){return false}

            if(name == node[name]){

                if(node.next.next){
                    node[name] = node.next[name]
                    node.next = node.next.next
                }else{
                    tail.next = {}
                }

                return true
            }else{
                tail = node
                node = node.next
            }
        }
    }

    runAll(node = this.list.next, outputObjects = []){

        if(outputObjects.length == 0){

            outputObjects.push({
                "object": node.modifier.activate.baseFunc(
                    node.modifier.activate,
                ),
                "config": {
                    "tempXSpread": 0,
                    "tempYSpread": 0,
                    "tempMultVel": 1,
                }
            })

        }

        while(node.next){

            outputObjects = node.modifier.func(
                outputObjects,
                node.modifier,
                node.modifier.activate.config,
                node,
            )

            if(!outputObjects){return false}

            node = node.next

        }

        if(!outputObjects){return false}

        if(!node.next){
            node = node.previous
        }

        Weapons.processObjects(node.modifier.activate, outputObjects)
    }

}