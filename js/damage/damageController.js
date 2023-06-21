export class DamageController {

    damage(object_1, object_2){
        
        Damage.damageCalc(object_1, object_2)
        Damage.damageCalc(object_2, object_1)

    }

    damageCalc(object_1, object_2){

        let damage = (object_2.damage * object_1.resistance) - object_1.defense

        if(damage <= 0){return}

        object_1.life -= damage

    }

}

var Damage = new DamageController()