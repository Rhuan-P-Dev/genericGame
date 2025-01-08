
class FrameOutList{

    list = {
        next:{}
    }

    restart(){

        delete this.list
        this.list = {
            next:{}
        }

    }

    add(
        func,
        framesOut = 60,
        repeat = 1,
        overwrite = false,
        ID = undefined,
        callBack = undefined
    
    ){

        let node = this.list.next

        while(1){
            if(
                !node.next
                ||
                node.overwrite && node.ID == ID
            ){
                
                node.func = func
                node.framesOut = framesOut
                node.tempFramesOut = framesOut
                node.repeat = repeat
                node.overwrite = overwrite
                node.ID = ID
                node.callBack = callBack

                if(!node.next){
                    node.next = {}
                }

                return true
            }else{
                node = node.next
            }
        }
    }

    remove(ID){

        let node = this.list.next
        let tail = this.list

        while(1){
            if(!node.next){return false}

            if(node.ID == ID){

                this.removeNode(node, tail)

                return true

            }

            tail = tail.next
            node = node.next


        }

    }

    removeNode(node, tail){

        if(node.next.next){
            tail.next = node.next
        }else{
            tail.next = {}
        }

    }

    run(){

        let node = this.list.next
        let tail = this.list

        while(1){
            if(!node.next){return}

            if(node.repeat == 0){

                if(node.callBack){
                    node.callBack()
                }

                this.removeNode(node, tail)

                node = node.next

                continue

            }

            node.tempFramesOut -= 1

            if(node.tempFramesOut <= 0){

                node.func()

                node.repeat -= 1

                node.tempFramesOut = node.framesOut

            }

            tail = tail.next
            node = node.next

        }

    }

}


var FrameOutFunctions = new FrameOutList()

export class FrameController {

    update(){

        FrameOutFunctions.run()

    }

    add(func, frameOut, repeat, overwrite, ID, callBack){

        FrameOutFunctions.add(
            func,
            frameOut,
            repeat,
            overwrite,
            ID,
            callBack
        )

    }

    remove(ID){
        FrameOutFunctions.remove(ID)
    }

    restart(){

        FrameOutFunctions.restart()

    }

}

var Frame = new FrameController()

export function setFrameOut(func, framesOut, repeat, overwrite, ID, callBack){

    Frame.add(func, framesOut, repeat, overwrite, ID, callBack)

}

/*
There is a bug that makes fps worse over time
something that is not being deleted?

class FrameOutList{

    list = {}
    highestObject = 0

    add(
        func,
        frameOut = 60,
        repeat = 1,
        overwrite = false,
        ID = randomUniqueID() + "RANDOM!",
        callBack = undefined,
        frameOutOriginal = frameOut
    
    ){

        if(!this.list[frameOut]){

            this.list[frameOut] = {}

        }

        if(
            !this.list[frameOut][ID]
            ||
            overwrite
        ){

            if(overwrite){
                this.remove(ID)
            }

            this.list[frameOut][ID] = {
                func,
                frameOut,
                repeat,
                overwrite,
                ID,
                callBack,
                frameOutOriginal
            }

            if(frameOut > this.highestObject){
                this.highestObject = frameOut
            }

        }

    }

    remove(ID){

        for (let key in this.list) {
            
            if(this.list[key][ID]){
                delete this.list[key][ID]
                return
            }

        }

    }

    removeNode(node, tail){

        if(node.next.next){
            tail.next = node.next
        }else{
            tail.next = {}
        }

    }

    update(){

        for (
            let key = 1;
            key <= this.highestObject;
            key++
        ) {

            if(!this.list[key]){
                continue
            }

            let nodes = this.list[key]

            this.list[key] = {}

            for (let key2 in nodes) {

                this.add(
                    nodes[key2].func,
                    key-1,
                    nodes[key2].repeat,
                    nodes[key2].overwrite,
                    nodes[key2].ID,
                    nodes[key2].callBack,
                    nodes[key2].frameOutOriginal,
                )

            }

        }

    }

    run(){

        let nodes = this.list[0]

        this.list[0] = {}

        for (let key in nodes) {

            let node = nodes[key]

            if(node.repeat == 0){

                if(node.callBack){

                    node.callBack()

                }

                continue

            }

            node.func()

            node.repeat -= 1

            this.add(
                node.func,
                node.frameOutOriginal,
                node.repeat,
                nodes.overwrite,
                node.ID,
                node.callBack,
                node.frameOutOriginal,
            )

        }

        this.update()

    }

}

var FrameOutFunctions = new FrameOutList()

export class FrameController {

    update(){

        FrameOutFunctions.run()

    }

    add(func, frameOut, repeat, overwrite, ID, callBack){

        FrameOutFunctions.add(
            func,
            frameOut,
            repeat,
            overwrite,
            ID,
            callBack
        )

    }

    remove(ID){
        FrameOutFunctions.remove(ID)
    }

}

var Frame = new FrameController()

export function setFrameOut(func, frameOut, repeat, overwrite, ID, callBack){

    Frame.add(func, frameOut, repeat, overwrite, ID, callBack)

}*/