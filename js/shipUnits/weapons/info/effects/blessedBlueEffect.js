export class BlessedBlueEffect {

    effects = [
        {

            "apply": {

                "apply": false,
                "applyType": "onHit",

            },

            "effect": {

                "config": {

                    "name": "the blessed effect: blue",
                    "type": "effect",

                    "repeat": 1,
                    "frameOut": 1

                },

                "params": {
                    "range": 50,

                    "searchConfig": {
                        "includeSameTeam": false,
                        "includeEnemyTeam": true,
                        "includeYourself": false,
                        "maxDistance": 50,
                    },

                }

            },

        }
    ]

}