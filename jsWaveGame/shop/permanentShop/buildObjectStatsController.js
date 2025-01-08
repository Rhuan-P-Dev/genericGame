
import { EffectsController } from "../../../js/effects/effectsController.js"
import { ActivateInstructions } from "../../../js/object/instructions/activateInstructions.js"
import { ObjectsScorerController } from "../../scorers/objectsScorerController.js"
import { ObjectInfoController } from "./misc/objectInfoController.js"
import { PermanentShopController } from "./permanentShopController.js"

var PermanentShop
var ObjectsScorer
var Effects
var Activate

onInit(function(){

    PermanentShop = new PermanentShopController()
    ObjectsScorer = new ObjectsScorerController()
    Effects = new EffectsController()
    Activate = new ActivateInstructions()

})

export class BuildObjectStatsController {

    ObjectInfo = new ObjectInfoController()

    set(
        shipInfoBox,
        nameCostDisplay = undefined,
        cashDisplay = undefined
    ){
        this.shipInfoBox = shipInfoBox
        this.nameCostDisplay = nameCostDisplay
        this.cashDisplay = cashDisplay

        this.updateNameCostDisplay()
        this.updateCashDisplay()

    }

    next(){

        this.ObjectInfo.next()

        this.build()

    }

    previous(){

        this.ObjectInfo.previous()

        this.build()

    }

    setObject(object){
        this.ObjectInfo.setObject(object)
    }

    get(){
        return this.ObjectInfo.get()
    }
    
    getGraphicID(){
        return this.ObjectInfo.get().constructor.name
    }

    delete(){
        this.ObjectInfo.delete()
    }

    updateNameCostDisplay(){
        if(
            this.nameCostDisplay
            &&
            this.nameCostDisplay.innerText
        ){
            let object = this.get()
            let cost = ObjectsScorer.getObjectCost(object)

            PermanentShop.paintCostDisplay(
                this.nameCostDisplay,
                cost
            )
            
            this.nameCostDisplay.innerText = object.constructor.name + " - " + numberToCash(cost)
        }
    }

    updateCashDisplay(){

        if(
            this.cashDisplay
            &&
            this.cashDisplay.innerText
        ){
            this.cashDisplay.innerText = numberToCash(PermanentShop.getCash())
        }

    }

    buildTemplate = {
        "overview": [
            "priority",
            "maxEnergy",
            "energyRegen",
            "vel",
            "maxVel",
            "width",
            "height",
        ],
        "defensive": [
            "maxShield",
            "shieldRegen",
            "maxLife",
            "lifeRegen",
            "defense",
            "resistance",
            "defenseTypes"
        ],
        "offensive": [
            "damage",
            "damageTypes"
        ],
        "effects": [
            "effects"
        ],
        "activates": [
            "activates"
        ],
        "dark energy": [
            "maxDarkEnergy",
            "darkEnergyRegen",
        ],
        "divine energy": [
            "maxDivineEnergy",
            "divineEnergyRegen",
        ],
    }

    weaponBuildTemplate = {
        "overview": [
            "name",
            "consumableStat",
            "range",
            "cost",
            "reload",
            "lifeTime",
            "homing",
            "modifiersList",
            "config.weapon.damageMult",
            "config.weapon.multVel",
            "config.projectiles.objectClass",
            "isLaser"
        ],
    }

    isRegenType = {
        "energyRegen": true,
        "lifeRegen": true,
        "shieldRegen": true,
        "vel": true,
        "maxVel": true,
        "darkEnergyRegen": true,
        "divineEnergyRegen": true,
    }

    isPerSecoundType = {
        "reload": true,
    }

    isSecoundPerType = {
        "lifeTime": true,
        "reload": true,
    }

    multByPerSecoundStat = {
        "cost": "reload",
    }

