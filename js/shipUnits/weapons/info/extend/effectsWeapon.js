
export class EffectsWeapon {

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

                    "frameOut": 1,
                    "repeat": -1,

                },

                "params": {
                    "range": 10,
                    "thunderDamage": 1,
                    "frameOut": 110,
                    "repeat": -1,
                }

            },

        }
    ]

}