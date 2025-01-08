import { ArmoredObjectFactory } from "../../js/object/complex/armoredFactory.js"
import { BigDrone } from "../../js/object/complex/bigDrone.js"
import { Drone } from "../../js/object/complex/drone.js"
import { DroneV2 } from "../../js/object/complex/droneV2.js"
import { ObjectFactory } from "../../js/object/complex/factory.js"
import { Ship } from "../../js/object/complex/ship.js"
import { ChessBishop } from "../../js/object/complex/special drone/chessBishop.js"
import { ChessHorse } from "../../js/object/complex/special drone/chessHorse.js"
import { ChessPawn } from "../../js/object/complex/special drone/chessPawn.js"
import { ChessTower } from "../../js/object/complex/special drone/chessTower.js"
import { DroneSentinel } from "../../js/object/complex/special drone/droneSentinel.js"
import { GovernmentDrone } from "../../js/object/complex/special drone/governmentDrone.js"
import { SelfSwarmDrone } from "../../js/object/complex/special drone/selfSwarmDrone.js"
import { Slime } from "../../js/object/complex/special drone/slime.js"
import { UnstableSlime } from "../../js/object/complex/special drone/unstableSlime.js"
import { ArenaCloser } from "../../js/object/complex/special ship/arenaCloser.js"
import { BountyHunter } from "../../js/object/complex/special ship/bountyHunter.js"
import { ChessKing } from "../../js/object/complex/special ship/chessKing.js"
import { ChessQueen } from "../../js/object/complex/special ship/chessQueen.js"
import { Cry } from "../../js/object/complex/special ship/cryprwtrazghu/cry.js"
import { Cryprw } from "../../js/object/complex/special ship/cryprwtrazghu/cryprw.js"
import { Cryprwtrazghu } from "../../js/object/complex/special ship/cryprwtrazghu/cryprwtrazghu.js"
import { Cryprwtrazghufreeedisslimecss } from "../../js/object/complex/special ship/cryprwtrazghu/cryprwtrazghufreeedisslimecss.js"
import { Dis } from "../../js/object/complex/special ship/cryprwtrazghu/dis.js"
import { Freee } from "../../js/object/complex/special ship/cryprwtrazghu/freee.js"
import { Freeedis } from "../../js/object/complex/special ship/cryprwtrazghu/freeedis.js"
import { Freeedisslimecss } from "../../js/object/complex/special ship/cryprwtrazghu/freeedisslimecss.js"
import { Ghu } from "../../js/object/complex/special ship/cryprwtrazghu/ghu.js"
import { Prw } from "../../js/object/complex/special ship/cryprwtrazghu/prw.js"
import { Slimc } from "../../js/object/complex/special ship/cryprwtrazghu/slimc.js"
import { Slimecss } from "../../js/object/complex/special ship/cryprwtrazghu/slimecss.js"
import { SoulSplit } from "../../js/object/complex/special ship/cryprwtrazghu/soulSplit.js"
import { Traz } from "../../js/object/complex/special ship/cryprwtrazghu/traz.js"
import { Trazghu } from "../../js/object/complex/special ship/cryprwtrazghu/trazghu.js"
import { Deceiver } from "../../js/object/complex/special ship/deceiver.js"
import { Evolutron } from "../../js/object/complex/special ship/evolutron.js"
import { Fenix } from "../../js/object/complex/special ship/fenix.js"
import { Hero } from "../../js/object/complex/special ship/hero.js"
import { HolyGeneral } from "../../js/object/complex/special ship/holyGeneral.js"
import { LazySentinel } from "../../js/object/complex/special ship/lazySentinel.js"
import { LordIllusionist } from "../../js/object/complex/special ship/lordIllusionist.js"
import { MrAnonymous } from "../../js/object/complex/special ship/mrAnonymous.js"
import { MrD } from "../../js/object/complex/special ship/mrD.js"
import { Pacifist } from "../../js/object/complex/special ship/pacifist.js"
import { Police } from "../../js/object/complex/special ship/police.js"
import { Prisp } from "../../js/object/complex/special ship/prisp.js"
import { PurpleShip } from "../../js/object/complex/special ship/purpleShip.js"
import { Reaper } from "../../js/object/complex/special ship/reaper.js"
import { SelfSwarmMotherShip } from "../../js/object/complex/special ship/selfSwarmMotherShip.js"
import { SnowShip } from "../../js/object/complex/special ship/snowShip.js"
import { Soldier } from "../../js/object/complex/special ship/soldier.js"
import { Stalker } from "../../js/object/complex/special ship/stalker.js"
import { Stranger } from "../../js/object/complex/special ship/stranger.js"
import { TheBlessed } from "../../js/object/complex/special ship/theBlessed.js"
import { Zombie } from "../../js/object/complex/special ship/zombie.js"
import { StationaryObject } from "../../js/object/complex/stationaryObject.js"
import { Turret } from "../../js/object/complex/turrent.js"

