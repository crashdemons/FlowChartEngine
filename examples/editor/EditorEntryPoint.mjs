import EditorScene from "./EditorScene.mjs";
import FlowPort from "../../primitives/FlowPort.mjs";
import NodeType1 from "./NodeType1.mjs";
import Point from "../../geometry/Point.mjs";
import FlowArrow from "../../parts/FlowArrow.mjs";
import FlowInPort from "../../parts/FlowInPort.mjs";
import FlowOutPort from "../../parts/FlowOutPort.mjs";

export default class EditorEntryPoint {
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


        let scene = new EditorScene(window, jQuery, $('.flow2'));
        scene.prepare();

        window.scene = scene;




        function frame() {
            //console.debug("frame");
            scene.update();
            scene.draw();
            window.requestAnimationFrame(frame);
        }

        window.frame = frame;

        this.prepareEditor(scene);

        frame();


    }

    /** @param {EditorScene} scene */
    prepareEditor(scene){
        let flowContainer = scene.grid.$container;//('.flow2');
        let dragOptions = $(".sidebar > .option");
        dragOptions.on('dragstart',(evt)=>{
            console.log("DRAG",evt);
            evt.originalEvent.dataTransfer.setData('text/plain','xyz');
        })
        flowContainer.on('dragover',(evt)=>{
            evt.preventDefault();///allow drop
        })
        flowContainer.on('drop',(evt)=>{
            let str =  evt.originalEvent.dataTransfer.getData('text/plain');
            console.log("DROP",evt,str)

            let node = new NodeType1();
            let mousePt = scene.grid.mousePt.clone().subtract(-25,-25);
            console.log(mousePt);
            //mousePt = mousePt.subtractOffset(scene.grid.viewport.outerPosition);
            node.point = mousePt;
            scene.addDrawable(node,true);
        })
        FlowPort.on('click', (evt) => {

            let conn = scene.getMouseConnection();
            console.log("conntrack",conn);
            if(conn!==null){
                if(conn.endPort===null && evt.port instanceof FlowInPort) conn.connectEnd(evt.port);
                else if(conn.startPort===null &&  evt.port instanceof FlowOutPort) conn.connectStart(evt.port);
            }else{
                console.log("port click event", evt.port);
                if(evt.port.edges.length){//if the port has edges, delete them
                    for(/** @type {FlowEdge} */let edge of evt.port.edges){
                        scene.removeDrawable(edge);
                    }
                }
                let edge = new FlowArrow('ed-conn');
                edge.connectPort(evt.port);
                scene.addDrawable(edge,true);
            }


        })
    }


}