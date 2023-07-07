
export class Rotable {

    frontLineMult = undefined
    xMult = undefined
    yMult = undefined
    stepMult = undefined
    xStepMult = undefined
    yStepMult = undefined
    xyMultLimit = undefined

    rightRotateOb = new obeserver()
    leftRotateOb = new obeserver()

    constructor(
        frontLineMult = 7,
        xMult = 0,
        yMult = 1,
        stepMult = 0.05,
        xStepMult = 0.05,
        yStepMult = 0.05,
        xyMultLimit = 1,
    ){

        this.typeOfObject = "Rotable"

        this.frontLineMult = frontLineMult
        this.xMult = xMult
        this.yMult = yMult
        this.stepMult = stepMult
        this.xStepMult = xStepMult
        this.yStepMult = yStepMult
        this.xyMultLimit = xyMultLimit
        
    }

    rotateToRight(){

        this.fixRotateRight()

        this.xMult -= this.xStepMult
        this.yMult -= this.yStepMult

        this.rightRotateOb.run()

    }

    rotateToLeft(){

        this.fixRotateLeft()

        this.xMult += this.xStepMult
        this.yMult += this.yStepMult

        this.leftRotateOb.run()

    }

    fixRotateRight(){

        if(this.xMult <= -this.xyMultLimit){
            this.xStepMult = -this.stepMult
        }else if(this.xMult >= this.xyMultLimit){
            this.xStepMult = this.stepMult
        }
    
        if(this.yMult <= -this.xyMultLimit){
            this.yStepMult = -this.stepMult
        }else if(this.yMult >= this.xyMultLimit){
            this.yStepMult = this.stepMult
        }

    }

    fixRotateLeft(){
        if(this.xMult <= -this.xyMultLimit){
            this.xStepMult = this.stepMult
        }else if(this.xMult >= this.xyMultLimit){
            this.xStepMult = -this.stepMult
        }
    
        if(this.yMult <= -this.xyMultLimit){
            this.yStepMult = this.stepMult
        }else if(this.yMult >= this.xyMultLimit){
            this.yStepMult = -this.stepMult
        }
    }

}