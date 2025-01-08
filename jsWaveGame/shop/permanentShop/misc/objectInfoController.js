import { FrameController } from "../../../../js/frame/frameController.js"
import { GameStateController } from "../../../../js/gameState/gameStateController.js"
import { ArmoredObjectFactory } from "../../../../js/object/complex/armoredFactory.js"
import { BigDrone } from "../../../../js/object/complex/bigDrone.js"
import { Drone } from "../../../../js/object/complex/drone.js"
import { DroneV2 } from "../../../../js/object/complex/droneV2.js"
import { ObjectFactory } from "../../../../js/object/complex/factory.js"
import { Ship } from "../../../../js/object/complex/ship.js"
import { ChessBishop } from "../../../../js/object/complex/special drone/chessBishop.js"
import { ChessHorse } from "../../../../js/object/complex/special drone/chessHorse.js"
import { ChessPawn } from "../../../../js/object/complex/special drone/chessPawn.js"
import { ChessTower } from "../../../../js/object/complex/special drone/chessTower.js"
import { DroneSentinel } from "../../../../js/object/complex/special drone/droneSentinel.js"
import { GovernmentDrone } from "../../../../js/object/complex/special drone/governmentDrone.js"
import { SelfSwarmDrone } from "../../../../js/object/complex/special drone/selfSwarmDrone.js"
import { Slime } from "../../../../js/object/complex/special drone/slime.js"
import { UnstableSlime } from "../../../../js/object/complex/special drone/unstableSlime.js"
import { ArenaCloser } from "../../../../js/object/complex/special ship/arenaCloser.js"
import { BountyHunter } from "../../../../js/object/complex/special ship/bountyHunter.js"
import { ChessKing } from "../../../../js/object/complex/special ship/chessKing.js"
import { ChessQueen } from "../../../../js/object/complex/special ship/chessQueen.js"
import { Cry } from "../../../../js/object/complex/special ship/cryprwtrazghu/cry.js"
import { Cryprw } from "../../../../js/object/complex/special ship/cryprwtrazghu/cryprw.js"
import { Cryprwtrazghu } from "../../../../js/object/complex/special ship/cryprwtrazghu/cryprwtrazghu.js"
import { Cryprwtrazghufreeedisslimecss } from "../../../../js/object/complex/special ship/cryprwtrazghu/cryprwtrazghufreeedisslimecss.js"
import { Dis } from "../../../../js/object/complex/special ship/cryprwtrazghu/dis.js"
import { Freee } from "../../../../js/object/complex/special ship/cryprwtrazghu/freee.js"
import { Freeedis } from "../../../../js/object/complex/special ship/cryprwtrazghu/freeedis.js"
import { Freeedisslimecss } from "../../../../js/object/complex/special ship/cryprwtrazghu/freeedisslimecss.js"
import { Ghu } from "../../../../js/object/complex/special ship/cryprwtrazghu/ghu.js"
import { Prw } from "../../../../js/object/complex/special ship/cryprwtrazghu/prw.js"
import { Slimc } from "../../../../js/object/complex/special ship/cryprwtrazghu/slimc.js"
import { Slimecss } from "../../../../js/object/complex/special ship/cryprwtrazghu/slimecss.js"
import { SoulSplit } from "../../../../js/object/complex/special ship/cryprwtrazghu/soulSplit.js"
import { Traz } from "../../../../js/object/complex/special ship/cryprwtrazghu/traz.js"
import { Trazghu } from "../../../../js/object/complex/special ship/cryprwtrazghu/trazghu.js"
import { Deceiver } from "../../../../js/object/complex/special ship/deceiver.js"
import { Evolutron } from "../../../../js/object/complex/special ship/evolutron.js"
import { Fenix } from "../../../../js/object/complex/special ship/fenix.js"
import { Hero } from "../../../../js/object/complex/special ship/hero.js"
import { HolyGeneral } from "../../../../js/object/complex/special ship/holyGeneral.js"
import { LazySentinel } from "../../../../js/object/complex/special ship/lazySentinel.js"
import { LordIllusionist } from "../../../../js/object/complex/special ship/lordIllusionist.js"
import { MrAnonymous } from "../../../../js/object/complex/special ship/mrAnonymous.js"
import { MrD } from "../../../../js/object/complex/special ship/mrD.js"
import { Pacifist } from "../../../../js/object/complex/special ship/pacifist.js"
import { Police } from "../../../../js/object/complex/special ship/police.js"
import { Prisp } from "../../../../js/object/complex/special ship/prisp.js"
import { PurpleShip } from "../../../../js/object/complex/special ship/purpleShip.js"
import { Reaper } from "../../../../js/object/complex/special ship/reaper.js"
import { SelfSwarmMotherShip } from "../../../../js/object/complex/special ship/selfSwarmMotherShip.js"
import { SnowShip } from "../../../../js/object/complex/special ship/snowShip.js"
import { Soldier } from "../../../../js/object/complex/special ship/soldier.js"
import { Stalker } from "../../../../js/object/complex/special ship/stalker.js"
import { Stranger } from "../../../../js/object/complex/special ship/stranger.js"
import { TheBlessed } from "../../../../js/object/complex/special ship/theBlessed.js"
import { Zombie } from "../../../../js/object/complex/special ship/zombie.js"
import { StationaryObject } from "../../../../js/object/complex/stationaryObject.js"
import { Turret } from "../../../../js/object/complex/turrent.js"
import { ObjectsScorerController } from "../../../scorers/objectsScorerController.js"

