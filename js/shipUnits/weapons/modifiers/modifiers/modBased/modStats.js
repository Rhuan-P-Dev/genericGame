import { Mod } from "./mod.js"

export class ModStats extends Mod {

    stats = undefined

    constructor(
        stats = {
            "stats":[
                "width",
                "height",
                "currentXVel", // delet it
                "currentYVel", // delet it
                "damage",
                "maxVel",
                "vel",
                "lifeTime",
            ],
        
            "invertedStatus":[
                
            ],

            "statsMult": 1.1,
        }
    ){

        super()

        this.stats = stats

    }

}