export class ObjectsScorerController {

    objects = {

        "Ship": Ship,
        "BigDrone": BigDrone,
        "Drone": Drone,
        "DroneV2": DroneV2,
        "SelfSwarmDrone": SelfSwarmDrone,
        "TheBlessed": TheBlessed,
        "SelfSwarmMotherShip": SelfSwarmMotherShip,
        "Prisp": Prisp,
        "Fenix": Fenix,
        "BountyHunter": BountyHunter,
        "Cry": Cry,
        "Ghu": Ghu,
        "Prw": Prw,
        "Traz": Traz,
        "Cryprw": Cryprw,
        "Trazghu": Trazghu,
        "Cryprwtrazghu": Cryprwtrazghu,



        "ArmoredObjectFactory": ArmoredObjectFactory,
        "ObjectFactory": ObjectFactory,
        "Turret": Turret,
        "StationaryObject": StationaryObject,
        "PurpleShip": PurpleShip,
        "MrAnonymous": MrAnonymous,
        "LordIllusionist": LordIllusionist,
        "Soldier": Soldier,
        "HolyGeneral": HolyGeneral,
        "LazySentinel": LazySentinel,
        "DroneSentinel": DroneSentinel,
        "Evolutron": Evolutron,
        "Police": Police,
        "GovernmentDrone": GovernmentDrone,
        "MrD": MrD,
        "Zombie": Zombie,
        "Dis": Dis,
        "Reaper": Reaper,
        "ChessPawn": ChessPawn,
        "ChessTower": ChessTower,
        "ChessHorse": ChessHorse,
        "ChessBishop": ChessBishop,
        "ChessQueen": ChessQueen,
        "ChessKing": ChessKing,
        "Stalker": Stalker,
        "ArenaCloser": ArenaCloser,
        "Pacifist": Pacifist,
        "Hero": Hero,
        "Stranger": Stranger,
        "Freee": Freee,
        "Freeedis": Freeedis,
        "Slime": Slime,
        "UnstableSlime": UnstableSlime,
        "Slimc": Slimc,
        "SoulSplit": SoulSplit,
        "Slimecss": Slimecss,
        "Freeedisslimecss": Freeedisslimecss,
        "Cryprwtrazghufreeedisslimecss": Cryprwtrazghufreeedisslimecss,
        "SnowShip": SnowShip,
        "Deceiver": Deceiver
    }

    objectsNames = [
        "Ship",
        "BigDrone",
        "Drone",
        "DroneV2",
        "SelfSwarmDrone",
        "TheBlessed",
        "SelfSwarmMotherShip",
        "Prisp",
        "Fenix",
        "BountyHunter",
        "Cry",
        "Ghu",
        "Prw",
        "Traz",
        "Cryprw",
        "Trazghu",
        "Cryprwtrazghu",
        "PurpleShip",



        "ArmoredObjectFactory",
        "ObjectFactory",
        "Turret",
        "StationaryObject",
        "MrAnonymous",
        "LordIllusionist",
        "Soldier",
        "HolyGeneral",
        "LazySentinel",
        "DroneSentinel",
        "Evolutron",
        "Police",
        "GovernmentDrone",
        "MrD",
        "Zombie",
        "Dis",
        "Reaper",
        "ChessPawn",
        "ChessTower",
        "ChessHorse",
        "ChessBishop",
        "ChessQueen",
        "ChessKing",
        "Stalker",
        "ArenaCloser",
        "Pacifist",
        "Hero",
        "Stranger",
        "Freee",
        "Freeedis",
        "Slime",
        "UnstableSlime",
        "Slimc",
        "SoulSplit",
        "Slimecss",
        "Freeedisslimecss",
        "Cryprwtrazghufreeedisslimecss",
        "SnowShip",
        "Deceiver"
    ]

