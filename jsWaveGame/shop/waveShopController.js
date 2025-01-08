import { DamageController } from "../../js/damage/damageController.js"
import { EffectsController } from "../../js/effects/effectsController.js"
import { GameStateController } from "../../js/gameState/gameStateController.js"
import { MultiplyStatsController } from "../../js/generalUtils/multiplyStats.js"
import { KeyBoardController } from "../../js/keyboard/keyBoardController.js"
import { ObjectActivatesController } from "../../js/objectController/objectActivatesController.js"
import { ShipCreatorController } from "../../js/ship/shipCreatorController.js"
import { WeaponsInfoController } from "../../js/shipUnits/weapons/info/weaponsInfoController.js"
import { WeaponsModifiersController } from "../../js/shipUnits/weapons/modifiers/weaponsModifiersController.js"
import { WeaponScorerController } from "../scorers/activates/weaponScorerController.js"
import { EffectsScorerController } from "../scorers/effects/effectsScorerController.js"
import { GenericEffectsScorerController } from "../scorers/effects/generic/genericEffectsScorerController.js"
import { WaveController } from "../wave/waveController.js"
import { PermanentShopController } from "./permanentShop/permanentShopController.js"

var WeaponScorer
var WeaponsInfo
var Wave
var ObjectActivates
var GameState
var Effects
var EffectsScorer
var GenericEffectsScorer
var ShipCreator
var MultiplyStats
var Damage
var PermanentShop
var WeaponsModifiers
var KeyBoard

onInit(function(){

    WeaponScorer = new WeaponScorerController()
    WeaponsInfo = new WeaponsInfoController()
    Wave = new WaveController()
    ObjectActivates = new ObjectActivatesController()
    GameState = new GameStateController()
    Effects = new EffectsController()
    EffectsScorer = new EffectsScorerController()
    GenericEffectsScorer = new GenericEffectsScorerController()
    ShipCreator = new ShipCreatorController()
    MultiplyStats = new MultiplyStatsController()
    Damage = new DamageController()
    PermanentShop = new PermanentShopController()
    WeaponsModifiers = new WeaponsModifiersController()
    KeyBoard = new KeyBoardController()

})

var playerWaveCash = 0
var isOpen = false

export class WaveShopController {

    waveShop = document.getElementById("waveShop")
    waveShopCloseButton = document.getElementById("waveShopCloseButton")
    waveShopEndButton = document.getElementById("waveShopEndButton")
    activateBox = document.getElementById("activateBox")
    cash = document.getElementById("cash")

    currentWaveDisplay = document.getElementById("currentWaveDisplay")
    bestWaveDisplay = document.getElementById("bestWaveDisplay")

    setCurrentWaveDisplay(number){
        this.currentWaveDisplay.innerHTML = number
    }

    setBestWaveDisplay(number){
        this.bestWaveDisplay.innerHTML = number
    }

    init(){

        this.waveShopCloseButton.addEventListener("click", () => {
            this.stop()
        })

        this.waveShopEndButton.addEventListener("click", () => {
            this.end()
        })

    }

    isOpen(){
        return isOpen
    }

    add(cash){
        playerWaveCash += parseInt(cash)
    }

    reset(){
        playerWaveCash = 0
    }

    start(){

        this.waveShop.style.display = "flex"

        this.addPassWaveBlock()
        this.addSupportBlock()
        this.addAscensionBlock()
        this.addEffectOnProjectilesBlock()
        this.addEffectBlock()
        this.addDefenseTypeUpgradeBlock()
        this.addRandomStatUpgradeBlock()
        this.addActivatesBlock()

        this.cash.innerHTML = parseInt(playerWaveCash)

        this.waveShopCloseButton.focus()

        isOpen = true

    }

    addPassWaveBlock(){

        if(
            PermanentShop.getBestWave() <= Wave.getWave()
        ){return}

        var pass = parseInt(
            (PermanentShop.getBestWave() * 0.1)
        )

        if(pass <= 0){return}

        if(
            PermanentShop.getBestWave() <= Wave.getWave() + pass
        ){return}

        this.createShopClickBlock(
            "go to " + (Wave.getWave() + pass + 2) + " wave",
            "passWave",
            (params) => {
                Wave.passWave(
                    params.waves
                )
                return true
            },
            0,
            {
                "waves": pass
            }
        )

    }

    supportChance = 0.1

