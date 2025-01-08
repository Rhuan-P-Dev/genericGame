import { EffectsController } from "../../../js/effects/effectsController.js"
import { WeaponsModifiersController } from "../../../js/shipUnits/weapons/modifiers/weaponsModifiersController.js"
import { ScorerController } from "../../scorers/activates/scorerController.js"
import { AscensionScorerController } from "../../scorers/ascensionScorerController.js"
import { DefenseTypesScorerController } from "../../scorers/defenseTypesScorerController.js"
import { EffectsScorerController } from "../../scorers/effects/effectsScorerController.js"
import { StatsUpgradesController } from "../../scorers/statsUpgradesController.js"
import { PermanentShopController } from "./permanentShopController.js"

var Scorer
var PermanentShop
var StatsUpgrades
var DefenseTypesScorer
var AscensionScorer
var EffectsScorer
var Effects
var WeaponsModifiers

onInit(function(){

    Scorer = new ScorerController()
    PermanentShop = new PermanentShopController()
    StatsUpgrades = new StatsUpgradesController()
    DefenseTypesScorer = new DefenseTypesScorerController()
    AscensionScorer = new AscensionScorerController()
    EffectsScorer = new EffectsScorerController()
    Effects = new EffectsController()
    WeaponsModifiers = new WeaponsModifiersController()

})

export class BuySellShopController {

    objectID
    costDisplay
    buyStore
    sellStore
    buyStoreDisplay
    sellStoreDisplay

    set(
        objectID,
        costDisplay,
        buyStore,
        sellStore,
        buyStoreDisplay,
        sellStoreDisplay,
        buySellAdditionalTriggers = []
    ){
        this.objectID = objectID
        this.costDisplay = costDisplay
        this.buyStore = buyStore
        this.sellStore = sellStore
        this.buyStoreDisplay = buyStoreDisplay
        this.sellStoreDisplay = sellStoreDisplay

        this.buySellAdditionalTriggers = buySellAdditionalTriggers

        this.cleanAllStore()

        this.updateCashDisplay()
        this.updateStoreContentColors()

    }

    init(
        type,
        costMult = 1,
        additionalParams = {}
    ){

        let items = this.loadBuy(type, costMult)
        this.createStoreContent(
            type,
            items,
            "buy",
            this.buyStore,
            costMult,
            additionalParams
        )
        this.loadSell(type, costMult, additionalParams)

        this.updateTotalSumStores()
        this.updateCashDisplay()

    }

