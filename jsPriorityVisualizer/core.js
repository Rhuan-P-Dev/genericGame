import { AIUtilsController } from "../js/AI/utils/AIUtils.js"
import { EnergizedObject } from "../js/object/basic/energizedObject.js";
import { MovableObject } from "../js/object/basic/movableObject.js";
import { Object } from "../js/object/basic/object.js";
import { RotableObject } from "../js/object/basic/rotableObject.js";
import { ShieldObject } from "../js/object/basic/shieldObject.js";
import { SmallShieldObject } from "../js/object/basic/smallShieldObject.js";
import { ArmoredObjectFactory } from "../js/object/complex/armoredFactory.js";
import { BigDrone } from "../js/object/complex/bigDrone.js";
import { Drone } from "../js/object/complex/drone.js";
import { DroneV2 } from "../js/object/complex/droneV2.js";
import { ObjectFactory } from "../js/object/complex/factory.js";
import { Ship } from "../js/object/complex/ship.js"
import { DroneSentinel } from "../js/object/complex/special drone/droneSentinel.js";
import { GovernmentDrone } from "../js/object/complex/special drone/governmentDrone.js";
import { SelfSwarmDrone } from "../js/object/complex/special drone/selfSwarmDrone.js";
import { BountyHunter } from "../js/object/complex/special ship/bountyHunter.js";
import { Cry } from "../js/object/complex/special ship/cryprwtrazghu/cry.js";
import { Cryprw } from "../js/object/complex/special ship/cryprwtrazghu/cryprw.js";
import { Cryprwtrazghu } from "../js/object/complex/special ship/cryprwtrazghu/cryprwtrazghu.js";
import { Ghu } from "../js/object/complex/special ship/cryprwtrazghu/ghu.js";
import { Prw } from "../js/object/complex/special ship/cryprwtrazghu/prw.js";
import { Cryprwtrazghu_standard } from "../js/object/complex/special ship/cryprwtrazghu/standard.js";
import { Traz } from "../js/object/complex/special ship/cryprwtrazghu/traz.js";
import { Trazghu } from "../js/object/complex/special ship/cryprwtrazghu/trazghu.js";
import { Evolutron } from "../js/object/complex/special ship/evolutron.js";
import { Fenix } from "../js/object/complex/special ship/fenix.js";
import { HolyGeneral } from "../js/object/complex/special ship/holyGeneral.js";
import { LazySentinel } from "../js/object/complex/special ship/lazySentinel.js";
import { LordIllusionist } from "../js/object/complex/special ship/lordIllusionist.js";
import { MrAnonymous } from "../js/object/complex/special ship/mrAnonymous.js";
import { Police } from "../js/object/complex/special ship/police.js";
import { Prisp } from "../js/object/complex/special ship/prisp.js";
import { PurpleShip } from "../js/object/complex/special ship/purpleShip.js";
import { MrD } from "../js/object/complex/special ship/mrD.js";
import { SelfSwarmMotherShip } from "../js/object/complex/special ship/selfSwarmMotherShip.js";
import { Soldier } from "../js/object/complex/special ship/soldier.js";
import { TheBlessed } from "../js/object/complex/special ship/theBlessed.js";
import { StationaryObject } from "../js/object/complex/stationaryObject.js";
import { Turret } from "../js/object/complex/turrent.js";
import { BasicExplosiveProjectile } from "../js/object/projectiles/basic/basicExplosiveProjectile.js";
import { BasicLaserProjectile } from "../js/object/projectiles/basic/basicLaserProjectile.js";
import { BasicProjetile } from "../js/object/projectiles/basic/basicProjetile.js";
import { BlackHoleProjetile } from "../js/object/projectiles/complex/blackHoleProjectile.js";
import { DeathHand } from "../js/object/projectiles/complex/deathHand.js";
import { EmptyColorProjetile } from "../js/object/projectiles/complex/emptyColorProjectile.js";
import { ExplosiveMediumBulletProjectile } from "../js/object/projectiles/complex/explosiveMediumBulletProjectile.js";
import { ExplosiveSmallBulletProjetile } from "../js/object/projectiles/complex/explosiveSmallBulletProjectile.js";
import { LaserProjectile } from "../js/object/projectiles/complex/laser/laserProjectile.js";
import { MediumBulletProjetiles } from "../js/object/projectiles/complex/mediumBulletProjectile.js";
import { MineProjetile } from "../js/object/projectiles/complex/mineProjectile.js";
import { MiniWorldProjectile } from "../js/object/projectiles/complex/miniWorldProjectile.js";
import { MissileProjetile } from "../js/object/projectiles/complex/missileProjectile.js";
import { SmallBulletProjetile } from "../js/object/projectiles/complex/smallBulletProjectile.js";
import { DarkEnergyObject } from "../js/object/uncommon/darkEnergyObject.js";
import { SelfSwarmObject } from "../js/object/uncommon/selfSwarmObject.js";
import { Zombie } from "../js/object/complex/special ship/zombie.js";
import { Dis } from "../js/object/complex/special ship/cryprwtrazghu/dis.js";
import { ChessPawn } from "../js/object/complex/special drone/chessPawn.js";
import { ChessTower } from "../js/object/complex/special drone/chessTower.js";
import { ChessHorse } from "../js/object/complex/special drone/chessHorse.js";
import { ChessQueen } from "../js/object/complex/special ship/chessQueen.js";
import { ChessKing } from "../js/object/complex/special ship/chessKing.js";
import { Stalker } from "../js/object/complex/special ship/stalker.js";
import { ArenaCloser } from "../js/object/complex/special ship/arenaCloser.js";
import { Reaper } from "../js/object/complex/special ship/reaper.js";
import { Stranger } from "../js/object/complex/special ship/stranger.js";
import { Freee } from "../js/object/complex/special ship/cryprwtrazghu/freee.js";
import { Freeedis } from "../js/object/complex/special ship/cryprwtrazghu/freeedis.js";
import { Slime } from "../js/object/complex/special drone/slime.js";
import { Slimc } from "../js/object/complex/special ship/cryprwtrazghu/slimc.js";
import { UnstableSlime } from "../js/object/complex/special drone/unstableSlime.js";
import { SoulSplit } from "../js/object/complex/special ship/cryprwtrazghu/soulSplit.js";
import { Cryprwtrazghufreeedisslimecss } from "../js/object/complex/special ship/cryprwtrazghu/cryprwtrazghufreeedisslimecss.js";
import { Slimecss } from "../js/object/complex/special ship/cryprwtrazghu/slimecss.js";
import { SnowShip } from "../js/object/complex/special ship/snowShip.js";
import { Deceiver } from "../js/object/complex/special ship/deceiver.js";

