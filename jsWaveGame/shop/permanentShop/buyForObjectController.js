import { BuildObjectStatsController } from "./buildObjectStatsController.js"
import { BuySellShopController } from "./buySellShopController.js"
import { MainShopMenuController } from "./mainShopMenuController.js"
import { ObjectGraphicController } from "./misc/objectGraphicController.js"
import { PermanentShopController } from "./permanentShopController.js"

var PermanentShop
var MainShopMenu
var BuySellShop
var BuildObjectStats

onInit(function(){

    PermanentShop = new PermanentShopController()
    MainShopMenu = new MainShopMenuController()
    BuySellShop = new BuySellShopController()
    BuildObjectStats = new BuildObjectStatsController()

})

var currentObjectID

export class BuyForObjectController {

    buyForObject = document.getElementById("buyForObject")
    buyForObjectCostDisplay = document.getElementById("buyForObjectCostDisplay")
    backToMainMenuByBuyForObjectButton = document.getElementById("backToMainMenuByBuyForObjectButton")
    buyForObjectWeaponsButton = document.getElementById("buyForObjectWeaponsButton")
    buyForObjectDefenseButton = document.getElementById("buyForObjectDefenseButton")
    buyForObjectFactoryButton = document.getElementById("buyForObjectFactoryButton")
    buyForObjectSpecialButton = document.getElementById("buyForObjectSpecialButton")
    buyForObjectStatsButton = document.getElementById("buyForObjectStatsButton")
    buyForObjectDefenseTypeButton = document.getElementById("buyForObjectDefenseTypeButton")
    buyForObjectAscensionsButton = document.getElementById("buyForObjectAscensionsButton")
    buyForObjectEffectsButton = document.getElementById("buyForObjectEffectsButton")
    buyForObjectApplyEffectsButton = document.getElementById("buyForObjectApplyEffectsButton")

    buyForObjectBuyTotalCostDisplay = document.getElementById("buyForObjectBuyTotalCostDisplay")
    buyForObjectSellTotalCostDisplay = document.getElementById("buyForObjectSellTotalCostDisplay")

    buyForObjectStore = document.getElementById("buyForObjectStore")
    buyForObjectOwnership = document.getElementById("buyForObjectOwnership")

    buyForObjectShipInfoBox = document.getElementById("buyForObjectShipInfoBox")

    buyForObjectDisplay = document.getElementById("buyForObjectDisplay")

    init(){

        this.backToMainMenuByBuyForObjectButton.addEventListener("click", () => {
            this.openMainShopMenu()
        })

        this.buyForObjectWeaponsButton.addEventListener("click", () => {

            BuySellShop.init("weapon")

        })

        this.buyForObjectDefenseButton.addEventListener("click", () => {

            BuySellShop.init("defense")

        })

        this.buyForObjectFactoryButton.addEventListener("click", () => {

            BuySellShop.init("factory")

        })

        this.buyForObjectSpecialButton.addEventListener("click", () => {

            BuySellShop.init("special")

        })

        this.buyForObjectStatsButton.addEventListener("click", () => {

            BuySellShop.init("statsUpgrades")

        })

        this.buyForObjectDefenseTypeButton.addEventListener("click", () => {

            BuySellShop.init("defenseTypes")

        })

        this.buyForObjectAscensionsButton.addEventListener("click", () => {

            BuySellShop.init("ascensions")

        })

        this.buyForObjectEffectsButton.addEventListener("click", () => {

            BuySellShop.init("effects")

        })

        this.buyForObjectApplyEffectsButton.addEventListener("click", () => {

            BuySellShop.init("applyEffects", 3)

        })

    }

    openMainShopMenu(){
        this.close()
        MainShopMenu.open()
    }

    open(){
        this.buyForObject.style.display = "flex"

        BuildObjectStats.set(
            this.buyForObjectShipInfoBox,
        )

        BuildObjectStats.setObject(
            PermanentShop.getPlayerObject(this.getCurrentObjectID())
        )

        BuildObjectStats.build(
            PermanentShop.getSpawnUnit(
                this.getCurrentObjectID()
            ),
            BuildObjectStats.get()
        )

        BuySellShop.set(
            this.getCurrentObjectID(),
            this.buyForObjectCostDisplay,
            this.buyForObjectStore,
            this.buyForObjectOwnership,
            this.buyForObjectBuyTotalCostDisplay,
            this.buyForObjectSellTotalCostDisplay,
            [
                () => {

                    BuildObjectStats.build(
                        PermanentShop.getSpawnUnit(
                            this.getCurrentObjectID()
                        ),
                        BuildObjectStats.get()
                    )

                }
            ]
        )

        new ObjectGraphicController(
            PermanentShop.getPlayerObject(
                this.getCurrentObjectID()
            ),
            "buyForObjectDisplay",
            4
        )

    }

    close(){
        this.buyForObject.style.display = "none"
    }

    setCurrentObjectID(ID){
        currentObjectID = ID
    }

    getCurrentObjectID(){
        return currentObjectID
    }

}