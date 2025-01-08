import { CoreAIBuilderController } from "../../js/AI/advancedAI/coreAIBuilderController.js"
import { AIUtilsController } from "../../js/AI/utils/AIUtils.js"
import { EffectsController } from "../../js/effects/effectsController.js"
import { setFrameOut } from "../../js/frame/frameController.js"
import { GameStateController } from "../../js/gameState/gameStateController.js"
import { CustomMathController } from "../../js/generalUtils/math.js"
import { ScreenRenderController } from "../../js/graphics/screenRenderController.js"
import { ObjectActivatesController } from "../../js/objectController/objectActivatesController.js"
import { PhysicsController } from "../../js/physics/physicsController.js"
import { ShipCreatorController } from "../../js/ship/shipCreatorController.js"
import { WeaponsModifiersController } from "../../js/shipUnits/weapons/modifiers/weaponsModifiersController.js"
import { ScorerController } from "../scorers/activates/scorerController.js"
import { AscensionScorerController } from "../scorers/ascensionScorerController.js"
import { DefenseTypesScorerController } from "../scorers/defenseTypesScorerController.js"
import { EffectsScorerController } from "../scorers/effects/effectsScorerController.js"
import { ObjectsScorerController } from "../scorers/objectsScorerController.js"
import { StatsUpgradesController } from "../scorers/statsUpgradesController.js"
import { PermanentShopController } from "../shop/permanentShop/permanentShopController.js"
import { WaveShopController } from "../shop/waveShopController.js"

var GameState
var ShipCreator
var WaveShop
var ObjectActivates
var Scorer
var ObjectsScorer
var AIUtils
var ScreenRender
var EffectsScorer
var Effects
var AscensionScorer
var StatsUpgrades
var DefenseTypesScorer
var PermanentShop
var CoreAIBuilder
var CustomMath
var WeaponsModifiers

onInit(function(){

    GameState = new GameStateController()
    ShipCreator = new ShipCreatorController()
    WaveShop = new WaveShopController()
    ObjectActivates = new ObjectActivatesController()
    Scorer = new ScorerController()
    ObjectsScorer = new ObjectsScorerController()
    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    EffectsScorer = new EffectsScorerController()
    Effects = new EffectsController()
    AscensionScorer = new AscensionScorerController()
    StatsUpgrades = new StatsUpgradesController()
    DefenseTypesScorer = new DefenseTypesScorerController()
    PermanentShop = new PermanentShopController()
    CoreAIBuilder = new CoreAIBuilderController()
    CustomMath = new CustomMathController()
    WeaponsModifiers = new WeaponsModifiersController()

})

var waveCount = 1
var waveBudget = ((12500+3482)*1.25)

export class WaveController {

