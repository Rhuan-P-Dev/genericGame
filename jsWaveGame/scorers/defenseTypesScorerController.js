
export class DefenseTypesScorerController {

    baseCost = 100000

    defenseTypesScore = {

        // if +100%
        "physical": 2,
        "shock": 1.5,
        "fire": 3,
        "death": 10,
        "dark energy": 15,
        "revenge": 20,
        "parasite blaster": 1.4,
        "parasite self blaster": 3,
        "parasite suck energy damage": 1.25,
        "self swarm": 5,
        //"self swarm production"
        "surprise attack": 30,
        "agony": 5,
        "ink": 3,
        "laser": 3


    }

    statsIn = {
        //In
        "life": 1,
        "shield": 0.6,
    }

    getAll(visualizer = false){
        let result = []
        for (let statsInName in this.statsIn) {
            let statsInValue = this.statsIn[statsInName]
            for (let defenseTypeName in this.defenseTypesScore) {
                let defenseTypeValue = this.defenseTypesScore[defenseTypeName]
                if(visualizer){
                    result.push([defenseTypeName + " - In " + statsInName + " - defense type", parseInt(defenseTypeValue * this.baseCost * statsInValue)])
                }else{
                    result.push([defenseTypeName, statsInName, 1, parseInt(defenseTypeValue * this.baseCost * statsInValue)])
                }
            }
        }

        if(visualizer){
            let result_1 = this.duplicateArray(result).map(item => [item[0] + " - 1%", item[1] * 0.01])
            let result_10 = this.duplicateArray(result).map(item => [item[0] + " - 10%", item[1] * 0.1])
            let result_50 = this.duplicateArray(result).map(item => [item[0] + " - 50%", item[1] * 0.5])
            let result_200 = this.duplicateArray(result).map(item => [item[0] + " - 200%", item[1] * 2])
            result = result.map(item => [item[0] + " - 100%", item[1]])

            return [
                ...result_1,
                ...result_10,
                ...result_50,
                ...result,
                ...result_200,
            ]
        }else{
            let result_1 = this.duplicateArray(result).map(item => [item[0], item[1], item[2] * 0.01, item[3] * 0.01])
            let result_10 = this.duplicateArray(result).map(item => [item[0], item[1], item[2] * 0.1, item[3] * 0.1])
            let result_50 = this.duplicateArray(result).map(item => [item[0], item[1], item[2] * 0.5, item[3] * 0.5])
            let result_200 = this.duplicateArray(result).map(item => [item[0], item[1], item[2] * 2, item[3] * 2])
            return [
                ...result_1,
                ...result_10,
                ...result_50,
                ...result,
                ...result_200,
            ]
        }
    }

    duplicateArray(array) {
        return array.slice()
    }

    get(defenseTypeName) {
        return this.defenseTypesScore[defenseTypeName] * this.baseCost
    }

    getRandom(quantity = 1){
        
        let allUpgrades = this.getAll()

        if (allUpgrades.length === 0) {
            return undefined
        }

        let result = []

        for (let index = 0; index < quantity; index++) {

            result.push(
                returnRandomArray(
                    allUpgrades
                )
            )
            
        }
        
        return result
    }

}