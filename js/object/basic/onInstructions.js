
export class onInstructions {

    onHit = new Obeserver()

    onDeath = new Obeserver()

    onDamage = new Obeserver()

























    onHitBuildFunctionsList = []

    onHitBuild(){

        console.log("onHitBuild...")
        console.log(this)

        return true

        for (let index = 0; index < this.onHitBuildFunctionsList.length; index++) {

            this.onHit.add("func", this.onHitBuildFunctionsList[index])

        }

    }

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