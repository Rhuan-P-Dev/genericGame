
import { CoreAIBuilderController } from "../../../js/AI/advancedAI/coreAIBuilderController.js"
import { EffectsController } from "../../../js/effects/effectsController.js"
import { setFrameOut } from "../../../js/frame/frameController.js"
import { GameStateController } from "../../../js/gameState/gameStateController.js"
import { CloneObjectController } from "../../../js/generalUtils/cloneObject.js"
import { CustomMathController } from "../../../js/generalUtils/math.js"
import { ObjectActivatesController } from "../../../js/objectController/objectActivatesController.js"
import { ShipCreatorController } from "../../../js/ship/shipCreatorController.js"
import { WeaponsModifiersController } from "../../../js/shipUnits/weapons/modifiers/weaponsModifiersController.js"
import { ScorerController } from "../../scorers/activates/scorerController.js"
import { ObjectsScorerController } from "../../scorers/objectsScorerController.js"
import { StatsUpgradesController } from "../../scorers/statsUpgradesController.js"
import { MainShopMenuController } from "./mainShopMenuController.js"

var ObjectsScorer
var ShipCreator
var mainShopMenu
var CustomMath
var ObjectActivates
var Effects
var GameState
var StatsUpgrades
var Scorer
var CoreAIBuilder
var CloneObject
var WeaponsModifiers

onInit(function(){

    ObjectsScorer = new ObjectsScorerController()
    ShipCreator = new ShipCreatorController()
    mainShopMenu = new MainShopMenuController()
    CustomMath = new CustomMathController()
    ObjectActivates = new ObjectActivatesController()
    Effects = new EffectsController()
    GameState = new GameStateController()
    StatsUpgrades = new StatsUpgradesController()
    Scorer = new ScorerController()
    CoreAIBuilder = new CoreAIBuilderController()
    CloneObject = new CloneObjectController()
    WeaponsModifiers = new WeaponsModifiersController()

})

var isOpen = true

var playerID = false

var playerData = {
    "spawnPlayerObjects": {},
    "customActivatesForPlayerObjects": {},
    "upgradeStats": {},
    "upgradeDefenseType": {},
    "ascensions": {},
    "effects": {},
    "applyEffects": {},
    "AICoreSliders": {},
    "AITypeState": {},
    "weaponMod": {},
    "bestWave": 0,
    "playerCash": 60000
}

export class PermanentShopController {

    permanentShop = document.getElementById("permanentShop")
    bestWaveDisplay = document.getElementById("bestWaveDisplay")

    init(){

        document.getElementById("saveButton").addEventListener("click", () => {
            PermanentShop.savePlayerData()
        })
    
        document.getElementById("loadButton").addEventListener("click", () => {
            PermanentShop.loadPlayerData()
        })

    }

    getBestWave(){
        return playerData.bestWave
    }

    changeBestWave(wave){
        if(
            wave > playerData.bestWave
        ){
            playerData.bestWave = wave
            this.bestWaveDisplay.innerHTML = wave
        }
    }

