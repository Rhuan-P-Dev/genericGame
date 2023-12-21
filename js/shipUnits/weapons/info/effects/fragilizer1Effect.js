export class Fragilizer1Effect {

    effects = [
        {

            "apply": {

                "apply": true,
                "applyType": "onHit",

            },

            "effect": {

                "config": {

                    "name": "fragile",
                    "type": "onDamage",

                    "countDown": {
                        "count": 3
                    },

                },

                "params": {
                    "mult": 1.5
                }

            },

        }
    ]

}