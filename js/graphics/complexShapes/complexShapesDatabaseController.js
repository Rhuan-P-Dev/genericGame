
import { CloneObjectController } from "../../generalUtils/cloneObject.js"

var CloneObject = ""

onInit(function(){

    CloneObject = new CloneObjectController()

})

export class ComplexShapesDatabaseController {

    database = {

        //"ship? - P1": [{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"positions":[[5,6],[0,9.5],[-4.5,6],[-4.5,-7],[5,-7]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#616161","lineWidth":"1","fill":true,"x":0,"y":5,"radius":"3","startAngle":"0.51","endAngle":"-3.66"},"functionName":"drawArc"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":5,"y":0,"radius":"5","startAngle":"4.71","endAngle":"1.58"},"functionName":"drawArc"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":-4.5,"y":0,"radius":"5","startAngle":"-4.73","endAngle":"-1.56"},"functionName":"drawArc"}],
        //"ship? - P2": [{"functionName":"drawLine","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"positions":[[5,6],[0,9.5],[-4.5,6],[-4.5,-7],[5,-7]]}},{"functionName":"drawArc","params":{"scale":true,"objectColor":false,"color":"#ffffff","lineWidth":"1","fill":true,"x":0,"y":5,"radius":"3","startAngle":"0.51","endAngle":"-3.66"}},{"functionName":"drawArc","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":5,"y":0,"radius":"5","startAngle":"4.71","endAngle":"1.58"}},{"functionName":"drawArc","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":-4.5,"y":0,"radius":"5","startAngle":"-4.73","endAngle":"-1.56"}},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"1","fill":false,"positions":[[-2.5,6.5],[-2.5,6.5],[-2.5,6.5],[-3,6.5],[-3,6.5],[3,6.5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"1","fill":false,"x":0,"y":5,"radius":"3","startAngle":"0.52","endAngle":"-3.66"},"functionName":"drawArc"}],
        //"ship? - P3": [{"functionName":"drawLine","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"positions":[[5,6],[0,9.5],[-4.5,6],[-4.5,-7],[5,-7]]}},{"functionName":"drawArc","params":{"scale":true,"objectColor":false,"color":"#ffffff","lineWidth":"1","fill":true,"x":0,"y":5,"radius":"3","startAngle":"0.51","endAngle":"-3.66"}},{"functionName":"drawArc","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":5,"y":0,"radius":"5","startAngle":"4.71","endAngle":"1.58"}},{"functionName":"drawArc","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":-4.5,"y":0,"radius":"5","startAngle":"-4.73","endAngle":"-1.56"}},{"functionName":"drawLine","params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"1","fill":false,"positions":[[-2.5,6.5],[-2.5,6.5],[-2.5,6.5],[-3,6.5],[-3,6.5],[3,6.5]]}},{"functionName":"drawArc","params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"1","fill":false,"x":0,"y":5,"radius":"3","startAngle":"0.52","endAngle":"-3.66"}},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"2","fill":false,"positions":[[5,-7],[5,-7],[5,6],[0,9.5],[-4.5,6],[-4.5,-7],[5,-7]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#eba000","lineWidth":"1","fill":true,"x":7,"y":0,"radius":"1.5"},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#ff6600","lineWidth":"1","fill":true,"x":6.5,"y":-3,"radius":"0.25"},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#ffdd00","lineWidth":"1","fill":true,"x":8,"y":-2,"radius":"0.50"},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#ffa200","lineWidth":"1","fill":true,"x":5.5,"y":2.5,"radius":"0.25"},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#ff8800","lineWidth":"1","fill":true,"x":7.5,"y":2.5,"radius":"0.8"},"functionName":"drawCircle"}],
        //"ship? - P4": [{"functionName":"drawLine","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"positions":[[5,6],[0,9.5],[-4.5,6],[-4.5,-7],[5,-7]]}},{"functionName":"drawArc","params":{"scale":true,"objectColor":false,"color":"#ffffff","lineWidth":"1","fill":true,"x":0,"y":5,"radius":"3","startAngle":"0.51","endAngle":"-3.66"}},{"functionName":"drawArc","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":5,"y":0,"radius":"5","startAngle":"4.71","endAngle":"1.58"}},{"functionName":"drawArc","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":-4.5,"y":0,"radius":"5","startAngle":"-4.73","endAngle":"-1.56"}},{"functionName":"drawLine","params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"1","fill":false,"positions":[[-2.5,6.5],[-2.5,6.5],[-2.5,6.5],[-3,6.5],[-3,6.5],[3,6.5]]}},{"functionName":"drawArc","params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"1","fill":false,"x":0,"y":5,"radius":"3","startAngle":"0.52","endAngle":"-3.66"}},{"functionName":"drawLine","params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"2","fill":false,"positions":[[5,-7],[5,-7],[5,6],[0,9.5],[-4.5,6],[-4.5,-7],[5,-7]]}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#eba000","lineWidth":"1","fill":true,"x":7,"y":0,"radius":"1.5"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#ff6600","lineWidth":"1","fill":true,"x":6.5,"y":-3,"radius":"0.25"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#ffdd00","lineWidth":"1","fill":true,"x":8,"y":-2,"radius":"0.50"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#ffa200","lineWidth":"1","fill":true,"x":5.5,"y":2.5,"radius":"0.25"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#ff8800","lineWidth":"1","fill":true,"x":7.5,"y":2.5,"radius":"0.8"}},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":"2","fill":false,"positions":[[-4.5,6],[-4.5,6],[5,6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#230057","lineWidth":1,"fill":true,"positions":[[-7,3],[-7,-0.5],[-7,-0.5],[-7.5,-0.5],[-7.5,-1],[-8,-1],[-8,-1.5],[-8,-1.5],[-7,-1.5],[-7,-1.5],[-7,-1],[-6.5,-1],[-6.5,-0.5],[-6.5,1],[-6.5,1],[-7,1],[-7,1.5],[-7,1.5],[-7,1],[-7.5,1],[-7.5,0.5],[-7.5,0.5],[-8.5,0.5],[-8.5,0],[-8.5,1],[-8,1],[-8,1.5],[-8,1.5],[-7.5,1.5],[-7.5,2],[-7,2],[-7,2.5],[-7,2.5],[-6,2.5],[-6,2.5],[-5.5,2.5],[-5.5,2.5],[-5.5,2.5],[-5.5,2.5],[-5.5,2],[-5.5,2],[-5.5,1.5],[-5.5,1.5],[-6,1.5],[-6,2],[-6,2],[-5.5,2],[-5.5,1.5],[-5.5,1.5],[-5.5,1],[-5.5,1],[-5.5,0],[-5.5,0],[-6,0],[-6,-0.5],[-5,-0.5],[-5,-0.5],[-5,0],[-5,0],[-5,1],[-5,2],[-5,2],[-5.5,2],[-5.5,2.5],[-5.5,2.5],[-5.5,2.5],[-5.5,2.5],[-5.5,3],[-6,3],[-6,3.5],[-6.5,3.5],[-6.5,4],[-6.5,4],[-6.5,3.5],[-6.5,3.5],[-7,3.5],[-7,3.5],[-7.5,3.5],[-7.5,3],[-7.5,3],[-7.5,2.5],[-8,2.5],[-8,2],[-8,2],[-8.5,2],[-8.5,1.5],[-8.5,1.5],[-9,1.5],[-9,1],[-9,1],[-8.5,0],[-9,0],[-9,-0.5],[-8.5,-0.5],[-8.5,-1],[-8.5,-1],[-8.5,-1.5],[-8.5,-1.5],[-8,-1.5],[-8,-2],[-7.5,-2],[-7.5,-2.5],[-6.5,-2.5],[-6.5,-2.5],[-6.5,-2],[-6.5,-2],[-6,-2],[-5,-2],[-5,-2],[-5,-1.5],[-5,-1.5],[-5,-1.5],[-5,-1.5],[-5,-2.5],[-5,-1],[-5,-3.5],[-5.5,-3.5],[-5.5,-4],[-5.5,-4],[-6,-4],[-6,-4],[-6.5,-4],[-7.5,-4],[-7.5,-4],[-7.5,-3.5],[-7.5,-3.5],[-8,-3.5],[-8,-3],[-8,-3],[-8,-2.5],[-8.5,-2.5],[-8.5,-2],[-8.5,-2],[-8.5,-1.5],[-8.5,-1.5],[-9,-1.5],[-9,-1],[-9,-1],[-9,-0.5],[-9,1],[-9,0],[-9,1],[-9.5,1],[-9,1],[-9,1.5],[-9,1.5],[-9,1.5],[-9,1.5],[-8.5,1.5],[-8.5,2],[-8.5,2],[-8.5,3],[-7.5,3],[-7.5,3],[-7.5,3.5],[-6.5,3.5],[-6.5,3.5],[-6.5,4],[-6.5,4],[-5.5,4],[-5.5,4],[-5.5,3.5],[-5.5,3.5],[-5.5,3],[-5.5,3],[-5.5,2.5],[-5.5,2.5],[-5.5,3]]},"functionName":"drawLine"}],
        //"stranger - P1": [{"functionName":"drawLine","params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"positions":[[3.5,-9.5],[3.5,-9.5],[3.5,8.5],[3.5,8.5],[3.5,8.5],[-3.5,8.5],[-3.5,8.5],[-3.5,-9.5]]}},{"functionName":"drawArc","params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":"2","fill":true,"x":0,"y":8.5,"radius":"3.49","startAngle":"-0.04","endAngle":"3.17"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":0,"y":10,"radius":"1"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#cc8b00","lineWidth":1,"fill":true,"x":2,"y":5,"radius":"0.5"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#ff7300","lineWidth":"1","fill":true,"x":-0.5,"y":-3,"radius":"1.12"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#f08000","lineWidth":"1","fill":true,"x":2,"y":-5.5,"radius":"0.8"}}],
        //"stranger - P2": [{"functionName":"drawLine","params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"positions":[[3.5,-9.5],[3.5,-9.5],[3.5,8.5],[3.5,8.5],[3.5,8.5],[-3.5,8.5],[-3.5,8.5],[-3.5,-9.5]]}},{"functionName":"drawArc","params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":"2","fill":true,"x":0,"y":8.5,"radius":"3.49","startAngle":"-0.04","endAngle":"3.17"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":"1","fill":true,"x":0,"y":10,"radius":"1"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#cc8b00","lineWidth":1,"fill":true,"x":2,"y":5,"radius":"0.5"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#ff7300","lineWidth":"1","fill":true,"x":-0.5,"y":-3,"radius":"1.12"}},{"functionName":"drawCircle","params":{"scale":true,"objectColor":false,"color":"#f08000","lineWidth":"1","fill":true,"x":2,"y":-5.5,"radius":"0.8"}},{"params":{"scale":true,"objectColor":false,"color":"#8300b3","lineWidth":1,"fill":true,"positions":[[-1.5,-7],[-0.5,-7],[-0.5,-7],[-0.5,-7.5],[0,-7.5],[0,-8],[1,-8],[1,-8],[1,-7.5],[0,-7.5],[0,-7.5],[0,-7],[-0.5,-7],[-0.5,-6.5],[-1,-6.5],[-1,-6],[-2.5,-6],[-2.5,-6],[-0.5,-5],[1,-5],[1,-5],[1,-4.5],[1.5,-4.5],[1.5,-4],[1.5,-4],[1.5,-2.5],[1.5,-2.5],[1.5,-1.5],[1.5,0],[1.5,0],[1,0],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0],[-2,0],[-2,0],[-2,0.5],[-2,0.5],[-2,-1],[-2,-1],[-2.5,-1],[-2.5,-1.5],[-2.5,-1.5],[0.5,-1.5],[0.5,-1.5],[1,-1.5],[1,-1.5],[1,-1.5],[-1,-1.5],[-1,-1.5],[-1,-2],[-2,-2],[-2,-2],[-2,-1.5],[-2,-1.5],[-2,-1],[-2.5,-1],[-2.5,-0.5],[-1.5,-0.5],[-1.5,-0.5],[-1.5,0],[-1,0],[-1,0.5],[-0.5,0.5],[-0.5,1],[-0.5,1],[0,1],[0,0.5],[0.5,0.5],[0.5,0],[1.5,0],[1.5,0],[1.5,-0.5],[2,-0.5],[2,-1],[2,-2.5],[2,-2.5],[2.5,-2.5],[2.5,-3],[3,-3],[3,-3.5],[3,-3.5],[3,-3.5],[3,-3.5],[2,-3.5],[2,-4],[1.5,-4],[1.5,-4.5],[1.5,-4.5],[2.5,-4.5],[2.5,-4.5],[2.5,-4.5],[3,-5],[3,-5.5],[3,-5.5],[3,-7],[2,-7],[2,-7],[2,-6.5],[1,-6.5],[1,-6.5],[1,-6],[1,-6],[0.5,-6],[0.5,-5.5],[0.5,-5.5],[0.5,-5],[0.5,-5],[0.5,-5],[0.5,-5],[0.5,-5.5],[1,-5.5],[1,-6],[1,-6],[1,-6.5],[1.5,-6.5],[1.5,-7],[1.5,-7],[2.5,-7],[2.5,-7],[3,-7],[3,-6.5],[3.5,-6.5],[3.5,-6],[3.5,-6],[3.5,-5.5],[3,-5.5],[3,-5],[3,-4],[2,-4],[2,-4.5],[2,-4.5],[1,-4.5],[1,-4.5],[-0.5,-4.5],[-0.5,-4.5],[-1,-4.5],[-1,-4.5],[-1.5,-4.5],[-1.5,-4],[-1.5,-4],[-2,-4],[-2,-4],[-2.5,-4],[-2.5,-3.5],[-2.5,-3.5],[-3,-3.5],[-3,-3],[-3,-2],[-3,-2],[-2.5,-2],[-2.5,-1.5],[-2.5,-1.5],[-2.5,1],[-1.5,1],[-1.5,1],[-1.5,1.5],[1,1.5],[1,1.5],[1,2],[1,2],[2,2],[2,2],[2,2],[-0.5,2],[-0.5,2],[-0.5,2.5],[-1,2.5],[-1,3],[-1,3],[-0.5,3],[-0.5,3.5],[-0.5,3.5],[-0.5,3],[-1,3],[-1,2.5],[0,2.5],[0,2.5],[0,2],[0.5,2],[0.5,1.5],[0.5,1.5],[1.5,1.5],[1.5,2.5],[1.5,2.5],[2,2.5],[2,3],[2,3],[2,3.5],[2.5,3.5],[2.5,4],[2.5,4],[3,4],[3,4.5],[3,6.5],[3,6.5],[2.5,6.5],[2.5,7],[2,7],[2,7.5],[1,7.5],[1,7.5],[1,7],[0.5,7],[0.5,6.5],[0.5,6.5],[0,6.5],[0,6],[-0.5,6],[-0.5,5.5],[-0.5,5.5],[-0.5,5],[-1,5],[-1,4.5],[-1,4.5],[0.5,4.5],[0.5,4.5],[0.5,4.5],[0.5,4.5],[0.5,4],[0,4],[0,3.5],[-0.5,3.5],[-0.5,3],[-1,3],[-1,2.5],[-1,2.5],[-1.5,2.5],[-1.5,3],[-1.5,3],[-1.5,5.5],[-1.5,5.5],[-1,5.5],[-1,6],[-0.5,6],[-0.5,6.5],[1,6.5],[1,6.5],[1,7],[1,7],[1,7.5],[1.5,7.5],[1.5,8],[1.5,8],[2.5,8],[2.5,8],[2.5,7.5],[3,7.5],[3,7],[3,7],[3,6.5],[3,6.5],[3,5],[3,5],[3,3.5],[3,3.5],[3,2.5],[3,2.5],[2,2.5],[2,2.5],[2,1.5],[-1,1.5],[-1,1.5],[-1,2],[-1,2],[-2,2],[-2,2],[-2.5,2],[-2.5,1.5],[-2.5,1.5],[-3,1.5],[-3,1],[-3,1],[-3,0],[-3,0],[-3,-1.5],[-3,-1.5],[-3,-3],[-3,-3],[-3,-6.5],[-3,-6.5],[-3,-7.5],[-3,-6.5],[-3,-6.5],[-2.5,-6.5],[-2.5,-6],[-2.5,-6],[-1.5,-6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#ff5900","lineWidth":"1","fill":true,"x":-2.5,"y":4.5,"radius":"0.5"},"functionName":"drawCircle"}],
    
        "missile": [{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[1.25,-6.75],[1.25,-6.75],[1.25,-6.75],[1.25,6],[1.25,6],[1.25,6],[-1.25,6],[-1.25,6],[-1.25,-6.75]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[1.25,6],[0,9.5],[-1.25,6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[1.25,-6.25],[1.25,-6.25],[3,-6.25],[1.25,-4.5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#fff700","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[1,-6.75],[1,-6.75],[1,-6.75],[1,-6.75],[1,-8.25],[1,-8.25],[1,-8.25],[0.25,-8.25],[0.25,-8.25],[0.25,-6.75]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[0.5,-4],[0.5,-4],[0.5,4.5],[0.5,4.5],[-0.5,4.5],[-0.5,4.5],[-0.5,4.5],[-0.5,-5.5],[-0.5,-5.5],[0.5,-5.5],[0.5,-5.25]]},"functionName":"drawLine"}],
        "drone v1": [{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[0,-7.75],[3.75,-1.25],[9,-1.25],[7.75,1.25],[3.75,1.25],[0,7.75]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[0,-6.5],[3.25,0],[0,6.5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"x":6.5,"y":0,"radius":0.65},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":1.75,"radius":1.5,"startAngle":0.72,"endAngle":-3.88},"functionName":"drawArc"}],
        "drone v2": [{"params":{"reference":"drone v1","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0}},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"x":-4.75,"y":0,"radius":0.65},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[0.5,-6.5],[0.5,-6.5],[0.5,-6.5],[0.5,-6.5],[0.5,-9],[0.5,-9],[-0.5,-9],[-0.5,-9],[-0.5,-6.75],[-0.25,-6.75]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#bd9d00","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[0.5,-9],[0,-10.75],[-0.5,-9]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[0.5,-7.5],[0.5,-7.5],[2,-7.5],[2.5,-8],[2.5,-8],[0.5,-8]]},"functionName":"drawLine"}],
        "big drone": [{"params":{"reference":"drone v2","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0.3}},{"params":{"scale":true,"objectColor":false,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"x":1.5,"y":1.5,"radius":1,"startAngle":0.42,"endAngle":2.73},"functionName":"drawArc"},{"params":{"scale":true,"objectColor":false,"color":"#636363","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":-1,"radius":1.6},"functionName":"drawCircle"}],
        "factory": [{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[6,6],[6,6],[6,-6],[6,-6],[-6,-6],[-6,-6],[-6,6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":true,"positions":[[-3,-3],[-3,-3],[-3,-4],[-3,-4],[-2.5,-4],[-2.5,-4],[-2.5,-3],[-2.5,-3],[-2,-3],[-2,-3],[-2,-4],[-2,-4],[-2,-4],[-1,-4],[-1,-3],[-1,-3],[0,-3],[0,-3],[0,-4],[0,-4],[1,-4],[1,-4],[1,-3],[1,-3],[2,-3],[2,-3],[2,-4],[2,-4],[3,-4],[3,-4],[3,-3],[3,-3],[4,-3],[4,-3]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":true,"positions":[[3,-3],[3,-3],[4,-3],[4,-3],[4,-2],[4,-2],[3,-2],[3,-2],[3,-1],[3,-1],[4,-1],[4,-1],[4,0],[4,0],[3,0],[3,0],[3,1],[3,1],[4,1],[4,1],[4,2],[4,2],[3,2],[3,2],[3,2.5],[3,2.5],[4,2.5],[4,2.5],[4,3],[4,3],[4,3],[3,3],[3,2.75]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[-3,-3],[-3,-3],[3,-3],[3,-3],[3,3],[3,3],[-3,3]]},"functionName":"drawLine"}],
        "armored factory": [{"params":{"scale":true,"objectColor":false,"color":"#5c5c5c","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[-6,-6],[-5.5,-6.5],[-5,-6],[-4.5,-6.5],[-4,-6],[-3.5,-6.5],[-3,-6],[-2.5,-6.5],[-2,-6],[-1.5,-6.5],[-1,-6],[-0.5,-6.5],[0,-6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#5c5c5c","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[6,-6],[6.5,-5.5],[6,-5],[6.5,-4.5],[6,-4],[6.5,-3.5],[6,-3],[6.5,-2.5],[6,-2],[6.5,-1.5],[6,-1],[6.5,-0.5],[6,0]]},"functionName":"drawLine"},{"params":{"reference":"factory","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0}},{"params":{"scale":true,"objectColor":false,"color":"#5c5c5c","lineWidth":1,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[-5,-6],[-5,-6],[-5,-6],[-5,-6],[-5,-6],[-5,-6],[-5,-6],[-5,-6],[-5,-6],[-5,-6],[-5,0]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#5c5c5c","lineWidth":1,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[-6,-5],[-6,-5],[-6,-5],[-6,-5],[0,-5]]},"functionName":"drawLine"}],
        "rotable stationary object": [{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[-5,-5],[-5,-5],[5,-5],[5,5],[-5,5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#e1ff00","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[-4.5,-5],[-6,-6],[-6,-6],[-5,-4.5],[-5,-5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":0.5,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[-5,-5],[-6,-6]]},"functionName":"drawLine"}],
        "sock base": [{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[-5,-4.5],[-3.5,-3.5],[-4.5,-5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[-3.5,-3.5],[-5,-5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[-3.5,-3.5],[-3.5,-3.5],[-3.5,-3.5],[3.5,-3.5],[3.5,-3.5],[3.5,-3.5],[3.5,3.5],[3.5,3.5],[-3.5,3.5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#a3a3a3","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":1},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#a3a3a3","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":3},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#a3a3a3","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":5},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#a3a3a3","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[0,-5],[0,-5],[0,5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#a3a3a3","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":true,"xyMirror":false,"positions":[[-5,0],[-5,0],[5,0]]},"functionName":"drawLine"}],
        "turret": [{"params":{"reference":"rotable stationary object","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0}},{"params":{"reference":"sock base","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0}}],
        "generic turret": [{"params":{"reference":"turret","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0}},{"params":{"reference":"generic turret head","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0}}],
        "generic turret head":[{"params":{"scale":true,"objectColor":false,"color":"#707070","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[0,-2],[0,-2],[-2,-2],[-2,-2],[-2,2],[-2,2],[-0.5,2],[-0.5,2],[-0.5,5.25],[-0.5,5.25],[-0.5,10],[-0.5,10],[0,10]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[2,-2],[0,0]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":1},"functionName":"drawCircle"}],
        "ship": [{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[3.5,-6],[3.5,-6],[6,-6],[3.5,9.75],[3.5,9.75],[3.5,9.75],[3.5,9.75],[3.5,10],[3.5,10],[3.5,10],[0,10],[0,10],[0,-6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#fff700","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[3.5,-6],[3.5,-6],[3.5,-6.5],[3.5,-6.5],[3.5,-6.5],[-3.5,-6.5],[-3.5,-6.5],[-3.5,-6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":2},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[2.5,-6],[2.5,-6],[2.5,0],[2.5,0],[2.5,0],[2,0]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[0,1.75],[0,1.75],[0,6],[0,6],[3,6],[3,6],[-2.75,6],[-2.75,6],[-3,6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":5.5,"radius":3,"startAngle":0.18,"endAngle":2.96},"functionName":"drawArc"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":5.5,"radius":3,"startAngle":0.18,"endAngle":2.96},"functionName":"drawArc"}],
        "bullet": [{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":8},"functionName":"drawCircle"}],
        "explosive bullet": [{"params":{"reference":"bullet","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0}},{"params":{"scale":true,"objectColor":false,"color":"#ff0000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":3},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":3},"functionName":"drawCircle"}],
        "mine": [{"params":{"reference":"explosive bullet","offset":{"x":0,"y":0},"rotation":0,"canvasScale":0}},{"params":{"scale":true,"objectColor":false,"color":"#cc2900","lineWidth":3,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":5},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":false,"color":"#b32400","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"x":-5,"y":-4.25,"radius":0.5},"functionName":"drawCircle"}],
        "death hand": [{"params":{"scale":true,"objectColor":false,"color":"#000000","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[4.25,-0.75],[6.5,4.5],[2.5,-0.5],[4.5,10.5],[0.5,2],[0,13.5],[-1.5,2.5],[-3,10.5],[-4,1.5],[-6,7.75],[-5,-2],[-0.75,-12.25]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[4.25,-0.75],[6.5,4.5],[2.5,-0.5],[4.5,10.5],[0.5,2],[0,13.5],[-1.5,2.5],[-3,10.5],[-4,1.5],[-6,7.75],[-5,-2],[-0.75,-12.25],[-0.75,-12.25],[4.25,-0.75]]},"functionName":"drawLine"}],
        "mini world": [{"params":{"scale":true,"objectColor":false,"color":"#0040ff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":10},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":0,"radius":10},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[-5,-4.75],[-4,-4.75],[-4,-4],[-4,-5.75],[-4.25,-5.75],[-3.5,-5.75],[-3.5,-6.25],[-2.75,-6.25],[-2.75,-5],[-2.5,-5],[-2.25,-5],[-2.25,-4.75],[-1.75,-4.75],[-1.75,-4.25],[-2,-4.25],[-2,-4],[-2.25,-4],[-2.75,-4],[-2.75,-3.75],[-3.5,-3.75],[-3.5,-4],[-3.5,-1.75],[-2.5,-1.75],[-1.5,-1.75],[-1.5,-1.5],[-2.25,-1.5],[-2.25,-1],[-3.75,-1],[-3.75,-0.5],[-5,-0.5],[-5,-1.25],[-5,-2.75],[-5.75,-2.75],[-5.75,-3.5],[-5.25,-3.5],[-5.25,-3.75],[-5.25,-5.25],[-5.75,-5.25],[-5.75,-6.5],[-5.25,-6.5],[-4.75,-6.5],[-4.75,-5.25],[-4.25,-5.25],[-4.75,-4.75]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[0.75,-6.75],[0.75,-4.5],[1,-4.5],[1.5,-4.5],[1.5,-3],[0.5,-3],[0.5,-1.25],[0.75,-1.25],[0.75,0.25],[1,0.25],[1.75,0.25],[1.75,-1],[2.25,-1],[2.25,-2.25],[1.75,-2.25],[2.75,-2.25],[2.75,-2.5],[2.75,-1],[3.5,-1],[3.5,-0.5],[3.25,-0.5],[4,-0.5],[4,0.25],[5.75,0.25],[5.75,-0.25],[6.75,-0.25],[6.75,-0.75],[6.75,-2.25],[7.75,-2.25],[7.75,-2.5],[7.25,-2.5],[7.25,-3],[3.25,-3],[3.25,-3.75],[3.25,-5.25],[4.5,-5.25],[5.5,-5.25],[5.5,-6.75],[4.75,-6.75],[3.25,-6.75],[3.25,-7.5],[1,-7.5],[1,-8],[0,-8],[0,-7],[-0.75,-7],[-0.75,-6.25],[-0.75,-4.5],[0,-4.5],[0.5,-4.5],[0.5,-4],[0.5,-3.25],[0.25,-3.25],[1.25,-3.25],[1.25,-3],[1.25,-3.75],[1.75,-3.75]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[-5.75,1.25],[-5.75,3.5],[-4.25,3.5],[-4.25,4.5],[-3.75,4.5],[-3.75,5.75],[-3.5,5.75],[-2.25,5.75],[-2.25,6],[-0.5,6],[-0.5,7.25],[0,7.25],[0,7],[1,7],[1,6.75],[0,6.75],[0,7.75],[-2.5,7.75],[-2.5,7.5],[0,7.5],[0,8.75],[1.75,8.75],[1.75,8.5],[1.75,7.5],[2.5,7.5],[3.75,7.5],[3.75,6.75],[4.75,6.75],[4.75,6.25],[5.25,6.25],[5.25,5.5],[5.75,5.5],[5.75,4.5],[5.75,3.25],[6.25,3.25],[6.75,3.25],[6.75,2.75],[3.5,2.75],[3.5,2.25],[3.5,3],[3,3],[3,3.5],[3.25,3.5],[1.5,3.5],[1.5,2],[1.5,3.25],[0.75,3.25],[0.75,4.5],[1.25,4.5],[-0.25,4.5],[-0.25,3.5],[-0.25,1.5],[-0.5,1.5],[-0.5,0.5],[-0.5,0],[-0.75,0],[-2.5,0],[-2.5,0.75],[-2.5,2.25],[-1.75,2.25],[-2,2.25],[-2,2.5],[-2.75,2.5],[-2.75,2],[-3.75,2],[-3.75,1],[-5,1],[-5,1.25]]},"functionName":"drawLine"}],
        "default": [{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[6,-6],[6,-6],[6,6],[6,6],[-6,6],[-6,6],[-6,-6]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"black","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[0,6],[0,6],[0,20]]},"functionName":"drawLine"}],
    
        "trace particule": [{"params":{"scale":true,"objectColor":false,"color":"#646464","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"positions":[[-1.2,1.2],[-1.2,1.2],[-1.2,-1.2],[-1.2,-1.2],[1.2,-1.2],[1.2,-1.2],[1.2,1.2]]},"functionName":"drawLine"}],

        "self swarm drone": [{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[0,-7.75],[4.5,0],[0,7.75]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#003d04","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[0,-6.5],[3.25,0],[3.25,0],[0,6.5]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":false,"color":"#003d04","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":-7.25,"radius":1.5},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":2,"fill":false,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":false,"yMirror":false,"xyMirror":false,"x":0,"y":-7.25,"radius":1.5},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":[0,0,0],"lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"x":0.5,"y":4,"radius":0.25},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"x":1,"y":3,"radius":0.25},"functionName":"drawCircle"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":true,"xyMirror":true,"positions":[[3,2.5],[6,4.75],[5.25,7.5],[5.5,5],[2.5,3.25]]},"functionName":"drawLine"},{"params":{"scale":true,"objectColor":true,"color":"#ffffff","lineWidth":1,"fill":true,"offset":{"x":0,"y":0},"rotation":0,"canvasScale":0,"xMirror":true,"yMirror":false,"xyMirror":false,"positions":[[1.5,-5],[3,-8.25],[2,-10.5],[2.25,-8.25],[1,-5.5]]},"functionName":"drawLine"}],
    }

    get(name, raw = true, params = new referenceNode().params) {
    
        if(raw){
    
            return CloneObject.recursiveCloneAttribute(this.database[name])
    
        }else{
    
            let drawInstructions = this.get(name)
    
            let tempDrawInstructions = []
        
            for (let index = 0; index < drawInstructions.length; index++) {
    
                let object = drawInstructions[index]
    
                if(
                    object.params.reference
                ){
    
                    this.sumParams(object, params)
    
                    tempDrawInstructions = tempDrawInstructions.concat(
                        this.get(
                            object.params.reference, false, object.params
                        )
                    )
    
                }else{
    
                    this.applyParams(object, params)
    
                    tempDrawInstructions = tempDrawInstructions.concat(
                        object
                    )
    
                }
    
            }
    
            return tempDrawInstructions
        
        }
    
    }
    
    sumParams(object, params){
    
        object.params.offset.x += params.offset.x
        object.params.offset.y += params.offset.y
    
        object.params.rotation += params.rotation
    
        object.params.canvasScale += params.canvasScale

    }
    
    applyParams(object, params){
    
        object.params.canvasScale += params.canvasScale
        object.params.rotation = params.rotation
        object.params.offset = {}
        object.params.offset.x = params.offset.x
        object.params.offset.y = params.offset.y
    
    }

}