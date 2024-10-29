import { setFrameOut } from "../../frame/frameController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"

var CloneObject = ""

onInit(function(){

    CloneObject = new CloneObjectController()

})

export class onInstructions {

    onHit = new ComplexOnType()

    onDeath = new ComplexOnType()

    onDamage = new ComplexOnType()

}

export class PositionalList{

    list = {}

    add(value, index, debug = false){

        while(true){

            if(!this.list[index]){

                this.list[index] = value

                return index

            }else{

                if(debug){
                    
                    console.warn(
                        "The index ["+index+"] are occupied moving: ["+index+"] > ["+(parseInt(index)+1)+"]"
                    )

                }

                index += 1
                
            }

        }

    }

    remove(index){

        delete this.list[index]

    }

    get(index){
        return this.list[index]
    }

    getAll(){
        return this.list
    }

    compatibilityPath(params, index, globalConfig, tempConfig){

        params.params = params
        params.config = this.get(index).config
        params.globalConfig = globalConfig
        params.tempConfig = tempConfig

        return params

    }

    run(params, index, globalConfig, tempConfig){

        let node = this.get(index)

        // for compatibility / bad feelings about this
        params = this.compatibilityPath(params, index, globalConfig, tempConfig)

        node.prefixFunc.run(params)

        if(!globalConfig.complexOnType.stages[tempConfig.stage].list[tempConfig.listIndex]){return}

        if(!node.class){
            node.func(params)
        }else{
            node.class[node.func](params)
        }

        node.suffixFunc.run(params)

        globalConfig.complexOnType.deleteInstructions(tempConfig.stage, globalConfig)
        
        return params

    }

}

export class ComplexOnType{

    first = new PositionalList()
    middle = new PositionalList()
    last = new PositionalList()

    add(value, stage, priority){

        value = this.fixValue(value)

        if(this[stage]){

            return this[stage].add(value, priority)

        }

    }

    fixValue(value){

        if(typeof(value) == "function"){

            value = {
                "func": value
            }

        }

        if(!value.prefixFunc){
            value.prefixFunc = new PriorityObserver()
        }

        if(!value.suffixFunc){
            value.suffixFunc = new PriorityObserver()
        }

        if(!value.config){
            value.config = {}
        }

        return value

    }

    remove(stage, priority){

        if(this[stage]){

            this[stage].remove(priority)

        }

    }

    get(stage, priority){

        return this[stage].get(priority)

    }

    getAll(formated = false){
        if(!formated){
            return this.stages
            
        }else{

            let result = []

            let stages = {
                first: this.getPositionalList("first"),
                middle: this.getPositionalList("middle"),
                last: this.getPositionalList("last")
            }

            for (let stage in stages) {
                for (let item in stages[stage]){
                    result.push(stages[stage][item])
                }
            }

            return result

        }

    }

    getPositionalList(stage){
        return this[stage].getAll()
    }

    defaultConfig = {
        "runStage": {
            "first": true,
            "middle": true,
            "last": true,
        },
        "deleteList": [],
        "complexOnType": this
    }

    stages = {
        "first": this.first,
        "middle": this.middle,
        "last": this.last
    }

    run(params){

        let globalConfig = CloneObject.recursiveCloneAttribute(this.defaultConfig)

        let tempConfig = {}

        for(let stage in this.stages){

            tempConfig.stage = stage

            for(let listIndex in this.stages[stage].list){

                tempConfig.listIndex = listIndex

                if(!globalConfig.runStage[stage]){continue}

                this.stages[stage].run(
                    params,
                    listIndex,
                    globalConfig,
                    tempConfig,
                )

            }

        }

    }

    deleteInstructions(stage, globalConfig){

        for(let deleteListIndex in globalConfig.deleteList){

            this.remove(stage, globalConfig.deleteList[deleteListIndex])

        }

    }

}

export class ComplexOnTypeFunctions{

    listOfApply = [
        "prefixFunc",
        "suffixFunc",
        "countDownFunction",
    ]

    path = {
        "countDownFunction":"countDown",
    }

    apply(params){

        params.config = params

        for (let index = 0; index < this.listOfApply.length; index++) {

            let newParams = params[
                this.path[this.listOfApply[index]]
            ]

            if(!newParams){newParams = params}

            if(
                typeof(newParams[this.listOfApply[index]]) == "object"
                &&
                newParams[this.listOfApply[index]][0]
            ){

                newParams[this.listOfApply[index]] = this.build(
                    newParams[this.listOfApply[index]]
                )
                
            }else if(newParams[this.listOfApply[index]]){

                newParams[this.listOfApply[index]] = new PriorityObserver()

            }
            
        }

    }

    build(arrayOfFunctions){

        let newPOB = new PriorityObserver()

        for (let index = 0; index < arrayOfFunctions.length; index++) {

            if(this[arrayOfFunctions[index]]){

                newPOB.add(
                    this[arrayOfFunctions[index]],
                    index
                )

            }else{

                console.error("The loader have:",this.__proto__)
                throw new Error(
                    "The function ["+arrayOfFunctions[index]+"] don't exist."
                )

            }
            
        }

        return newPOB

    }

    timeout(metaParams){

        let newParams = metaParams.globalConfig.complexOnType.get(
            metaParams.tempConfig.stage,
            metaParams.tempConfig.listIndex
        )

        metaParams.globalConfig.complexOnType.remove(
            metaParams.tempConfig.stage,
            metaParams.tempConfig.listIndex
        )

        let fixedTempConfig = CloneObject.recursiveCloneAttribute(metaParams.tempConfig)

        setFrameOut(
            () => {

                metaParams.globalConfig.complexOnType.add(
                    newParams,
                    fixedTempConfig.stage,
                    fixedTempConfig.listIndex
                )
            }, metaParams.config.timeout.frameOut

        )

    }

    countDown(metaParams){

        metaParams.config.countDown.count -= 1

        if(metaParams.config.countDown.count < 0){

            metaParams.config.countDown.countDownFunction.run(metaParams)

        }

    }

    deleteInstruction(metaParams){

        metaParams.globalConfig.complexOnType.remove(
            metaParams.tempConfig.stage,
            metaParams.tempConfig.listIndex,
        )

    }

    stopStages(metaParams){

        for (let stage in metaParams.config.stopStages.stages) {

            metaParams.globalConfig.runStage[
                metaParams.config.stopStages.stages[stage]
            ] = false

        }

    }

    setAttributes(metaParams){

        for (let attribute in metaParams.config.setAttributes.attributes) {

            if(metaParams.params.object[attribute].set){
                metaParams.params.object[
                    attribute
                ].set(metaParams.config.setAttributes.attributes[attribute])
            }else{
                metaParams.params.object[
                    attribute
                ] = metaParams.config.setAttributes.attributes[attribute]
            }

            

        }

    }

}