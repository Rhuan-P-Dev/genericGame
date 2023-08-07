
class FrameOutList{

    list = {
        next:{}
    }

    add(func, framesOut, repeat = 1, overwrite = false, name = undefined){

        let node = this.list.next

        while(1){
            if(
                !node.next
                ||
                node.overwrite && node.name == name
            ){
                
                node.func = func
                node.framesOut = framesOut
                node.tempFramesOut = framesOut
                node.repeat = repeat
                node.overwrite = overwrite
                node.name = name

                if(!node.next){
                    node.next = {}
                }

                return true
            }else{
                node = node.next
            }
        }
    }
    
    remove(node, tail){

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

                this.remove(node, tail)

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

    add(func, frameOut, repeat, overwrite, name){

        FrameOutFunctions.add(
            func,
            frameOut,
            repeat,
            overwrite,
            name
        )

    }

}

var Frame = new FrameController()

export function setFrameOut(func, framesOut, repeat, overwrite, name){

    Frame.add(func, framesOut, repeat, overwrite, name)

}