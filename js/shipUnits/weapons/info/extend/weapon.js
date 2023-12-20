
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Rotable } from "../../../../object/basic/rotable.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { WeaponsModifiersController } from "../../modifiers/weaponsModifiersController.js"
import { WeaponsController } from "../../weaponsController.js"

var WeaponsModifiers = ""
var Weapons = ""

onInit(function(){

    Weapons = new WeaponsController()
    WeaponsModifiers = new WeaponsModifiersController()

})

export class WeaponExtend{


    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Rotable,
                BasicActivate
            ],
            build
        )

    }

    type = "weapon"

    xOffset = 0//randomInteger(-200,200)
    yOffset = 0//randomInteger(-200,200)

    buildAngle = 0

    range = 0

    hasModifier = false

    config = {

        weapon: {
            multVel: 3,
            damageMult: 1,
        },

        projectiles: {

            objectClass: [],

            AI: {},

            activates: {},

            behavior: {},

            /*

            objectClass: ["small bullet","simple missile"],

            AI: {
                1: ["missileV1","useActivates"]
            },

            activates: {
                1: {
                    "weapon": ["piston 1"]
                }
            },

            behavior: {
                1: new FocusedTopDownBehavior().searchPriority
            },

            */
        }

    }

    lifeTime = 180

    func = Weapons.returnProjectiles

    calcStats(){

        this.range += this.lifeTime * this.config.weapon.multVel || this.lifeTime

    }

    modifiersList = []

    build(){

        for (let index = 0; index < this.modifiersList.length; index++) {

            WeaponsModifiers.addModifier(this, this.modifiersList[index])
            
        }

    }

}