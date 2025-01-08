
export class StatsUpgradesController {

    baseCost = 100000

    upgradesScore = {

        // if +100%
        // or
        // if -50%

        "damage": 3,
        "defense": 4,

        "energy": 1.25,
        "maxEnergy": 4,
        "energyRegen": 3,

        "life": 1.5,
        "maxLife": 5,
        "lifeRegen": 4,

        "shield": 1.25,
        "maxShield": 3,
        "shieldRegen": 2,

        "darkEnergy": 2,
        "maxDarkEnergy": 7,
        "darkEnergyRegen": 5,

        "divineEnergy": 5,
        "maxDivineEnergy": 15,
        "divineEnergyRegen": 10,

        //"priority": 8,

        "vel": 50,
        "maxVel": 100,

        //"width": 5,
        //"height": 5,

    }

    getAll(visualizer = false){
        let result = []
        for (let upgradeName in this.upgradesScore) {
            let upgradeValue = this.upgradesScore[upgradeName]
            if(visualizer){
                result.push([upgradeName + " - upgrade", upgradeValue * this.baseCost])
            }else{
                result.push([upgradeName, 1, upgradeValue * this.baseCost])
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
            let result_1 = this.duplicateArray(result).map(item => [item[0], item[1] * 0.01, item[2] * 0.01])
            let result_10 = this.duplicateArray(result).map(item => [item[0], item[1] * 0.1, item[2] * 0.1])
            let result_50 = this.duplicateArray(result).map(item => [item[0], item[1] * 0.5, item[2] * 0.5])
            let result_200 = this.duplicateArray(result).map(item => [item[0], item[1] * 2, item[2] * 2])
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

    get(upgradeName, mult = 1) {
        return (this.upgradesScore[upgradeName] * this.baseCost) * mult
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