    savePlayerData() {
        const data = JSON.stringify(playerData, null, 2)
        const blob = new Blob([data], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "playerData.json"
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }

    loadPlayerData() {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".json"
        input.onchange = (event) => {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    playerData = JSON.parse(e.target.result)

                    mainShopMenu.open()
                    this.bestWaveDisplay.innerHTML = playerData.bestWave
                }
                reader.readAsText(file)
            }
        }
        input.click()
    }

    isOpen(){
        return isOpen
    }

    open(){
        isOpen = true
        this.permanentShop.style.display = "flex"
        mainShopMenu.updateCashDisplay()
    }

    close(){
        isOpen = false
        this.permanentShop.style.display = "none"
    }

    addCash(amount){
        playerData.playerCash += amount
    }

    deleteObject(ID){
        delete playerData.spawnPlayerObjects[ID]
    }

    setSliderValue(ID, name, value){

        if(!playerData.AICoreSliders[ID]){
            playerData.AICoreSliders[ID] = {}
        }

        playerData.AICoreSliders[ID][name] = value
    }

    getAllSliderValue(ID){
        return playerData.AICoreSliders[ID]
    }

    deleteSlider(ID){
        delete playerData.AICoreSliders[ID]
    }

    setAITypeState(ID, AIType, state) {
        if(!playerData.AITypeState[ID]){
            playerData.AITypeState[ID] = {}
        }

        playerData.AITypeState[ID][AIType] = state
    }

    getAITypeState(ID, AIType) {
        if(!playerData.AITypeState[ID]){
            return undefined
        }
        return playerData.AITypeState[ID][AIType]
    }

    getAllAITypeState(ID){
        if(
            !playerData.AITypeState[ID]
        ){
            return undefined
        }
        return playerData.AITypeState[ID]
    }

    removeAITypeState(ID, AIType) {
        if(playerData.AITypeState[ID]){
            delete playerData.AITypeState[ID][AIType]
        }
    }

    deleteAllAITypeState(ID) {
        if(playerData.AITypeState[ID]){
            delete playerData.AITypeState[ID]
        }
    }

    setIDPlayerObject(ID){
        playerID = ID
    }

    getIDPlayerObject(){
        return playerID
    }

    sellObject(ID) {
        if (this.getPlayerObject(ID)) {
            this.addCash(
                ObjectsScorer.getObjectCost(
                    this.getPlayerObject(ID)
                )
            )
            this.deleteObject(ID)
        }
    }

    sellAll(ID){
        this.sellAllWeaponsMod(ID)
        this.sellAllApplyEffects(ID)
        this.sellAllEffects(ID)
        this.sellAllAscensions(ID)
        this.sellAllUpgradeDefenseType(ID)
        this.sellAllUpgradeStats(ID)
        this.sellAllCustomActivates(ID)
        this.deleteSlider(ID)
        this.deleteAllAITypeState(ID)
    }

    addWeaponMod(ID, position, mod) {
        if (!playerData.weaponMod) {
            playerData.weaponMod = {}
        }

        if (!playerData.weaponMod[ID]) {
            playerData.weaponMod[ID] = {}
        }

        if (!playerData.weaponMod[ID][position]) {
            playerData.weaponMod[ID][position] = []
        }

        playerData.weaponMod[ID][position].push(mod)
    }

    getWeaponMod(ID, position) {
        if (playerData.weaponMod && playerData.weaponMod[ID] && playerData.weaponMod[ID][position]) {
            return playerData.weaponMod[ID][position]
        }
        return undefined
    }

    getAllWeaponsMods(ID) {
        if (playerData.weaponMod && playerData.weaponMod[ID]) {
            return playerData.weaponMod[ID]
        }
        return undefined
    }

    removeWeaponMod(ID, position, mod) {
        if (playerData.weaponMod && playerData.weaponMod[ID] && playerData.weaponMod[ID][position]) {
            if (mod >= 0 && mod < playerData.weaponMod[ID][position].length) {
                playerData.weaponMod[ID][position].splice(mod, 1)
            } else {
                console.error(`Invalid mod index: ${mod}`)
            }
        }
    }

    sellWeaponMod(ID, position, mod) {
        if (this.getPlayerObject(ID)) {
            const mods = this.getAllWeaponsMods(ID)
            if (mods && mods[position]) {
                const modName = this.getAllWeaponsMods(ID)[position][mod]
                const mult = WeaponsModifiers.getMult(modName, true)
                const weapon = this.getActivates(ID).weapon[position]
                const score = Scorer.get("weapon", weapon)
                const price = parseInt(score * mult)
                this.addCash(price)
                this.removeWeaponMod(ID, position, mod)
                return price
            }
        }
    }

    sellAllWeaponMod(ID, position) {

        if (!this.getPlayerObject(ID)) return false

        let mods = this.getAllWeaponsMods(ID)
        if (!mods || !mods[position]) return 0

        mods = mods[position]

        let totalPrice = 0

        const modsLength = mods.length

        for (
            let indey = 0;
            modsLength
            &&
            indey < modsLength;
            indey++
        ) {
            
            let price = this.sellWeaponMod(
                ID,
                position,
                0
            )
            if (price) {
                totalPrice += price
            }
        }

        return totalPrice

    }

    sellAllWeaponsMod(ID) {
        if (!this.getPlayerObject(ID)) return false

        let mods = this.getAllWeaponsMods(ID)
        if (!mods) return 0

        let totalPrice = 0

        let weapons = this.getActivates(ID).weapon

        for (let index = 0; index < weapons.length; index++) {
            
            let weaponIndex = index

            let price = this.sellAllWeaponMod(ID, weaponIndex)

            if (price) {
                totalPrice += price
            }
            
        }

        delete playerData.weaponMod[ID]

        return totalPrice
    }
    
    getCash(){
        return playerData.playerCash
    }

    addPlayerObject(object){
        playerData.spawnPlayerObjects[randomUniqueID()] = object
    }

    getPlayerObjects(){
        return playerData.spawnPlayerObjects
    }

    getPlayerObject(ID){
        return playerData.spawnPlayerObjects[ID]
    }

    addActivates(ID, type, activates){

        if(!this.getPlayerObject(ID)){return false}

        if(
            !playerData.customActivatesForPlayerObjects[ID]
        ){
            playerData.customActivatesForPlayerObjects[ID] = {}
        }

        playerData.customActivatesForPlayerObjects[ID] = ObjectActivates.addActivateInFormat(
            type,
            activates,
            playerData.customActivatesForPlayerObjects[ID]
        )

    }

    getActivates(ID){
        return playerData.customActivatesForPlayerObjects[ID]
    }

    removeActivate(ID, type, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!this.getActivates(ID)) return false

        if (!this.getActivates(ID)[type]) return false

        let activates = this.getActivates(ID)[type]

        if (!Array.isArray(activates) || index < 0 || index > activates.length-1) return false

        activates.splice(index, 1)

        return true

    }

    sellCustomActivate(ID, type, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!this.getActivates(ID)) return false

        if (!this.getActivates(ID)[type]) return false

        let activates = this.getActivates(ID)[type]

        if (!Array.isArray(activates) || index < 0 || index > activates.length - 1) return false

        let activateName = activates[index]
        let price = Scorer.get(type, activateName)

        activates.splice(index, 1)

        this.addCash(parseInt(price))

        return price
    }

    sellAllCustomActivates(ID) {
        if (!this.getPlayerObject(ID)) return false

        if (!this.getActivates(ID)) return 0

        let totalPrice = 0

        for (let type in this.getActivates(ID)) {
            while (this.getActivates(ID)[type].length > 0) {
                let price = this.sellCustomActivate(ID, type, 0)
                if (price) {
                    totalPrice += price
                }
            }
        }

        delete playerData.customActivatesForPlayerObjects[ID]

        return totalPrice
    }

    addUpgradeStat(ID, statType, statValues) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.upgradeStats[ID]) {
            playerData.upgradeStats[ID] = {}
        }

        if(!Array.isArray(statValues)){
            statValues = [statValues]
        }

        if(!playerData.upgradeStats[ID][statType]){
            playerData.upgradeStats[ID][statType] = statValues
        }else{
            playerData.upgradeStats[ID][statType] = playerData.upgradeStats[ID][statType].concat(statValues)
        }

        return true
    }

    getUpgradeStat(ID, statType) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.upgradeStats[ID]) return false

        return playerData.upgradeStats[ID][statType]
    }

    getAllUpgradeStat(ID){
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.upgradeStats[ID]) return false

        return playerData.upgradeStats[ID]
    }

    removeUpgradeStat(ID, statType, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.upgradeStats[ID]) return false

        if (!playerData.upgradeStats[ID][statType]) return false

        let upgrades = this.getUpgradeStat(ID, statType)

        if (!Array.isArray(upgrades) || index < 0 || index > upgrades.length-1) return false

        upgrades.splice(index, 1)

        return true

    }

    sellUpgradeStat(ID, statType, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.upgradeStats[ID]) return false

        if (!playerData.upgradeStats[ID][statType]) return false

        let upgrades = this.getUpgradeStat(ID, statType)

        if (!Array.isArray(upgrades) || index < 0 || index > upgrades.length - 1) return false

        let upgradeMult = upgrades[index]
        let price = StatsUpgrades.get(statType, upgradeMult)

        upgrades.splice(index, 1)

        this.addCash(price)

        return price
    }

    sellAllUpgradeStats(ID) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.upgradeStats[ID]) return 0

        let totalPrice = 0

        for (let statType in playerData.upgradeStats[ID]) {
            while (playerData.upgradeStats[ID][statType].length > 0) {
                let price = this.sellUpgradeStat(ID, statType, 0)
                if (price) {
                    totalPrice += price
                }
            }
        }

        delete playerData.upgradeStats[ID]

        return totalPrice
    }

    addUpgradeDefenseType(ID, defenseType, inStat, value, price) {
        if (!this.getPlayerObject(ID)) return false
        if (!playerData.upgradeDefenseType[ID]) {
            playerData.upgradeDefenseType[ID] = []
        }
        playerData.upgradeDefenseType[ID].push([defenseType, inStat, value, price])
        return true
    }

    getAllUpgradesDefenseType(ID) {
        if (!this.getPlayerObject(ID)) return false
        return playerData.upgradeDefenseType[ID]
    }

    removeUpgradeDefenseType(ID, index) {
        if (!this.getPlayerObject(ID)) return false
        if (!playerData.upgradeDefenseType[ID]) return false
        if (!Array.isArray(playerData.upgradeDefenseType[ID]) || index < 0 || index > playerData.upgradeDefenseType[ID].length - 1) return false
        playerData.upgradeDefenseType[ID].splice(index, 1)
        return true
    }

    sellUpgradeDefenseType(ID, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.upgradeDefenseType[ID]) return false

        if (!Array.isArray(playerData.upgradeDefenseType[ID]) || index < 0 || index > playerData.upgradeDefenseType[ID].length - 1) return false

        let upgrade = playerData.upgradeDefenseType[ID][index]
        let price = upgrade[3]

        this.removeUpgradeDefenseType(ID, index)

        this.addCash(price)

        return price
    }

    sellAllUpgradeDefenseType(ID) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.upgradeDefenseType[ID]) return 0

        let totalPrice = 0

        while (playerData.upgradeDefenseType[ID].length > 0) {
            let price = this.sellUpgradeDefenseType(ID, 0)
            if (price) {
                totalPrice += price
            }
        }

        delete playerData.upgradeDefenseType[ID]

        return totalPrice
    }

    addAscension(ID, ascensionType, price) {
        if (!this.getPlayerObject(ID)) return false
        if (!playerData.ascensions[ID]) {
            playerData.ascensions[ID] = []
        }
        playerData.ascensions[ID].push([ascensionType, price])
        return true
    }

    getAllAscensions(ID) {
        if (!this.getPlayerObject(ID)) return false
        return playerData.ascensions[ID]
    }

    removeAscension(ID, index) {
        if (!this.getPlayerObject(ID)) return false
        if (!playerData.ascensions[ID]) return false
        if (!Array.isArray(playerData.ascensions[ID]) || index < 0 || index > playerData.ascensions[ID].length - 1) return false
        playerData.ascensions[ID].splice(index, 1)
        return true
    }

    sellAscension(ID, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.ascensions[ID]) return false

        if (!Array.isArray(playerData.ascensions[ID]) || index < 0 || index > playerData.ascensions[ID].length - 1) return false

        let ascension = playerData.ascensions[ID][index]
        let price = ascension[1]

        this.removeAscension(ID, index)

        this.addCash(price)

        return price
    }

    sellAllAscensions(ID) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.ascensions[ID]) return 0

        let totalPrice = 0

        while (playerData.ascensions[ID].length > 0) {
            let price = this.sellAscension(ID, 0)
            if (price) {
                totalPrice += price
            }
        }

        delete playerData.ascensions[ID]

        return totalPrice
    }

    addEffect(ID, effectName, deBuff, applyType, price){
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.effects[ID]) {
            playerData.effects[ID] = []
        }

        playerData.effects[ID].push([effectName, deBuff, applyType, price])

        return true;
    }

    getAllEffects(ID) {
        if (!this.getPlayerObject(ID)) return false
        return playerData.effects[ID]
    }

    removeEffect(ID, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.effects[ID]) return false

        if (!Array.isArray(playerData.effects[ID]) || index < 0 || index > playerData.effects[ID].length - 1) return false

        playerData.effects[ID].splice(index, 1)

        return true
    }

    sellEffect(ID, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.effects[ID]) return false

        if (!Array.isArray(playerData.effects[ID]) || index < 0 || index > playerData.effects[ID].length - 1) return false

        let effect = playerData.effects[ID][index]
        let price = effect[3]

        this.removeEffect(ID, index)

        this.addCash(price)

        return price
    }

    sellAllEffects(ID) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.effects[ID]) return 0

        let totalPrice = 0

        while (playerData.effects[ID].length > 0) {
            let price = this.sellEffect(ID, 0)
            if (price) {
                totalPrice += price
            }
        }

        delete playerData.effects[ID]

        return totalPrice
    }

    addApplyEffect(ID, effectName, deBuff, applyType, price) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.applyEffects[ID]) {
            playerData.applyEffects[ID] = []
        }

        playerData.applyEffects[ID].push([effectName, deBuff, applyType, price])

        return true
    }

    getAllApplyEffects(ID) {
        if (!this.getPlayerObject(ID)) return false
        return playerData.applyEffects[ID]
    }

    removeApplyEffect(ID, index) {
        if (!this.getPlayerObject(ID)) return false
        if (!playerData.applyEffects[ID]) return false
        if (!Array.isArray(playerData.applyEffects[ID]) || index < 0 || index > playerData.applyEffects[ID].length - 1) return false
        playerData.applyEffects[ID].splice(index, 1)
        return true
    }

    sellApplyEffect(ID, index) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.applyEffects[ID]) return false

        if (!Array.isArray(playerData.applyEffects[ID]) || index < 0 || index > playerData.applyEffects[ID].length - 1) return false

        let effect = playerData.applyEffects[ID][index]
        let price = effect[3]

        this.removeApplyEffect(ID, index)

        this.addCash(price)

        return price
    }

    sellAllApplyEffects(ID) {
        if (!this.getPlayerObject(ID)) return false

        if (!playerData.applyEffects[ID]) return 0

        let totalPrice = 0

        while (playerData.applyEffects[ID].length > 0) {
            let price = this.sellApplyEffect(ID, 0)
            if (price) {
                totalPrice += price
            }
        }

        delete playerData.applyEffects[ID]

        return totalPrice
    }

    getPlayerObject(ID){
        return playerData.spawnPlayerObjects[ID]
    }

    spawnUnits(){

        let playerObjects = this.getPlayerObjects()

        for (let ID in playerObjects) {

            this.getSpawnUnit(ID, false)

        }

    }

    getSpawnUnit(ID, dell = true, isPlayer = this.getIDPlayerObject() === ID){

        let customCoreName = undefined

        if(this.getAllSliderValue(ID)){
            customCoreName = CoreAIBuilder.addAI(
                this.getAllSliderValue(ID),
            )
        }

        let object = ShipCreator.createShip(
            "playerTeam",
            {
                "AI": this.getAITypes(ID),
                "coreName": customCoreName || "default"
            },
            this.processActivates(ID),
            Effects.formatAllEffectsScore(this.getAllEffects(ID)),
            isPlayer,
            new (ObjectsScorer.get(this.getPlayerObject(ID)))(true),
            this.getAllAscensions(ID),
            this.statsUpgradeConvertToCreateShip(
                this.getAllUpgradeStat(ID)
            ),
            this.getAllUpgradesDefenseType(ID),
            Effects.formatAllEffectsScore(
                this.getAllApplyEffects(ID)
            ).apply
        )

        object.color = "green"

        if(dell){
            setFrameOut(
                () => {
                    GameState.remove(object)
                },10,
            )
        }

        return object

    }

    processActivates(ID){

        var activates = this.getActivates(ID)

        if(!activates){return {}}

        activates = CloneObject.recursiveCloneAttribute(activates)

        const weapons = activates.weapon
        const mods = this.getAllWeaponsMods(ID) || {}

        for (
            let index = 0;
            weapons
            &&
            index < weapons.length;
            index++
        ) {
            
            for (
                let indey = 0;
                mods[index]
                &&
                indey < mods[index].length;
                indey++) {

                weapons[index] += "|" + mods[index][indey]

            }
            
        }


        if(weapons){
            activates.weapon = weapons
        }

        return activates
    }

    getAITypes(ID){

        let result = []

        let AITypes = this.getAllAITypeState(ID)

        for (const key in AITypes) {
            if(AITypes[key]){
                result.push(key)
            }
        }

        return result

    }

    statsUpgradeConvertToCreateShip(data) {
        let result = []
    
        for (let key in data) {
            if (Array.isArray(data[key])) {
                let sum = data[key].reduce((acc, val) => acc + val, 0)
                result.push([key, sum])
            }
        }
    
        return result
    }

    paintCostDisplay(element, cost){

        let mult = CustomMath.linear(this.getCash(), cost)
        let inveted = CustomMath.linearReverse(this.getCash(), cost)

        element.style.color = `rgb(
            ${Math.round(255 * inveted)},
            ${Math.round(255 * mult)},
            0
        )`

    }

}

const PermanentShop = new PermanentShopController()