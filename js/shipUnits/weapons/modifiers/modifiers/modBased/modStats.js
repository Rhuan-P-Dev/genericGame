import { InheritController } from "../../../../../generalUtils/inherit.js"
import { Mod } from "./mod.js"

export class ModStats {

    stats = {
        "stats":[
            "width",
            "height",
            "life",
            "maxLife",
            "damage",
            "maxVel",
            "vel",
            "lifeTime",
        ],
    
        "invertedStatus":[
            
        ],

        "mult": 0.1,
    }

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Mod
            ],
            build
        )
        
    }

}