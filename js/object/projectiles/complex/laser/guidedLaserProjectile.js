import { AIUtilsController } from "../../../../AI/utils/AIUtils.js"
import { DamageController } from "../../../../damage/damageController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../../shipUnits/forAllShipUnits/activateController.js"
import { BasicLaserProjectile } from "../../basic/basicLaserProjectile.js"

var Damage
var Activate
var AIUtils

onInit(function(){

    Damage = new DamageController()
    Activate = new ActivateController()
    AIUtils = new AIUtilsController()

})

export class GuidedLaserProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicLaserProjectile
            ],
            build
        )

        this.damage = 4
        this.laserColor = "yellow"

        Damage.addDamage(this, "laser", 1)

        this.posLaserObserver.add(CreateGuidedLaserProjectile)

    }

}

function CreateGuidedLaserProjectile(params){

    if(params.object.lifeTime <= 0){return}

    const newLaser = new GuidedLaserProjectile(true)

    Activate.basicAjustObject(
        params.object,
        params.object,
        newLaser,
    )

    // manual ajust
    newLaser.lifeTime = params.object.lifeTime
    newLaser.x = params.predict.x
    newLaser.y = params.predict.y
    newLaser.width = params.laserWidthHeight / 2
    newLaser.height = params.laserWidthHeight / 2
    newLaser.damage = params.laserDamage
    newLaser.laserLength = params.object.getLaserLength()
    newLaser.owner = params.object.owner
    newLaser.damageTypes = params.object.damageTypes

    Activate.addObject(newLaser)

        const target = AIUtils.getClosestObjectOfTeams(
        newLaser,
        {
            "includeSameTeam": false,
            "includeEnemyTeam": true,
            "includeYourself": false,
            "maxDistance": (params.laserWidthHeight * 10) + (params.laserDamage * 5)
        }
    )

    if(target){
        AIUtils.pointToTarget(
            newLaser,
            target
        )
    }

    params.object.posLaserObserver.remove(CreateGuidedLaserProjectile)

}