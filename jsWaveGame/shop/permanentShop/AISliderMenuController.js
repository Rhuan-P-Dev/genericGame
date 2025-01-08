import { CoreAIBuilderController } from "../../../js/AI/advancedAI/coreAIBuilderController.js"
import { CoreAIController } from "../../../js/AI/advancedAI/coreAIController.js"
import { MainShopMenuController } from "./mainShopMenuController.js"
import { PermanentShopController } from "./permanentShopController.js"

var CoreAIBuilder
var MainShopMenu
var PermanentShop
var CoreAI

onInit(function(){

    CoreAIBuilder = new CoreAIBuilderController()
    MainShopMenu = new MainShopMenuController()
    PermanentShop = new PermanentShopController()
    CoreAI = new CoreAIController()

})

var currentObjectID

export class AISliderMenuController {

    AISliderMenu = document.getElementById("AISliderMenu")
    AISliderMenuContent = document.getElementById("AISliderMenuContent")
    AISliderMenuBackButton = document.getElementById("AISliderMenuBackButton")
    AISliderMenuNameDisplay = document.getElementById("AISliderMenuNameDisplay")
    AISliderMenuOnOffContent = document.getElementById("AISliderMenuOnOffContent")

    templateSlaider = `<div class="slider">
    <div class="up">
        <p>{{{slider name}}}</p>
    </div>
    <div class="mid">
        <div class="left">
            <p>0</p>
        </div>
        <div class="mid">
            <p>{{{current value}}}</p>
        </div>
        <div class="right">
            <p>3</p>
        </div>
    </div>
    <div class="down">
        <input type="range" class="sliderBar" min="0" max="3" step="0.01">
    </div>`

    init(){
        
        this.AISliderMenuBackButton.addEventListener("click", () => {
            this.openMainShopMenu()
        })

    }

    open() {
        this.updateDisplayName()
        this.AISliderMenu.style.display = "flex"
        this.addSliders()
        
        this.addAITypes()
    }

    close() {
        this.AISliderMenu.style.display = "none"
    }

    addSliders() {

        this.AISliderMenuContent.innerHTML = ""

        let sliderData = PermanentShop.getAllSliderValue(
            this.getCurrentObjectID()
        ) || {}

        for (const key in CoreAIBuilder.default) {

            if(typeof CoreAIBuilder.default[key] !== "number"){continue}

            let currentValue = sliderData[key] || CoreAIBuilder.default[key]

            let temp = this.templateSlaider
            temp = temp.replace("{{{slider name}}}", key)
            temp = temp.replace("{{{current value}}}", currentValue)

            this.AISliderMenuContent.insertAdjacentHTML(
                "beforeend",
                temp
            )

            let currentSlider = this.AISliderMenuContent.lastElementChild
            let currentSliderBar = currentSlider.querySelector(".sliderBar")

            currentSliderBar.value = currentValue

            currentSliderBar.addEventListener("input", (event) => {
                const currentValueElement = currentSlider.querySelector(".mid > .mid > p")
                currentValueElement.textContent = event.target.value

                PermanentShop.setSliderValue(
                    this.getCurrentObjectID(),
                    key,
                    parseFloat(event.target.value)
                )

            })

        }

    }

    AIOnOffTemplate = `<input type="button" class="permanentShopButton" value="{{{AI type}}}">`

    addAITypes() {

        this.AISliderMenuOnOffContent.innerHTML = ""

        const AITypes = CoreAI.getAllAITypes()

        for (let index = 0; index < AITypes.length; index++) {

            const AIType = AITypes[index]

            let temp = this.AIOnOffTemplate
            temp = temp.replace("{{{AI type}}}", AIType)

            this.AISliderMenuOnOffContent.insertAdjacentHTML(
                "beforeend",
                temp
            )

            let currentOnOffButton = this.AISliderMenuOnOffContent.lastElementChild

            currentOnOffButton.addEventListener("click", (event) => {
                this.toggleAIType(
                    AIType,
                )
            })

            this.toggleAIType(AIType, false)

        }

    }

    toggleAIType(AIType, convert = true) {
        const currentAIState = PermanentShop.getAITypeState(this.getCurrentObjectID(), AIType)

        let newAIState = currentAIState || false

        if(
            currentAIState !== undefined
            &&
            convert
        ){
            newAIState = currentAIState ? false : true
        }

        PermanentShop.setAITypeState(
            this.getCurrentObjectID(),
            AIType,
            newAIState
        )

        const currentOnOffButton = this.AISliderMenuOnOffContent.querySelector(`input[value="${AIType}"]`)

        if (newAIState) {
            currentOnOffButton.classList.add("onOffButton")
        } else {
            currentOnOffButton.classList.remove("onOffButton")
        }
    }

    openMainShopMenu() {
        MainShopMenu.open()
        this.close()
    }

    updateDisplayName() {
        this.AISliderMenuNameDisplay.textContent = PermanentShop.getPlayerObject(
            this.getCurrentObjectID()
        )
    }

    setCurrentObjectID(ID){
        currentObjectID = ID
    }

    getCurrentObjectID(){
        return currentObjectID
    }
}
