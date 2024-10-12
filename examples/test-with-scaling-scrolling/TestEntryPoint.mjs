import FlowConnection from "../../parts/FlowConnection.mjs";
import Point from "../../geometry/Point.mjs";
import LineSegment from "../../geometry/LineSegment.mjs";
import FlowNode from "../../parts/FlowNode.mjs";
import FlowInPort from "../../parts/FlowInPort.mjs";
import FlowOutPort from "../../parts/FlowOutPort.js";
import FlowEdge from "../../primitives/FlowEdge.mjs";
import FlowGrid from "../../FlowGrid.mjs";
import Viewport from "../../geometry/Viewport.js";
import TestScene from "./TestScene.mjs";

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
        function frame(){
            console.log("frame");
            scene.update();
            scene.draw();
            window.requestAnimationFrame(frame);
        }
        window.frame=frame;



        frame();





    }



}