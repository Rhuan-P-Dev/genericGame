import { ObjectsScorerController } from "../../scorers/objectsScorerController.js"
import { BuildObjectStatsController } from "./buildObjectStatsController.js"
import { MainShopMenuController } from "./mainShopMenuController.js"
import { ObjectGraphicController } from "./misc/objectGraphicController.js"
import { PermanentShopController } from "./permanentShopController.js"

var PermanentShop
var ObjectsScorer
var MainShopMenu
var BuildObjectStats

onInit(function(){

    PermanentShop = new PermanentShopController()
    ObjectsScorer = new ObjectsScorerController()
    MainShopMenu = new MainShopMenuController()
    BuildObjectStats = new BuildObjectStatsController()

})

export class BuyShipMenuController {

    buyShipMenu = document.getElementById("buyShipMenu")
    buyShipNameCostDisplay = document.getElementById("buyShipNameCostDisplay")
    buyShipMenuLeftButton = document.getElementById("buyShipMenuLeftButton")
    buyShipMenuRightButton = document.getElementById("buyShipMenuRightButton")
    shipInfoBox = document.getElementById("shipInfoBox")
    buyShipMenuDisplayPlayerCash = document.getElementById("buyShipMenuDisplayPlayerCash")
    backToMainMenuByBuyShipMenuButton = document.getElementById("backToMainMenuByBuyShipMenuButton")
    buyForObjectButton = document.getElementById("buyForObjectButton")

    init(){
        this.buyShipMenuLeftButton.addEventListener("click", () => {
            this.previous()
        })

        this.buyShipMenuRightButton.addEventListener("click", () => {
            this.next()
        })

        this.backToMainMenuByBuyShipMenuButton.addEventListener("click", () => {
            this.openMainShopMenu()
        })

        this.buyForObjectButton.addEventListener("click", () => {
            this.buyForObject()
        })

        this.ObjectGraphic = new ObjectGraphicController(
            BuildObjectStats.getGraphicID(),
            "buyShipDisplay",
            4
        )

        document.addEventListener("keydown", (event) => {
            if(this.buyShipMenu.style.display == "flex"){
                if (event.key === "ArrowLeft") {
                    this.previous()
                } else if (event.key === "ArrowRight") {
                    this.next()
                }
            }
        })


    }

    open(){
        this.buyShipMenu.style.display = "flex"

        BuildObjectStats.set(
            this.shipInfoBox,
            this.buyShipNameCostDisplay,
            this.buyShipMenuDisplayPlayerCash
        )

        BuildObjectStats.build()
    }

    close(){
        this.buyShipMenu.style.display = "none"
        BuildObjectStats.delete()
    }

    openMainShopMenu(){
        this.close()
        MainShopMenu.open()
    }

    next(){

        BuildObjectStats.next()
        this.ObjectGraphic.set(
            BuildObjectStats.getGraphicID(),
        )

    }

    previous(){

        BuildObjectStats.previous()
        this.ObjectGraphic.set(
            BuildObjectStats.getGraphicID(),
        )

    }

    buyForObject(){
        let object = BuildObjectStats.get()
        let cost = ObjectsScorer.getObjectCost(object)
        if (PermanentShop.getCash() >= cost){
            PermanentShop.addPlayerObject(object.constructor.name)
            PermanentShop.addCash(-cost)
            buyShipMenuDisplayPlayerCash.innerText = PermanentShop.getCash()
            BuildObjectStats.build()
        }
    }

}