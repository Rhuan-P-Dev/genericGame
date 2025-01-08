import { WeaponsInfoController } from "../../../js/shipUnits/weapons/info/weaponsInfoController.js"
import { WeaponsModifiersController } from "../../../js/shipUnits/weapons/modifiers/weaponsModifiersController.js"
import { ScorerController } from "../../scorers/activates/scorerController.js"
import { BuildObjectStatsController } from "./buildObjectStatsController.js"
import { BuySellShopController } from "./buySellShopController.js"
import { MainShopMenuController } from "./mainShopMenuController.js"
import { ObjectGraphicController } from "./misc/objectGraphicController.js"
import { PermanentShopController } from "./permanentShopController.js"

var PermanentShop
var MainShopMenu
var Scorer
var WeaponsModifiers
var BuySellShop
var BuildObjectStats
var WeaponsInfo

onInit(function(){

    PermanentShop = new PermanentShopController()
    MainShopMenu = new MainShopMenuController()
    Scorer = new ScorerController()
    WeaponsModifiers = new WeaponsModifiersController()
    BuySellShop = new BuySellShopController()
    BuildObjectStats = new BuildObjectStatsController()
    WeaponsInfo = new WeaponsInfoController()

})

var currentObjectID

export class BuyWeaponsModsController {

    buyWeaponsMods = document.getElementById("buyWeaponsMods")
    buyWeaponsModsWeaponsBox = document.getElementById("buyWeaponsModsWeaponsBox")
    backToMainMenuByBuyWeaponsModsButton = document.getElementById("backToMainMenuByBuyWeaponsModsButton")
    buyWeaponsModsStore = document.getElementById("buyWeaponsModsStore")
    buyWeaponsModsOwnership = document.getElementById("buyWeaponsModsOwnership")

    buyWeaponsModsBuyTotalCostDisplay = document.getElementById("buyWeaponsModsBuyTotalCostDisplay")
    buyWeaponsModsCostDisplay = document.getElementById("buyWeaponsModsCostDisplay")
    buyWeaponsModsSellTotalCostDisplay = document.getElementById("buyWeaponsModsSellTotalCostDisplay")

    buyWeaponsModsInfoBox = document.getElementById("buyWeaponsModsInfoBox")

    init(){
        
        this.backToMainMenuByBuyWeaponsModsButton.addEventListener("click", () => {
            this.openMainShopMenu()
        })

    }

    setCurrentObjectID(ID){
        currentObjectID = ID
    }

    getCurrentObjectID(){
        return currentObjectID
    }

    loadWeapons(){

        if(!PermanentShop.getActivates(
            this.getCurrentObjectID(),
        )){return}

        buyWeaponsModsWeaponsBox.innerHTML = ""

        const weapons = PermanentShop.getActivates(
            this.getCurrentObjectID(),
        ).weapon

        for (let index = 0; index < weapons.length; index++) {

            const div = document.createElement("div")
            div.innerHTML = weapons[index]

            buyWeaponsModsWeaponsBox.appendChild(div)

            this.addWeaponTrigger(div, index)

        }

    }

    addWeaponTrigger(weaponDiv, index){

        weaponDiv.addEventListener("click", () => {

            const weaponScore = Scorer.get("weapon", weaponDiv.innerHTML)

            BuySellShop.init("weaponsMods", weaponScore, {
                "weaponIndex": index
            })

            this.currentWeaponIndex = index

            this.updateWeaponsInfo()

        })

    }

    updateWeaponsInfo(){

        const weaponName = PermanentShop.processActivates(
            this.getCurrentObjectID(),
        ).weapon[this.currentWeaponIndex]

        const weaponNameRaw = PermanentShop.getActivates(
            this.getCurrentObjectID(),
        ).weapon[this.currentWeaponIndex]

        BuildObjectStats.build(
            WeaponsInfo.build(weaponName),
            WeaponsInfo.build(weaponNameRaw),
            "weaponBuildTemplate",
        )

    }

    currentWeaponIndex = undefined

    open() {
        this.buyWeaponsMods.style.display = "flex"

        this.loadWeapons()

        new ObjectGraphicController(
            PermanentShop.getPlayerObject(
                this.getCurrentObjectID()
            ),
            "buyWeaponsModsDisplay",
            4
        )

        BuySellShop.set(
            this.getCurrentObjectID(),
            this.buyWeaponsModsCostDisplay,
            this.buyWeaponsModsStore,
            this.buyWeaponsModsOwnership,
            this.buyWeaponsModsBuyTotalCostDisplay,
            this.buyWeaponsModsSellTotalCostDisplay,
            [
                () => {

                    this.updateWeaponsInfo()

                }
            ]
        )

        BuildObjectStats.set(this.buyWeaponsModsInfoBox)

    }

    openMainShopMenu(){
        this.close()
        MainShopMenu.open()
    }

    close(){
        this.buyWeaponsMods.style.display = "none"
    }

}