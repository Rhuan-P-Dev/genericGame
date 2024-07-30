import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { FrameController, setFrameOut } from "../../frame/frameController.js"
import { CustomMathController } from "../../generalUtils/math.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { ShipCreatorController } from "../../ship/shipCreatorController.js"
import { ActivateController } from "../../shipUnits/forAllShipUnits/activateController.js"
import { SpecialController } from "../../shipUnits/special/specialController.js"
import { EffectsController } from "../effectsController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { VectorController } from "../../generalUtils/vector.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { FactoryController } from "../../shipUnits/factory/factoryController.js"
import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { ObjectActivatesController } from "../../objectController/objectActivatesController.js"
import { DamageController } from "../../damage/damageController.js"

// For 'create objects' effect
import { MissileProjetile } from "../../object/projectiles/complex/missileProjectile.js"
import { SmallBulletProjetile } from "../../object/projectiles/complex/smallBulletProjectile.js"
import { MovableSaferPerimeter1 } from "../../shipUnits/factory/info/factory/movableSaferPerimeter1.js"
import { SaferPerimeter1 } from "../../shipUnits/factory/info/factory/saferPerimeter1.js"





var Frame = ""
var AIUtils = ""
var ScreenRender = ""
var Special = ""
var ShipCreator = ""
var CustomMath = ""
var Effects = ""
var Activate = ""
var GameState = ""
var Vector = ""
var Factory = ""
var ObjectActivates = ""
var Damage

onInit(function(){

    Frame = new FrameController()
    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    Special = new SpecialController()
    ShipCreator = new ShipCreatorController()
    CustomMath = new CustomMathController()
    Effects = new EffectsController()
    Activate = new ActivateController()
    GameState = new GameStateController()
    Vector = new VectorController()
    Factory = new FactoryController()
    ObjectActivates = new ObjectActivatesController()
    Damage = new DamageController()

})

export class GenericEffectsController {

