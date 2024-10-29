import { AscensionScorerController } from "../../jsWaveGame/scorers/ascensionScorerController.js"
import { AIController } from "../AI/AIController.js"
import { DamageController } from "../damage/damageController.js"
import { EffectsController } from "../effects/effectsController.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { MultiplyStatsController } from "../generalUtils/multiplyStats.js"
import { KeyBoardController } from "../keyboard/keyBoardController.js"
import { Ship } from "../object/complex/ship.js"
import { ObjectActivatesController } from "../objectController/objectActivatesController.js"

var GameState
var ObjectActivates
var AIC
var KeyBoard
var Effects
var AscensionScorer
var CloneObject
var MultiplyStats
var Damage

onInit(function(){

    GameState = new GameStateController()
    ObjectActivates = new ObjectActivatesController()
    AIC = new AIController()
    KeyBoard = new KeyBoardController()
    Effects = new EffectsController()
    AscensionScorer = new AscensionScorerController()
    CloneObject = new CloneObjectController()
    MultiplyStats = new MultiplyStatsController()
    Damage = new DamageController()

})

export class ShipCreatorController{

    mainCanvas = document.getElementById("mainCanvas")

    createShip(
        team,
        AIObject = {
            AI: [],
            coreName: "default"
        },
        activates = {},
        effects = {},
        isPlayer,
        type = new Ship(true),
        ascensions = [],
        statsUpgrade = [],
        defenseTypes = [],
        effectsApply = []
    ){

        let newShip = ShipCreator.createShipFactory(type)

        newShip.team = team

        let haveAI = false

        AIObject.AI = this.filterAI(newShip, AIObject.AI)

        if(team == "neutralTeam"){

            ObjectActivates.giveActivate(newShip, "weapon")
            ObjectActivates.giveActivate(newShip, "weapon")

            newShip = AIC.giveCoreAI(newShip, AIObject.AI, AIObject.coreName)
            haveAI = true

        }

        if(AIObject.AI && !isPlayer && team != "neutralTeam"){
            newShip = AIC.giveCoreAI(newShip, AIObject.AI, AIObject.coreName)
            haveAI = true
        }

        if(isPlayer){

            newShip = KeyBoard.makeObjectInPlayerControl(newShip)

            //newShip.energyRegen = 110

            //newShip.life.math("-", 199)
            //newShip.lifeRegen = -50/60

            newShip = AIC.giveCoreAI(newShip, AIObject.AI, AIObject.coreName)
            //newShip = AIC.giveAI(newShip, AI)
            haveAI = false

            //newShip.maxVel *= 1.5

        }

        //bug?
        this.mergeAscensionsInObject(
            newShip,
            ascensions
        )

        ObjectActivates.setActivates(newShip, activates)

        GameState.addObject(newShip, haveAI)

        Effects.setEffects(newShip, effects)

        for (let index = 0; index < statsUpgrade.length; index++) {

            let statUpgrade = statsUpgrade[index]

            MultiplyStats.multiply(
                newShip,
                statUpgrade[1],
                {
                    "normalStats": [statUpgrade[0]]
                }
            )

        }

        for (let index = 0; index < defenseTypes.length; index++) {

            let defenseType = defenseTypes[index]

            Damage.addDefense(
                newShip,
                defenseType[1],
                defenseType[0],
                defenseType[2],
            )

        }

        Effects.addEffectsInActivates(newShip, effectsApply)

        return newShip

    }

    createShipFactory(ship){

        let newShip = ship

        newShip.ID = randomUniqueID()
        newShip.x = randomInteger(0, ShipCreator.mainCanvas.width)
        newShip.y = randomInteger(0, ShipCreator.mainCanvas.height)

        return newShip

    }

    filterAI(object, AI){
        if(object.vel === undefined){

            let index = AI.indexOf("movable")

            if (index !== -1) {
                AI.splice(index, 1)
            }

            index = AI.indexOf("escortAlly")

            if (index !== -1) {
                AI.splice(index, 1)
            }

            index = AI.indexOf("directionalDefense")

            if (index !== -1) {
                AI.splice(index, 1)
            }
            
            index = AI.indexOf("flee")

            if (index !== -1) {
                AI.splice(index, 1)
            }
        
        }
        
        if(object.resetVel === undefined){

            let index = AI.indexOf("rotableTurret")

            if (index !== -1) {
                AI.splice(index, 1)
            }

            index = AI.indexOf("directionalDefense")

            if (index !== -1) {
                AI.splice(index, 1)
            }

        }
        return AI
    }

    mergeAscensionsInObject(
        object,
        ascensions
    ){

        for (
            let index = 0;
            index < ascensions.length;
            index++
        ) {

            let ascensionObject = AscensionScorer.getObject(
                ascensions[index][0]
            )

            ascensionObject.selfBuild(
                object
            )

            CloneObject.recursiveCloneAttribute(
                ascensionObject,
                object,
            )

            for (let key in ascensionObject) {

                if(
                    typeof(object[key]) == "number"
                ){
                    object[key] += ascensionObject[key]
                }
    
            }

        }

    }

}

var ShipCreator = new ShipCreatorController()