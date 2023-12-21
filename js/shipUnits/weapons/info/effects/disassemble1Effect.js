export class Disassemble1Effect {

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
                        "count": 10000
                    },

                },

                "params": {
                    "mult": 1.01
                }

            },

        }
    ]

}