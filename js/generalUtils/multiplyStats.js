import { MathController } from "./math.js"

var Math = ""

onInit(function(){

    Math = new MathController()

})


export class MultiplyStatsController {

    multiply(object, stats){

        if(stats.stats){
            this.mult(
                object,
                stats.stats,
                stats.mult
            )
        }

        if(stats.invertedStatus){

            this.mult(
                object,
                stats.invertedStatus,
                Math.inverter(stats.mult)
            )

        }

        if(stats.exponentialStatus){

            this.exponentialMultiply(
                object,
                stats,
                "exponentialStatus"
            )

        }

        if(stats.invertedExponentialStatus){

            this.exponentialMultiply(
                object,
                stats,
                "invertedExponentialStatus"
            )

        }

    }

    exponentialMultiply(object, stats, statusType){

        let mult = parsePositive(stats.mult) / (stats.mult * 2)
        let repeat = parsePositive(stats.mult) * 2

        if(mult < 0){
            mult = parsePositive(mult) + 1
        }

        this.exponential(
            object,
            stats[statusType],
            mult,
            repeat
        )

    }

    mult(object, stats, mult){

        for (let index = 0; index < stats.length; index++) {

            let stat = stats[index]

            if(object[stat]){
                object[stat] += object[stat] * mult
            }
            
        }

    }

    exponential(object, stats, mult, repeat = 1){

        for (let index = 0; index < stats.length; index++) {

            let stat = stats[index]

            if(object[stat]){

                for (let indey = 0; indey < repeat; indey++) {
                    object[stat] *= mult ** 0.1
                }
                
            }
            
        }

    }

}