    effectsList = {

        "sum max energy": (params) => {

            params.object.energy += params.object.maxEnergy * params.mult

        },

        "sum max life": (params) => {

            params.object.life.math("+", params.object.maxLife * params.mult)

        },

        "lv up": (params) => {

            Special.lvUp(
                params.object,
                {},
                {
                    "statsMult": params.statsMult
                }
            )

        },

        "create objects": (params) => {

            for (let index = 0; index < params.repeat; index++) {

                for(let index in params.configs){

                    let config = params.configs[index]

                    let newObject = Factory.createObject(
                        {},
                        {},
                        config,
                    )

                    ObjectActivates.setActivates(newObject, config.activates)
        
                    Activate.primitiveAjustObject(params.object, newObject)
    
                    let angleDispersion = randomFloat(
                        -Math.PI * params.dispersion,
                        Math.PI * params.dispersion
                    )
    
                    if(
                        params.object.radian
                        &&
                        newObject.radian
                    ){
    
                        newObject.setAngle(
                            params.object.getAngle()
                            +
                            angleDispersion
                        )
            
                    }
    
                    let objectVelAngle = Vector.getAngleVel(params.object)
    
                    objectVelAngle += angleDispersion
    
                    objectVelAngle = Vector.setAngle(objectVelAngle)
    
                    newObject.currentXVel = objectVelAngle.x * params.velMult
                    newObject.currentYVel = objectVelAngle.y * params.velMult
    
                    Activate.addObject(newObject)

                }

            }

        },

        "clone": (params) => {

            let clone = Special.clone(
                params.object,
                {},
                {
                    "statsMult": params.statsMult
                }
            )

            Activate.primitiveAjustObject(params.object, clone)

            Activate.addObject(clone)

        },

        "illusion": (params) => {

            let illusion = Special.illusion(
                params.object,
            )

            Activate.primitiveAjustObject(params.object, illusion)

            Activate.addObject(illusion)

        },

        "slowdown": (params) => {

            let closestObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "maxDistance": params.range
                }
            )

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": params.object.x,
                        "y": params.object.y,
                        "radius": params.range,
                    },
                }
            )

            for (let index = 0; index < closestObjects.length; index++) {

                let closestObject = closestObjects[index]

                let mult = 1

                if(!params.uniform){
                    mult = CustomMath.linearReverse(
                        // ADICINAR UM SCHEDULER PARA O CALCULO!
                        AIUtils.getDistanceOfObjects(params.object, closestObject),
                        params.range,
                    )
                }

                closestObject.currentXVel -= closestObject.currentXVel * (mult * params.mult)
                closestObject.currentYVel -= closestObject.currentYVel * (mult * params.mult)

            }

        },

        "attraction_repulsion": (params) => {

            let closestObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                params.searchConfig
            )

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": params.object.x,
                        "y": params.object.y,
                        "radius": params.searchConfig.maxDistance,
                    },
                }
            )

            for (let index = 0; index < closestObjects.length; index++) {

                let closestObject = closestObjects[index]

                let direction = Vector.vectorNormalize(
                    closestObjects[index],
                    params.object,
                )

                closestObject.currentXVel -= direction.x * CustomMath.diminishingReturns(
                    CustomMath.linearReverse(
                        AIUtils.getDistanceOfObjects(params.object, closestObject),
                        params.searchConfig.maxDistance,
                    ) * 2,
                    params.force
                ) * params.mult

                closestObject.currentYVel -= direction.y * CustomMath.diminishingReturns(
                    CustomMath.linearReverse(
                        AIUtils.getDistanceOfObjects(params.object, closestObject),
                        params.searchConfig.maxDistance,
                    ) * 2,
                    params.force
                ) * params.mult

            }


        },

        "devour": (params) => {

            let closestObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "maxDistance": params.range
                }
            )

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": params.object.x,
                        "y": params.object.y,
                        "radius": params.range,
                        "color":"red"
                    },
                }
            )

            for (let index = 0; index < closestObjects.length; index++) {

                let closestObject = closestObjects[index]

                let expoMult = CustomMath.diminishingReturns(
                    CustomMath.linearReverse(
                        AIUtils.getDistanceOfObjects(params.object, closestObject),
                        params.range
                    ) * 2,
                    params.expo
                ) * params.mult

                let VALUE = closestObject.maxLife * expoMult

                if(params.object.lifeTime){

                    params.object.lifeTime += VALUE

                }

                if(closestObject.lifeTime){

                    closestObject.lifeTime -= VALUE

                }

                params.object.life.math("+", VALUE)
                params.object.maxLife += VALUE


                closestObject.maxLife -= VALUE

                closestObject.life.math("-", 0.01)

            }


        },

        "parasite": (params) => {

            params.parasiteSelfAttack.damage = params.parasiteObject.damage
            params.parasiteBlasterAttack.damage = params.parasiteObject.damage

            // make more realictic, eenrgy consume, damage, etc

            Damage.damageCalc(params.parasiteObject, params.object)

            let closestAlliesObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "maxDistance": params.range,
                    "includeEnemyTeam": false,
                    "includeSameTeam": true,
                    "includeYourself": false,
                }
            )

            let closestAllieObject = AIUtils.getObject(
                closestAlliesObjects,
                params.object,
                "closest"
            )


            if(closestAllieObject){

                ScreenRender.addDrawRequest( // debug
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": params.object.x,
                        "y": params.object.y,
                        "radius": params.range,
                    },
                }
            )

                ScreenRender.addDrawRequest(
                    {
                        "func": ScreenRender.drawLine,
                        "params": {
                            "positions": [
                                [
                                    params.object.x,
                                    params.object.y,
                                ],[
                                    closestAllieObject.x,
                                    closestAllieObject.y,
                                ]
                            ],
                            "color": params.color,
                            "lineWidth": params.lineWidth,
                        }
                    }

                )

                Damage.damageCalc(params.parasiteBlasterAttack, closestAllieObject)

            }else{

                Damage.damageCalc(params.parasiteSelfAttack, params.object)

            }

        },

        "temporarily disable objects": (params) => {

            let objects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                params.searchConfig
            )

            ScreenRender.addDrawRequest( // debug
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": params.object.x,
                        "y": params.object.y,
                        "radius": params.searchConfig.maxDistance,
                    },
                }
            )

            for (let index = 0; index < objects.length; index++) {

                let object = objects[index]

                for (let indey = 0; indey < params.systems.length; indey++) {

                    if (object["disable"+firstLetterUppercase(
                        params.systems[indey]
                    )]){
                        object["disable"+firstLetterUppercase(params.systems[indey])]()

                        setFrameOut(
                            () => {
                                object["enable"+firstLetterUppercase(params.systems[indey])]()
                            },params.disableFramesOut, 1, true, object.ID + "_enabling "+params.systems[indey]+"..."
                        )

                    }

                }

            }

        },

        "inflict damage":(params) => {

            Damage.damageCalc(
                params.fakeObject,
                params.object
            )

        },

        "inflict area damage":(params) => {

            //let objects = AIUtils.returnArrayWithAlllObjectsOfTeams(
            //    {
            //        "team": params.object.team,
            //        "ID": params.object.ID,
            //        "x": params.zone.x,
            //        "y": params.zone.y,
            //    },
            //    params.searchConfig
            //)

            let objects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                params.searchConfig
            )

            for (let index = 0; index < objects.length; index++) {

                let object = objects[index]

                let mult = 1

                if(!params.uniform){
                    mult = CustomMath.linearReverse(
                        // ADICINAR UM SCHEDULER PARA O CALCULO!
                        AIUtils.getDistanceOfObjects(params.object, object),
                        params.searchConfig.maxDistance,
                    )
                }

                params.fakeObject.damage = params.damage * mult

                Damage.damageCalc(
                    params.fakeObject,
                    object
                )

            }

        },

        "thunder": (params) => {

            let closestAlliesObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "maxDistance": params.range,
                    "includeEnemyTeam": false,
                    "includeSameTeam": true,
                    "includeYourself": false,
                }
            )

            ScreenRender.addDrawRequest( // debug
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": params.object.x,
                        "y": params.object.y,
                        "radius": params.range,
                    },
                }
            )

            let closestAllieObject = AIUtils.getObject(
                closestAlliesObjects,
                params.object,
                "closest"
            )

            Damage.damageCalc(params.fakeObject, params.object)

            if(closestAllieObject){

                ScreenRender.addDrawRequest(
                    {
                        "func": ScreenRender.drawLine,
                        "params": {
                            "positions": [
                                [
                                    params.object.x,
                                    params.object.y,
                                ],[
                                    closestAllieObject.x,
                                    closestAllieObject.y,
                                ]
                            ],
                            "color": params.color,
                            "lineWidth": params.lineWidth,
                        }
                    }

                )

                let frameOut = params.frameOut * params.mult

                // >>> THE FRAMEOUT CANNOT BE SMALLER THAN TWO <<<
                if(frameOut < 2){frameOut = 2}

                params.fakeObject.damage *= params.mult

                Effects.add(
                    params.effectName,
                    "effect",
                    {
                        "object": closestAllieObject,
                        "range": params.range * params.mult,
                        "fakeObject": params.fakeObject,
                        "mult": params.mult,

                        "color": params.color,
                        "lineWidth": params.lineWidth * params.mult,

                        "frameOut": frameOut,
                        "effectName": params.effectName,
                    },{
                        "frameOut": frameOut,
                    }
                )

            }

        },




        "dd": (params) => {

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.writeText,
                    "params": {
                        "text":"ASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        "x": params.object.x,
                        "y": params.object.y,
                        "fontSize": 25,
                        "color": "white"
                    },
                }
            )

        },

    }

    effectsInfo = {

        "positive": {

            "devour": {

                "effect": {

                    "config": {
                        "func": this.effectsList["devour"],
                        "frameOut": 1,
                        "repeat": -1,

                    },
        
                    "params": {
                        "range": 200,
                        "mult": 0.01,
                        "expo": 5,
                    },

                },

                "on": {

                    "config": {
                        "func": this.effectsList["devour"],
                        "stage": "first",
                        "priority": 0,

                    },
        
                    "params": {
                        "range": 200,
                        "mult": 0.01,
                        "expo": 5,
                    },

                }

            },

            "the blessed effect: red":{

                "effect": {

                    "before": {
                        "config": {
                            "func": (params) => {

                                new AnimationsController().run({
                                    "name":"red repulsion",
                                    "focus": {
                                        "x": params.object.x,
                                        "y": params.object.y,
                                    },
                                    "offset": {
                                        "x": 0,
                                        "y": 0,
                                    },
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                })

                            },
                        }
                    },

                    "config": {
                        "func": (params) => {
                            this.effectsList["attraction_repulsion"](params)
                            this.effectsList["inflict area damage"](params)
                        },
                        "frameOut": 25*60,
                        "repeat": -1,
                    },
        
                    "params": {
                        "mult": -2,
                        "force": 0.4,
                        "range": 300,

                        "searchConfig": {
                            "includeSameTeam": false,
                            "includeEnemyTeam": true,
                            "includeYourself": false,
                            "maxDistance": 300,
                        },

                        "fakeObject": {
                            "damageTypes": {
                                "dark energy": 1,
                            },
                        },

                        "damage": 50
                    },
                }

            },

            "attraction": {

                "effect": {

                    "config": {
                        "func": this.effectsList["attraction_repulsion"],
                        "frameOut": 1,
                        "repeat": -1,
                    },
        
                    "params": {

                        "searchConfig": {
                            "includeSameTeam": false,
                            "includeEnemyTeam": true,
                            "includeYourself": false,
                            "maxDistance": 200,
                        },

                        "range": 200,
                        "mult": 0.01,
                        "force": 1,
                    },

                },

            },

            "the blessed effect: reverse": {

                "effect": {

                    "config": {
                        "func": (params) => {

                            for (let index = 0; index < 10; index++) {

                                setFrameOut(
                                    () => {
                                        this.effectsList["sum max life"](params)
                                    },index * 5
                                )
                                
                            }
                            
                        },
                        "frameOut": 9*60,
                        "repeat": -1,
                    },
        
                    "params": {
                        "mult": 0.01,
                    },

                },

            },

            "breathe": {

                "effect": {

                    "config": {
                        "func": this.effectsList["sum max energy"],
                        "frameOut": 60,
                        "repeat": -1,
                    },
        
                    "params": {
                        "mult": 0.01,
                    },

                },

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["sum max energy"],
                        "suffixFunc": ["timeout"],

                        "timeout":{
                            "frameOut": 10,
                        },

                        "stage": "first",
                        "priority": 0,
                    },
        
                    "params": {
                        "mult": 0.01,
                    },

                },
    
            },
            "evolutron": {

                "effect": {

                    "config": {
                        "func": this.effectsList["lv up"],
                        "frameOut": 60,
                        "repeat": -1,
                    },
        
                    "params": {
                        "statsMult": 0.01,
                    },

                },

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["lv up"],
                        "suffixFunc": ["timeout"],

                        "timeout":{
                            "frameOut": 10,
                        },

                        "stage": "first",
                        "priority": 0,
                    },
        
                    "params": {
                        "statsMult": 0.01,
                    },

                },
    
            },
            "second stage": {
    
                "effect": {

                    "config": {
                        "func": this.effectsList["lv up"],
                        "frameOut": 1*60*60,
                        "repeat": 1,
                    },
        
                    "params": {
                        "statsMult": 2,
                    },

                },

                "on": {

                    "config": {

                        "prefixFunc": ["setAttributes"],
                        "func": this.effectsList["lv up"],
                        "suffixFunc": ["stopStages","deleteInstruction"],

                        "stage": "last",
                        "priority": 0,

                        "setAttributes": {
                            "attributes": {
                                "life": 25
                            }
                        },

                        "stopStages": {
                            "stages": ["last"],
                        }

                    },

                    "params": {
                        "statsMult": 2,
                    },

                },
    
            },
            "clone v1": {

                "effect": {
    
                    "config": {
                        "func": this.effectsList["clone"],
                        "frameOut": 1*60*60,
                        "repeat": 1,
                    },
        
                    "params": {
                        "statsMult": 0,
                    },

                },

                "on": {

                    "config": {

                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["clone"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 30*60,
                        },

                        "countDown": {
                            "countDownFunction": ["deleteInstruction"],
                            "count": 2
                        }

                    },

                    "params": {
                        "statsMult": 0,
                    },

                },
    
            },
            "clone v0.5": {

                "effect": {
    
                    "config": {
                        "func": this.effectsList["clone"],
                        "frameOut": 1*60*60,
                        "repeat": 1,
                    },
        
                    "params": {
                        "statsMult": -0.5,
                    },

                },

                "on": {

                    "config": {

                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["clone"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 30*60,
                        },

                        "countDown": {
                            "countDownFunction": ["deleteInstruction"],
                            "count": 2
                        }

                    },

                    "params": {
                        "statsMult": -0.5,
                    },

                },
    
            }, // delet?
            "illusion v1": {
    
                "effect": {

                    "config": {
                        "func": this.effectsList["illusion"],
                        "frameOut": 30,
                        "repeat": 2,
                    },
        
                    "params": {},

                },

                "on": {

                    "config": {

                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["illusion"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 5*60,
                        },

                        "countDown": {
                            "function": ["deleteInstruction"],
                            "count": 3
                        }

                    },

                    "params": {},
                
                }
    
            },
            "slowdown area": {

                "effect": {

                    "config": {
                        "func": this.effectsList["slowdown"],
                        "frameOut": 30,
                        "repeat": -1,
                        "overwrite": false,
                    },
        
                    "params": {
                        "range": 175,
                        "mult": 1,
                    },

                },

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["slowdown"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 15,
                        },

                    },

                    "params": {
                        "range": 175,
                        "mult": 1,
                    },

                }
    
            },
            "untouchable": {

                "effect": {

                    "config": {
                        "func": this.effectsList["slowdown"],
                        "frameOut": 5,
                        "repeat": -1,
                        "overwrite": false,
                    },
        
                    "params": {
                        "range": 50,
                        "mult": 1,
                    },

                },

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["slowdown"],
                        "suffixFunc": [],

                        "stage": "middle",
                        "priority": 5,

                    },

                    "params": {
                        "range": 50,
                        "mult": 1,
                    },

                }
    
            },
            "deflet area": {
    
                "effect": {

                    "config": {
                        "func": this.effectsList["slowdown"],
                        "frameOut": 60,
                        "repeat": -1,
                    },
        
                    "params": {
                        "range": 75,
                        "mult": 3,
                    },

                },

                "on": {
                    

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["slowdown"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 30,
                        },

                    },
        
                    "params": {
                        "range": 75,
                        "mult": 3,
                    },

                },
    
            },
            "help": {
    
                "effect": {

                    "config": {
                        "func": this.effectsList["create objects"],
                        "frameOut": 5*60,
                        "repeat": 4,
                    },
        
                    "params": {
                        "configs": [
                            new MovableSaferPerimeter1().config,
                        ],
                        "repeat": 1,
                        "dispersion": 0,
                        "velMult": 0,
                    },

                },

                "on": {
                
                    "config": {

                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["create objects"],
                        "suffixFunc": ["timeout"],

                        "stage": "first",
                        "priority": 0,

                        "timeout":{
                            "frameOut": 10*60,
                        },

                        "countDown": {
                            "countDownFunction": ["deleteInstruction"],
                            "count": 10
                        }
                    },

                    "params": {
                        "configs": [
                            new MovableSaferPerimeter1().config,
                        ],
                        "repeat": 1,
                        "dispersion": 0,
                        "velMult": 0,
                    }

                }
                
            },
            "missile cluster": {
    
                "on": {
                
                    "config": {

                        "prefixFunc": [],
                        "func": this.effectsList["create objects"],
                        "suffixFunc": [],

                        "stage": "last",
                        "priority": 0,

                    },

                    "params": {

                        "configs": [
                            {
                                "objectClass": MissileProjetile,
                                "AI": ["missileV1"],
                                "activates": {},
                                "behavior": new FocusedTopDownBehavior().searchPriority,
                                "statsMult": 0
                            },
                        ],
                        "repeat": 5,
                        "dispersion": 0.2,
                        "velMult": 0,
                    }

                }
                
            },
            "small bullet cluster": {
    
                "on": {
                
                    "config": {

                        "prefixFunc": [],
                        "func": this.effectsList["create objects"],
                        "suffixFunc": [],

                        "stage": "last",
                        "priority": 0,

                    },

                    "params": {

                        "configs": [
                            {
                                "objectClass": SmallBulletProjetile,
                                "AI": [],
                                "activates": {},
                                "behavior": new FocusedTopDownBehavior().searchPriority,
                                "statsMult": 0
                            },
                        ],
                        "repeat": 5,
                        "dispersion": 0.2,
                        "velMult": 5,
                    }

                }
                
            },
            "safe perimeter pack": {
    
                "on": {
                
                    "config": {

                        "prefixFunc": [],
                        "func": this.effectsList["create objects"],
                        "suffixFunc": [],

                        "stage": "last",
                        "priority": 0,

                    },

                    "params": {

                        "configs": [
                            new MovableSaferPerimeter1().config,
                            new MovableSaferPerimeter1().config,
                            new SaferPerimeter1().config,
                        ],
                        "repeat": 1,
                        "dispersion": 0.2,
                        "velMult": 5,
                    }

                }
                
            },


            "d": {
    
                "config": {
                    "func": this.effectsList["dd"],
                    "frameOut": 1,
                    "repeat": -1,
                },
    
                "params": {
                },
                
            },

        },

        "negative": {

            "shock": {

                "effect": {

                    "config": {
                        "func": this.effectsList["thunder"],
                        "frameOut": 20,
                        "repeat": 1,
                    },
        
                    "params": {

                        "fakeObject": {
                            "damage": 100,
                            "damageTypes": {
                                "shock": 1,
                            }
                        },

                        "range": 300,
                        "mult": 0.5,
    
                        "color": "yellow",
                        "lineWidth": 4,
        
                        "effectName": "shock",
                        "frameOut": 20
                    },

                },

                "on": {

                    "config": {

                        "func": this.effectsList["thunder"],

                    },

                    "params": {
                        "range": 300,
                        "fakeObject": {
                            "damage": 100,
                            "damageTypes": {
                                "shock": 1,
                            }
                        },
                        "mult": 0.5,
    
                        "color": "yellow",
                        "lineWidth": 4,
        
                        "effectName": "shock",
                        "frameOut": 20
                    },


                },
    
            },

            "zeus": {

                "effect": {

                    "config": {
                        "func": this.effectsList["thunder"],
                        "frameOut": 5,
                        "repeat": 1,
                    },
        
                    "params": {
                        "range": 50,
                        "fakeObject": {
                            "damage": 10,
                            "damageTypes": {
                                "shock": 1,
                            }
                        },
                        "mult": 1.1,
    
                        "color": "yellow",
                        "lineWidth": 1,
        
                        "effectName": "zeus",
                        "frameOut": 5
                    },

                },

                "on": {
                    "config": {

                        "func": this.effectsList["thunder"],

                    },

                    "params": {
                        "range": 50,
                        "fakeObject": {
                            "damage": 10,
                            "damageTypes": {
                                "shock": 1,
                            }
                        },
                        "mult": 1.1,
    
                        "color": "yellow",
                        "lineWidth": 1,
        
                        "effectName": "zeus",
                        "frameOut": 5
                    },

                }
    
            },

            "death hand": {

                "effect": {

                    "before": {
                        "config": {
                            "func": (params) => {

                                new AnimationsController().run({
                                    "name":"death",
                                    "focus": {
                                        "x": params.object.x,
                                        "y": params.object.y,
                                    },
                                    "offset": {
                                        "x": randomInteger(-params.object.width, params.object.width),
                                        "y": randomInteger(-params.object.height, params.object.height),
                                    },
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                })
    
                            },
                        }
                    },

                    "config": {
                        "func": this.effectsList["inflict damage"],
                        "frameOut": 60,
                        "repeat": -1,
                    },
        
                    "params": {
                        "fakeObject": {
                            "damage": 1,
                            "damageTypes": {
                                "death": 1,
                            }
                        }
                    },

                },

            },

            "burn": {

                "effect": {

                    "before": {
                        "config": {
                            "func": (params) => {

                                new AnimationsController().run({
                                    "name":"fire",
                                    //"type":"relative",
                                    //"focus": params.object,
                                    "focus": {
                                        "x": params.object.x,
                                        "y": params.object.y,
                                    },
                                    "offset": {
                                        "x": randomInteger(-params.object.width, params.object.width),
                                        "y": randomInteger(-params.object.height, params.object.height),
                                    },
                                    "frameRandomOffsetX": 2,
                                    "frameRandomOffsetY": 2,
                                    "randomPointOffsetX": 1,
                                    "randomPointOffsetY": 1,
                                })
    
                            },
                        }
                    },

                    "config": {
                        "func": this.effectsList["inflict damage"],
                        "frameOut": 10,
                        "repeat": 6,
                    },
        
                    "params": {
                        "fakeObject": {
                            "damage": 1,
                            "damageTypes": {
                                "fire": 1,
                            }
                        }
                    },

                },

            },

            "parasite tesla coil": {

                "effect": {

                    "config": {
                        "func": this.effectsList["parasite"],
                        "frameOut": 5*60,
                        "repeat": 3,
                    },
        
                    "params": {

                        "parasiteObject": {
                            "damage": 50,
                            "damageTypes": {
                                "parasite suck energy damage": 0.1,
                                "parasite suck energy": 1,
                            }
                        },

                        "parasiteSelfAttack": {
                            "damageTypes": {
                                "parasite self blaster": 0.25,
                            }
                        },

                        "parasiteBlasterAttack": {
                            "damageTypes": {
                                "parasite blaster": 0.5,
                            },
                        },

                        "range": 150,
                        
                        "color": "lightblue",
                        "lineWidth": 2,
                    },

                },

            },

            "the blessed effect: blue": {

                "effect": {

                    "before": {
                        "config": {
                            "func": (params) => {

                                new AnimationsController().run({
                                    "name":"blue attraction",
                                    "focus": {
                                        "x": params.object.x,
                                        "y": params.object.y,
                                    },
                                    "offset": {
                                        "x": 0,
                                        "y": 0,
                                    },
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                })

                            },
                        }
                    },

                    "config": {
                        "func": (params) => {
                            this.effectsList["attraction_repulsion"](params)
                            this.effectsList["inflict area damage"](params)
                        },
                        "frameOut": 5,
                        "repeat": 5,
                    },
        
                    "params": {

                        "searchConfig": {
                            "includeSameTeam": true,
                            "includeEnemyTeam": false,
                            "includeYourself": true,
                            "maxDistance": 50,
                        },

                        "fakeObject": {
                            "damageTypes": {
                                "dark energy": 1,
                            },
                        },

                        "mult": 1,
                        "force": 0.1,
                        "damage": 5
                    },

                },

            },

        },

    }

    getAll(){
        return this.effectsInfo
    }

    get(effectName){
        return this.effectsInfo[effectName]
    }

}

var GenericEffects = new GenericEffectsController()