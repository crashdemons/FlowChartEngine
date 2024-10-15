import TestScene from "./TestScene.mjs";
import FlowPort from "../../primitives/FlowPort.mjs";

export default class TestEntryPoint {
    run(window) {
        let [console, document, $] = [window.console, window.document, window.jQuery];


        /*
                window.addEventListener("mousemove",(evt)=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.restore();
                    this.drawGrid(canvas,ctx);
                    ctx.save();


                   // FlowLine.drawSpline(canvas,ctx,100,100,evt.clientX,evt.clientY)
                })*/


        let scene = new TestScene(window, jQuery, $('.flow2'));
        scene.prepare();

        window.scene = scene;

        FlowPort.on('click', (evt) => {
            console.log("port click event", evt.port);
        })


        function frame() {
            //console.debug("frame");
            scene.update();
            scene.draw();
            window.requestAnimationFrame(frame);
        }

        window.frame = frame;


        frame();


    }


}