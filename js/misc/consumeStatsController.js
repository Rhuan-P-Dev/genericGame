
export class ConsumeStatsController {

    add(
        object,
        stat,
        position = [
            "last",
            10
        ],
        customFunction = (object, damage) => {return damage}
    ){

        return object.onDamage.add(
            (params) => {

                params.calcDamage = customFunction(params.object, params.calcDamage)

                if(
                    params.calcDamage <= 0
                    ||
                    params.object[stat] <= 0
                ){return}

                let damage = object[stat] / params.calcDamage

                params.object[stat] -= params.calcDamage

                if(damage <= 1){

                    params.calcDamage *= 1 - damage

                }else{

                    params.calcDamage = 0

                }

            },
            position[0],
            position[1]
        )

    }

    remove(object, position){

        object.onDamage.remove(
            position[0],
            position[1],
        )

    }

}