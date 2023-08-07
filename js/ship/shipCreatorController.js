import { EffectsController } from "../effects/effectsController.js"
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

            ObjectActivates.giveActivate(newShip, "weapon", "auto_SP1")
            ObjectActivates.giveActivate(newShip, "weapon", "auto_P1")

            new EffectsController().add(
                "gojo",
                "onHit",
                {
                    "object": newShip,
                },
            )

            new EffectsController().add(
                "gojo",
                "effect",
                {
                    "object": newShip,
                },
                15,
                -1
            )

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
                    "resistance"
                ],
            
                "statsMult": 1.7,
                
            }

            //new MultiplyStatsController().multiply(newShip, stats)

            //newShip.x = 5
            //newShip.y = 250

//            newShip.currentXVel = 1

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

            ObjectActivates.giveActivate(newShip, "weapon", "SP1")
            //ObjectActivates.giveActivate(newShip, "weapon", "auto_SP1")
            ObjectActivates.giveActivate(newShip, "weapon", "M1")

            new EffectsController().add(
                "clone",
                "onDeath",
                {
                    "object": newShip,
                    "statsMult" :0.5
                },
            )

            new EffectsController().add(
                "illusion",
                "onHit",
                {
                    "object": newShip,
                },
            )

            //ObjectActivates.giveActivate(newShip, "factory", "SP1")
            //ObjectActivates.giveActivate(newShip, "factory", "MSP1")
            //ObjectActivates.giveActivate(newShip, "factory", "DF1")

            //ObjectActivates.giveActivate(newShip, "defense", "Regen")

            //ObjectActivates.giveActivate(newShip, "factory", "SP1")
            //ObjectActivates.giveActivate(newShip, "factory", "MSP1")
            //ObjectActivates.giveActivate(newShip, "special", "WeakClone")
            //ObjectActivates.giveActivate(newShip, "special", "Overclock")
            //ObjectActivates.giveActivate(newShip, "special", "LvUp")

            //newShip.x = 150
            //newShip.y = 250

            //newShip.x = 450
            //newShip.y = 250

            //newShip.currentXVel = 1

            //newShip.lifeRegen = -1

            /*

            new EffectsController().add(
                "clone",
                {
                    "object": newShip,
                },
                60,
                -1
            )

            new EffectsController().add(
                "illusion",
                {
                    "object": newShip,
                },
                600,
                -1
            )

            new EffectsController().add(
                "infinity energy",
                {
                    "object": newShip
                },
                60,
                -1
            )

            new EffectsController().add(
                "second stage",
                {
                    "object": newShip,
                },
                600,
                1
            )

            new EffectsController().add(
                "evolutron",
                {
                    "object": newShip,
                    "statsMult" :1.01
                },
                60,
                -1
            )

            new EffectsController().add(
                "bounty hunter",
                {},
                240,
                1
            )

            new EffectsController().add(
                "evolutron",
                "effect",
                {
                    "object": newShip,
                    "statsMult" :1.01
                },
            )

            new EffectsController().add(
                "gojo",
                "onHit",
                {
                    "object": newShip,
                },
            )

            newShip.onHitFunctions.add(
                (data) => {

                    data.object.life += 100

                    //data.target.owner.owner.life = -1

                }
            )

            new EffectsController().add(
                "MR",
                "onHit",
                {
                    "object": newShip,
                    "statsMult" :1.01
                },
            )

            */

            new EffectsController().add(
                "infinity energy",
                "onHit",
                {
                    "object": newShip
                },
                60,
                -1
            )

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