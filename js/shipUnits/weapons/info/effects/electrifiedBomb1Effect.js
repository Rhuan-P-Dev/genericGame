import { ElectrifiedMissile1Effect } from "./electrifiedMissile1Effect.js";

export class ElectrifiedBomb1Effect extends ElectrifiedMissile1Effect {

    constructor(){

        super()

        this.effects[0].effect.params.thunderDamage = 100

    }

}