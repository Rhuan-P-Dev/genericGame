import { DefenseScorerController } from "../jsWaveGame/scorers/activates/defenseScorerController.js"
import { FactoryScorerController } from "../jsWaveGame/scorers/activates/factoryScorerController.js"
import { SpecialScorerController } from "../jsWaveGame/scorers/activates/specialScorerController.js"
import { WeaponScorerController } from "../jsWaveGame/scorers/activates/weaponScorerController.js"
import { AscensionScorerController } from "../jsWaveGame/scorers/ascensionScorerController.js"
import { DefenseTypesScorerController } from "../jsWaveGame/scorers/defenseTypesScorerController.js"
import { EffectsScorerController } from "../jsWaveGame/scorers/effects/effectsScorerController.js"
import { ObjectsScorerController } from "../jsWaveGame/scorers/objectsScorerController.js"
import { StatsUpgradesController } from "../jsWaveGame/scorers/statsUpgradesController.js"

var WeaponScorer
var DefenseScorer
var SpecialScorer
var FactoryScorer
var ObjectsScorer
var EffectsScorer
var AscensionScorer
var StatsUpgrades
var DefenseTypesScorer

onInit(function(){
    WeaponScorer = new WeaponScorerController()
    DefenseScorer = new DefenseScorerController()
    SpecialScorer = new SpecialScorerController()
    FactoryScorer = new FactoryScorerController()
    ObjectsScorer = new ObjectsScorerController()
    EffectsScorer = new EffectsScorerController()
    AscensionScorer = new AscensionScorerController()
    StatsUpgrades = new StatsUpgradesController()
    DefenseTypesScorer = new DefenseTypesScorerController()

    // Assuming you have an array of objects
let objects = [
    ...WeaponScorer.getAll(),
    ...DefenseScorer.getAll(),
    ...SpecialScorer.getAll(),
    ...FactoryScorer.getAll(),
    ...ObjectsScorer.getAll(),
    ...EffectsScorer.getAll(true),
    ...AscensionScorer.getAll(true),
    ...StatsUpgrades.getAll(true),
    ...DefenseTypesScorer.getAll(true),
]
//let objects = WeaponScorer.getAll()

console.log(objects)

// Sort the objects by priority
objects.sort((a, b) => a[1] - b[1]);


// Create the table
let table = document.createElement('table');

// Create the table header
let thead = document.createElement('thead');
let headerRow = document.createElement('tr');
let headers = ['Object name', 'Score'];
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
    nameCell.textContent = object[0]
    row.appendChild(nameCell);
    let distanceCell = document.createElement('td');
    //console.log(object)
    distanceCell.textContent = object[1]
    row.appendChild(distanceCell);
    tbody.appendChild(row);
});
table.appendChild(tbody);

// Add the table to the document
document.body.appendChild(table);

})