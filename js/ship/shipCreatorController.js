import { EffectsController } from "../effects/effectsController.js"
import { FrameController } from "../frame/frameController.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { MultiplyStatsController } from "../generalUtils/multiplyStats.js"
import { Ship } from "../object/ship.js"
import { ObjectActivatesController } from "../objectController/objectActivatesController.js"
import { ObjectCreatorController } from "../objectController/objectCreatorController.js"
import { SpecialController } from "../shipUnits/special/specialController.js"

var GameState = ""
var ObjectCreator = ""
var ObjectActivates = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()
    ObjectActivates = new ObjectActivatesController()

})

export class ShipCreatorController{

    a = false

    mainCanvas = document.getElementById("mainCanvas")

    createShip(team, AI, isPlayer){

        let newShip = ShipCreator.createShipFactory()

        newShip.team = team

        let haveAI = false

        if(AI){
            newShip = ObjectCreator.giveObjectAI(newShip, AI)
            haveAI = true

            //ObjectActivates.giveActivate(newShip, "weapon", "auto_SP1")
            //ObjectActivates.giveActivate(newShip, "special", "WeakClone")
            //ObjectActivates.giveActivate(newShip, "weapon", "auto_SP1")
            //ObjectActivates.giveActivate(newShip, "weapon", "auto_SP1")
            //ObjectActivates.giveActivate(newShip, "weapon", "auto_SP1")
            //ObjectActivates.giveActivate(newShip, "weapon", "auto_SP1")

            ObjectActivates.giveActivate(newShip, "weapon", "auto_P1")

            //ObjectActivates.giveActivate(newShip, "weapon", "P1")

            //ObjectActivates.giveActivate(newShip, "weapon", "M1")

            //newShip.searchPriority = new FocusedTopDownBehavior().searchPriority

            const stats = {
                "stats":[
                    "width",
                    "height",
                    "damage",
                    "defense",
                    "energy",
                    "energyRegen",
                    "life",
                    "lifeRegen",
                    "maxEnergy",
                    "maxLife",
                    "maxVel",
                    "vel",
                    "lifeTime",
                ],

                "invertedStatus":[
                ],
            
                "invertedExponentialStatus": [
                    "resistance"
                ],
            
                "mult": 0,
                
            }

            new MultiplyStatsController().multiply(newShip, stats)

            console.log(
                //newShip
            )

            //newShip.x = 5
            //newShip.y = 250

//          newShip.currentXVel = 1

            //newShip.maxLife = 1000000
            //newShip.life = 1000000

            //newShip.width *= 5
            //newShip.height *= 5

            if(this.a){


                //newShip.x = 450
                //newShip.y = 250

                //newShip.x = 150
                //newShip.y = 250

                newShip.currentXVel = 0
    
            }

            this.a = true

            //newShip.x = 50
            //newShip.y = 50

        }

        if(isPlayer){

            newShip = ObjectCreator.makeObjectInPlayerControl(newShip)

            ObjectActivates.giveActivate(newShip, "weapon", "P1")
            ObjectActivates.giveActivate(newShip, "weapon", "M1")
            //ObjectActivates.giveActivate(newShip, "weapon", "auto_P1")
            //ObjectActivates.giveActivate(newShip, "weapon", "auto_SP1")

            /*

            new EffectsController().add(
                "breathe",
                "effect",
                {
                    "object": newShip,
                }
            )

            new EffectsController().add(
                "evolutron",
                "effect",
                {
                    "object": newShip,
                }
            )

            new EffectsController().add(
                "second stage",
                "effect",
                {
                    "object": newShip,
                }
            )

            new EffectsController().add(
                "illusion v1",
                "effect",
                {
                    "object": newShip,
                }
            )

            new EffectsController().add(
                "slowdown area",
                "effect",
                {
                    "object": newShip,
                }
            )

            new EffectsController().add(
                "untouchable",
                "effect",
                {
                    "object": newShip,
                }
            )

            new EffectsController().add(
                "deflet area",
                "effect",
                {
                    "object": newShip,
                }
            )

            new EffectsController().add(
                "help",
                "effect",
                {
                    "object": newShip,
                }
            )

            */

            //ObjectActivates.giveActivate(newShip, "factory", "SP1")
            ObjectActivates.giveActivate(newShip, "factory", "MSP1")
            //ObjectActivates.giveActivate(newShip, "factory", "DF1")

            //ObjectActivates.giveActivate(newShip, "defense", "Regen")

            //ObjectActivates.giveActivate(newShip, "factory", "SP1")
            //ObjectActivates.giveActivate(newShip, "factory", "MSP1")
            //ObjectActivates.giveActivate(newShip, "special", "WeakClone")
            //ObjectActivates.giveActivate(newShip, "special", "Overclock")
            //ObjectActivates.giveActivate(newShip, "special", "LvUp")

            newShip.x = 50
            newShip.y = 110

        }

        GameState.addObject(newShip, haveAI)

        return newShip

    }

    createShipFactory(){

        let newShip = new Ship()

        newShip.ID = randomUniqueID()
        newShip.x = randomInteger(0, ShipCreator.mainCanvas.width)
        newShip.y = randomInteger(0, ShipCreator.mainCanvas.height)

        return newShip

    }

}

var ShipCreator = new ShipCreatorController()