    typeObjectMult = {

        "TheBlessed": 20,
        "SelfSwarmMotherShip": 6,
        "Prisp": 4,
        "Fenix": 4,
        "BountyHunter": 15,
        "Cry": 1.25,
        "Ghu": 1.5,
        "Prw": 4,
        "Traz": 2.5,
        "Cryprw": 5,
        "Trazghu": 4.5,
        "Cryprwtrazghu": 12,
        "PurpleShip": 15,
        "MrAnonymous": 25,
        "LordIllusionist": 35,
        "Soldier": 6,
        "HolyGeneral": 22,
        "LazySentinel": 15,
        "MrD": 12,

        "Drone": 0.25,
        "DroneV2": 0.5,
        "BigDrone": 0.75,
        "StationaryObject": 0.4,
        "Turret": 0.6,
        "ObjectFactory": 1.25,
        "ArmoredObjectFactory": 1.25,
        "SelfSwarmDrone": 0.7,
        "ChessPawn": 0.5,
        "ChessTower": 3,
        "ChessHorse": 1.4,
        "ChessBishop": 2,
        "DroneSentinel": 1.25,
        "Ship": 1,
        "Evolutron": 10,
        "Police": 7,
        "GovernmentDrone": 1,
        "Zombie": 6,
        "Dis": 4,
        "Reaper": 20,
        "ChessQueen": 20,
        "ChessKing": 11,
        "Stalker": 15,
        "ArenaCloser": 100,
        "Pacifist": 20,
        "Hero": 50,
        "Stranger": 3,
        "Freee": 6,
        "Freeedis": 13,
        "Slime": 2,
        "UnstableSlime": 1,
        "Slimc": 8,
        "SoulSplit": 2,
        "Slimecss": 14,
        "Freeedisslimecss": 30,
        "Cryprwtrazghufreeedisslimecss": 60,
        "SnowShip": 2,
        "Deceiver": 10,
    }

    sortObjectByValues() {
        // Convert the object into an array of key-value pairs
        let entries = Object.entries(this.typeObjectMult);
    
        // Sort the array based on the values of each pair
        // The sort function compares the second element of each pair (the value)
        // and sorts them in descending order
        let sortedEntries = entries.sort((entryA, entryB) => entryB[1] - entryA[1]);
    
        // Convert the sorted array back into an object
        // The reduce function iterates over the array and creates a new object
        // with each key-value pair from the array
        let sortedObject = sortedEntries.reduce((result, [key, value]) => {
            return { ...result, [key]: value };
        }, {});
    
        // Return the sorted object
        return sortedObject;
    }

    baseCost = 50000

    getObjectCost(objectType){

        if(objectType.constructor.name === "String"){
            return this.typeObjectMult[objectType] * this.baseCost
        }else{
            return this.typeObjectMult[objectType.constructor.name] * this.baseCost
        }

    }

    getObjectMult(objectType){

        if(objectType.constructor.name === "String"){
            return this.typeObjectMult[objectType]
        }else{
            return this.typeObjectMult[objectType.constructor.name]
        }

    }

    getName(){

        return returnRandomArray(
            this.objectsNames
        )

    }

    get(Name){

        return this.objects[Name]

    }

    getAll(){

        let scores = []

        for(let objectName of this.objectsNames){

            let ob = new (this.objects[objectName])(true)

            scores.push(
                [
                    ob.constructor.name,
                    parseInt(
                        this.getObjectCost(
                            ob
                        )
                    )
                ]
            )

        }

        return scores
    }

}