const OBJETCS = [
    Drone,
    StationaryObject,
    DroneV2,
    Turret,
    BigDrone,
    SelfSwarmDrone,
    ObjectFactory,
    ArmoredObjectFactory,
    Ship,
    Cry,
    Ghu,
    Prw,
    Traz,
    Trazghu,
    Cryprw,
    Prisp,
    Fenix,
    BountyHunter,
    Cryprwtrazghu,
    SelfSwarmMotherShip,
    PurpleShip,
    MrAnonymous,
    TheBlessed,
    LordIllusionist,
    Soldier,
    HolyGeneral,
    LazySentinel,
    DroneSentinel,
    Evolutron,
    Police,
    GovernmentDrone,
    MrD,
    Zombie,
    Dis,
    Reaper,
    ChessPawn,
    ChessTower,
    ChessHorse,
    ChessBishop,
    ChessQueen,
    ChessKing,
    Stalker,
    ArenaCloser,
    Pacifist,
    Hero,
    Stranger,
    Freee,
    Freeedis,
    Slime,
    UnstableSlime,
    Slimc,
    SoulSplit,
    Slimecss,
    Freeedisslimecss,
    Cryprwtrazghufreeedisslimecss,
    SnowShip,
    Deceiver
]

var GameState
var Frame
var ObjectsScorer

onInit(function(){

    GameState = new GameStateController()
    Frame = new FrameController()
    ObjectsScorer = new ObjectsScorerController()

})

export class ObjectInfoController {

    constructor() {
        this.objects = OBJETCS
        this.sortObjectsByScore()
        this.curretCreatedObject = undefined
        this.index = 0
        this.curretObject = this.objects[0]
    }

    sortObjectsByScore() {
        this.objects = this.objects.sort((a, b) => {
            const scoreA = ObjectsScorer.getObjectMult(a.name)
            const scoreB = ObjectsScorer.getObjectMult(b.name)
            return scoreA - scoreB
        })
    }

    next() {
        this.index++
        if (this.index >= this.objects.length) {
            this.index = 0
        }
        this.curretObject = this.objects[this.index]
    }

    previous() {
        this.index--
        if (this.index < 0) {
            this.index = this.objects.length - 1
        }
        this.curretObject = this.objects[this.index]
    }
    
    setObject(object){
        if(typeof object !== "Object"){
            object = this.objects.find(obj => obj.name === object)
        }
        this.curretObject = object
    }

    set(object){
        this.curretCreatedObject = object
    }

    delete(){
        if(this.curretCreatedObject){
            GameState.remove(this.curretCreatedObject)
            this.curretCreatedObject = undefined
        }
    }

    get(){
        this.delete()
        let object = new (this.curretObject)(true)
        GameState.addObject(object, false, false, false, false, false, false)
        this.set(object)
        Frame.update()
        return object
    }

}