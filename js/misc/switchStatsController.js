
export class SwitchStatsController {

    varsPrefix = "switchStatsVariables"

    add(
        object,
        stat,
        flags 
        //[
        //    {
        //        "flag": 123,
        //        "max": undefined,
        //        "state": true,
        //        "above": () => {},
        //        "below": () => {}
        //    }
        //]
    ){

        if(!object[this.varsPrefix]){
            object[this.varsPrefix] = {}
        }

        if(!object[this.varsPrefix][stat]){
            object[this.varsPrefix][stat] = {}
        }

        for (let index = 0; index < flags.length; index++) {

            let ID = randomUniqueID()

            flags[index].ID = ID

            object[this.varsPrefix][stat][ID] = {
                aboveReturn: undefined,
                belowReturn: undefined,
            }
            
        }

        object[stat].observer.add((params) => {

            params.flags = flags
            params.stat = stat

            for (let index = 0; index < params.flags.length; index++) {
                
                let flag = params.flags[index]

                if(flag.max){

                    if(typeof object[flag.max] == "number"){
                        flag.value = flag.flag * object[flag.max]
                    }else{
                        flag.value = flag.flag * object[flag.max].get()
                    }
                     
                }else{
                    flag.value = flag.flag
                }

            }

            SwitchStats.run(params)

        })

    }

    run(params){

        for (let index = 0; index < params.flags.length; index++) {

            let flag = params.flags[index]

            params.currentFlag = flag

            if(
                params.currentStatValue >= flag.value
                &&
                !flag.state
            ){
                flag.state = true

                params.belowReturn = params.object[SwitchStats.varsPrefix][params.stat][flag.ID].belowReturn

                params.object[SwitchStats.varsPrefix][params.stat][flag.ID].aboveReturn = flag.above(params)

            }

            if(
                params.currentStatValue < flag.value
                &&
                flag.state
            ){
                flag.state = false

                params.aboveReturn = params.object[SwitchStats.varsPrefix][params.stat][flag.ID].aboveReturn

                params.object[SwitchStats.varsPrefix][params.stat][flag.ID].belowReturn = flag.below(params)

            }


        }

    }

}

const SwitchStats = new SwitchStatsController()