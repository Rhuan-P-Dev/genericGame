export class ElectrifiedMissile1Effect {

    effects = [
        {

            "apply": {

                "apply": true,
                "applyType": "onHit",

            },

            "effect": {

                "config": {

                    "name": "shock",
                    "type": "effect",

                    "frameOut": 5,
                    "repeat": 1,

                },

                "params": {
                    "range": 300,

                    "fakeObject": {
                        "damage": 20,
                    },

                    "mult": 0.5,

                    "color": "yellow",
                    "lineWidth": 4,
    
                    "effectName": "shock",
                    "frameOut": 5
                },

            },

        }
    ]

}