    specialBuildTemplateFormat = {
        "damageTypes": (object, box) => {

            let totalTheoreticalDamage = 0

            for (let key in object.damageTypes) {

                let p = document.createElement("p")

                let damagePercentage = Math.round((object.damageTypes[key]*100) * 100) / 100
                let damage = Math.round((object.damage * object.damageTypes[key]) * 100) / 100

                p.innerText = key + ": " + (damagePercentage)+"% = " + damage + " damage"
                totalTheoreticalDamage += object.damage * object.damageTypes[key]

                box.appendChild(p)

            }

            let p = document.createElement("p")

            p.innerText = "total theoretical damage: " + Math.round(totalTheoreticalDamage * 100) / 100 + " damage"

            box.appendChild(p)

        },
        "defenseTypes": (object, box) => {

            for (let stat in object.defenseTypes) {

                let totalTheoreticalDefense = 0

                for (let key in object.defenseTypes[stat]) {

                    let p = document.createElement("p")

                    let keyDefense = Math.round((object.defense * object.defenseTypes[stat][key]) * 100) / 100
                    let defensePercentage = Math.round((object.defenseTypes[stat][key]*100) * 100) / 100

                    p.innerText = stat + " - "+ key + ": " + (defensePercentage)+"% = " + keyDefense + " defense"
                    totalTheoreticalDefense += object.defense * object.defenseTypes[stat][key]

                    box.appendChild(p)
                }

                let p = document.createElement("p")

                

                p.innerText = "total theoretical defense: " + Math.round(totalTheoreticalDefense * 100) / 100 + " defense"

                box.appendChild(p)

            }

        },
        "effects": (object, box) => {
            let effects = Effects.getAllEffectsInfo(object)
            let effectCountMap = new Map()
    
            for (let effect of effects) {
                if (effectCountMap.has(effect.effectName)) {
                    effectCountMap.set(effect.effectName, effectCountMap.get(effect.effectName) + 1)
                } else {
                    effectCountMap.set(effect.effectName, 1)
                }
            }
    
            for (let [effectName, count] of effectCountMap.entries()) {
                let p = document.createElement("p")
                p.innerText = count > 1 ? `${effectName} - x${count}` : effectName
                box.appendChild(p)
            }
        },
        "activates": (object, box) => {
            let activates = Activate.getAll(object)
            let activateCountMap = new Map()
    
            for (let activate of activates) {
                if (activateCountMap.has(activate.name)) {
                    activateCountMap.set(activate.name, activateCountMap.get(activate.name) + 1)
                } else {
                    activateCountMap.set(activate.name, 1)
                }
            }
    
            for (let [activateName, count] of activateCountMap.entries()) {
                let p = document.createElement("p")
                p.innerText = count > 1 ? `${activateName} - x${count}` : activateName
                box.appendChild(p)
            }
        }
    }

    buildTemplateColor = {
        "offensive": "red",
        "defensive": "blue",
        "effects": "purple",
        "dark energy": "purple",
        "divine energy": "yellow",
    }

    getBuildStat(object, stat){

        let keys = stat.split('.')

        let currentObject = object
        
        for (let key of keys) {
            currentObject = currentObject[key]
        }
        
        return currentObject // final stat

    }

    build(
        object = this.get(),
        baseObject = undefined,
        typeOfBuilder = "buildTemplate"
    ){

        this.shipInfoBox.innerHTML = ""

        for (let buildTemplateType in this[typeOfBuilder]) {

            let box = document.createElement("div")
            box.className = "box"

            if(this.buildTemplateColor[buildTemplateType]){
                box.style.borderColor = this.buildTemplateColor[buildTemplateType]
            }

            for (let index = 0; index < this[typeOfBuilder][buildTemplateType].length; index++) {

                let statName = this[typeOfBuilder][buildTemplateType][index]

                let stat = this.getBuildStat(object, statName)

                if(this.specialBuildTemplateFormat[statName]){
                    this.specialBuildTemplateFormat[statName](object, box)
                    continue
                }

                let p = document.createElement("p")

                if(stat === undefined){
                    p.style.color = "grey"
                }

                if(typeof stat === "number"){
                    stat = Math.round(stat * 100) / 100
                }

                p.innerText = statName + ": " + stat

                if(this.isRegenType[statName]){
                    let statPerSec = Math.round(stat * 60 * 100) / 100

                    p.innerText += ` (${statPerSec}/sec)`
                }

                if(this.isPerSecoundType[statName]){
                    let statPerSec = Math.round((60 / stat) * 100) / 100

                    p.innerText += ` (${statPerSec}/sec)`
                }

                if(this.isSecoundPerType[statName]){
                    let statSecPer = Math.round((stat / 60) * 100) / 100

                    p.innerText += ` (${statSecPer} sec)`
                }

                if(this.multByPerSecoundStat[statName]){
                    let statPerSec = object[this.multByPerSecoundStat[statName]]
                    statPerSec = Math.round((60 / statPerSec) * 100) / 100
                    let multByPerSec = Math.round(
                        (statPerSec * stat) * 100
                    ) / 100

                    p.innerText += ` (${multByPerSec}/sec)`
                }


                if(
                    baseObject
                ){

                    let baseObjectStat = this.getBuildStat(baseObject, statName)

                    if(
                        baseObjectStat === undefined
                        &&
                        stat !== undefined
                    ){

                        p.style.color = "lightblue"

                    }

                    if(
                        baseObjectStat !== undefined
                        &&
                        typeof baseObjectStat === "number"
                    ){
                        baseObjectStat = Math.round(baseObjectStat * 100) / 100
                    }

                    if(
                        baseObjectStat !== undefined
                        &&
                        baseObjectStat !== null
                        &&
                        baseObjectStat !== NaN
                        &&
                        typeof baseObjectStat === "number"
                        &&
                        stat !== baseObjectStat
                    ){

                        let percentage = Math.round(
                            (
                                (
                                    (stat/baseObjectStat) - 1
                                )* 100
                            ) * 100
                        ) / 100

                        p.innerText += ` - +%${percentage}`

                        p.style.color = "green"

                    }

                }

                box.appendChild(p)

            }

            this.shipInfoBox.appendChild(box)

        }

        // ON END!!!
        this.updateNameCostDisplay()

        this.updateCashDisplay()

    }

}