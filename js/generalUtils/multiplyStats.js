import { CustomMathController } from "./math.js"

var CustomMath = ""

onInit(function(){

    CustomMath = new CustomMathController()

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
                CustomMath.inverter(stats.mult)
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

        // the "evolutron" and the "segunda etapa" dão resutados diferentes mesmo que era para ser igual, a "segunda etapa" é melhor

        // 0.81 vs 0.87

        this.exponential(
            object,
            stats[statusType],
            CustomMath.inverter(stats.mult),
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

    exponential(object, stats, mult){

        let penalty = 10

        for (let index = 0; index < stats.length; index++) {

            let stat = stats[index]

            if(object[stat]){

                object[stat] = CustomMath.diminishingReturns(
                    object[stat],
                    mult / penalty
                )

            }
            
        }

    }

}