export class SmallBulletCluster1Effect {

    effects = [
        {

            "apply": {

                "apply": false,
                "applyType": "onHit",

            },

            "effect": {

                "config": {

                    "name": "small bullet cluster",
                    "type": "onDeath",

                },

                "params": {
                    "repeat": 20,
                    "dispersion": 1,
                    "velMult": 5,
                },

            },

        }
    ]

}