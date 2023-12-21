export class MissileCluster1Effect {

    effects = [
        {

            "apply": {

                "apply": false,
                "applyType": "onHit",

            },

            "effect": {

                "config": {

                    "name": "missile cluster",
                    "type": "onDeath",

                },

                "params": {
                    "repeat": 5,
                    "dispersion": 0.35,
                    "velMult": 0,
                },

            },

        }
    ]

}