    subLoader = {
        "weapon": (type, costMult) => {

            let activates = Scorer.getAll(type).sort((entryA, entryB) => entryA[1] - entryB[1])

            for (let index = 0; index < activates.length; index++) {
    
                activates[index][1] = parseInt(activates[index][1]) * costMult
                activates[index][2] = type
    
            }

            return activates

        },
        "defense": (type, costMult) => {return this.subLoader["weapon"](type, costMult)},
        "factory": (type, costMult) => {return this.subLoader["weapon"](type, costMult)},
        "special": (type, costMult) => {return this.subLoader["weapon"](type, costMult)},
        "statsUpgrades": (type, costMult) => {

            let statsUpgrades = StatsUpgrades.getAll()

            let result = []

            for (let index = 0; index < statsUpgrades.length; index++) {

                let name = statsUpgrades[index][0]
                let percentage = statsUpgrades[index][1]
                let price = parseInt(statsUpgrades[index][2]) * costMult

                result.push(
                    [
                        name + " - +%" + percentage*100,
                        name, // statName
                        percentage,
                        price,
                        type,
                    ]
                )

            }

            result.sort((entryA, entryB) => entryA[3] - entryB[3])

            return result

        },
        "defenseTypes": (type, costMult) => {
            let defenseTypes = DefenseTypesScorer.getAll()

            let result = []

            for (let index = 0; index < defenseTypes.length; index++) {

                let name = defenseTypes[index][0]
                let inStat = defenseTypes[index][1]
                let percentage = defenseTypes[index][2]
                let price = parseInt(defenseTypes[index][3]) * costMult

                result.push(
                    [
                        name + " - " + inStat + " - +%" + percentage*100,
                        name, // defenseTypeName
                        inStat,
                        percentage,
                        price,
                        type,
                    ]
                )

            }

            result.sort((entryA, entryB) => entryA[4] - entryB[4])

            return result

        },
        "ascensions": (type, costMult) => {
            let ascensions = AscensionScorer.getAll()

            ascensions.sort((entryA, entryB) => entryA[1] - entryB[1])

            for (let index = 0; index < ascensions.length; index++) {

                ascensions[index].push(
                    type
                )

                ascensions[index][1] *= costMult

            }

            return ascensions

        },
        "effects": (type, costMult) => {
            let effects = EffectsScorer.getAll()

            effects.sort((entryA, entryB) => entryA[3] - entryB[3])

            for (let index = 0; index < effects.length; index++) {

                effects[index].push(
                    type
                )

                effects[index][3] *= costMult

            }

            return effects

        },
        "applyEffects": (type, costMult) => {
            
            let effects = EffectsScorer.getAll()

            let result = []

            effects.sort((entryA, entryB) => entryA[3] - entryB[3])

            for (let index = 0; index < effects.length; index++) {

                if(effects[index][1] !== "negative"){continue}

                result.push(
                    []
                )

                for (let indey = 0; indey < effects[index].length; indey++) {

                    if(indey === 3){
                        effects[index][indey] *= costMult// price
                    }

                    result[result.length - 1][indey] = effects[index][indey]

                }

                result[result.length-1].push(
                    type
                )

            }

            return result

        },
        "weaponsMods": (type, costMult) => {

            //result.push(
            //    [
            //        name + " - +%" + percentage*100,
            //        name, // statName
            //        percentage,
            //        price,
            //        type,
            //    ]
            //)

            const weaponsMods = WeaponsModifiers.getAllMults(true)

            const weaponsModsArray = []

            for (const modName in weaponsMods) {

                const modMult = weaponsMods[modName]

                weaponsModsArray.push(
                    [
                       modName,
                       parseInt(modMult * costMult), // price
                       type,
                    ]
                )
            }

            return weaponsModsArray

        }

    }

    loadBuy(type, costMult){

        let buys = this.subLoader[type](type, costMult)

        return buys

    }

    setAttributeInDiv = {
        "weapon": (div, item) => {

            div.setAttribute("name", item[0])
            div.setAttribute("price", item[1])
            div.setAttribute("type", item[2])
            div.setAttribute("index", item[3])

            let span = document.createElement("span")

            span.innerHTML = item[0] + " - " + numberToCash(item[1])

            return span

        },
        "defense": (div, item) => {
            return this.setAttributeInDiv["weapon"](div, item)
        },
        "factory": (div, item) => {
            return this.setAttributeInDiv["weapon"](div, item)
        },
        "special": (div, item) => {
            return this.setAttributeInDiv["weapon"](div, item)
        },
        "statsUpgrades": (div, item) => {

            div.setAttribute("name", item[0])
            div.setAttribute("statname", item[1])
            div.setAttribute("statmult", item[2])
            div.setAttribute("price", item[3])
            div.setAttribute("type", item[4])
            div.setAttribute("index", item[5])

            let span = document.createElement("span")

            span.innerHTML = item[0] + " - " + numberToCash(item[3])

            return span
        },
        "defenseTypes": (div, item) => {

            div.setAttribute("name", item[0])
            div.setAttribute("defense_type", item[1])
            div.setAttribute("in_stat", item[2])
            div.setAttribute("percentage", item[3])
            div.setAttribute("price", item[4])
            div.setAttribute("type", item[5])
            div.setAttribute("index", item[6])

            let span = document.createElement("span")

            span.innerHTML = item[0] + " - " + numberToCash(item[4])

            return span

        },
        "ascensions": (div, item) => {

            div.setAttribute("name", item[0])
            div.setAttribute("price", item[1])
            div.setAttribute("type", item[2])
            div.setAttribute("index", item[3])

            let span = document.createElement("span")

            span.innerHTML = item[0] + " - " + numberToCash(item[1])

            return span

        },
        "effects": (div, item) => {

            //let effectName = effect[0]
            //let deBuff = effect[1]
            //let applyType = effect[2]

            div.setAttribute("name", item[0])
            div.setAttribute("de_buff", item[1])
            div.setAttribute("applyType", item[2])
            div.setAttribute("price", item[3])
            div.setAttribute("type", item[4])
            div.setAttribute("index", item[5])

            let span = document.createElement("span")

            let nameSufix = ""

            if(item[1] === "negative"){
                nameSufix = " - apply"
            }

            span.innerHTML = item[0] + nameSufix + " - " + item[2] + " - " + numberToCash(item[3])

            return span

        },
        "applyEffects": (div, item) => {
            return this.setAttributeInDiv["effects"](div, item)
        },
        "weaponsMods": (div, item) => {
            div.setAttribute("name", item[0])
            div.setAttribute("price", item[1])
            div.setAttribute("type", item[2])
            div.setAttribute("index", item[3])
            div.setAttribute("weaponIndex", item[4])

            let span = document.createElement("span")

            span.innerHTML = item[0] + " - " + numberToCash(item[1])

            return span
        },
    }

