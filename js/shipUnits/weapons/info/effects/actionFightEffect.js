export class ActionFightEffect {

    effects = [
        {

            "apply": {

                "apply": false,
                "applyType": "onHit",

            },

            "effect": {

                "config": {

                    "name": "action fight",
                    "type": "effect",

                    "repeat": 1,
                    "frameOut": 1

                },

                "params": {

                    "searchConfig": {
                        "includeSameTeam": false,
                        "includeEnemyTeam": true,
                        "includeYourself": false,
                    },

                }

            },

        }
    ]

}