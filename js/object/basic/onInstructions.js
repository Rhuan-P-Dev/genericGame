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

export class OnLinkedList extends LinkedList{

    remove(name){
        let node = this.list.next
        let tail = this.list

        while(1){
            if(!node.next){return false}

            if(name == node.value.name){

                if(node.next.next){
                    tail.next = node.next
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

    runAll(params){

        let node = this.list.next

        while(1){
            if(!node.next){return}

            node.value(params)

            node = node.next

        }

    }

}

export class PositionalList{

    list = {}

    add(value, index){

        while(true){

            if(!this.list[index]){

                this.list[index] = value

                return

            }else{

                console.warn(
                    "The index ["+index+"] are ocuped moving: ["+index+"] > ["+(index+1)+"]"
                )

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

        params.param = params
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

            this[stage].add(value, priority)

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

    getAll(){

        return this.stages

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

                let newParams = this.stages[stage].run(
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
        "countDownFucntion",
    ]

    apply(params){

        for (let index = 0; index < this.listOfApply.length; index++) {
            
            if(
                typeof(params[this.listOfApply[index]]) == "object"
                &&
                params[this.listOfApply[index]][0]
            ){

                params[this.listOfApply[index]] = this.build(
                    params[this.listOfApply[index]]
                )
            }else{

                console.log(
                    this.listOfApply[index]
                )

                params[this.listOfApply[index]] = new PriorityObserver()

            }
            
        }

    }

    build(arrayOfFucntions){

        let newPOB = new PriorityObserver()

        for (let index = 0; index < arrayOfFucntions.length; index++) {

            if(this[arrayOfFucntions[index]]){

                newPOB.add(
                    this[arrayOfFucntions[index]],
                    index
                )

            }else{

                console.error("The loader have:",this.__proto__)
                throw new Error(
                    "The function ["+arrayOfFucntions[index]+"] don't exist."
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

        setFrameOut(
            () => {
                metaParams.globalConfig.complexOnType.add(
                    newParams,
                    metaParams.tempConfig.stage,
                    metaParams.tempConfig.listIndex
                )
            }, metaParams.config.frameOut

        )

    }

    countDown(metaParams){

        metaParams.config.countDown -= 1

        if(metaParams.config.countDown < 0){

            metaParams.config.countDownFucntion.run(metaParams)

        }

    }

    deleteInstruction(metaParams){

        metaParams.globalConfig.complexOnType.remove(
            metaParams.tempConfig.stage,
            metaParams.tempConfig.listIndex,
        )

    }





}

onInit(function(){

    return

    let game = new ComplexOnType()

    let params = {
        "prefixFunc": new PriorityObserver(),

        "func": (metaParams) => {
            console.log(
                //metaParams.config
            )
        },

        "suffixFunc": new PriorityObserver(),

        "config": {
            "a":"1"
        }

    }

params.prefixFunc.add( (params) => {

    //params.globalConfig.runStage.last = false

},
0)

params.suffixFunc.add((metaParams) => {

    metaParams.globalConfig.deleteList.push(metaParams.tempConfig.listIndex)

    metaParams.config.a += " - 5"
},
0)

params.suffixFunc.add((metaParams) => {
    metaParams.config.a += " - 999"
},
5)

params.suffixFunc.add((metaParams) => {
    metaParams.config.a += " - 76"
},
2)



//game.add(params, "first", 0)
//game.add(params, "first", 0)
//game.add(params, "first", 0)
//game.add(params, "first", 0)
//game.add(params, "last", 0)

//game.run({})
//
//game.run({})
//
//game.run({})
//
//game.run({})

console.log(
    //game
)






})