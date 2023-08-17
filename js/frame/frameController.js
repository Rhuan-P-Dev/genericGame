
class FrameOutList{

    list = {
        next:{}
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

}

var Frame = new FrameController()

export function setFrameOut(func, framesOut, repeat, overwrite, ID, callBack){

    Frame.add(func, framesOut, repeat, overwrite, ID, callBack)

}