    constructor(){

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "End"
                &&
                waveCount >= 1
            ) {
                this.endRun()
            }
        })

    }

    minimumWaveBudget = 3482 * 1.1
    minimumWaveBudgetFull = (
        12500
        +
        this.minimumWaveBudget
    ) * 1.1

    getWave(){
        return waveCount
    }

    getMinBudget(){
        return this.minimumWaveBudgetFull
    }

    checkEndOfWave(){

        if(GameState.getObjectsNumber("enemyTeam") == 0){
            WaveShop.add(
                waveBudget
                *
                0.1
            )
            WaveShop.start()
            this.startNextWave()
            WaveShop.setCurrentWaveDisplay(waveCount)
            PermanentShop.changeBestWave(waveCount)
        }else{
            this.markAllEnemys()
        }

    }

    checkPlayerTeam(){

        if(
            GameState.getObjectsNumber("playerTeam") == 0
        ){
            this.endRun()
        }

    }

    endRun(){
        PermanentShop.addCash(
            (
                waveBudget
                *
                0.05
            )
        )
        waveCount = 0
        waveBudget = this.getMinBudget()
        GameState.restart()
        WaveShop.reset()
        this.checkEndOfWave()
        PermanentShop.open()
        WaveShop.setCurrentWaveDisplay(waveCount)
    }

    markAllEnemys(){

        let enemysObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
            GameState.getPlayer(),
            {
                "includeEnemyTeam": true,
                "minDistance": 780
            }
        )

        for (
            let index = 0;
            index < enemysObjects.length;
            index++
        ){
            
            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawLine,
                    "params": {
                        "positions": [
                            [
                                GameState.getPlayer().x,
                                GameState.getPlayer().y,
                            ],[
                                enemysObjects[index].x,
                                enemysObjects[index].y,
                            ]
                        ],
                        "color": "red",
                        "lineWidth": 4,
                    }
                }

            )

        }

    }

    maxRadius = 2500

    start(){

        setFrameOut(
            () => {

                this.timePunish()

            },
            30*60,
            -1
        )

        setFrameOut(
            () => {
                this.maxArena()
            },
            3*60,
            -1
        )

        setFrameOut(
            () => {
                this.markArenaRadius()
            },
            1,
            -1
        )

    }

    timePunish(){

        const objects = GameState.getAllObjectsRules()

        for (const ID in objects) {

            let object = objects[ID]

            object.life.math(
                "-",
                object.maxLife * 0.25
            )

            object.life.math(
                "-",
                20
            )

        }

    }

    maxArena(){

        const objects = GameState.getAllObjectsPhysics()

        for (const ID in objects) {

            const object = objects[ID]

            if(
                object.x < -this.maxRadius
                ||
                object.x > this.maxRadius
                ||
                object.y < -this.maxRadius
                ||
                object.y > this.maxRadius
            ){

                object.life.math(
                    "-",
                    object.maxLife * 0.1
                )

                object.life.math(
                    "-",
                    10
                )

                object.x = 0
                object.y = 0

            }

        }

    }

    markArenaRadius(){

        for (let radius = 250; radius <= this.maxRadius; radius += 250) {

            let r = 255 * CustomMath.linearReverse(
                radius,
                this.maxRadius
            )
            let g = 255 * CustomMath.linearReverse(
                radius,
                this.maxRadius
            )
            let b = 255 * CustomMath.linearReverse(
                radius,
                this.maxRadius
            )

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": 0,
                        "y": 0,
                        "radius": radius,
                        "color": `rgba(${r}, ${g}, ${b})`,
                        "fill": false,
                        "lineWidth": 3,
                        "IGORE_IN_FOCUS": true
                    },
                }
            )
        }

    }

    tryAddWeaponsMods(weapons, budget, modsCount = parseInt(waveCount * 0.1)) {

        const scorersMatrix = []

        for (let index = 0; index < weapons.length; index++) {
            let weaponName = weapons[index]
            let weaponScore = Scorer.get("weapon", weaponName)
            scorersMatrix.push([])

            const mods = WeaponsModifiers.getRandomModifiers(modsCount)
            let modifiers = []
    
            for (let indey = 0; indey < mods.length; indey++) {
                let modifierName = mods[indey]
                let mult = WeaponsModifiers.getMult(modifierName, true)
    
                if (budget >= weaponScore * mult) {
                    weaponScore *= mult
                    modifiers.push(modifierName)
                    budget -= weaponScore
                }
            }
    
            if (modifiers.length > 0) {
                weapons[index] = `${weaponName}|${modifiers.join('|')}`
            }
        }
        return weapons
    }


    getActivates(
        tempBudget = waveBudget,
        typeOfLoader = "random",
        firstHit = false,
    ){

        let activates = {}
        let activatesExtra = []
        let trys = 50*4

        for (
            let index = 0;
            //3482 < tempBudget
            3482 < tempBudget
            &&
            index < trys;
            index++
        ) {

            let loaderName = ObjectActivates.defineTypeOfLoarderName(typeOfLoader)

            let activate = ObjectActivates.returnRandomActivate(loaderName, false)

            if(activate.auto){
                activate.name = "auto " + activate.name
            }

            let score = Scorer.get(loaderName, activate.name)

            if(score <= tempBudget){

                if(!activates[loaderName]){
                    activates[loaderName] = []
                    activatesExtra[loaderName] = []
                }

                activates[loaderName].push(activate.name)

                activatesExtra[loaderName].push(
                    {
                        name: activate.name,
                        price: parseInt(score),
                    }
                )

                tempBudget -= score

                if(firstHit){
                    break
                }
            }

            trys--

        }

        //console.error(activates)

        return [
            activates,
            activatesExtra
        ]

    }

    spreadBudgetChance = 0.75

    spreadBudget(budgets){

        for (let index = 0; index < budgets.length; index++) {

            let budget = budgets[index]

            if(
                Math.random() < this.spreadBudgetChance
                &&
                budget.budget/2 > this.minimumWaveBudgetFull
            ){

                budget.budget /= 2

                budgets.push(
                    {
                        "object": undefined,
                        "budget": budget.budget // <-- Is already half!
                    }
                )

            }
            
        }

        return budgets

    }

    //skipChance = 0.35
    skipChance = 0.5

    defineObjects(budgets){

        let sortedObjects = ObjectsScorer.sortObjectByValues()

        for (let indey = 0; indey < budgets.length; indey++) {

            for (let objectName in sortedObjects) {

                if(
                    Math.random() < this.skipChance
                    &&
                    objectName !== "Drone" // <-- The most cheap unit
                ){
                    //console.warn(objectName)
                    continue
                }
                let randomObjectCost = ObjectsScorer.getObjectCost(objectName)

                //console.warn(objectName)
                //console.warn(randomObjectCost)

                //console.warn(budgets[indey])
    
                if(this.minimumWaveBudget <= budgets[indey].budget - randomObjectCost){

                    budgets[indey].object = objectName
                    budgets[indey].budget -= randomObjectCost

                    break
    
                }
    
            }

        }

        

        //console.error(budgets)

        return budgets

    }

    addEffects(
        budget,
        effectsQuantity = parseInt(waveCount*0.25)
    ){

        let randomEffects = EffectsScorer.getRandom(effectsQuantity)

        let effects = Effects.formatEffectsScore()

        for (
            let index = 0;
            2000 < budget
            &&
            index < randomEffects.length;
            index++
        ) {

            let score = randomEffects[index][3]

            if(score <= budget){

                if(!effects){
                    effects = Effects.formatEffectsScore(
                        randomEffects[index]
                    )
                }else{
                    effects = Effects.formatEffectsScore(
                        randomEffects[index],
                        effects
                    )
                }

                budget -= score

            }

        }

        return effects

    }

    addAscension(
        budget,
        minBudget = this.minimumWaveBudget,
        ascensionsQuantity = parseInt(waveCount*0.1)
    ){

        let randomAscensions = AscensionScorer.getRandom(ascensionsQuantity)

        //console.log(randomAscensions)

        let result = []

        for (
            let index = 0;
            minBudget < budget
            &&
            index < randomAscensions.length;
            index++
        ) {

            let score = randomAscensions[index][1]

            if(
                minBudget <= budget - score
            ){

                result.push(randomAscensions[index])

                budget -= score

            }

        }

        //console.log(result)

        return result

    }

    addStatsUpgrade(
        budget,
        statsUpgradesQuantity = waveCount
    ){
    
        let randomStatsUpgrades = StatsUpgrades.getRandom(statsUpgradesQuantity)

        let result = []
        
        for (let index = 0; index < randomStatsUpgrades.length; index++) {

            let cost = randomStatsUpgrades[index][2]
            
            if(budget >= cost){

                result.push(randomStatsUpgrades[index])
                budget -= cost

            }
            
        }

        //console.log(result)

        return result

    }

    addDefenseTypeUpgrade(
        budget,
        defenseTypeQuantity = waveCount
    ){

        let randomDefenseType = DefenseTypesScorer.getRandom(defenseTypeQuantity)

        let result = []

        for (let index = 0; index < randomDefenseType.length; index++) {

            let cost = randomDefenseType[index][3]
            
            if(budget >= cost){

                result.push(randomDefenseType[index])
                budget -= cost

            }
            
        }

        return result

    }

    spawnUnits(
        budget = waveBudget,
        team = "enemyTeam",
        color = "red"
    ){

        let budgets = [
            {
                "object": undefined,
                "budget": budget
            }
        ]

        this.spreadBudget(
            budgets
        )

        this.defineObjects(
            budgets
        )

        let done = false

        for (
            let index = 0;
            budgets[0].object
            &&
            index < budgets.length;
            index++
        ) {

            done = true

            let ascensions = this.addAscension(
                budgets[index].budget
            )

            for (let indey = 0; indey < ascensions.length; indey++) {
                budgets[index].budget -= ascensions[indey][1]
            }

            let mandatoryOffensiveActivator = this.getActivates(
                budgets[index].budget, "weapon", true
            )[1]

            budgets[index].budget -= mandatoryOffensiveActivator["weapon"][0].price

            let activates = this.getActivates(
                budgets[index].budget
            )[0]

            if(!activates["weapon"]){
                activates["weapon"] = []
            }

            activates.weapon.push(
                mandatoryOffensiveActivator["weapon"][0].name
            )

            // Try to add weapon mods
            activates.weapon = this.tryAddWeaponsMods(activates.weapon, budgets[index].budget)

            let object = new (ObjectsScorer.get(budgets[index].object))(true)

            ShipCreator.createShip(
                team,
                {
                    "AI": this.getAI(),
                    "coreName": this.getRandomCore(),
                },
                activates,
                this.addEffects(budgets[index].budget),// não desconta o budget
                false,
                object,
                ascensions,
                this.addStatsUpgrade(
                    budgets[index].budget
                ),
                this.addDefenseTypeUpgrade(
                    budgets[index].budget
                ),
                this.addEffects(budgets[index].budget).apply // mult 2.5?
            ).color = color

        }

        return done

    }

    getAI(){

        //return []

        if(589717 < waveBudget){
            return ["movable","useActivates","rotableTurret","directionalDefense","areaSupport","escortAlly","dodge","flee"]
        }

        if(446176 < waveBudget){
            return ["movable","useActivates","rotableTurret","directionalDefense","areaSupport","escortAlly","dodge"]
        }

        if(355246 < waveBudget){
            return ["movable","useActivates","rotableTurret","directionalDefense","areaSupport","escortAlly"]
        }

        if(187594 < waveBudget){
            return ["movable","useActivates","rotableTurret","directionalDefense","areaSupport"]
        }

        if(113006 < waveBudget){
            return ["movable","useActivates","rotableTurret","directionalDefense"]
        }

        if(19977 < waveBudget){
            return ["movable","useActivates","rotableTurret"]
        }

        return []

    }

    waveMult = 1.1

    getRandomCore(){

        return CoreAIBuilder.randomAI(
            Math.min(
                0.01*waveCount,
                1.5
            )
        )

    }

    startNextWave(mult = 1){

        for (let index = 0; index < mult; index++) {
            this.spawnUnits()
        }

        this.passWave()

    }

    passWave(waves = 1){

        for (
            let index = 0;
            index < waves;
            index++
        ) {

            waveBudget *= this.waveMult
            waveCount++

        }

    }

}