export class ElectrifiedMissile1Animation {

    animations = [
        {
            "animationConfig": {
                "name":"thunder",
                "focus": {
                },
                "offset": {
                },
                "frameRandomOffsetX": 0,
                "frameRandomOffsetY": 0,
                "randomPointOffsetX": 2,
                "randomPointOffsetY": 2,
            },
            "loopConfig": {
                "frameOut": 10
            },
            "runTimeBuild": (object, animationConfig, loopConfig) => {

                animationConfig.focus = object

                animationConfig.offset = {
                    "x": randomInterval(object.width),
                    "y": randomInterval(object.height),
                }

            }
        }

    ]

}