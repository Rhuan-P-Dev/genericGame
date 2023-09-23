
export class EffectsWeapon {

    effects = [
        {
            "config": {
                "name": "zeus",
                "type": "effect",

                "frameOut": 10,

                "apply": true,
                "applyType": "onHit",

            },

            "params": {
                "range": 500
            }

        }
    ]

    /*

    effects = [
        {
            "name": "untouchable",
            "type": "effect",
            "apply": false,

            "params": {
                "range": 500
            }

        },{
            "name": "shock",
            "type": "effect",
            "apply": true,

            "params": {}

        },{
            "name": "converter",
            "type": "on",
            "apply": false,

            "params": {}

        },
        
    ]

    */

}