    createStoreFunctions = {
        "weapon": (
            div,
        ) => {

            PermanentShop.addActivates(
                this.objectID,
                div.getAttribute("type"),
                [
                    div.getAttribute("name")
                ],
            )

        },
        "defense": (
            div,
        ) => {
            return this.createStoreFunctions["weapon"](div)
        },
        "factory": (
            div,
        ) => {
            return this.createStoreFunctions["weapon"](div)
        },
        "special": (
            div,
        ) => {
            return this.createStoreFunctions["weapon"](div)
        },
        "statsUpgrades": (
            div,
        ) => {

            PermanentShop.addUpgradeStat(
                this.objectID,
                div.getAttribute("statname"),
                parseFloat(div.getAttribute("statmult")),
                parseInt(div.getAttribute("price"))
            )

        },
        "defenseTypes": (
            div,
        ) => {

            PermanentShop.addUpgradeDefenseType(
                this.objectID,
                div.getAttribute("defense_type"),
                div.getAttribute("in_stat"),
                parseFloat(div.getAttribute("percentage")),
                parseInt(div.getAttribute("price")),
            )

        },
        "ascensions": (
            div,
         ) => {

            PermanentShop.addAscension(
                this.objectID,
                div.getAttribute("name"),
                parseInt(div.getAttribute("price")),
            )

        },
        "effects": (div) => {

            PermanentShop.addEffect(
                this.objectID,
                div.getAttribute("name"),
                div.getAttribute("de_buff"),
                div.getAttribute("applyType"),
                parseInt(div.getAttribute("price")),
            )

        },
        "applyEffects": (div) => {

            PermanentShop.addApplyEffect(
                this.objectID,
                div.getAttribute("name"),
                div.getAttribute("de_buff"),
                div.getAttribute("applyType"),
                parseInt(div.getAttribute("price")),
            )
        },
        "weaponsMods": (div, additionalParams) => {

            PermanentShop.addWeaponMod(
                this.objectID,
                additionalParams["weaponIndex"],
                div.getAttribute("name"),
            )
        }

    }

    createSellFunctions = {
        "weapon": (
            div,
        ) => {

            if(div.getAttribute("type") === "weapon"){
                PermanentShop.sellAllWeaponMod(
                    this.objectID,
                    div.getAttribute("index")
                )
            }

            PermanentShop.removeActivate(
                this.objectID,
                div.getAttribute("type"),
                div.getAttribute("index")
            )
        },
        "defense": (
            div,
        ) => {
            return this.createSellFunctions["weapon"](div)
        },
        "factory": (
            div,
        ) => {
            return this.createSellFunctions["weapon"](div)
        },
        "special": (
            div,
        ) => {
            return this.createSellFunctions["weapon"](div)
        },
        "statsUpgrades": (
            div,
        ) => {

            PermanentShop.removeUpgradeStat(
                this.objectID,
                div.getAttribute("statname"),
                div.getAttribute("index"),
            )

        },
        "defenseTypes": (
            div,
        ) => {
            PermanentShop.removeUpgradeDefenseType(
                this.objectID,
                div.getAttribute("index"),
            )
        },
        "ascensions": (
            div,
         ) => {

            PermanentShop.removeAscension(
                this.objectID,
                div.getAttribute("index"),
            )

        },
        "effects": (div) => {
            PermanentShop.removeEffect(
                this.objectID,
                div.getAttribute("index")
            )
        },
        "applyEffects": (div) => {
            PermanentShop.removeApplyEffect(
                this.objectID,
                div.getAttribute("index")
            )
        },
        "weaponsMods": (div) => {

            //modsArray.push([
            //    mod,
            //    modMult * costMult,// price
            //    type,
            //    index, // mod index,
            //    additionalParams.weaponIndex, // weapon index,
            //])

            PermanentShop.removeWeaponMod(
                this.objectID,
                div.getAttribute("weaponIndex"),
                div.getAttribute("index"),
            )

        }

    }

