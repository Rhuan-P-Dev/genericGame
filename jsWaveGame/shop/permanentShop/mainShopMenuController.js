import { GameStateController } from "../../../js/gameState/gameStateController.js"
import { WaveController } from "../../wave/waveController.js"
import { AISliderMenuController } from "./AISliderMenuController.js"
import { BuyForObjectController } from "./buyForObjectController.js"
import { BuyShipMenuController } from "./buyShipMenuController.js"
import { BuyWeaponsModsController } from "./buyWeaponsModsController.js"
import { ObjectGraphicController } from "./misc/objectGraphicController.js"
import { PermanentShopController } from "./permanentShopController.js"

var PermanentShop
var BuyShipMenu
var BuyForObject
var GameState
var AISliderMenu
var Wave
var BuyWeaponsMods

onInit(function(){

    PermanentShop = new PermanentShopController()
    BuyShipMenu = new BuyShipMenuController()
    BuyForObject = new BuyForObjectController()
    GameState = new GameStateController()
    AISliderMenu = new AISliderMenuController()
    Wave = new WaveController()
    BuyWeaponsMods = new BuyWeaponsModsController()

})

var selectedBuyShipMenuObject = false

export class MainShopMenuController {

    startGameButton = document.getElementById("startGameButton")
    addShipButton = document.getElementById("addShipButton")
    mainShopMenu = document.getElementById("mainShopMenu")
    buyShipMenuObjects = document.getElementById("buyShipMenuObjects")
    mainShopMenuDisplayPlayerCash = document.getElementById("mainShopMenuDisplayPlayerCash")
    mainShopMenuBuyForObjectButton = document.getElementById("mainShopMenuBuyForObjectButton")
    mainShopMenuAISliderMenuButton = document.getElementById("mainShopMenuAISliderMenuButton")
    mainShopMenuBuyModsButton = document.getElementById("mainShopMenuBuyModsButton")

    init(){

        this.initMainShopMenu()

        this.startGameButton.addEventListener("click", () => {
            this.startGame()
        })

        this.addShipButton.addEventListener("click", () => {
            this.openBuyShipMenu()
        })

        this.mainShopMenuBuyForObjectButton.addEventListener("click", () => {
            this.openBuyForObject()
        })

        this.mainShopMenuAISliderMenuButton.addEventListener("click", () => {
            this.openAISliderMenu()
        })

        this.mainShopMenuBuyModsButton.addEventListener("click", () => {
            this.openBuyWeaponsModsMenu()
        })

        this.updateCashDisplay()

        document.addEventListener("keydown", (event) => {
            if (event.key === "Delete" && selectedBuyShipMenuObject) {
                this.deleteSelectedShipObject()
            }
        })

    }

    initMainShopMenu(){

        let nodes = this.buyShipMenuObjects.childNodes
        let nodeNumber = nodes.length-1

        for (let index = nodeNumber; index > 1; index--) {

            this.buyShipMenuObjects.removeChild(nodes[index])

        }

        this.loadObjects()

        this.addPlayerObjectsInit()


    }

    selectFirstObject() {
        let objectsNodes = this.buyShipMenuObjects.childNodes
        if (objectsNodes.length >= 3) {
            let firstObject = objectsNodes[2]
            if (firstObject.hasAttribute("unitid")) {
                this.handleBuyShipMenuObjectsClick(firstObject.childNodes[0])
            }
        }
    }

    addPlayerObjectsInit(){

        let nodes = this.buyShipMenuObjects.childNodes
        let nodeNumber = nodes.length-1

        for (let index = nodeNumber; index > 1; index--) {

            nodes[index].addEventListener("click", (event) => {
                this.handleBuyShipMenuObjectsClick(event.target)
            })

        }

    }

    handleBuyShipMenuObjectsClick(node) {
        if (selectedBuyShipMenuObject) {
            if (selectedBuyShipMenuObject === node) {
                selectedBuyShipMenuObject.style.borderColor = ""
                selectedBuyShipMenuObject = false
                PermanentShop.setIDPlayerObject(false)
            } else {
                selectedBuyShipMenuObject.style.borderColor = ""
                node.style.borderColor = "green"
                selectedBuyShipMenuObject = node
                PermanentShop.setIDPlayerObject(
                    node.getAttribute("unitid")
                )
            }
        } else {
            node.style.borderColor = "green"
            selectedBuyShipMenuObject = node
            PermanentShop.setIDPlayerObject(
                node.getAttribute("unitid")
            )
        }
    }

    loadObjects(){

        let objects = PermanentShop.getPlayerObjects()

        for (let ID in objects) {

            let div = document.createElement("div")
            div.setAttribute("unitid", ID)

            let canvas = document.createElement("canvas")
            canvas.setAttribute("unitid", ID)

            let canvasID = "canvas_" + randomUniqueID()

            canvas.id = canvasID

            div.appendChild(canvas)

            this.buyShipMenuObjects.appendChild(div)

            new ObjectGraphicController(
                objects[ID],
                canvasID
            )

        }

    }

    close(){
        this.mainShopMenu.style.display = "none"
    }

    updateCashDisplay(){
        this.mainShopMenuDisplayPlayerCash.innerHTML = numberToCash(PermanentShop.getCash())
    }

    open(){
        this.initMainShopMenu()
        this.updateCashDisplay()
        this.mainShopMenu.style.display = "flex"
    }

    startGame(){
        GameState.restart()
        Wave.start()
        PermanentShop.close()
        PermanentShop.spawnUnits()
    }

    openBuyShipMenu(){
        BuyShipMenu.open()
        this.close()
    }

    openBuyForObject(){
        BuyForObject.setCurrentObjectID(selectedBuyShipMenuObject.getAttribute("unitid"))
        BuyForObject.open()
        this.close()
    }

    openAISliderMenu(){
        AISliderMenu.setCurrentObjectID(selectedBuyShipMenuObject.getAttribute("unitid"))
        AISliderMenu.open()
        this.close()
    }

    openBuyWeaponsModsMenu(){
        BuyWeaponsMods.setCurrentObjectID(selectedBuyShipMenuObject.getAttribute("unitid"))
        BuyWeaponsMods.open()
        this.close()
    }

    deleteSelectedShipObject() {
        if (selectedBuyShipMenuObject) {
            let ID = selectedBuyShipMenuObject.getAttribute("unitid")
            PermanentShop.sellAll(ID)
            PermanentShop.sellObject(ID)
            this.initMainShopMenu()
            this.updateCashDisplay()
            selectedBuyShipMenuObject = false
        }
    }

}