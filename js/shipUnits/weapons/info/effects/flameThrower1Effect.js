export class FlameThrower1Effect {

    effects = [
        {

            "apply": {

                "apply": true,
                "applyType": "onHit",

            },

            "effect": {

                "config": {

                    "name": "burn",
                    "type": "effect",

                    "frameOut": 10,
                    "repeat": 15

                },

                "params": {
                    "fakeObject": {
                        "damage": 1,
                    }
                }

            },

        }
    ]

}