    createStoreContent(
        type,
        content,
        typeOfStore = "buy",
        element = this.buyStore,
        costMult,
        additionalParams = {}
    ){
        this.cleanStore(element)

        for (let index = 0; index < content.length; index++) {
            
            let item = content[index]

            let div = document.createElement("div")

            div.appendChild(
                this.setAttributeInDiv[type](div, item)
            )

            element.appendChild(div)

        }

        this.initStoreContent(
            element,
            type,
            typeOfStore,
            costMult,
            additionalParams
        )

    }

    runAdditionalTriggers(){

        this.buySellAdditionalTriggers.forEach(element => {
            element()
        })

    }

    initStoreContent(
        element,
        type,
        typeOfStore = "buy",
        costMult,
        additionalParams = {}
    ) {
        let nodes = element.childNodes

        for (let index = 0; index < nodes.length; index++) {
            let div = nodes[index]
            let price = div.getAttribute("price")

            div.addEventListener("click", () => {

                if(typeOfStore === "buy") {

                    if (this.canBuy(price)) {

                        PermanentShop.addCash(
                            -parseInt(price)
                        )

                        this.createStoreFunctions[type](div, additionalParams)

                    }
                    
                }else{

                    PermanentShop.addCash(parseInt(price))

                    this.createSellFunctions[type](div)
                }

                this.loadSell(
                    div.getAttribute("type"),
                    costMult,
                    additionalParams
                )

                this.updateTotalSumStores()
                
                this.updateStoreContentColors()
                this.updateCashDisplay()

                this.runAdditionalTriggers()
            })
        }

        this.updateStoreContentColors()

    }

    updateStoreContentColors() {
        let nodes = this.buyStore.childNodes

        for (let index = 0; index < nodes.length; index++) {

            if(!nodes[index].getAttribute){continue}

            PermanentShop.paintCostDisplay(
                nodes[index],
                nodes[index].getAttribute("price")
            )

        }

    }

    getInventory = {
        "weapon": (ID, type) => {
            if(PermanentShop.getActivates(ID)){
                return PermanentShop.getActivates(ID)[type]
            }else{
                return false
            }
        },
        "defense": (ID, type) => {
            return this.getInventory["weapon"](ID, type)
        },
        "factory": (ID, type) => {
            return this.getInventory["weapon"](ID, type)
        },
        "special": (ID, type) => {
            return this.getInventory["weapon"](ID, type)
        },
        "statsUpgrades": (ID, type) => {

            return PermanentShop.getAllUpgradeStat(ID)

        },
        "defenseTypes": (ID, type) => {
            return PermanentShop.getAllUpgradesDefenseType(ID)
        },
        "ascensions": (ID, type) => {

            return PermanentShop.getAllAscensions(ID)

        },
        "effects": (ID, type) => {
            return PermanentShop.getAllEffects(ID)
        },
        "applyEffects": (ID, type) => {
            return PermanentShop.getAllApplyEffects(ID)
        },
        "weaponsMods": (ID, type) => {
            return PermanentShop.getAllWeaponsMods(ID)
        },
    }

    getScore = {
        "weapon": (type, item) => {
            return parseInt(Scorer.get(type, item))
        },
        "defense": (type, item) => {
            return this.getScore["weapon"](type, item)
        },
        "factory": (type, item) => {
            return this.getScore["weapon"](type, item)
        },
        "special": (type, item) => {
            return this.getScore["weapon"](type, item)
        },
        "statsUpgrades": (statName, mult) => {

            return StatsUpgrades.get(statName, mult)

        },
    }