    addDefenseTypeUpgradeBlock(){

        let randomDefenseTypeUpgrades = Wave.addDefenseTypeUpgrade(
            playerWaveCash
        )

        for (let index = 0; index < randomDefenseTypeUpgrades.length; index++) {

            let type = randomDefenseTypeUpgrades[index][0]
            let stat = randomDefenseTypeUpgrades[index][1]
            let percent = randomDefenseTypeUpgrades[index][2]
            let cost = randomDefenseTypeUpgrades[index][3]

            this.createShopClickBlock(
                type + " - " + stat + " - +" + (percent*100).toString()+"%",
                "defenseTypeUpgrade",
                (params) => {

                    Damage.addDefense(
                        GameState.getPlayer(),
                        params.stat,
                        params.type,
                        params.percent
                    )

                    return true

                },
                cost,
                {
                    type,
                    stat,
                    percent,
                }
            )

        }

    }

    addRandomStatUpgradeBlock(){

        let randomStatsUpgrades = Wave.addStatsUpgrade(
            playerWaveCash
        )

        for (let index = 0; index < randomStatsUpgrades.length; index++) {

            let name = randomStatsUpgrades[index][0]
            let percent = randomStatsUpgrades[index][1]
            let cost = randomStatsUpgrades[index][2]

            this.createShopClickBlock(
                name + " - +" + (percent*100).toString()+"%",
                "statUpgrade",
                (params) => {

                    MultiplyStats.multiply(
                        GameState.getPlayer(),
                        params.percent,
                        {
                            "normalStats": [params.name]
                        }
                    )

                    return true

                },
                cost,
                {
                    name,
                    percent,
                }
            )

        }

    }

    addSupportBlock(){
        
        if(
            playerWaveCash*0.1 >= Wave.getMinBudget()
            &&
            Math.random() < this.supportChance
        ){

            this.createShopClickBlock(
                "help",
                "help",
                (params) => {
                    return Wave.spawnUnits(
                        playerWaveCash*0.1,
                        "playerTeam",
                        "green",
                    )
                },
                playerWaveCash*0.1,
            )

        }

        if(
            playerWaveCash*0.25 >= Wave.getMinBudget()
            &&
            Math.random() < this.supportChance
        ){

            this.createShopClickBlock(
                "support",
                "help",
                (params) => {
                    return Wave.spawnUnits(
                        playerWaveCash*0.25,
                        "playerTeam",
                        "green",
                    )
                },
                playerWaveCash*0.25,
            )

        }

        if(
            playerWaveCash*0.5 >= Wave.getMinBudget()
            &&
            Math.random() < this.supportChance
        ){

            this.createShopClickBlock(
                "escort",
                "help",
                (params) => {
                    return Wave.spawnUnits(
                        playerWaveCash*0.5,
                        "playerTeam",
                        "green",
                    )
                },
                playerWaveCash*0.5,
            )

        }

        if(
            playerWaveCash*0.75 >= Wave.getMinBudget()
            &&
            Math.random() < this.supportChance
        ){

            this.createShopClickBlock(
                "army",
                "help",
                (params) => {
                    return Wave.spawnUnits(
                        playerWaveCash*0.75,
                        "playerTeam",
                        "green",
                    )
                },
                playerWaveCash*0.75,
            )

        }

        if(
            playerWaveCash >= Wave.getMinBudget()
            &&
            Math.random() < this.supportChance
        ){

            this.createShopClickBlock(
                "extermination team",
                "help",
                (params) => {
                    return Wave.spawnUnits(
                        playerWaveCash*1.25,
                        "playerTeam",
                        "green",
                    )
                },
                playerWaveCash,
            )

        }

    }

    addEffectOnProjectilesBlock(){

        let effects = Wave.addEffects(playerWaveCash)

        //this.addEffectAddBlock(
        //    effects.add,
        //    "add effect on projectiles",
        //    GameState.getPlayer(),
        //    2.5
        //)

        this.addEffectApplyBlock(
            effects.apply,
            "apply effect on projectiles",
            GameState.getPlayer(),
            2.5,
            (params) => {

                //console.log("---------------------------------------")

                //console.log(params)

                for (let ID in params.object.activates) {

                    let activate = params.object.activates[ID]
    
                    if(!activate.effects){
                        activate.effects = []
                    }

                    activate.effects = [
                        ...activate.effects,
                        params.effect
                    ]
    
                }

                //console.log(params.object.activates)

                return true

            }
        )

    }

    addEffectBlock(){

        let effects = Wave.addEffects(playerWaveCash)

        this.addEffectAddBlock(
            effects.add,
            "add effect",
            GameState.getPlayer()
        )

        this.addEffectApplyBlock(
            effects.apply,
            "apply effect",
            GameState.getPlayer()
        )

    }

    addEffectAddBlock(
        effects,
        blockShopType,
        object,
        costMult = 1,
        func = (params) => {
            Effects.add(
                params.effectName,
                params.effectType,
                {
                    "object": params.object,
                },
            )
            return true
        }
    ){

        for (let effectType in effects) {

            for (let index = 0; index < effects[effectType].length; index++) {

                let effectName = effects[effectType][index]

                let cost = parseInt(EffectsScorer.get(effectName, effectType)) * costMult

                this.createShopClickBlock(
                    effectName + " - " + effectType,
                    blockShopType,
                    func,
                    cost,
                    {
                        effectName,
                        effectType,
                        object
                    }
                )

            }

        }


    }

