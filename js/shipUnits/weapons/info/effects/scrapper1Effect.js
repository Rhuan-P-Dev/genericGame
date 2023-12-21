export class Scrapper1Effect {

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
                        "count": 70
                    },

                },

                "params": {
                    "mult": 1.01
                }

            },

        }
    ]

}