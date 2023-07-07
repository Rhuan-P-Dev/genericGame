
export class MultiplyStatsController {

    multiply(object, stats){

        if(stats.stats){
            this.mult(object, stats.stats, stats.statsMult)
        }

        if(stats.invertedStatus){

            let invertedMult = this.invertMult(stats.statsMult)

            this.mult(object, stats.invertedStatus, invertedMult)

        }

    }

    mult(object, stats, mult){

        for (let index = 0; index < stats.length; index++) {

            let stat = stats[index]

            if(object[stat]){
                object[stat] *= mult
            }
            
        }

    }

    invertMult(mult){

        if(mult < 1){
            mult = (1 - mult) + 1
        }else{
            mult = 2 - mult
        }

        return mult

    }

}