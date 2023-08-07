
export class Rotable {

    frontLineMult = 7
    xMult = 0
    yMult = 1
    stepMult = 0.05
    xStepMult = 0.05
    yStepMult = 0.05
    xyMultLimit = 1

    rightRotateOb = new Obeserver()
    leftRotateOb = new Obeserver()

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