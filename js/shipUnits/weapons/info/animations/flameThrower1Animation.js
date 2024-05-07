export class FlameThrower1Animation {

    animations = [
        {
            "animationConfig": {
                "name":"fire",
                "focus": {
                },
                "offset": {
                },
                "frameRandomOffsetX": 1,
                "frameRandomOffsetY": 1,
                "randomPointOffsetX": 0,
                "randomPointOffsetY": 0,
            },
            "loopConfig": {
                "frameOut": 5
            },
            "runTimeBuild": (object, animationConfig, loopConfig) => {

                animationConfig.focus = {
                    "x": object.x,
                    "y": object.y,
                }

                animationConfig.offset = {
                    "x": randomInterval(object.width),
                    "y": randomInterval(object.height),
                }

            }
        }

    ]

}