var AIUtils

onInit(function(){
    AIUtils = new AIUtilsController()

let objects = [
    new Object(true),
    new Ship(true),
    new EnergizedObject(true),
    new MovableObject(true),
    new RotableObject(true),
    new ShieldObject(true),
    new SmallShieldObject(true),
    new ArmoredObjectFactory(true),
    new BigDrone(true),
    new Drone(true),
    new DroneV2(true),
    new ObjectFactory(true),
    new StationaryObject(true),
    new Turret(true),
    new TheBlessed(true),
    new SelfSwarmMotherShip(true),
    new Prisp(true),
    new Fenix(true),
    new BountyHunter(true),
    new Cry(true),
    new Cryprw(true),
    new Cryprwtrazghu(true),
    new Ghu(true),
    new Prw(true),
    new Cryprwtrazghu_standard(true),
    new SelfSwarmDrone(true),
    new SelfSwarmObject(true),
    new DarkEnergyObject(true),
    new BasicExplosiveProjectile(true),
    new BasicLaserProjectile(true),
    new LaserProjectile(true),
    new BasicProjetile(true),
    new BlackHoleProjetile(true),
    new DeathHand(true),
    new EmptyColorProjetile(true),
    new ExplosiveMediumBulletProjectile(true),
    new ExplosiveSmallBulletProjetile(true),
    new MediumBulletProjetiles(true),
    new MineProjetile(true),
    new MiniWorldProjectile(true),
    new MissileProjetile(true),
    new SmallBulletProjetile(true),
    new Traz(true),
    new Trazghu(true),
    new PurpleShip(true),
    new MrAnonymous(true),
    new LordIllusionist(true),
    new Soldier(true),
    new HolyGeneral(true),
    new LazySentinel(true),
    new DroneSentinel(true),
    new Evolutron(true),
    new Police(true),
    new GovernmentDrone(true),
    new MrD(true),
    new Zombie(true),
    new Dis(true),
    new ChessPawn(true),
    new ChessTower(true),
    new ChessHorse(true),
    new ChessQueen(true),
    new ChessKing(true),
    new Stalker(true),
    new ArenaCloser(true),
    new Reaper(true),
    new Stranger(true),
    new Freee(true),
    new Freeedis(true),
    new Slime(true),
    new Slimc(true),
    new UnstableSlime(true),
    new SoulSplit(true),
    new Cryprwtrazghufreeedisslimecss(true),
    new Slimecss(true),
    new SnowShip(true),
    new Deceiver(true),

];
let ship = new Ship(true)
ship.x = 0
ship.y = 0

// Sort the objects by priority
objects.sort((a, b) => a.priority - b.priority);

// Create the table
let table = document.createElement('table');

// Create the table header
let thead = document.createElement('thead');
let headerRow = document.createElement('tr');
let headers = ['Object name', 'Priority', 'Distance'];
headers.forEach(headerText => {
    let th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

// Create the table body
let tbody = document.createElement('tbody');
objects.forEach(object => {
    let row = document.createElement('tr');
    let nameCell = document.createElement('td');
    nameCell.textContent = object.constructor.name
    row.appendChild(nameCell);
    let priorityCell = document.createElement('td');
    priorityCell.textContent = object.priority;
    row.appendChild(priorityCell);
    let distanceCell = document.createElement('td');
    distanceCell.textContent = AIUtils.getStepDistanceOfObjects(ship, object).toFixed(2);
    row.appendChild(distanceCell);
    tbody.appendChild(row);
});
table.appendChild(tbody);

// Add the table to the document
document.body.appendChild(table);

})