    loadSellProcess = {
        "weapon": (type, inventoryItems) => {

            let result = []

            for (let index = 0; index < inventoryItems.length; index++) {

                result[index] = [
                    inventoryItems[index],
                    this.getScore[type](
                        type,
                        inventoryItems[index]
                    ),
                    type,
                    index
                ]

            }

            return result

        },
        "defense": (type, inventoryItems) => {
            return this.loadSellProcess["weapon"](type, inventoryItems)
        },
        "factory": (type, inventoryItems) => {
            return this.loadSellProcess["weapon"](type, inventoryItems)
        },
        "special": (type, inventoryItems) => {
            return this.loadSellProcess["weapon"](type, inventoryItems)
        },
        "statsUpgrades": (type, inventoryItems) => {
            
            let result = []

            for (let statName in inventoryItems) {

                for (let index = 0; index < inventoryItems[statName].length; index++) {

                    let mult = inventoryItems[statName][index]
                    let name = statName + " - +%" + mult*100

                    result.push([
                        name,
                        statName,
                        mult,
                        this.getScore[type](
                            statName,
                            mult
                        ),
                        type,
                        result.length
                    ])

                }

            }

            return result

        },
        "defenseTypes": (type, inventoryItems) => {
            
            let result = []

            for (let index = 0; index < inventoryItems.length; index++) {

                let name = inventoryItems[index][0]
                let inStat = inventoryItems[index][1]
                let percentage = inventoryItems[index][2]
                let price = inventoryItems[index][3]

                result[index] = [
                    name + " - " + inStat + " - +%" + percentage*100,
                    name, //defense_type
                    inStat,
                    percentage,
                    price,
                    type,
                    index
                ]

            }

            return result

        },
        "ascensions": (type, inventoryItems) => {

            let result = []

            for (let index = 0; index < inventoryItems.length; index++) {

                result[index] = [
                    inventoryItems[index][0],
                    inventoryItems[index][1],
                    type,
                    index,
                ]

            }

            return result

        },
        "effects": (type, inventoryItems) => {

            let result = []

            for (let index = 0; index < inventoryItems.length; index++) {

                result[index] = [
                    inventoryItems[index][0],
                    inventoryItems[index][1],
                    inventoryItems[index][2],
                    inventoryItems[index][3],
                    type,
                    index,
                ]

            }

            return result

        },
        "applyEffects": (type, inventoryItems) => {
            return this.loadSellProcess["effects"](type, inventoryItems)
        },
        "weaponsMods": (type, inventoryItems, costMult, additionalParams) => {

            const modsArray = []

            const mods = inventoryItems[
                additionalParams.weaponIndex
            ]

            for (
                let index = 0;
                mods
                &&
                index < mods.length;
                index++
            ) {
            
                const mod = mods[index]
                const modMult = WeaponsModifiers.getMult(mod, true)

                modsArray.push([
                    mod,
                    parseInt(modMult * costMult),// price
                    type,
                    index, // mod index,
                    additionalParams.weaponIndex, // weapon index,
                ])

            }

            return modsArray

        },
        
    }

    loadSell(type, costMult, additionalParams){

        let inventoryItems = this.getInventory[type](this.objectID, type)

        if(!inventoryItems){
            this.cleanStore(this.sellStore)
            return
        }

        let result = this.loadSellProcess[type](type, inventoryItems, costMult, additionalParams)

        this.createStoreContent(
            type,
            result,
            "sell",
            this.sellStore,
            costMult,
            additionalParams
        )

    }

    cleanStore(element = this.buyStore){
        element.innerHTML = ""
    }

    cleanAllStore(){
        this.cleanStore(this.sellStore)
        this.cleanStore(this.buyStore)
    }

    updateTotalSumStores(){
        this.setTotalSum(
            this.buyStore,
            this.buyStoreDisplay
        )
        this.setTotalSum(
            this.sellStore,
            this.sellStoreDisplay,
        )
    }

    setTotalSum(
        element,
        target
    ){

        let nodes = element.childNodes

        let totalSum = 0

        for (let index = 0; index < nodes.length; index++) {
            let div = nodes[index]

            if(div.getAttribute === undefined){
                continue
            }

            let price = div.getAttribute("price")
            totalSum += parseInt(price)
        }

        target.innerHTML = numberToCash(totalSum)

    }

    canBuy(price){
        let playerMoney = PermanentShop.getCash()

        if(playerMoney >= price){
            return true
        }else{
            return false
        }

    }

    updateCashDisplay(){
        this.costDisplay.innerText = numberToCash(PermanentShop.getCash())
    }

}