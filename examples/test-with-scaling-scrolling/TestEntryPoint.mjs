import FlowConnectionDirectional from "../../parts/FlowConnectionDirectional.mjs";
import Point from "../../geometry/Point.mjs";
import LineSegment from "../../geometry/LineSegment.mjs";
import FlowNode from "../../parts/FlowNode.mjs";
import FlowInPort from "../../parts/FlowInPort.mjs";
import FlowOutPort from "../../parts/FlowOutPort.mjs";
import FlowEdge from "../../primitives/FlowEdge.mjs";
import FlowGrid from "../../FlowGrid.mjs";
import Viewport from "../../geometry/Viewport.mjs";
import TestScene from "./TestScene.mjs";
import FlowPortEvent from "../../events/FlowPortEvent.mjs";
import FlowPort from "../../primitives/FlowPort.mjs";

export default class TestEntryPoint{
    run(window){
        let [console,document,$] = [window.console,window.document,window.jQuery];


/*
        window.addEventListener("mousemove",(evt)=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            this.drawGrid(canvas,ctx);
            ctx.save();


           // FlowEdge.drawSpline(canvas,ctx,100,100,evt.clientX,evt.clientY)
        })*/


        let scene = new TestScene(window,jQuery,$('.flow2'));
        scene.prepare();

        window.scene = scene;

        FlowPort.on('click',(evt)=>{
            console.log("port click event",evt.port);
        })


        function frame(){
            //console.debug("frame");
            scene.update();
            scene.draw();
            window.requestAnimationFrame(frame);
        }
        window.frame=frame;



        frame();





    }



}