    addEffectApplyBlock(
        effects,
        blockShopType,
        object,
        costMult = 1,
        func = (params) => {
            Effects.apply(
                params.applyType,
                params.tempConfig,
                params.effectName,
                params.effectType,
                {
                    "object": params.object,
                },
                {},
                false
            )
            return true
        }
    ){

        for (let index = 0; index < effects.length; index++) {

            let effect = effects[index]
            let effectName = effect.effect.config.name
            let effectType = effect.effect.config.type
            let cost = 0
            let apply = effect.apply.apply
            let applyType = effect.apply.applyType
            let tempConfig = effect.apply.tempConfig || {}

            if(
                GenericEffectsScorer.haveThis(effectName)
            ){
                cost = parseInt(EffectsScorer.get(effectName, applyType))
            }else{
                cost = parseInt(EffectsScorer.get(effectName, effectType))
            }

            cost *= costMult
            
            this.createShopClickBlock(
                effectName + " - " + effectType,
                blockShopType,
                func,
                cost,
                {
                    effect,
                    effectName,
                    effectType,
                    applyType,
                    tempConfig,
                    object
                }
            )

        }

    }

    updateUpgradeColors() {
        let upgradeBlocks = this.activateBox.querySelectorAll("div")
        upgradeBlocks.forEach(block => {
            let split = block.querySelector("p").innerText.split(" - ")
            let cost = parseInt(split[split.length - 1])
            if (playerWaveCash < cost) {
                block.style.border = "3px solid gray"
                block.style.color = "gray"
            }
        })
    }

    createShopClickBlock(text, type, func, cost, funcParams){
        
        let weaponBlock = document.createElement("div")
        let weaponBlockP = document.createElement("p")
        if(parseInt(cost) !== 0){
            text += " - " + parseInt(cost)
        }
        weaponBlockP.innerText = text
        weaponBlock.addEventListener("click", () => {

            if(playerWaveCash < cost){return}

            let isDone = func(funcParams)
            if(isDone){
                weaponBlock.remove()
                playerWaveCash -= cost
                this.cash.innerHTML = parseInt(playerWaveCash)
                this.updateUpgradeColors()
            }
            
        })

        this.paint(type, weaponBlock)

        weaponBlock.appendChild(weaponBlockP)
        this.activateBox.appendChild(weaponBlock)
        this.updateUpgradeColors()

    }

    addActivatesBlock(){

        let activates = Wave.getActivates(playerWaveCash)[1]

        for (let type in activates) {

            for (let index = 0; index < activates[type].length; index++) {

                let activate = activates[type][index]

                if(type === "weapon"){
                    activate.name = Wave.tryAddWeaponsMods([activate.name], playerWaveCash)[0]
                    const mult = WeaponsModifiers.getMults(activate.name.split("|").slice(1),true)
                    activate.price *= mult
                }

                this.createShopClickBlock(
                    activate.name,
                    type,
                    (params) => {
                        const activate = ObjectActivates.giveActivate(
                            GameState.getPlayer(),
                            params.type,
                            params.activate.name
                        )

                        KeyBoard.tryAddToPlayer(GameState.getPlayer())

                        return true
                    },
                    activate.price,
                    {
                        activate,
                        type
                    }
                )

            }

        }

    }

    addAscensionBlock(){

        let ascensions = Wave.addAscension(
            playerWaveCash,
            0
        )

        for (let index = 0; index < ascensions.length; index++) {
            
            this.createShopClickBlock(
                ascensions[index][0],
                "ascension",
                (params) => {
                    ShipCreator.mergeAscensionsInObject(
                        GameState.getPlayer(),
                        [params.ascension]
                    )
                    return true
                },
                ascensions[index][1],
                {
                    "ascension": ascensions[index]
                }
            )
            
        }

    }

    paintColors = {
        "border": {
            "weapon": "red",
            "defense": "blue",
            "special": "purple",
            "factory": "orange",
            "help": "white",
            "add effect": "greenyellow",
            "apply effect": "palevioletred",
            "apply effect on projectiles": "rgb(102, 51, 68)",
            "ascension": "yellow",
            "statUpgrade": "green",
            "defenseTypeUpgrade": "lightskyblue",
            "passWave": "grey"
        },
    }

    paint(type, div){

        div.style.border = "3px solid "+this.paintColors["border"][type]
        div.style.color = this.paintColors["border"][type]

    }

    stop(){

        this.waveShop.style.display = "none"

        this.activateBox.innerHTML = ""

        isOpen = false

    }

    end(){

        Wave.endRun()

    }

}